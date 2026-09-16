using System.Text;
using Gateway.API.Middleware;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add YARP Reverse Proxy
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

// Add JWT Authentication for gateway validation
var jwtKey = builder.Configuration["Jwt:Key"] ?? "super-secret-key-at-least-32-chars-long-12345!";
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "AgricultureErp.CoreAdmin";
var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "AgricultureErp";

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
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

builder.Services.AddAuthorization();
builder.Services.AddHealthChecks();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

// Custom header enrichment for downstream services
app.UseMiddleware<JwtForwardingMiddleware>();

app.MapHealthChecks("/health");

app.MapReverseProxy();

app.Run();
