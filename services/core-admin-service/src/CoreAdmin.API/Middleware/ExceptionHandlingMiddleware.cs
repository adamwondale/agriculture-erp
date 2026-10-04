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
            // Return a generic error response to prevent leaking internal exception details or stack traces
            var response = new { error = "An internal error occurred.", service = "CoreAdmin.API" };
            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}
