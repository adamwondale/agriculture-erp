using System.Net;
using Xunit;
using Microsoft.AspNetCore.Mvc.Testing;

namespace CoreAdmin.IntegrationTests;

public class HealthEndpointTests : IClassFixture<CustomWebApplicationFactory<Program>>
{
    private readonly CustomWebApplicationFactory<Program> _factory;

    public HealthEndpointTests(CustomWebApplicationFactory<Program> factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task Health_Check_Should_Return_Ok()
    {
        var client = _factory.CreateClient();
        var response = await client.GetAsync("/health");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}
