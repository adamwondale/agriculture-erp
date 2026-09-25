using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CoreAdmin.API.Services;

namespace CoreAdmin.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(IAuthService auth) : ControllerBase
{
    public record LoginRequest(string Email, string Password);
    public record VerifyMfaRequest(string MfaTicket, string Code);
    public record RefreshTokenRequest(string RefreshToken);

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest req, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrWhiteSpace(req.Password))
        {
            return BadRequest(new { error = "Email and password are required" });
        }

        var result = await auth.LoginAsync(req.Email, req.Password, ct);
        if (!result.IsSuccess)
        {
            return Unauthorized(new { error = result.ErrorMessage ?? "Invalid credentials" });
        }

        if (result.MfaRequired)
        {
            return Ok(new
            {
                mfaRequired = true,
                mfaTicket = result.MfaTicket,
                message = "Two-factor authentication code required.",
                devOtpCode = result.DevOtpCode
            });
        }

        return Ok(new
        {
            mfaRequired = false,
            accessToken = result.Auth!.AccessToken,
            refreshToken = result.Auth.RefreshToken,
            expiresIn = result.Auth.ExpiresIn,
            user = result.Auth.User
        });
    }

    [HttpPost("mfa/verify")]
    public async Task<IActionResult> VerifyMfa([FromBody] VerifyMfaRequest req, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(req.MfaTicket) || string.IsNullOrWhiteSpace(req.Code))
        {
            return BadRequest(new { error = "MfaTicket and verification code are required" });
        }

        var authResponse = await auth.VerifyMfaAsync(req.MfaTicket, req.Code, ct);
        if (authResponse is null)
        {
            return Unauthorized(new { error = "Invalid or expired MFA code" });
        }

        return Ok(new
        {
            accessToken = authResponse.AccessToken,
            refreshToken = authResponse.RefreshToken,
            expiresIn = authResponse.ExpiresIn,
            user = authResponse.User
        });
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest req, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(req.RefreshToken))
        {
            return BadRequest(new { error = "RefreshToken is required" });
        }

        var authResponse = await auth.RefreshTokenAsync(req.RefreshToken, ct);
        if (authResponse is null)
        {
            return Unauthorized(new { error = "Invalid or expired refresh token" });
        }

        return Ok(new
        {
            accessToken = authResponse.AccessToken,
            refreshToken = authResponse.RefreshToken,
            expiresIn = authResponse.ExpiresIn,
            user = authResponse.User
        });
    }

    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> GetCurrentUser(CancellationToken ct)
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier) 
            ?? User.FindFirstValue(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Sub);

        if (!Guid.TryParse(userIdStr, out var userId))
        {
            return Unauthorized(new { error = "User identity not found in token" });
        }

        var profile = await auth.GetCurrentUserProfileAsync(userId, ct);
        if (profile is null)
        {
            return NotFound(new { error = "User not found" });
        }

        return Ok(profile);
    }
}
