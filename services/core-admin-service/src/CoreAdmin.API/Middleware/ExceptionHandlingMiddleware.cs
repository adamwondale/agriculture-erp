using System.Net;
using System.Text.Json;

namespace CoreAdmin.API.Middleware;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception occurred in CoreAdmin.API");
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            // Return safe generic error message to clients to prevent exposing internal stack trace or sensitive system details
            var response = new { error = "An internal server error occurred.", service = "CoreAdmin.API" };
            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}
