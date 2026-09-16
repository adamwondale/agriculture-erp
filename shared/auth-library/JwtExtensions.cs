using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Shared.Auth;

public static class JwtExtensions
{
    public static IServiceCollection AddSharedJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        var jwtKey = configuration["Jwt:Key"] ?? "super-secret-key-at-least-32-chars-long-12345!";
        var jwtIssuer = configuration["Jwt:Issuer"] ?? "AgricultureErp.CoreAdmin";
        var jwtAudience = configuration["Jwt:Audience"] ?? "AgricultureErp";

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtIssuer,
                    ValidAudience = jwtAudience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
                };
            });

        services.AddAuthorization();
        return services;
    }
}
