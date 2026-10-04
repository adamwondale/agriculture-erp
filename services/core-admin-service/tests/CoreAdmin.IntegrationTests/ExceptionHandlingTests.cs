using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using CoreAdmin.API.Middleware;
using Xunit;

namespace CoreAdmin.IntegrationTests;

public class ExceptionHandlingTests
{
    [Fact]
    public async Task ExceptionHandlingMiddleware_Should_Mask_Exception_Details_In_Response()
    {
        using var host = await new HostBuilder()
            .ConfigureWebHost(webBuilder =>
            {
                webBuilder
                    .UseTestServer()
                    .ConfigureServices(services =>
                    {
                        services.AddLogging();
                        services.AddRouting();
                    })
                    .Configure(app =>
                    {
                        app.UseMiddleware<ExceptionHandlingMiddleware>();
                        app.Run(context => throw new InvalidOperationException("Sensitive internal database connection failed with secret password"));
                    });
            })
            .StartAsync();

        var client = host.GetTestClient();
        var response = await client.GetAsync("/");

        Assert.Equal(HttpStatusCode.InternalServerError, response.StatusCode);

        var json = await response.Content.ReadAsStringAsync();
        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;

        Assert.True(root.TryGetProperty("error", out var errorProp));
        Assert.Equal("An internal error occurred.", errorProp.GetString());
        Assert.DoesNotContain("Sensitive internal database connection failed with secret password", json);
    }
}
