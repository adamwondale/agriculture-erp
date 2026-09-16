using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using FarmLandAgronomy.Domain.Entities;

namespace FarmLandAgronomy.Infrastructure.Persistence.Configurations;

public class AgronomyInspectionConfiguration : IEntityTypeConfiguration<AgronomyInspection>
{
    public void Configure(EntityTypeBuilder<AgronomyInspection> builder)
    {
        builder.ToTable("agronomyinspections");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.InspectionDate).HasColumnType("timestamptz");
        builder.Property(x => x.SeverityPercentage).HasColumnType("numeric(18,2)");
    }
}
