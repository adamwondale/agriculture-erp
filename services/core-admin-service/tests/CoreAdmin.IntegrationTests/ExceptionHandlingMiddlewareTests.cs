using System.IO;
using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging.Abstractions;
using Xunit;
using CoreAdmin.API.Middleware;

namespace CoreAdmin.IntegrationTests;

public class ExceptionHandlingMiddlewareTests
{
    [Fact]
    public async Task InvokeAsync_WhenExceptionThrown_ReturnsInternalServerErrorWithGenericMessage()
    {
        // Arrange
        const string sensitiveExceptionMessage = "Database Connection Secret Failed: Server=secret_host;Port=5432;User=admin;";
        RequestDelegate next = (HttpContext context) => throw new InvalidOperationException(sensitiveExceptionMessage);
        var logger = NullLogger<ExceptionHandlingMiddleware>.Instance;

        var middleware = new ExceptionHandlingMiddleware(next, logger);

        var context = new DefaultHttpContext();
        using var responseStream = new MemoryStream();
        context.Response.Body = responseStream;

        // Act
        await middleware.InvokeAsync(context);

        // Assert
        Assert.Equal((int)HttpStatusCode.InternalServerError, context.Response.StatusCode);
        Assert.Equal("application/json", context.Response.ContentType);

        responseStream.Seek(0, SeekOrigin.Begin);
        using var reader = new StreamReader(responseStream);
        var jsonResponse = await reader.ReadToEndAsync();

        Assert.DoesNotContain(sensitiveExceptionMessage, jsonResponse);
        Assert.Contains("An error occurred while processing your request.", jsonResponse);
    }
}
