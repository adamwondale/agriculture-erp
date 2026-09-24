using Microsoft.AspNetCore.Authorization; using Microsoft.AspNetCore.Mvc; using CoreAdmin.Domain.Entities; using CoreAdmin.Infrastructure.Persistence; using Microsoft.EntityFrameworkCore; using CoreAdmin.API.Services; using CoreAdmin.Domain.Enums;
namespace CoreAdmin.API.Controllers;
[ApiController][Route("api/admin/users")][Authorize]
public class UsersController(CoreAdminDbContext db):ControllerBase {
 [HttpGet] public async Task<IActionResult> List(CancellationToken ct)=>Ok(await db.Users.AsNoTracking().Where(x=>!x.IsDeleted).Select(x=>new {x.Id,x.Email,x.Username,x.Status,x.MfaEnabled,x.PreferredLanguage}).ToListAsync(ct));
 [HttpPost] public async Task<IActionResult> Create(CreateUserRequest req,CancellationToken ct){if(await db.Users.AnyAsync(x=>x.Email==req.Email,ct)) return Conflict(new{error="Email already exists"}); var u=new User{Email=req.Email,Username=req.Username,PasswordHash=AuthService.Hash(req.TemporaryPassword),Status=UserStatus.Pending.ToString(),MfaEnabled=req.MfaRequired}; db.Users.Add(u); db.AuditLogEntrys.Add(new AuditLogEntry{EntityName="User",Action="Created",PerformedBy=User.Identity?.Name??"system",AfterState=System.Text.Json.JsonSerializer.Serialize(new{u.Id,u.Email,u.Status})}); await db.SaveChangesAsync(ct); return Created($"/api/admin/users/{u.Id}",new {u.Id,u.Email,u.Status}); }
 [HttpPatch("{id:guid}/activate")] public async Task<IActionResult> Activate(Guid id,CancellationToken ct){var u=await db.Users.FindAsync([id],ct);if(u is null)return NotFound();u.Status=UserStatus.Active.ToString();u.UpdatedAt=DateTimeOffset.UtcNow;await db.SaveChangesAsync(ct);return Ok(new{u.Id,u.Status});}
 public record CreateUserRequest(string Email,string Username,string TemporaryPassword,bool MfaRequired=false);
}



