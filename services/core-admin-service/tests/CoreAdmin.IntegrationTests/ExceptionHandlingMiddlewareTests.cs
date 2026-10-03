using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Xunit;

namespace CoreAdmin.IntegrationTests;

public class ExceptionHandlingMiddlewareTests : IClassFixture<CustomWebApplicationFactory<Program>>
{
    private readonly CustomWebApplicationFactory<Program> _factory;

    public ExceptionHandlingMiddlewareTests(CustomWebApplicationFactory<Program> factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task UnhandledException_ReturnsInternalServerError_WithoutLeakingExceptionDetails()
    {
        const string sensitiveExceptionMessage = "SECRET_DATABASE_CONNECTION_FAILED_SELECT_SENSITIVE_TABLE";

        var factoryWithException = _factory.WithWebHostBuilder(builder =>
        {
            builder.Configure(app =>
            {
                app.UseMiddleware<CoreAdmin.API.Middleware.ExceptionHandlingMiddleware>();
                app.Run(_ => throw new System.InvalidOperationException(sensitiveExceptionMessage));
            });
        });

        var client = factoryWithException.CreateClient();
        var response = await client.GetAsync("/trigger-exception");

        Assert.Equal(HttpStatusCode.InternalServerError, response.StatusCode);

        var content = await response.Content.ReadAsStringAsync();
        Assert.DoesNotContain(sensitiveExceptionMessage, content);

        using var doc = JsonDocument.Parse(content);
        var root = doc.RootElement;
        Assert.True(root.TryGetProperty("error", out var errorElement));
        Assert.Equal("An unexpected error occurred. Please try again later.", errorElement.GetString());
        Assert.True(root.TryGetProperty("service", out var serviceElement));
        Assert.Equal("CoreAdmin.API", serviceElement.GetString());
    }
}
