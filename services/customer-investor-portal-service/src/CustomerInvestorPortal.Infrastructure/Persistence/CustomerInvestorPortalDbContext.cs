using Microsoft.EntityFrameworkCore;
using CustomerInvestorPortal.Domain.Entities;

namespace CustomerInvestorPortal.Infrastructure.Persistence;

public class CustomerInvestorPortalDbContext : DbContext
{
    public CustomerInvestorPortalDbContext(DbContextOptions<CustomerInvestorPortalDbContext> options) : base(options)
    {
    }

    public DbSet<PortalUser> PortalUsers => Set<PortalUser>();
    public DbSet<CachedPortfolioSummary> CachedPortfolioSummarys => Set<CachedPortfolioSummary>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(CustomerInvestorPortalDbContext).Assembly);
    }
}
