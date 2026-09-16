using Microsoft.EntityFrameworkCore;
using Finance.Domain.Entities;

namespace Finance.Infrastructure.Persistence;

public class FinanceDbContext : DbContext
{
    public FinanceDbContext(DbContextOptions<FinanceDbContext> options) : base(options)
    {
    }

    public DbSet<ChartOfAccount> ChartOfAccounts => Set<ChartOfAccount>();
    public DbSet<LedgerEntry> LedgerEntrys => Set<LedgerEntry>();
    public DbSet<FinanceSettlement> FinanceSettlements => Set<FinanceSettlement>();
    public DbSet<TradeFinanceDocument> TradeFinanceDocuments => Set<TradeFinanceDocument>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(FinanceDbContext).Assembly);
    }
}
