using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Procurement.Domain.Entities;

namespace Procurement.Infrastructure.Persistence.Configurations;

public class VendorQuotationConfiguration : IEntityTypeConfiguration<VendorQuotation>
{
    public void Configure(EntityTypeBuilder<VendorQuotation> builder)
    {
        builder.ToTable("vendorquotations");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.QuotedAmount).HasColumnType("numeric(18,2)");
    }
}
