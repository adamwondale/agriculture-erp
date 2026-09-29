using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using CoreAdmin.Domain.Entities;
using CoreAdmin.Domain.Enums;
using CoreAdmin.Infrastructure.Persistence;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace CoreAdmin.IntegrationTests;

public class RolesAndPermissionsTests(CustomWebApplicationFactory<Program> factory) : IClassFixture<CustomWebApplicationFactory<Program>>
{
    private async Task<HttpClient> GetSuperAdminClientAsync()
    {
        var password = "SuperAdminPassword123!";
        var email = $"superadmin_{Guid.NewGuid()}@coop.ag";
        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = email,
            Username = "superadmin_test",
            DisplayName = "Test SuperAdmin",
            PasswordHash = API.Services.AuthService.Hash(password),
            Status = UserStatus.Active.ToString(),
            OrganizationId = Guid.NewGuid()
        };

        var client = factory.CreateClient();

        using (var scope = factory.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<CoreAdminDbContext>();

            var superAdminRole = db.Roles.FirstOrDefault(r => r.Code == "SuperAdmin");
            if (superAdminRole == null)
            {
                superAdminRole = new Role
                {
                    Id = Guid.NewGuid(),
                    Code = "SuperAdmin",
                    Name = "Super Administrator",
                    Description = "Super Administrator with full platform governance",
                    IsSystemRole = true,
                    RequiresMfa = true
                };
                db.Roles.Add(superAdminRole);
            }

            db.Users.Add(user);
            db.UserRoles.Add(new UserRole
            {
                Id = Guid.NewGuid(),
                UserId = user.Id,
                RoleId = superAdminRole.Id,
                ValidFrom = DateTimeOffset.UtcNow,
                IsActive = true
            });
            db.SaveChanges();
        }
        var response = await client.PostAsJsonAsync("/api/auth/login", new { Email = email, Password = password });
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadFromJsonAsync<JsonElement>();
        var token = content.GetProperty("accessToken").GetString();

        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        return client;
    }

    [Fact]
    public async Task ListRoles_ReturnsSeededSpecificationRoles()
    {
        var client = await GetSuperAdminClientAsync();
        var response = await client.GetAsync("/api/admin/roles");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var roles = await response.Content.ReadFromJsonAsync<List<JsonElement>>();
        Assert.NotNull(roles);
        Assert.True(roles.Count >= 17);

        var codes = roles.Select(r => r.GetProperty("code").GetString()).ToList();
        Assert.Contains("SuperAdmin", codes);
        Assert.Contains("ExecutiveLeadership", codes);
        Assert.Contains("OperationsDirector", codes);
        Assert.Contains("FarmingOperationsManager", codes);
        Assert.Contains("ResearchAgronomyManager", codes);
        Assert.Contains("WarehouseManager", codes);
        Assert.Contains("FinanceStaff", codes);
        Assert.Contains("HRStaff", codes);
        Assert.Contains("PartnershipTeam", codes);
        Assert.Contains("ITAdmin", codes);
        Assert.Contains("InternalAuditor", codes);
        Assert.Contains("Agronomist", codes);
        Assert.Contains("FieldOfficer", codes);
        Assert.Contains("ContractFarmer", codes);
        Assert.Contains("CommercialPartner", codes);
        Assert.Contains("Buyer", codes);
        Assert.Contains("LogisticsDriver", codes);
    }

    [Fact]
    public async Task ListPermissions_ReturnsGranularCrudPermissions()
    {
        var client = await GetSuperAdminClientAsync();
        var response = await client.GetAsync("/api/admin/permissions");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var permissions = await response.Content.ReadFromJsonAsync<List<JsonElement>>();
        Assert.NotNull(permissions);
        Assert.True(permissions.Count >= 60);

        var codes = permissions.Select(p => p.GetProperty("code").GetString()).ToList();
        Assert.Contains("CAN_READ_USERS", codes);
        Assert.Contains("CAN_WRITE_USERS", codes);
        Assert.Contains("CAN_UPDATE_USERS", codes);
        Assert.Contains("CAN_DELETE_USERS", codes);
        Assert.Contains("CAN_READ_FARMS", codes);
        Assert.Contains("CAN_INSPECT_FIELDS", codes);
        Assert.Contains("CAN_SCOUT_CROPS", codes);
        Assert.Contains("CAN_MAP_PARCELS", codes);
        Assert.Contains("CAN_REGISTER_FARMERS", codes);
        Assert.Contains("CAN_APPROVE_FINANCE", codes);
        Assert.Contains("CAN_APPROVE_AUDIT", codes);
    }

    [Fact]
    public async Task Create_Update_And_Delete_CustomRole_Workflow()
    {
        var client = await GetSuperAdminClientAsync();

        // 1. Get some permissions
        var permResponse = await client.GetAsync("/api/admin/permissions?resource=Agronomy");
        var perms = await permResponse.Content.ReadFromJsonAsync<List<JsonElement>>();
        Assert.NotNull(perms);
        var permIds = perms.Take(2).Select(p => p.GetProperty("id").GetGuid()).ToList();

        // 2. Create Custom Role
        var roleCode = $"Specialist_{Guid.NewGuid():N}"[..18];
        var createReq = new
        {
            Code = roleCode,
            Name = "Soil & Water Specialist",
            Description = "Custom specialist role for irrigation monitoring",
            RequiresMfa = false,
            PermissionIds = permIds
        };

        var createResponse = await client.PostAsJsonAsync("/api/admin/roles", createReq);
        Assert.Equal(HttpStatusCode.Created, createResponse.StatusCode);

        var createdRole = await createResponse.Content.ReadFromJsonAsync<JsonElement>();
        var roleId = createdRole.GetProperty("id").GetGuid();
        Assert.Equal(roleCode, createdRole.GetProperty("code").GetString());

        // 3. Update Custom Role
        var updateReq = new
        {
            Name = "Senior Soil & Water Specialist",
            Description = "Updated description with MFA requirement",
            RequiresMfa = true,
            PermissionIds = permIds
        };

        var updateResponse = await client.PutAsJsonAsync($"/api/admin/roles/{roleId}", updateReq);
        Assert.Equal(HttpStatusCode.OK, updateResponse.StatusCode);

        var updatedRole = await updateResponse.Content.ReadFromJsonAsync<JsonElement>();
        Assert.Equal("Senior Soil & Water Specialist", updatedRole.GetProperty("name").GetString());
        Assert.True(updatedRole.GetProperty("requiresMfa").GetBoolean());

        // 4. Delete Custom Role
        var deleteResponse = await client.DeleteAsync($"/api/admin/roles/{roleId}");
        Assert.Equal(HttpStatusCode.NoContent, deleteResponse.StatusCode);

        // 5. Verify it is gone
        var getResponse = await client.GetAsync($"/api/admin/roles/{roleId}");
        Assert.Equal(HttpStatusCode.NotFound, getResponse.StatusCode);
    }

    [Fact]
    public async Task DeleteSystemRole_ReturnsBadRequest()
    {
        var client = await GetSuperAdminClientAsync();
        var listResponse = await client.GetAsync("/api/admin/roles");
        var roles = await listResponse.Content.ReadFromJsonAsync<List<JsonElement>>();
        var superAdmin = roles!.First(r => r.GetProperty("code").GetString() == "SuperAdmin");
        var superAdminId = superAdmin.GetProperty("id").GetGuid();

        var deleteResponse = await client.DeleteAsync($"/api/admin/roles/{superAdminId}");
        Assert.Equal(HttpStatusCode.BadRequest, deleteResponse.StatusCode);
    }

    [Fact]
    public async Task AssignUserRole_And_PermissionOverride_Workflow()
    {
        var client = await GetSuperAdminClientAsync();

        // 1. Create a user
        var userEmail = $"user_rbac_{Guid.NewGuid()}@example.com";
        var createResponse = await client.PostAsJsonAsync("/api/admin/users", new
        {
            Email = userEmail,
            Username = "rbac_user",
            TemporaryPassword = "TempPassword123!",
            DisplayName = "RBAC Test Operator"
        });
        Assert.Equal(HttpStatusCode.Created, createResponse.StatusCode);
        var createdUser = await createResponse.Content.ReadFromJsonAsync<JsonElement>();
        var userId = createdUser.GetProperty("id").GetGuid();

        // 2. Fetch Agronomist role
        var rolesResponse = await client.GetAsync("/api/admin/roles");
        var roles = await rolesResponse.Content.ReadFromJsonAsync<List<JsonElement>>();
        var agronomistRole = roles!.First(r => r.GetProperty("code").GetString() == "Agronomist");
        var agronomistRoleId = agronomistRole.GetProperty("id").GetGuid();

        // 3. Assign Agronomist role to user
        var assignResponse = await client.PostAsJsonAsync($"/api/admin/users/{userId}/roles", new
        {
            RoleId = agronomistRoleId
        });
        Assert.Equal(HttpStatusCode.OK, assignResponse.StatusCode);

        // 4. Verify user has Agronomist role & CAN_INSPECT_FIELDS
        var userPermsResponse = await client.GetAsync($"/api/admin/users/{userId}/permissions");
        Assert.Equal(HttpStatusCode.OK, userPermsResponse.StatusCode);
        var userPerms = await userPermsResponse.Content.ReadFromJsonAsync<JsonElement>();
        var permList = userPerms.GetProperty("permissions").EnumerateArray().Select(p => p.GetString()).ToList();
        Assert.Contains("CAN_INSPECT_FIELDS", permList);

        // 5. Apply a Deny Permission Override on CAN_INSPECT_FIELDS
        var overrideResponse = await client.PostAsJsonAsync($"/api/admin/users/{userId}/permission-overrides", new
        {
            PermissionCode = "CAN_INSPECT_FIELDS",
            Effect = "Deny",
            Reason = "Temporary suspension of inspection privileges during audit"
        });
        Assert.Equal(HttpStatusCode.OK, overrideResponse.StatusCode);

        // 6. Verify CAN_INSPECT_FIELDS is now revoked in effective permissions
        var updatedPermsResponse = await client.GetAsync($"/api/admin/users/{userId}/permissions");
        var updatedPerms = await updatedPermsResponse.Content.ReadFromJsonAsync<JsonElement>();
        var updatedPermList = updatedPerms.GetProperty("permissions").EnumerateArray().Select(p => p.GetString()).ToList();
        Assert.DoesNotContain("CAN_INSPECT_FIELDS", updatedPermList);

        // 7. Revoke role from user
        var revokeResponse = await client.DeleteAsync($"/api/admin/users/{userId}/roles/{agronomistRoleId}");
        Assert.Equal(HttpStatusCode.NoContent, revokeResponse.StatusCode);
    }
}
