using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ContractFarming.Domain.Entities;

namespace ContractFarming.Infrastructure.Persistence.Configurations;

public class ContractAgreementConfiguration : IEntityTypeConfiguration<ContractAgreement>
{
    public void Configure(EntityTypeBuilder<ContractAgreement> builder)
    {
        builder.ToTable("contractagreements");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.ContractedHectares).HasColumnType("numeric(18,2)");
        builder.Property(x => x.GuaranteedVolumeQuintals).HasColumnType("numeric(18,2)");
        builder.Property(x => x.Status).HasConversion<string>().HasMaxLength(50);
    }
}
