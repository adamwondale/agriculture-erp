using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ContractFarming.Domain.Entities;

namespace ContractFarming.Infrastructure.Persistence.Configurations;

public class InputDistributionConfiguration : IEntityTypeConfiguration<InputDistribution>
{
    public void Configure(EntityTypeBuilder<InputDistribution> builder)
    {
        builder.ToTable("inputdistributions");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.QuantityIssued).HasColumnType("numeric(18,2)");
        builder.Property(x => x.UnitCost).HasColumnType("numeric(18,2)");
        builder.Property(x => x.TotalLoanValue).HasColumnType("numeric(18,2)");
        builder.Property(x => x.Status).HasConversion<string>().HasMaxLength(50);
    }
}
