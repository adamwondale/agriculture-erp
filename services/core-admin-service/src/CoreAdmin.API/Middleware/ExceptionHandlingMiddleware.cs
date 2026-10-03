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
            // Security: Log exception details internally for auditing/debugging,
            // but sanitize error messages in HTTP responses to prevent exposing sensitive internal information or stack details.
            _logger.LogError(ex, "An unhandled exception occurred in CoreAdmin.API");
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            var response = new { error = "An unexpected error occurred. Please try again later.", service = "CoreAdmin.API" };
            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}
