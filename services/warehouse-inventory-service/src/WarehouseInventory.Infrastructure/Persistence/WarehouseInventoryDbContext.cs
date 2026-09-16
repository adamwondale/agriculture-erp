using Microsoft.EntityFrameworkCore;
using WarehouseInventory.Domain.Entities;

namespace WarehouseInventory.Infrastructure.Persistence;

public class WarehouseInventoryDbContext : DbContext
{
    public WarehouseInventoryDbContext(DbContextOptions<WarehouseInventoryDbContext> options) : base(options)
    {
    }

    public DbSet<Warehouse> Warehouses => Set<Warehouse>();
    public DbSet<WarehouseBatch> WarehouseBatchs => Set<WarehouseBatch>();
    public DbSet<StockTransfer> StockTransfers => Set<StockTransfer>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(WarehouseInventoryDbContext).Assembly);
    }
}
