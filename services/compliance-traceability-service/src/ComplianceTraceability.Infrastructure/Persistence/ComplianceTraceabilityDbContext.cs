using Microsoft.EntityFrameworkCore;
using ComplianceTraceability.Domain.Entities;

namespace ComplianceTraceability.Infrastructure.Persistence;

public class ComplianceTraceabilityDbContext : DbContext
{
    public ComplianceTraceabilityDbContext(DbContextOptions<ComplianceTraceabilityDbContext> options) : base(options)
    {
    }

    public DbSet<CapaRecord> CapaRecords => Set<CapaRecord>();
    public DbSet<TraceabilityBatchLink> TraceabilityBatchLinks => Set<TraceabilityBatchLink>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ComplianceTraceabilityDbContext).Assembly);
    }
}
