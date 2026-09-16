using Microsoft.EntityFrameworkCore;
using IntegrationGateway.Domain.Entities;

namespace IntegrationGateway.Infrastructure.Persistence;

public class IntegrationGatewayDbContext : DbContext
{
    public IntegrationGatewayDbContext(DbContextOptions<IntegrationGatewayDbContext> options) : base(options)
    {
    }

    public DbSet<GatewayTransactionLog> GatewayTransactionLogs => Set<GatewayTransactionLog>();
    public DbSet<ProviderConfig> ProviderConfigs => Set<ProviderConfig>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(IntegrationGatewayDbContext).Assembly);
    }
}
