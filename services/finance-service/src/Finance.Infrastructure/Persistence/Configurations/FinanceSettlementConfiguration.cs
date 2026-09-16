using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Finance.Domain.Entities;

namespace Finance.Infrastructure.Persistence.Configurations;

public class FinanceSettlementConfiguration : IEntityTypeConfiguration<FinanceSettlement>
{
    public void Configure(EntityTypeBuilder<FinanceSettlement> builder)
    {
        builder.ToTable("financesettlements");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.GrossValue).HasColumnType("numeric(18,2)");
        builder.Property(x => x.InputLoanDeduction).HasColumnType("numeric(18,2)");
        builder.Property(x => x.WithholdingTax).HasColumnType("numeric(18,2)");
        builder.Property(x => x.NetPayable).HasColumnType("numeric(18,2)");
        builder.Property(x => x.PaymentChannel).HasConversion<string>().HasMaxLength(50);
        builder.Property(x => x.Status).HasConversion<string>().HasMaxLength(50);
    }
}
