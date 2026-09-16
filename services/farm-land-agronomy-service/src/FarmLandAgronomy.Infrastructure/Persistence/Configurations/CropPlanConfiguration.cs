using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using FarmLandAgronomy.Domain.Entities;

namespace FarmLandAgronomy.Infrastructure.Persistence.Configurations;

public class CropPlanConfiguration : IEntityTypeConfiguration<CropPlan>
{
    public void Configure(EntityTypeBuilder<CropPlan> builder)
    {
        builder.ToTable("cropplans");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.PlannedHectares).HasColumnType("numeric(18,2)");
        builder.Property(x => x.ExpectedYieldQuintals).HasColumnType("numeric(18,2)");
        builder.Property(x => x.Status).HasConversion<string>().HasMaxLength(50);
    }
}
