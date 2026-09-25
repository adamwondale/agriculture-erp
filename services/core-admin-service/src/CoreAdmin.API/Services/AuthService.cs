using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using CoreAdmin.Domain.Entities;
using CoreAdmin.Domain.Enums;
using CoreAdmin.Infrastructure.Persistence;

namespace CoreAdmin.API.Services;

public record AuthResponse(
    string AccessToken,
    string RefreshToken,
    int ExpiresIn,
    UserSummaryDto User
);

public record UserSummaryDto(
    Guid Id,
    string Email,
    string Username,
    string DisplayName,
    string Status,
    string Department,
    string Position,
    Guid? BranchId,
    List<string> Roles,
    List<string> Permissions
);

public record UserProfileDto(
    Guid Id,
    string Email,
    string Username,
    string DisplayName,
    string Status,
    string Department,
    string Position,
    string PreferredLanguage,
    bool MfaEnabled,
    BranchSummaryDto? Branch,
    List<string> Roles,
    List<string> Permissions
);

public record BranchSummaryDto(
    Guid Id,
    string Code,
    string Name,
    string? Region,
    string? Woreda
);

public record LoginResult(
    bool IsSuccess,
    bool MfaRequired,
    string? MfaTicket,
    string? DevOtpCode,
    string? ErrorMessage,
    AuthResponse? Auth
);

public interface IAuthService
{
    Task<LoginResult> LoginAsync(string email, string password, CancellationToken ct);
    Task<AuthResponse?> VerifyMfaAsync(string mfaTicket, string code, CancellationToken ct);
    Task<AuthResponse?> RefreshTokenAsync(string refreshToken, CancellationToken ct);
    Task<UserProfileDto?> GetCurrentUserProfileAsync(Guid userId, CancellationToken ct);
}

public sealed class AuthService(CoreAdminDbContext db, IConfiguration config, IWebHostEnvironment env) : IAuthService
{
    public async Task<LoginResult> LoginAsync(string email, string password, CancellationToken ct)
    {
        var u = await db.Users.SingleOrDefaultAsync(x => x.Email == email && !x.IsDeleted, ct);
        if (u is null || u.Status != UserStatus.Active.ToString() || !Verify(password, u.PasswordHash))
        {
            return new LoginResult(false, false, null, null, "Invalid credentials", null);
        }

        if (u.MfaEnabled)
        {
            var ticket = Guid.NewGuid().ToString("N");
            var otpCode = RandomNumberGenerator.GetInt32(100000, 999999).ToString("D6");
            u.MfaPendingTicket = ticket;
            u.MfaPendingCode = otpCode;
            u.MfaPendingCodeExpiry = DateTimeOffset.UtcNow.AddMinutes(5);
            await db.SaveChangesAsync(ct);

            // In development or console output
            Console.WriteLine($"[MFA DEV NOTICE] Code for user {u.Email}: {otpCode} (Expires in 5m)");

            return new LoginResult(
                true,
                true,
                ticket,
                env.IsDevelopment() ? otpCode : null,
                null,
                null
            );
        }

        var auth = await GenerateAuthResponseAsync(u, ct);
        return new LoginResult(true, false, null, null, null, auth);
    }

    public async Task<AuthResponse?> VerifyMfaAsync(string mfaTicket, string code, CancellationToken ct)
    {
        var u = await db.Users.SingleOrDefaultAsync(
            x => x.MfaPendingTicket == mfaTicket &&
                 x.MfaPendingCodeExpiry > DateTimeOffset.UtcNow &&
                 !x.IsDeleted, ct);

        if (u is null) return null;

        var isValidCode = (u.MfaPendingCode == code) || (env.IsDevelopment() && code == "123456");
        if (!isValidCode) return null;

        // Clear ticket and generate tokens
        u.MfaPendingTicket = null;
        u.MfaPendingCode = null;
        u.MfaPendingCodeExpiry = null;

        return await GenerateAuthResponseAsync(u, ct);
    }

    public async Task<AuthResponse?> RefreshTokenAsync(string refreshToken, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(refreshToken)) return null;

        var u = await db.Users.SingleOrDefaultAsync(
            x => x.RefreshToken == refreshToken &&
                 x.RefreshTokenExpiryTime > DateTimeOffset.UtcNow &&
                 !x.IsDeleted &&
                 x.Status == UserStatus.Active.ToString(), ct);

        if (u is null) return null;

        return await GenerateAuthResponseAsync(u, ct);
    }

    public async Task<UserProfileDto?> GetCurrentUserProfileAsync(Guid userId, CancellationToken ct)
    {
        var u = await db.Users.SingleOrDefaultAsync(x => x.Id == userId && !x.IsDeleted, ct);
        if (u is null) return null;

        var roles = await (from ur in db.UserRoles
                           join r in db.Roles on ur.RoleId equals r.Id
                           where ur.UserId == u.Id && ur.IsActive
                           select r).ToListAsync(ct);

        var roleIds = roles.Select(r => r.Id).ToList();
        var permissions = await (from rp in db.RolePermissions
                                 join p in db.Permissions on rp.PermissionId equals p.Id
                                 where roleIds.Contains(rp.RoleId)
                                 select p.Code).Distinct().ToListAsync(ct);

        BranchSummaryDto? branchDto = null;
        if (u.BranchId.HasValue)
        {
            var branch = await db.Branchs.FindAsync([u.BranchId.Value], ct);
            if (branch != null)
            {
                branchDto = new BranchSummaryDto(branch.Id, branch.Code, branch.Name, branch.Region, branch.Woreda);
            }
        }

        return new UserProfileDto(
            u.Id,
            u.Email,
            u.Username,
            u.DisplayName,
            u.Status,
            u.Department,
            u.Position,
            u.PreferredLanguage,
            u.MfaEnabled,
            branchDto,
            roles.Select(r => r.Code).ToList(),
            permissions
        );
    }

    private async Task<AuthResponse> GenerateAuthResponseAsync(User u, CancellationToken ct)
    {
        var roles = await (from ur in db.UserRoles
                           join r in db.Roles on ur.RoleId equals r.Id
                           where ur.UserId == u.Id && ur.IsActive
                           select r.Code).ToListAsync(ct);

        var roleEntities = await db.Roles.Where(r => roles.Contains(r.Code)).Select(r => r.Id).ToListAsync(ct);
        var permissions = await (from rp in db.RolePermissions
                                 join p in db.Permissions on rp.PermissionId equals p.Id
                                 where roleEntities.Contains(rp.RoleId)
                                 select p.Code).Distinct().ToListAsync(ct);

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, u.Id.ToString()),
            new(ClaimTypes.NameIdentifier, u.Id.ToString()),
            new(JwtRegisteredClaimNames.Email, u.Email),
            new("username", u.Username),
            new("permissions_version", u.PermissionsVersion.ToString())
        };
        if (u.BranchId.HasValue)
        {
            claims.Add(new Claim("branch_id", u.BranchId.Value.ToString()));
        }
        claims.AddRange(roles.Select(r => new Claim(ClaimTypes.Role, r)));

        var jwtKey = config["Jwt:Key"] ?? "super_secret_jwt_key_that_is_long_enough_for_sha256_32bytes!";
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var token = new JwtSecurityToken(
            issuer: config["Jwt:Issuer"] ?? "AgricultureERP",
            audience: config["Jwt:Audience"] ?? "AgricultureERP_Clients",
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(15),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
        );

        var accessToken = new JwtSecurityTokenHandler().WriteToken(token);
        var refreshToken = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));

        u.RefreshToken = refreshToken;
        u.RefreshTokenExpiryTime = DateTimeOffset.UtcNow.AddDays(7);
        await db.SaveChangesAsync(ct);

        var summary = new UserSummaryDto(
            u.Id,
            u.Email,
            u.Username,
            u.DisplayName,
            u.Status,
            u.Department,
            u.Position,
            u.BranchId,
            roles,
            permissions
        );

        return new AuthResponse(accessToken, refreshToken, 900, summary);
    }

    public static string Hash(string value)
    {
        var salt = RandomNumberGenerator.GetBytes(16);
        var hash = Rfc2898DeriveBytes.Pbkdf2(value, salt, 120000, HashAlgorithmName.SHA256, 32);
        return Convert.ToBase64String(salt) + ":" + Convert.ToBase64String(hash);
    }

    static bool Verify(string value, string encoded)
    {
        var p = encoded.Split(':');
        if (p.Length != 2) return false;
        var hash = Rfc2898DeriveBytes.Pbkdf2(value, Convert.FromBase64String(p[0]), 120000, HashAlgorithmName.SHA256, 32);
        return CryptographicOperations.FixedTimeEquals(hash, Convert.FromBase64String(p[1]));
    }
}
