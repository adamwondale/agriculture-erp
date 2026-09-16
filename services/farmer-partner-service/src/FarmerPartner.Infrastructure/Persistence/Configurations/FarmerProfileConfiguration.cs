using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using FarmerPartner.Domain.Entities;

namespace FarmerPartner.Infrastructure.Persistence.Configurations;

public class FarmerProfileConfiguration : IEntityTypeConfiguration<FarmerProfile>
{
    public void Configure(EntityTypeBuilder<FarmerProfile> builder)
    {
        builder.ToTable("farmerprofiles");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.ReliabilityScore).HasColumnType("numeric(18,2)");
        builder.Property(x => x.Status).HasConversion<string>().HasMaxLength(50);
    }
}
