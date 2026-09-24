using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;
using CoreAdmin.Domain.Entities;
using CoreAdmin.Domain.Enums;
using CoreAdmin.Infrastructure.Persistence;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace CoreAdmin.IntegrationTests;

public class BranchControllerTests : IClassFixture<CustomWebApplicationFactory<Program>>
{
    private readonly CustomWebApplicationFactory<Program> _factory;

    public BranchControllerTests(CustomWebApplicationFactory<Program> factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task GetAll_WithoutToken_ReturnsUnauthorized()
    {
        var client = _factory.CreateClient();
        var response = await client.GetAsync("/api/branch");

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    private async Task<HttpClient> GetAuthenticatedClientAsync()
    {
        var password = "SecurePassword123!";
        var email = $"admin_{Guid.NewGuid()}@example.com";
        var user = new User
        {
            Email = email,
            Username = "admin",
            PasswordHash = CoreAdmin.API.Services.AuthService.Hash(password),
            Status = UserStatus.Active.ToString(),
            OrganizationId = Guid.NewGuid()
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
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadFromJsonAsync<System.Text.Json.JsonElement>();
        var token = content.GetProperty("accessToken").GetString();

        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        return client;
    }

    [Fact]
    public async Task Create_And_GetAll_WithValidToken_ReturnsSuccess()
    {
        var client = await GetAuthenticatedClientAsync();

        var newBranch = new Branch
        {
            Code = $"B{Guid.NewGuid().ToString().Substring(0, 4)}",
            Name = "Main Branch",
            OrganizationId = Guid.NewGuid(),
            Status = BranchStatus.Active,
            Region = "Addis Ababa",
            Zone = "Bole",
            Woreda = "W01",
            Kebele = "K01"
        };

        var createResponse = await client.PostAsJsonAsync("/api/branch", newBranch);
        Assert.Equal(HttpStatusCode.Created, createResponse.StatusCode);

        var getResponse = await client.GetAsync("/api/branch");
        Assert.Equal(HttpStatusCode.OK, getResponse.StatusCode);

        var branches = await getResponse.Content.ReadFromJsonAsync<System.Text.Json.JsonElement>();
        Assert.True(branches.GetArrayLength() > 0);
    }
}
