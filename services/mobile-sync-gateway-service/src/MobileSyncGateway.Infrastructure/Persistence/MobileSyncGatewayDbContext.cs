using Microsoft.EntityFrameworkCore;
using MobileSyncGateway.Domain.Entities;

namespace MobileSyncGateway.Infrastructure.Persistence;

public class MobileSyncGatewayDbContext : DbContext
{
    public MobileSyncGatewayDbContext(DbContextOptions<MobileSyncGatewayDbContext> options) : base(options)
    {
    }

    public DbSet<MobileSyncLog> MobileSyncLogs => Set<MobileSyncLog>();
    public DbSet<SyncQueueItem> SyncQueueItems => Set<SyncQueueItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(MobileSyncGatewayDbContext).Assembly);
    }
}
