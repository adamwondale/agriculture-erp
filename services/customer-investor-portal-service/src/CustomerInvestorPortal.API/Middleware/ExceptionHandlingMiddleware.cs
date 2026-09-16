using System.Net;
using System.Text.Json;

namespace CustomerInvestorPortal.API.Middleware;

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
            _logger.LogError(ex, "An unhandled exception occurred in CustomerInvestorPortal.API");
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            var response = new { error = ex.Message, service = "CustomerInvestorPortal.API" };
            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}
