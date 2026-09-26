using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using CoreAdmin.Domain.Entities;
using CoreAdmin.Domain.Enums;
using CoreAdmin.Infrastructure.Persistence;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace CoreAdmin.IntegrationTests;

public class AuthControllerTests : IClassFixture<CustomWebApplicationFactory<Program>>
{
    private readonly CustomWebApplicationFactory<Program> _factory;

    public AuthControllerTests(CustomWebApplicationFactory<Program> factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task Login_WithInvalidCredentials_ReturnsUnauthorized()
    {
        var client = _factory.CreateClient();
        var response = await client.PostAsJsonAsync("/api/auth/login", new { Email = "invalid@example.com", Password = "wrongpassword" });

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task Login_WithValidCredentials_ReturnsOkAndToken()
    {
        var password = "SecurePassword123!";
        var email = "testuser@example.com";
        var user = new User
        {
            Email = email,
            Username = "testuser",
            PasswordHash = CoreAdmin.API.Services.AuthService.Hash(password),
            Status = UserStatus.Active.ToString(),
            OrganizationId = System.Guid.NewGuid()
        };

        var factoryWithData = _factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                var sp = services.BuildServiceProvider();
                using var scope = sp.CreateScope();
                var db = scope.ServiceProvider.GetRequiredService<CoreAdminDbContext>();
                db.Users.Add(user);
                db.SaveChanges();
            });
        });

        var client = factoryWithData.CreateClient();
        var response = await client.PostAsJsonAsync("/api/auth/login", new { Email = email, Password = password });

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var content = await response.Content.ReadFromJsonAsync<System.Text.Json.JsonElement>();
        Assert.True(content.TryGetProperty("accessToken", out var token));
        Assert.False(string.IsNullOrEmpty(token.GetString()));
        Assert.True(content.TryGetProperty("refreshToken", out var refreshToken));
        Assert.False(string.IsNullOrEmpty(refreshToken.GetString()));
    }

    [Fact]
    public async Task Login_WithMfaEnabled_ReturnsMfaChallenge()
    {
        var password = "SecurePassword123!";
        var email = "mfa_user@example.com";
        var user = new User
        {
            Email = email,
            Username = "mfa_user",
            PasswordHash = CoreAdmin.API.Services.AuthService.Hash(password),
            Status = UserStatus.Active.ToString(),
            OrganizationId = System.Guid.NewGuid(),
            MfaEnabled = true
        };

        var factoryWithData = _factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                var sp = services.BuildServiceProvider();
                using var scope = sp.CreateScope();
                var db = scope.ServiceProvider.GetRequiredService<CoreAdminDbContext>();
                db.Users.Add(user);
                db.SaveChanges();
            });
        });

        var client = factoryWithData.CreateClient();
        var response = await client.PostAsJsonAsync("/api/auth/login", new { Email = email, Password = password });

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var content = await response.Content.ReadFromJsonAsync<System.Text.Json.JsonElement>();
        Assert.True(content.GetProperty("mfaRequired").GetBoolean());
        Assert.True(content.TryGetProperty("mfaTicket", out var ticket));
        Assert.False(string.IsNullOrEmpty(ticket.GetString()));
    }

    [Fact]
    public async Task VerifyMfa_WithValidCode_ReturnsTokens()
    {
        var email = "verify_mfa@example.com";
        var ticket = "test-mfa-ticket-123";
        var otpCode = "654321";
        var user = new User
        {
            Email = email,
            Username = "verify_mfa",
            PasswordHash = CoreAdmin.API.Services.AuthService.Hash("Pass!"),
            Status = UserStatus.Active.ToString(),
            OrganizationId = System.Guid.NewGuid(),
            MfaEnabled = true,
            MfaPendingTicket = ticket,
            MfaPendingCode = otpCode,
            MfaPendingCodeExpiry = System.DateTimeOffset.UtcNow.AddMinutes(5)
        };

        var factoryWithData = _factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                var sp = services.BuildServiceProvider();
                using var scope = sp.CreateScope();
                var db = scope.ServiceProvider.GetRequiredService<CoreAdminDbContext>();
                db.Users.Add(user);
                db.SaveChanges();
            });
        });

        var client = factoryWithData.CreateClient();
        var response = await client.PostAsJsonAsync("/api/auth/mfa/verify", new { MfaTicket = ticket, Code = otpCode });

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var content = await response.Content.ReadFromJsonAsync<System.Text.Json.JsonElement>();
        Assert.True(content.TryGetProperty("accessToken", out var token));
        Assert.False(string.IsNullOrEmpty(token.GetString()));
        Assert.True(content.TryGetProperty("refreshToken", out var refreshToken));
        Assert.False(string.IsNullOrEmpty(refreshToken.GetString()));
    }

    [Fact]
    public async Task RefreshToken_WithValidToken_ReturnsNewTokens()
    {
        var email = "refresh_user@example.com";
        var currentRefreshToken = "valid-refresh-token-xyz";
        var user = new User
        {
            Email = email,
            Username = "refresh_user",
            PasswordHash = CoreAdmin.API.Services.AuthService.Hash("Pass!"),
            Status = UserStatus.Active.ToString(),
            OrganizationId = System.Guid.NewGuid(),
            RefreshToken = currentRefreshToken,
            RefreshTokenExpiryTime = System.DateTimeOffset.UtcNow.AddDays(7)
        };

        var factoryWithData = _factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                var sp = services.BuildServiceProvider();
                using var scope = sp.CreateScope();
                var db = scope.ServiceProvider.GetRequiredService<CoreAdminDbContext>();
                db.Users.Add(user);
                db.SaveChanges();
            });
        });

        var client = factoryWithData.CreateClient();
        var response = await client.PostAsJsonAsync("/api/auth/refresh", new { RefreshToken = currentRefreshToken });

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var content = await response.Content.ReadFromJsonAsync<System.Text.Json.JsonElement>();
        Assert.True(content.TryGetProperty("accessToken", out var token));
        Assert.False(string.IsNullOrEmpty(token.GetString()));
        Assert.True(content.TryGetProperty("refreshToken", out var newRefreshToken));
        Assert.False(string.IsNullOrEmpty(newRefreshToken.GetString()));
    }
}

