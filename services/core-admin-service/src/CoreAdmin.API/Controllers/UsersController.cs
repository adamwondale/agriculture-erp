using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoreAdmin.Domain.Entities;
using CoreAdmin.Domain.Enums;
using CoreAdmin.Infrastructure.Persistence;
using CoreAdmin.API.Services;

namespace CoreAdmin.API.Controllers;

[ApiController]
[Route("api/admin/users")]
[Authorize]
public class UsersController(CoreAdminDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> ListUsers(
        [FromQuery] string? status,
        [FromQuery] Guid? branchId,
        [FromQuery] string? role,
        CancellationToken ct)
    {
        var query = db.Users.AsNoTracking().Where(x => !x.IsDeleted);

        if (!string.IsNullOrWhiteSpace(status))
        {
            query = query.Where(x => x.Status.ToLower() == status.Trim().ToLower());
        }

        if (branchId.HasValue)
        {
            query = query.Where(x => x.BranchId == branchId.Value);
        }

        var users = await query
            .OrderBy(u => u.DisplayName)
            .Select(u => new
            {
                u.Id,
                u.Email,
                u.Username,
                u.DisplayName,
                u.Status,
                u.Department,
                u.Position,
                u.BranchId,
                u.MfaEnabled,
                u.PreferredLanguage,
                u.CreatedAt,
                Roles = (from ur in db.UserRoles
                         join r in db.Roles on ur.RoleId equals r.Id
                         where ur.UserId == u.Id && ur.IsActive && !ur.IsDeleted && !r.IsDeleted
                         select r.Code).ToList()
            })
            .ToListAsync(ct);

        if (!string.IsNullOrWhiteSpace(role))
        {
            var filterRole = role.Trim().ToLower();
            users = users.Where(u => u.Roles.Any(r => r.ToLower() == filterRole)).ToList();
        }

        return Ok(users);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetUserById(Guid id, CancellationToken ct)
    {
        var u = await db.Users.AsNoTracking().SingleOrDefaultAsync(x => x.Id == id && !x.IsDeleted, ct);
        if (u == null) return NotFound(new { error = "User not found" });

        var roles = await (from ur in db.UserRoles
                           join r in db.Roles on ur.RoleId equals r.Id
                           where ur.UserId == u.Id && ur.IsActive && !ur.IsDeleted && !r.IsDeleted
                           select new
                           {
                               r.Id,
                               r.Code,
                               r.Name,
                               ur.BranchScopeId,
                               ur.ValidFrom,
                               ur.ValidTo
                           }).ToListAsync(ct);

        var roleIds = roles.Select(r => r.Id).ToList();
        var basePermissions = await (from rp in db.RolePermissions
                                     join p in db.Permissions on rp.PermissionId equals p.Id
                                     where roleIds.Contains(rp.RoleId) && !rp.IsDeleted && !p.IsDeleted
                                     select p.Code).Distinct().ToListAsync(ct);

        var overrides = await db.PermissionOverrides
            .AsNoTracking()
            .Where(po => po.UserId == u.Id && !po.IsDeleted && (po.ExpiresAt == null || po.ExpiresAt > DateTimeOffset.UtcNow))
            .Select(po => new
            {
                po.Id,
                po.PermissionCode,
                po.Effect,
                po.Reason,
                po.ExpiresAt,
                po.BranchScopeId
            })
            .ToListAsync(ct);

        var effectivePermissions = new HashSet<string>(basePermissions);
        foreach (var ov in overrides)
        {
            if (ov.Effect == "Allow") effectivePermissions.Add(ov.PermissionCode);
            else if (ov.Effect == "Deny") effectivePermissions.Remove(ov.PermissionCode);
        }

        return Ok(new
        {
            u.Id,
            u.Email,
            u.Username,
            u.DisplayName,
            u.Status,
            u.Department,
            u.Position,
            u.BranchId,
            u.MfaEnabled,
            u.PreferredLanguage,
            u.CreatedAt,
            Roles = roles,
            Overrides = overrides,
            EffectivePermissions = effectivePermissions.ToList()
        });
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest req, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrWhiteSpace(req.TemporaryPassword))
        {
            return BadRequest(new { error = "Email and temporary password are required." });
        }

        var normalizedEmail = req.Email.Trim().ToLower();
        if (await db.Users.AnyAsync(x => x.Email.ToLower() == normalizedEmail && !x.IsDeleted, ct))
        {
            return Conflict(new { error = "Email already exists." });
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = normalizedEmail,
            Username = req.Username?.Trim() ?? normalizedEmail.Split('@')[0],
            DisplayName = req.DisplayName?.Trim() ?? req.Username?.Trim() ?? normalizedEmail.Split('@')[0],
            PasswordHash = AuthService.Hash(req.TemporaryPassword),
            Status = UserStatus.Pending.ToString(),
            MfaEnabled = req.MfaRequired,
            Department = req.Department?.Trim() ?? "",
            Position = req.Position?.Trim() ?? "",
            BranchId = req.BranchId,
            CreatedAt = DateTimeOffset.UtcNow
        };

        db.Users.Add(user);

        if (req.RoleIds != null && req.RoleIds.Count > 0)
        {
            var validRoleIds = await db.Roles
                .Where(r => req.RoleIds.Contains(r.Id) && !r.IsDeleted)
                .Select(r => r.Id)
                .ToListAsync(ct);

            foreach (var roleId in validRoleIds)
            {
                db.UserRoles.Add(new UserRole
                {
                    Id = Guid.NewGuid(),
                    UserId = user.Id,
                    RoleId = roleId,
                    ValidFrom = DateTimeOffset.UtcNow,
                    IsActive = true,
                    CreatedAt = DateTimeOffset.UtcNow
                });
            }
        }

        db.AuditLogEntrys.Add(new AuditLogEntry
        {
            Id = Guid.NewGuid(),
            EntityName = "User",
            Action = "Created",
            PerformedBy = User.Identity?.Name ?? "system",
            CreatedAt = DateTimeOffset.UtcNow,
            AfterState = System.Text.Json.JsonSerializer.Serialize(new
            {
                user.Id,
                user.Email,
                user.Status,
                RolesAssigned = req.RoleIds?.Count ?? 0
            })
        });

        await db.SaveChangesAsync(ct);

        return Created($"/api/admin/users/{user.Id}", new
        {
            id = user.Id,
            email = user.Email,
            username = user.Username,
            displayName = user.DisplayName,
            status = user.Status,
            department = user.Department,
            position = user.Position,
            branchId = user.BranchId,
            mfaEnabled = user.MfaEnabled,
            createdAt = user.CreatedAt
        });
    }

    [HttpPatch("{id:guid}/activate")]
    public async Task<IActionResult> ActivateUser(Guid id, CancellationToken ct)
    {
        var u = await db.Users.FindAsync([id], ct);
        if (u is null || u.IsDeleted) return NotFound(new { error = "User not found" });

        u.Status = UserStatus.Active.ToString();
        u.DeactivatedAt = null;
        u.UpdatedAt = DateTimeOffset.UtcNow;

        db.AuditLogEntrys.Add(new AuditLogEntry
        {
            Id = Guid.NewGuid(),
            EntityName = "User",
            Action = "Activated",
            PerformedBy = User.Identity?.Name ?? "system",
            CreatedAt = DateTimeOffset.UtcNow,
            AfterState = System.Text.Json.JsonSerializer.Serialize(new { u.Id, u.Email, u.Status })
        });

        await db.SaveChangesAsync(ct);
        return Ok(new { u.Id, u.Status });
    }

    [HttpPatch("{id:guid}/deactivate")]
    [Authorize(Roles = "SuperAdmin")]
    public async Task<IActionResult> DeactivateUser(Guid id, CancellationToken ct)
    {
        var u = await db.Users.FindAsync([id], ct);
        if (u is null || u.IsDeleted) return NotFound(new { error = "User not found" });

        u.Status = UserStatus.Suspended.ToString();
        u.DeactivatedAt = DateTimeOffset.UtcNow;
        u.RefreshToken = null;
        u.RefreshTokenExpiryTime = null;
        u.UpdatedAt = DateTimeOffset.UtcNow;

        db.AuditLogEntrys.Add(new AuditLogEntry
        {
            Id = Guid.NewGuid(),
            EntityName = "User",
            Action = "Deactivated",
            PerformedBy = User.Identity?.Name ?? "system",
            CreatedAt = DateTimeOffset.UtcNow,
            AfterState = System.Text.Json.JsonSerializer.Serialize(new { u.Id, u.Email, u.Status, u.DeactivatedAt })
        });

        await db.SaveChangesAsync(ct);
        return Ok(new { u.Id, u.Status, u.DeactivatedAt });
    }

    [HttpGet("{id:guid}/roles")]
    public async Task<IActionResult> GetUserRoles(Guid id, CancellationToken ct)
    {
        var exists = await db.Users.AnyAsync(u => u.Id == id && !u.IsDeleted, ct);
        if (!exists) return NotFound(new { error = "User not found" });

        var roles = await (from ur in db.UserRoles
                           join r in db.Roles on ur.RoleId equals r.Id
                           where ur.UserId == id && ur.IsActive && !ur.IsDeleted && !r.IsDeleted
                           select new
                           {
                               ur.Id,
                               RoleId = r.Id,
                               r.Code,
                               r.Name,
                               r.Description,
                               r.IsSystemRole,
                               ur.BranchScopeId,
                               ur.ValidFrom,
                               ur.ValidTo
                           }).ToListAsync(ct);

        return Ok(roles);
    }

    [HttpPost("{id:guid}/roles")]
    [Authorize(Roles = "SuperAdmin")]
    public async Task<IActionResult> AssignRoleToUser(Guid id, [FromBody] AssignUserRoleRequest req, CancellationToken ct)
    {
        var user = await db.Users.SingleOrDefaultAsync(u => u.Id == id && !u.IsDeleted, ct);
        if (user == null) return NotFound(new { error = "User not found" });

        var role = await db.Roles.SingleOrDefaultAsync(r => r.Id == req.RoleId && !r.IsDeleted, ct);
        if (role == null) return NotFound(new { error = "Role not found" });

        var existing = await db.UserRoles
            .SingleOrDefaultAsync(ur => ur.UserId == id && ur.RoleId == req.RoleId && !ur.IsDeleted, ct);

        if (existing != null)
        {
            existing.IsActive = true;
            existing.BranchScopeId = req.BranchScopeId;
            existing.ValidTo = req.ValidTo;
            existing.UpdatedAt = DateTimeOffset.UtcNow;
        }
        else
        {
            var userRole = new UserRole
            {
                Id = Guid.NewGuid(),
                UserId = id,
                RoleId = req.RoleId,
                BranchScopeId = req.BranchScopeId,
                ValidFrom = DateTimeOffset.UtcNow,
                ValidTo = req.ValidTo,
                IsActive = true,
                CreatedAt = DateTimeOffset.UtcNow
            };
            db.UserRoles.Add(userRole);
        }

        user.PermissionsVersion++;
        user.UpdatedAt = DateTimeOffset.UtcNow;

        db.AuditLogEntrys.Add(new AuditLogEntry
        {
            Id = Guid.NewGuid(),
            EntityName = "UserRole",
            Action = "Assigned",
            PerformedBy = User.Identity?.Name ?? "system",
            CreatedAt = DateTimeOffset.UtcNow,
            AfterState = System.Text.Json.JsonSerializer.Serialize(new
            {
                UserId = id,
                RoleId = role.Id,
                RoleCode = role.Code,
                req.BranchScopeId,
                req.ValidTo
            })
        });

        await db.SaveChangesAsync(ct);

        return Ok(new
        {
            message = $"Role '{role.Code}' successfully assigned to user '{user.Email}'.",
            userId = id,
            roleId = role.Id,
            roleCode = role.Code
        });
    }

    [HttpDelete("{id:guid}/roles/{roleId:guid}")]
    [Authorize(Roles = "SuperAdmin")]
    public async Task<IActionResult> RevokeRoleFromUser(Guid id, Guid roleId, CancellationToken ct)
    {
        var user = await db.Users.SingleOrDefaultAsync(u => u.Id == id && !u.IsDeleted, ct);
        if (user == null) return NotFound(new { error = "User not found" });

        var userRole = await db.UserRoles
            .SingleOrDefaultAsync(ur => ur.UserId == id && ur.RoleId == roleId && ur.IsActive && !ur.IsDeleted, ct);

        if (userRole == null)
        {
            return NotFound(new { error = "Role is not currently actively assigned to this user." });
        }

        userRole.IsActive = false;
        userRole.UpdatedAt = DateTimeOffset.UtcNow;

        user.PermissionsVersion++;
        user.UpdatedAt = DateTimeOffset.UtcNow;

        db.AuditLogEntrys.Add(new AuditLogEntry
        {
            Id = Guid.NewGuid(),
            EntityName = "UserRole",
            Action = "Revoked",
            PerformedBy = User.Identity?.Name ?? "system",
            CreatedAt = DateTimeOffset.UtcNow,
            BeforeState = System.Text.Json.JsonSerializer.Serialize(new { UserId = id, RoleId = roleId })
        });

        await db.SaveChangesAsync(ct);

        return NoContent();
    }

    [HttpGet("{id:guid}/permissions")]
    public async Task<IActionResult> GetUserEffectivePermissions(Guid id, CancellationToken ct)
    {
        var user = await db.Users.SingleOrDefaultAsync(u => u.Id == id && !u.IsDeleted, ct);
        if (user == null) return NotFound(new { error = "User not found" });

        var roleIds = await db.UserRoles
            .Where(ur => ur.UserId == id && ur.IsActive && !ur.IsDeleted)
            .Select(ur => ur.RoleId)
            .ToListAsync(ct);

        var basePermissions = await (from rp in db.RolePermissions
                                     join p in db.Permissions on rp.PermissionId equals p.Id
                                     where roleIds.Contains(rp.RoleId) && !rp.IsDeleted && !p.IsDeleted
                                     select p.Code).Distinct().ToListAsync(ct);

        var overrides = await db.PermissionOverrides
            .AsNoTracking()
            .Where(po => po.UserId == id && !po.IsDeleted && (po.ExpiresAt == null || po.ExpiresAt > DateTimeOffset.UtcNow))
            .ToListAsync(ct);

        var effectivePermissions = new HashSet<string>(basePermissions);
        foreach (var ov in overrides)
        {
            if (ov.Effect == "Allow") effectivePermissions.Add(ov.PermissionCode);
            else if (ov.Effect == "Deny") effectivePermissions.Remove(ov.PermissionCode);
        }

        return Ok(new
        {
            userId = user.Id,
            email = user.Email,
            basePermissionsCount = basePermissions.Count,
            effectivePermissionsCount = effectivePermissions.Count,
            permissions = effectivePermissions.OrderBy(p => p).ToList(),
            overrides = overrides.Select(o => new
            {
                o.Id,
                o.PermissionCode,
                o.Effect,
                o.Reason,
                o.ExpiresAt,
                o.BranchScopeId
            })
        });
    }

    [HttpPost("{id:guid}/permission-overrides")]
    [Authorize(Roles = "SuperAdmin")]
    public async Task<IActionResult> SetPermissionOverride(Guid id, [FromBody] SetPermissionOverrideRequest req, CancellationToken ct)
    {
        var user = await db.Users.SingleOrDefaultAsync(u => u.Id == id && !u.IsDeleted, ct);
        if (user == null) return NotFound(new { error = "User not found" });

        var effectNormalized = req.Effect?.Trim().ToLower() == "allow" ? "Allow" : "Deny";
        var codeNormalized = req.PermissionCode.Trim().ToUpper();

        var existing = await db.PermissionOverrides
            .SingleOrDefaultAsync(po => po.UserId == id && po.PermissionCode == codeNormalized && !po.IsDeleted, ct);

        if (existing != null)
        {
            existing.Effect = effectNormalized;
            existing.Reason = req.Reason?.Trim() ?? "";
            existing.ExpiresAt = req.ExpiresAt;
            existing.BranchScopeId = req.BranchScopeId;
            existing.UpdatedAt = DateTimeOffset.UtcNow;
        }
        else
        {
            existing = new PermissionOverride
            {
                Id = Guid.NewGuid(),
                UserId = id,
                PermissionCode = codeNormalized,
                Effect = effectNormalized,
                Reason = req.Reason?.Trim() ?? "",
                ExpiresAt = req.ExpiresAt,
                BranchScopeId = req.BranchScopeId,
                CreatedAt = DateTimeOffset.UtcNow
            };
            db.PermissionOverrides.Add(existing);
        }

        user.PermissionsVersion++;
        user.UpdatedAt = DateTimeOffset.UtcNow;

        db.AuditLogEntrys.Add(new AuditLogEntry
        {
            Id = Guid.NewGuid(),
            EntityName = "PermissionOverride",
            Action = "Configured",
            PerformedBy = User.Identity?.Name ?? "system",
            CreatedAt = DateTimeOffset.UtcNow,
            AfterState = System.Text.Json.JsonSerializer.Serialize(new
            {
                UserId = id,
                req.PermissionCode,
                Effect = effectNormalized,
                req.Reason,
                req.ExpiresAt
            })
        });

        await db.SaveChangesAsync(ct);

        return Ok(new
        {
            id = existing.Id,
            userId = id,
            permissionCode = existing.PermissionCode,
            effect = existing.Effect,
            reason = existing.Reason,
            expiresAt = existing.ExpiresAt
        });
    }

    [HttpDelete("{id:guid}/permission-overrides/{overrideId:guid}")]
    [Authorize(Roles = "SuperAdmin")]
    public async Task<IActionResult> RemovePermissionOverride(Guid id, Guid overrideId, CancellationToken ct)
    {
        var user = await db.Users.SingleOrDefaultAsync(u => u.Id == id && !u.IsDeleted, ct);
        if (user == null) return NotFound(new { error = "User not found" });

        var ov = await db.PermissionOverrides
            .SingleOrDefaultAsync(po => po.Id == overrideId && po.UserId == id && !po.IsDeleted, ct);

        if (ov == null)
        {
            return NotFound(new { error = "Permission override not found." });
        }

        ov.IsDeleted = true;
        ov.UpdatedAt = DateTimeOffset.UtcNow;

        user.PermissionsVersion++;
        user.UpdatedAt = DateTimeOffset.UtcNow;

        db.AuditLogEntrys.Add(new AuditLogEntry
        {
            Id = Guid.NewGuid(),
            EntityName = "PermissionOverride",
            Action = "Removed",
            PerformedBy = User.Identity?.Name ?? "system",
            CreatedAt = DateTimeOffset.UtcNow,
            BeforeState = System.Text.Json.JsonSerializer.Serialize(new { UserId = id, OverrideId = overrideId, ov.PermissionCode })
        });

        await db.SaveChangesAsync(ct);

        return NoContent();
    }

    public record CreateUserRequest(
        string Email,
        string? Username,
        string TemporaryPassword,
        bool MfaRequired = false,
        string? DisplayName = null,
        string? Department = null,
        string? Position = null,
        Guid? BranchId = null,
        List<Guid>? RoleIds = null
    );

    public record AssignUserRoleRequest(
        Guid RoleId,
        Guid? BranchScopeId = null,
        DateTimeOffset? ValidTo = null
    );

    public record SetPermissionOverrideRequest(
        string PermissionCode,
        string Effect,
        string? Reason = null,
        DateTimeOffset? ExpiresAt = null,
        Guid? BranchScopeId = null
    );
}
