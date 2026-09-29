using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoreAdmin.Domain.Entities;
using CoreAdmin.Infrastructure.Persistence;

namespace CoreAdmin.API.Controllers;

[ApiController]
[Route("api/admin/permissions")]
[Authorize]
public class PermissionsController(CoreAdminDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> ListPermissions(
        [FromQuery] string? resource,
        [FromQuery] string? action,
        [FromQuery] string? search,
        CancellationToken ct)
    {
        var query = db.Permissions.AsNoTracking().Where(p => !p.IsDeleted);

        if (!string.IsNullOrWhiteSpace(resource))
        {
            query = query.Where(p => p.Resource.ToLower() == resource.Trim().ToLower());
        }

        if (!string.IsNullOrWhiteSpace(action))
        {
            query = query.Where(p => p.Action.ToLower() == action.Trim().ToLower());
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.Trim().ToLower();
            query = query.Where(p => p.Code.ToLower().Contains(s) || p.Name.ToLower().Contains(s));
        }

        var permissions = await query
            .OrderBy(p => p.Resource)
            .ThenBy(p => p.Action)
            .ThenBy(p => p.Code)
            .Select(p => new
            {
                p.Id,
                p.Code,
                p.Name,
                p.Resource,
                p.Action,
                p.CreatedAt,
                p.UpdatedAt,
                RolesCount = db.RolePermissions.Count(rp => rp.PermissionId == p.Id && !rp.IsDeleted)
            })
            .ToListAsync(ct);

        return Ok(permissions);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetPermissionById(Guid id, CancellationToken ct)
    {
        var permission = await db.Permissions.AsNoTracking()
            .SingleOrDefaultAsync(p => p.Id == id && !p.IsDeleted, ct);

        if (permission == null) return NotFound(new { error = "Permission not found" });

        var assignedRoles = await (from rp in db.RolePermissions
                                   join r in db.Roles on rp.RoleId equals r.Id
                                   where rp.PermissionId == permission.Id && !rp.IsDeleted && !r.IsDeleted
                                   select new
                                   {
                                       r.Id,
                                       r.Code,
                                       r.Name,
                                       r.IsSystemRole
                                   }).ToListAsync(ct);

        return Ok(new
        {
            permission.Id,
            permission.Code,
            permission.Name,
            permission.Resource,
            permission.Action,
            permission.CreatedAt,
            permission.UpdatedAt,
            Roles = assignedRoles
        });
    }

    [HttpPost]
    [Authorize(Roles = "SuperAdmin")]
    public async Task<IActionResult> CreatePermission([FromBody] CreatePermissionRequest request, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(request.Code) || string.IsNullOrWhiteSpace(request.Name) ||
            string.IsNullOrWhiteSpace(request.Resource) || string.IsNullOrWhiteSpace(request.Action))
        {
            return BadRequest(new { error = "Code, Name, Resource, and Action are required." });
        }

        var codeNormalized = request.Code.Trim().ToUpper().Replace(" ", "_");
        if (!codeNormalized.StartsWith("CAN_"))
        {
            codeNormalized = $"CAN_{codeNormalized}";
        }

        var exists = await db.Permissions.AnyAsync(p => p.Code == codeNormalized && !p.IsDeleted, ct);
        if (exists)
        {
            return Conflict(new { error = $"Permission with code '{codeNormalized}' already exists." });
        }

        var permission = new Permission
        {
            Id = Guid.NewGuid(),
            Code = codeNormalized,
            Name = request.Name.Trim(),
            Resource = request.Resource.Trim(),
            Action = request.Action.Trim(),
            CreatedAt = DateTimeOffset.UtcNow
        };

        db.Permissions.Add(permission);

        db.AuditLogEntrys.Add(new AuditLogEntry
        {
            Id = Guid.NewGuid(),
            EntityName = "Permission",
            Action = "Created",
            PerformedBy = User.Identity?.Name ?? "system",
            CreatedAt = DateTimeOffset.UtcNow,
            AfterState = System.Text.Json.JsonSerializer.Serialize(new
            {
                permission.Id,
                permission.Code,
                permission.Name,
                permission.Resource,
                permission.Action
            })
        });

        await db.SaveChangesAsync(ct);

        return CreatedAtAction(nameof(GetPermissionById), new { id = permission.Id }, new
        {
            permission.Id,
            permission.Code,
            permission.Name,
            permission.Resource,
            permission.Action,
            permission.CreatedAt
        });
    }

    [HttpPut("{id:guid}")]
    [Authorize(Roles = "SuperAdmin")]
    public async Task<IActionResult> UpdatePermission(Guid id, [FromBody] UpdatePermissionRequest request, CancellationToken ct)
    {
        var permission = await db.Permissions.SingleOrDefaultAsync(p => p.Id == id && !p.IsDeleted, ct);
        if (permission == null) return NotFound(new { error = "Permission not found" });

        var beforeSnapshot = System.Text.Json.JsonSerializer.Serialize(new
        {
            permission.Id,
            permission.Name,
            permission.Resource,
            permission.Action
        });

        if (!string.IsNullOrWhiteSpace(request.Name)) permission.Name = request.Name.Trim();
        if (!string.IsNullOrWhiteSpace(request.Resource)) permission.Resource = request.Resource.Trim();
        if (!string.IsNullOrWhiteSpace(request.Action)) permission.Action = request.Action.Trim();
        permission.UpdatedAt = DateTimeOffset.UtcNow;

        db.AuditLogEntrys.Add(new AuditLogEntry
        {
            Id = Guid.NewGuid(),
            EntityName = "Permission",
            Action = "Updated",
            PerformedBy = User.Identity?.Name ?? "system",
            CreatedAt = DateTimeOffset.UtcNow,
            BeforeState = beforeSnapshot,
            AfterState = System.Text.Json.JsonSerializer.Serialize(new
            {
                permission.Id,
                permission.Name,
                permission.Resource,
                permission.Action
            })
        });

        await db.SaveChangesAsync(ct);

        return Ok(new
        {
            permission.Id,
            permission.Code,
            permission.Name,
            permission.Resource,
            permission.Action,
            permission.UpdatedAt
        });
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "SuperAdmin")]
    public async Task<IActionResult> DeletePermission(Guid id, CancellationToken ct)
    {
        var permission = await db.Permissions.SingleOrDefaultAsync(p => p.Id == id && !p.IsDeleted, ct);
        if (permission == null) return NotFound(new { error = "Permission not found" });

        var isUsedBySystemRole = await (from rp in db.RolePermissions
                                        join r in db.Roles on rp.RoleId equals r.Id
                                        where rp.PermissionId == id && r.IsSystemRole && !r.IsDeleted
                                        select r.Code).AnyAsync(ct);

        if (isUsedBySystemRole)
        {
            return BadRequest(new { error = "Cannot delete permission because it is assigned to one or more protected System Roles." });
        }

        permission.IsDeleted = true;
        permission.UpdatedAt = DateTimeOffset.UtcNow;

        var rolePerms = await db.RolePermissions.Where(rp => rp.PermissionId == id).ToListAsync(ct);
        db.RolePermissions.RemoveRange(rolePerms);

        db.AuditLogEntrys.Add(new AuditLogEntry
        {
            Id = Guid.NewGuid(),
            EntityName = "Permission",
            Action = "Deleted",
            PerformedBy = User.Identity?.Name ?? "system",
            CreatedAt = DateTimeOffset.UtcNow,
            BeforeState = System.Text.Json.JsonSerializer.Serialize(new { permission.Id, permission.Code, permission.Name })
        });

        await db.SaveChangesAsync(ct);

        return NoContent();
    }
}

public record CreatePermissionRequest(
    string Code,
    string Name,
    string Resource,
    string Action
);

public record UpdatePermissionRequest(
    string? Name,
    string? Resource,
    string? Action
);
