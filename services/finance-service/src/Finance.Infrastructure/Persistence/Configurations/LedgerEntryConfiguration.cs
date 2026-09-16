using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Finance.Domain.Entities;

namespace Finance.Infrastructure.Persistence.Configurations;

public class LedgerEntryConfiguration : IEntityTypeConfiguration<LedgerEntry>
{
    public void Configure(EntityTypeBuilder<LedgerEntry> builder)
    {
        builder.ToTable("ledgerentrys");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.DebitAmount).HasColumnType("numeric(18,2)");
        builder.Property(x => x.CreditAmount).HasColumnType("numeric(18,2)");
        builder.Property(x => x.TransactionDate).HasColumnType("timestamptz");
    }
}
