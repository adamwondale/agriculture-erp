using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using FarmerPartner.Domain.Entities;

namespace FarmerPartner.Infrastructure.Persistence.Configurations;

public class PartnerProfileConfiguration : IEntityTypeConfiguration<PartnerProfile>
{
    public void Configure(EntityTypeBuilder<PartnerProfile> builder)
    {
        builder.ToTable("partnerprofiles");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.EntityType).HasConversion<string>().HasMaxLength(50);
        builder.Property(x => x.DueDiligenceStatus).HasConversion<string>().HasMaxLength(50);
        builder.Property(x => x.Status).HasConversion<string>().HasMaxLength(50);
    }
}
