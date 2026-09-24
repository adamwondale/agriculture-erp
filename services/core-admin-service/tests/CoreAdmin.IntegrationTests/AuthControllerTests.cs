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
    }
}
