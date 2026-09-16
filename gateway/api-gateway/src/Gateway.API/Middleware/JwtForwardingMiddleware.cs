using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Gateway.API.Middleware;

public class JwtForwardingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<JwtForwardingMiddleware> _logger;

    public JwtForwardingMiddleware(RequestDelegate next, ILogger<JwtForwardingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.User.Identity?.IsAuthenticated == true)
        {
            var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value 
                         ?? context.User.FindFirst("sub")?.Value;
            var roles = string.Join(",", context.User.FindAll(ClaimTypes.Role).Select(c => c.Value));
            var tenantId = context.User.FindFirst("tenant_id")?.Value;

            if (!string.IsNullOrEmpty(userId))
            {
                context.Request.Headers["X-User-Id"] = userId;
            }
            if (!string.IsNullOrEmpty(roles))
            {
                context.Request.Headers["X-User-Roles"] = roles;
            }
            if (!string.IsNullOrEmpty(tenantId))
            {
                context.Request.Headers["X-Tenant-Id"] = tenantId;
            }
        }

        await _next(context);
    }
}
