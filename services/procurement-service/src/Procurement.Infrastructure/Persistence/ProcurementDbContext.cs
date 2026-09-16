using Microsoft.EntityFrameworkCore;
using Procurement.Domain.Entities;

namespace Procurement.Infrastructure.Persistence;

public class ProcurementDbContext : DbContext
{
    public ProcurementDbContext(DbContextOptions<ProcurementDbContext> options) : base(options)
    {
    }

    public DbSet<PurchaseRequest> PurchaseRequests => Set<PurchaseRequest>();
    public DbSet<VendorQuotation> VendorQuotations => Set<VendorQuotation>();
    public DbSet<PurchaseOrder> PurchaseOrders => Set<PurchaseOrder>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ProcurementDbContext).Assembly);
    }
}
