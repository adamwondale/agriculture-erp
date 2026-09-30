using System.Net;
using System.Text.Json;
using CoreAdmin.API.Middleware;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace CoreAdmin.UnitTests;

public class ExceptionHandlingMiddlewareTests
{
    [Fact]
    public async Task InvokeAsync_WhenExceptionThrown_ReturnsGenericErrorMessageAnd500StatusCode()
    {
        // Arrange
        var loggerMock = new Mock<ILogger<ExceptionHandlingMiddleware>>();
        var sensitiveMessage = "Database connection string: Host=secret-db;Password=SuperSecret123!";
        RequestDelegate next = _ => throw new InvalidOperationException(sensitiveMessage);

        var middleware = new ExceptionHandlingMiddleware(next, loggerMock.Object);

        var context = new DefaultHttpContext();
        context.Response.Body = new MemoryStream();

        // Act
        await middleware.InvokeAsync(context);

        // Assert
        Assert.Equal((int)HttpStatusCode.InternalServerError, context.Response.StatusCode);
        Assert.Equal("application/json", context.Response.ContentType);

        context.Response.Body.Seek(0, SeekOrigin.Begin);
        using var reader = new StreamReader(context.Response.Body);
        var responseText = await reader.ReadToEndAsync();

        using var jsonDoc = JsonDocument.Parse(responseText);
        var root = jsonDoc.RootElement;

        Assert.True(root.TryGetProperty("error", out var errorProp));
        Assert.Equal("An internal server error occurred.", errorProp.GetString());
        Assert.DoesNotContain(sensitiveMessage, responseText);
    }
}
