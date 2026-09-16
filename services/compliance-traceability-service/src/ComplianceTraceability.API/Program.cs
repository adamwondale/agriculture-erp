using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Shared.Auth;
using ComplianceTraceability.Application.Interfaces;
using ComplianceTraceability.Infrastructure.Messaging.Consumers;
using ComplianceTraceability.Infrastructure.Messaging.Publishers;
using ComplianceTraceability.Infrastructure.Persistence;
using ComplianceTraceability.Infrastructure.Repositories;
using ComplianceTraceability.API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// 1. Add Controllers and HealthChecks
builder.Services.AddControllers();
builder.Services.AddHealthChecks();
builder.Services.AddEndpointsApiExplorer();

// 2. Swagger / OpenAPI configuration
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "ComplianceTraceability Service API",
        Version = "v1",
        Description = "Clean Architecture Microservice for ComplianceTraceability"
    });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// 3. PostgreSQL EF Core DbContext
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? "Host=localhost;Port=5432;Database=agri_compliance_traceability_db;Username=postgres;Password=postgres";

builder.Services.AddDbContext<ComplianceTraceabilityDbContext>(options =>
    options.UseNpgsql(connectionString, b => b.MigrationsAssembly(typeof(ComplianceTraceabilityDbContext).Assembly.FullName)));

// 4. JWT Bearer Auth from Shared.Auth
builder.Services.AddSharedJwtAuthentication(builder.Configuration);

// 5. Dependency Injection (Clean Architecture)
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddSingleton<IEventPublisher, RabbitMqEventPublisher>();
builder.Services.AddHostedService<EventConsumerStub>();

var app = builder.Build();

// Configure the HTTP request pipeline
app.UseMiddleware<ExceptionHandlingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ComplianceTraceability API v1"));
}

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHealthChecks("/health");

app.Run();
