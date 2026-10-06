using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;
using CoreAdmin.API.Controllers;
using CoreAdmin.Domain.Entities;
using CoreAdmin.Domain.Enums;
using CoreAdmin.Infrastructure.Persistence;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace CoreAdmin.IntegrationTests;

public class UsersControllerTests : IClassFixture<CustomWebApplicationFactory<Program>>
{
    private readonly CustomWebApplicationFactory<Program> _factory;

    public UsersControllerTests(CustomWebApplicationFactory<Program> factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task List_WithoutToken_ReturnsUnauthorized()
    {
        var client = _factory.CreateClient();
        var response = await client.GetAsync("/api/admin/users");

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    private async Task<HttpClient> GetAuthenticatedClientAsync(bool isSuperAdmin = true)
    {
        var password = "SecurePassword123!";
        var email = $"user_{Guid.NewGuid()}@example.com";
        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = email,
            Username = "user",
            PasswordHash = CoreAdmin.API.Services.AuthService.Hash(password),
            Status = UserStatus.Active.ToString(),
            OrganizationId = Guid.NewGuid()
        };

        var client = _factory.CreateClient();

        using (var scope = _factory.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<CoreAdminDbContext>();
            db.Users.Add(user);

            if (isSuperAdmin)
            {
                var superAdminRole = System.Linq.Enumerable.FirstOrDefault(db.Roles, r => r.Code == "SuperAdmin");
                if (superAdminRole == null)
                {
                    superAdminRole = new Role
                    {
                        Id = Guid.NewGuid(),
                        Code = "SuperAdmin",
                        Name = "Super Administrator",
                        Description = "Super Administrator",
                        IsSystemRole = true,
                        RequiresMfa = false
                    };
                    db.Roles.Add(superAdminRole);
                }

                db.UserRoles.Add(new UserRole
                {
                    Id = Guid.NewGuid(),
                    UserId = user.Id,
                    RoleId = superAdminRole.Id,
                    ValidFrom = DateTimeOffset.UtcNow,
                    IsActive = true
                });
            }

            db.SaveChanges();
        }

        var response = await client.PostAsJsonAsync("/api/auth/login", new { Email = email, Password = password });
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadFromJsonAsync<System.Text.Json.JsonElement>();
        var token = content.GetProperty("accessToken").GetString();

        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        return client;
    }

    [Fact]
    public async Task Create_And_List_WithValidToken_ReturnsSuccess()
    {
        var client = await GetAuthenticatedClientAsync(isSuperAdmin: true);

        var newUserEmail = $"newuser_{Guid.NewGuid()}@example.com";
        var createRequest = new UsersController.CreateUserRequest(newUserEmail, "newuser", "TempPass123!", false);

        var createResponse = await client.PostAsJsonAsync("/api/admin/users", createRequest);
        Assert.Equal(HttpStatusCode.Created, createResponse.StatusCode);

        var createdContent = await createResponse.Content.ReadFromJsonAsync<System.Text.Json.JsonElement>();
        Assert.Equal("Pending", createdContent.GetProperty("status").GetString());
        var newUserId = createdContent.GetProperty("id").GetGuid();

        var listResponse = await client.GetAsync("/api/admin/users");
        Assert.Equal(HttpStatusCode.OK, listResponse.StatusCode);

        var users = await listResponse.Content.ReadFromJsonAsync<System.Text.Json.JsonElement>();
        Assert.True(users.GetArrayLength() > 0);

        var activateResponse = await client.PatchAsync($"/api/admin/users/{newUserId}/activate", null);
        Assert.Equal(HttpStatusCode.OK, activateResponse.StatusCode);

        var activatedContent = await activateResponse.Content.ReadFromJsonAsync<System.Text.Json.JsonElement>();
        Assert.Equal("Active", activatedContent.GetProperty("status").GetString());
    }

    [Fact]
    public async Task Create_And_Activate_AsNonSuperAdmin_ReturnsForbidden()
    {
        var nonAdminClient = await GetAuthenticatedClientAsync(isSuperAdmin: false);

        var newUserEmail = $"unauthuser_{Guid.NewGuid()}@example.com";
        var createRequest = new UsersController.CreateUserRequest(newUserEmail, "unauthuser", "TempPass123!", false);

        var createResponse = await nonAdminClient.PostAsJsonAsync("/api/admin/users", createRequest);
        Assert.Equal(HttpStatusCode.Forbidden, createResponse.StatusCode);

        var dummyUserId = Guid.NewGuid();
        var activateResponse = await nonAdminClient.PatchAsync($"/api/admin/users/{dummyUserId}/activate", null);
        Assert.Equal(HttpStatusCode.Forbidden, activateResponse.StatusCode);
    }
}
