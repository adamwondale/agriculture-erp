using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using FarmLandAgronomy.Domain.Entities;

namespace FarmLandAgronomy.Infrastructure.Persistence.Configurations;

public class CropVarietyConfiguration : IEntityTypeConfiguration<CropVariety>
{
    public void Configure(EntityTypeBuilder<CropVariety> builder)
    {
        builder.ToTable("cropvarietys");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.YieldPotentialQuintals).HasColumnType("numeric(18,2)");
    }
}
