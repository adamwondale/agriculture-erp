using Microsoft.EntityFrameworkCore;
using MasterData.Domain.Entities;

namespace MasterData.Infrastructure.Persistence;

public class MasterDataDbContext : DbContext
{
    public MasterDataDbContext(DbContextOptions<MasterDataDbContext> options) : base(options)
    {
    }

    public DbSet<ReferenceCode> ReferenceCodes => Set<ReferenceCode>();
    public DbSet<LocalizationPreference> LocalizationPreferences => Set<LocalizationPreference>();
    public DbSet<CropCatalogEntry> CropCatalogEntrys => Set<CropCatalogEntry>();
    public DbSet<CurrencyRate> CurrencyRates => Set<CurrencyRate>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(MasterDataDbContext).Assembly);
    }
}
