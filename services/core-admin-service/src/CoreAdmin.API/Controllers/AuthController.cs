using Microsoft.AspNetCore.Mvc; using CoreAdmin.API.Services;
namespace CoreAdmin.API.Controllers;
[ApiController][Route("api/auth")]
public class AuthController(IAuthService auth):ControllerBase { public record LoginRequest(string Email,string Password); [HttpPost("login")] public async Task<IActionResult> Login(LoginRequest req,CancellationToken ct){var r=await auth.LoginAsync(req.Email,req.Password,ct); return r is null ? Unauthorized(new{error="Invalid credentials"}) : Ok(new { accessToken=r.Value.Token, expiresIn=900, user=new {r.Value.User.Id,r.Value.User.Email,r.Value.User.Status} });} }
