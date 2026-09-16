using Microsoft.EntityFrameworkCore;
using FarmerPartner.Domain.Entities;

namespace FarmerPartner.Infrastructure.Persistence;

public class FarmerPartnerDbContext : DbContext
{
    public FarmerPartnerDbContext(DbContextOptions<FarmerPartnerDbContext> options) : base(options)
    {
    }

    public DbSet<FarmerProfile> FarmerProfiles => Set<FarmerProfile>();
    public DbSet<Cooperative> Cooperatives => Set<Cooperative>();
    public DbSet<PartnerProfile> PartnerProfiles => Set<PartnerProfile>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(FarmerPartnerDbContext).Assembly);
    }
}
