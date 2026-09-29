using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoreAdmin.Domain.Entities;
using CoreAdmin.Infrastructure.Persistence;

namespace CoreAdmin.API.Controllers;

[ApiController]
[Route("api/admin/roles")]
[Authorize]
public class RolesController(CoreAdminDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> ListRoles(
        [FromQuery] bool? requiresMfa,
        [FromQuery] bool? isSystemRole,
        CancellationToken ct)
    {
        var query = db.Roles.AsNoTracking().Where(r => !r.IsDeleted);

        if (requiresMfa.HasValue)
        {
            query = query.Where(r => r.RequiresMfa == requiresMfa.Value);
        }

        if (isSystemRole.HasValue)
        {
            query = query.Where(r => r.IsSystemRole == isSystemRole.Value);
        }

        var roles = await query
            .OrderBy(r => r.Name)
            .Select(r => new
            {
                r.Id,
                r.Code,
                r.Name,
                r.Description,
                r.IsSystemRole,
                r.RequiresMfa,
                r.OrganizationId,
                r.CreatedAt,
                r.UpdatedAt,
                PermissionsCount = db.RolePermissions.Count(rp => rp.RoleId == r.Id && !rp.IsDeleted),
                UserCount = db.UserRoles.Count(ur => ur.RoleId == r.Id && ur.IsActive && !ur.IsDeleted)
            })
            .ToListAsync(ct);

        return Ok(roles);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetRoleById(Guid id, CancellationToken ct)
    {
        var role = await db.Roles.AsNoTracking()
            .SingleOrDefaultAsync(r => r.Id == id && !r.IsDeleted, ct);

        if (role == null) return NotFound(new { error = "Role not found" });

        var permissions = await (from rp in db.RolePermissions
                                 join p in db.Permissions on rp.PermissionId equals p.Id
                                 where rp.RoleId == role.Id && !rp.IsDeleted && !p.IsDeleted
                                 select new
                                 {
                                     p.Id,
                                     p.Code,
                                     p.Name,
                                     p.Resource,
                                     p.Action
                                 }).ToListAsync(ct);

        var userCount = await db.UserRoles.CountAsync(ur => ur.RoleId == role.Id && ur.IsActive && !ur.IsDeleted, ct);

        return Ok(new
        {
            role.Id,
            role.Code,
            role.Name,
            role.Description,
            role.IsSystemRole,
            role.RequiresMfa,
            role.OrganizationId,
            role.CreatedAt,
            role.UpdatedAt,
            UserCount = userCount,
            Permissions = permissions
        });
    }

    [HttpPost]
    [Authorize(Roles = "SuperAdmin")]
    public async Task<IActionResult> CreateRole([FromBody] CreateRoleRequest request, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(request.Code) || string.IsNullOrWhiteSpace(request.Name))
        {
            return BadRequest(new { error = "Role code and name are required." });
        }

        var codeNormalized = request.Code.Trim().Replace(" ", "");
        var exists = await db.Roles.AnyAsync(r => r.Code.ToLower() == codeNormalized.ToLower() && !r.IsDeleted, ct);
        if (exists)
        {
            return Conflict(new { error = $"A role with code '{codeNormalized}' already exists." });
        }

        var role = new Role
        {
            Id = Guid.NewGuid(),
            Code = codeNormalized,
            Name = request.Name.Trim(),
            Description = request.Description?.Trim() ?? "",
            RequiresMfa = request.RequiresMfa,
            IsSystemRole = false,
            OrganizationId = request.OrganizationId,
            CreatedAt = DateTimeOffset.UtcNow
        };

        db.Roles.Add(role);

        if (request.PermissionIds != null && request.PermissionIds.Count > 0)
        {
            var validPermIds = await db.Permissions
                .Where(p => request.PermissionIds.Contains(p.Id) && !p.IsDeleted)
                .Select(p => p.Id)
                .ToListAsync(ct);

            foreach (var permId in validPermIds)
            {
                db.RolePermissions.Add(new RolePermission
                {
                    Id = Guid.NewGuid(),
                    RoleId = role.Id,
                    PermissionId = permId,
                    CreatedAt = DateTimeOffset.UtcNow
                });
            }
        }

        db.AuditLogEntrys.Add(new AuditLogEntry
        {
            Id = Guid.NewGuid(),
            EntityName = "Role",
            Action = "Created",
            PerformedBy = User.Identity?.Name ?? "system",
            CreatedAt = DateTimeOffset.UtcNow,
            AfterState = System.Text.Json.JsonSerializer.Serialize(new
            {
                role.Id,
                role.Code,
                role.Name,
                role.RequiresMfa,
                PermissionsAssigned = request.PermissionIds?.Count ?? 0
            })
        });

        await db.SaveChangesAsync(ct);

        return CreatedAtAction(nameof(GetRoleById), new { id = role.Id }, new
        {
            role.Id,
            role.Code,
            role.Name,
            role.Description,
            role.RequiresMfa,
            role.IsSystemRole,
            role.CreatedAt
        });
    }

    [HttpPut("{id:guid}")]
    [Authorize(Roles = "SuperAdmin")]
    public async Task<IActionResult> UpdateRole(Guid id, [FromBody] UpdateRoleRequest request, CancellationToken ct)
    {
        var role = await db.Roles.SingleOrDefaultAsync(r => r.Id == id && !r.IsDeleted, ct);
        if (role == null) return NotFound(new { error = "Role not found" });

        var beforeSnapshot = System.Text.Json.JsonSerializer.Serialize(new
        {
            role.Id,
            role.Name,
            role.Description,
            role.RequiresMfa
        });

        if (!string.IsNullOrWhiteSpace(request.Name)) role.Name = request.Name.Trim();
        if (request.Description != null) role.Description = request.Description.Trim();
        role.RequiresMfa = request.RequiresMfa;
        role.UpdatedAt = DateTimeOffset.UtcNow;

        if (request.PermissionIds != null)
        {
            var existingPerms = await db.RolePermissions
                .Where(rp => rp.RoleId == role.Id)
                .ToListAsync(ct);
            db.RolePermissions.RemoveRange(existingPerms);

            var validPermIds = await db.Permissions
                .Where(p => request.PermissionIds.Contains(p.Id) && !p.IsDeleted)
                .Select(p => p.Id)
                .ToListAsync(ct);

            foreach (var permId in validPermIds)
            {
                db.RolePermissions.Add(new RolePermission
                {
                    Id = Guid.NewGuid(),
                    RoleId = role.Id,
                    PermissionId = permId,
                    CreatedAt = DateTimeOffset.UtcNow
                });
            }
        }

        db.AuditLogEntrys.Add(new AuditLogEntry
        {
            Id = Guid.NewGuid(),
            EntityName = "Role",
            Action = "Updated",
            PerformedBy = User.Identity?.Name ?? "system",
            CreatedAt = DateTimeOffset.UtcNow,
            BeforeState = beforeSnapshot,
            AfterState = System.Text.Json.JsonSerializer.Serialize(new
            {
                role.Id,
                role.Name,
                role.RequiresMfa,
                UpdatedPermissionsCount = request.PermissionIds?.Count
            })
        });

        await db.SaveChangesAsync(ct);

        return Ok(new
        {
            role.Id,
            role.Code,
            role.Name,
            role.Description,
            role.RequiresMfa,
            role.IsSystemRole,
            role.UpdatedAt
        });
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "SuperAdmin")]
    public async Task<IActionResult> DeleteRole(Guid id, CancellationToken ct)
    {
        var role = await db.Roles.SingleOrDefaultAsync(r => r.Id == id && !r.IsDeleted, ct);
        if (role == null) return NotFound(new { error = "Role not found" });

        if (role.IsSystemRole)
        {
            return BadRequest(new { error = "System roles are protected by fixed governance rules and cannot be deleted." });
        }

        var activeUsersCount = await db.UserRoles.CountAsync(ur => ur.RoleId == role.Id && ur.IsActive && !ur.IsDeleted, ct);
        if (activeUsersCount > 0)
        {
            return BadRequest(new { error = $"Cannot delete role because it is currently assigned to {activeUsersCount} active user(s)." });
        }

        role.IsDeleted = true;
        role.UpdatedAt = DateTimeOffset.UtcNow;

        var rolePerms = await db.RolePermissions.Where(rp => rp.RoleId == role.Id).ToListAsync(ct);
        db.RolePermissions.RemoveRange(rolePerms);

        db.AuditLogEntrys.Add(new AuditLogEntry
        {
            Id = Guid.NewGuid(),
            EntityName = "Role",
            Action = "Deleted",
            PerformedBy = User.Identity?.Name ?? "system",
            CreatedAt = DateTimeOffset.UtcNow,
            BeforeState = System.Text.Json.JsonSerializer.Serialize(new { role.Id, role.Code, role.Name })
        });

        await db.SaveChangesAsync(ct);

        return NoContent();
    }

    [HttpPost("{id:guid}/permissions")]
    [Authorize(Roles = "SuperAdmin")]
    public async Task<IActionResult> AssignPermissionsToRole(Guid id, [FromBody] AssignRolePermissionsRequest request, CancellationToken ct)
    {
        var role = await db.Roles.SingleOrDefaultAsync(r => r.Id == id && !r.IsDeleted, ct);
        if (role == null) return NotFound(new { error = "Role not found" });

        var validPermIds = await db.Permissions
            .Where(p => request.PermissionIds.Contains(p.Id) && !p.IsDeleted)
            .Select(p => p.Id)
            .ToListAsync(ct);

        var existingAssignedIds = await db.RolePermissions
            .Where(rp => rp.RoleId == role.Id && !rp.IsDeleted)
            .Select(rp => rp.PermissionId)
            .ToListAsync(ct);

        var newPermIds = validPermIds.Except(existingAssignedIds).ToList();

        foreach (var permId in newPermIds)
        {
            db.RolePermissions.Add(new RolePermission
            {
                Id = Guid.NewGuid(),
                RoleId = role.Id,
                PermissionId = permId,
                CreatedAt = DateTimeOffset.UtcNow
            });
        }

        db.AuditLogEntrys.Add(new AuditLogEntry
        {
            Id = Guid.NewGuid(),
            EntityName = "RolePermission",
            Action = "Assigned",
            PerformedBy = User.Identity?.Name ?? "system",
            CreatedAt = DateTimeOffset.UtcNow,
            AfterState = System.Text.Json.JsonSerializer.Serialize(new
            {
                RoleId = role.Id,
                RoleCode = role.Code,
                AssignedCount = newPermIds.Count
            })
        });

        await db.SaveChangesAsync(ct);

        return Ok(new
        {
            message = $"Successfully assigned {newPermIds.Count} permission(s) to role '{role.Code}'.",
            roleId = role.Id,
            assignedCount = newPermIds.Count
        });
    }

    [HttpDelete("{id:guid}/permissions/{permissionId:guid}")]
    [Authorize(Roles = "SuperAdmin")]
    public async Task<IActionResult> RemovePermissionFromRole(Guid id, Guid permissionId, CancellationToken ct)
    {
        var role = await db.Roles.SingleOrDefaultAsync(r => r.Id == id && !r.IsDeleted, ct);
        if (role == null) return NotFound(new { error = "Role not found" });

        var rolePerm = await db.RolePermissions
            .SingleOrDefaultAsync(rp => rp.RoleId == id && rp.PermissionId == permissionId, ct);

        if (rolePerm == null)
        {
            return NotFound(new { error = "Permission is not assigned to this role." });
        }

        db.RolePermissions.Remove(rolePerm);

        db.AuditLogEntrys.Add(new AuditLogEntry
        {
            Id = Guid.NewGuid(),
            EntityName = "RolePermission",
            Action = "Revoked",
            PerformedBy = User.Identity?.Name ?? "system",
            CreatedAt = DateTimeOffset.UtcNow,
            BeforeState = System.Text.Json.JsonSerializer.Serialize(new { RoleId = id, PermissionId = permissionId })
        });

        await db.SaveChangesAsync(ct);

        return NoContent();
    }
}

public record CreateRoleRequest(
    string Code,
    string Name,
    string? Description,
    bool RequiresMfa = false,
    List<Guid>? PermissionIds = null,
    Guid? OrganizationId = null
);

public record UpdateRoleRequest(
    string? Name,
    string? Description,
    bool RequiresMfa = false,
    List<Guid>? PermissionIds = null
);

public record AssignRolePermissionsRequest(
    List<Guid> PermissionIds
);
