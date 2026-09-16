using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Procurement.Domain.Entities;

namespace Procurement.Infrastructure.Persistence.Configurations;

public class PurchaseRequestConfiguration : IEntityTypeConfiguration<PurchaseRequest>
{
    public void Configure(EntityTypeBuilder<PurchaseRequest> builder)
    {
        builder.ToTable("purchaserequests");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.Quantity).HasColumnType("numeric(18,2)");
        builder.Property(x => x.RequiredDate).HasColumnType("timestamptz");
        builder.Property(x => x.Status).HasConversion<string>().HasMaxLength(50);
    }
}
