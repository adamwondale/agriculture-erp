using Microsoft.EntityFrameworkCore;
using ContractFarming.Domain.Entities;

namespace ContractFarming.Infrastructure.Persistence;

public class ContractFarmingDbContext : DbContext
{
    public ContractFarmingDbContext(DbContextOptions<ContractFarmingDbContext> options) : base(options)
    {
    }

    public DbSet<ContractAgreement> ContractAgreements => Set<ContractAgreement>();
    public DbSet<InputDistribution> InputDistributions => Set<InputDistribution>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ContractFarmingDbContext).Assembly);
    }
}
