using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Shared.Auth;
using FarmLandAgronomy.Application.Interfaces;
using FarmLandAgronomy.Infrastructure.Messaging.Consumers;
using FarmLandAgronomy.Infrastructure.Messaging.Publishers;
using FarmLandAgronomy.Infrastructure.Persistence;
using FarmLandAgronomy.Infrastructure.Repositories;
using FarmLandAgronomy.API.Middleware;

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
        Title = "FarmLandAgronomy Service API",
        Version = "v1",
        Description = "Clean Architecture Microservice for FarmLandAgronomy"
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
    ?? "Host=localhost;Port=5432;Database=agri_farm_land_agronomy_db;Username=postgres;Password=postgres";

builder.Services.AddDbContext<FarmLandAgronomyDbContext>(options =>
    options.UseNpgsql(connectionString, b => b.MigrationsAssembly(typeof(FarmLandAgronomyDbContext).Assembly.FullName)));

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
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "FarmLandAgronomy API v1"));
}

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHealthChecks("/health");

app.Run();
