using Microsoft.EntityFrameworkCore;
using FarmLandAgronomy.Domain.Entities;

namespace FarmLandAgronomy.Infrastructure.Persistence;

public class FarmLandAgronomyDbContext : DbContext
{
    public FarmLandAgronomyDbContext(DbContextOptions<FarmLandAgronomyDbContext> options) : base(options)
    {
    }

    public DbSet<FarmParcel> FarmParcels => Set<FarmParcel>();
    public DbSet<CropPlan> CropPlans => Set<CropPlan>();
    public DbSet<AgronomyInspection> AgronomyInspections => Set<AgronomyInspection>();
    public DbSet<Season> Seasons => Set<Season>();
    public DbSet<CropVariety> CropVarietys => Set<CropVariety>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(FarmLandAgronomyDbContext).Assembly);
    }
}
