using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Finance.Domain.Entities;

namespace Finance.Infrastructure.Persistence.Configurations;

public class TradeFinanceDocumentConfiguration : IEntityTypeConfiguration<TradeFinanceDocument>
{
    public void Configure(EntityTypeBuilder<TradeFinanceDocument> builder)
    {
        builder.ToTable("tradefinancedocuments");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.Amount).HasColumnType("numeric(18,2)");
        builder.Property(x => x.ExpiryDate).HasColumnType("timestamptz");
        builder.Property(x => x.Status).HasConversion<string>().HasMaxLength(50);
    }
}
