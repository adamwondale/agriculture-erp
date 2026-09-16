using Microsoft.EntityFrameworkCore;
using BuyersSalesLogistics.Domain.Entities;

namespace BuyersSalesLogistics.Infrastructure.Persistence;

public class BuyersSalesLogisticsDbContext : DbContext
{
    public BuyersSalesLogisticsDbContext(DbContextOptions<BuyersSalesLogisticsDbContext> options) : base(options)
    {
    }

    public DbSet<Buyer> Buyers => Set<Buyer>();
    public DbSet<SalesContract> SalesContracts => Set<SalesContract>();
    public DbSet<LogisticsShipment> LogisticsShipments => Set<LogisticsShipment>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(BuyersSalesLogisticsDbContext).Assembly);
    }
}
