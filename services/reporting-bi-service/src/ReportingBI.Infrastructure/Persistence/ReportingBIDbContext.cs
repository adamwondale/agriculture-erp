using Microsoft.EntityFrameworkCore;
using ReportingBI.Domain.Entities;

namespace ReportingBI.Infrastructure.Persistence;

public class ReportingBIDbContext : DbContext
{
    public ReportingBIDbContext(DbContextOptions<ReportingBIDbContext> options) : base(options)
    {
    }

    public DbSet<KpiSnapshot> KpiSnapshots => Set<KpiSnapshot>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ReportingBIDbContext).Assembly);
    }
}
