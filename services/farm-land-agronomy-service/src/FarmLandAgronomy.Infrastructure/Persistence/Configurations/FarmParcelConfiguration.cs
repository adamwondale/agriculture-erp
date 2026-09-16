using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using FarmLandAgronomy.Domain.Entities;

namespace FarmLandAgronomy.Infrastructure.Persistence.Configurations;

public class FarmParcelConfiguration : IEntityTypeConfiguration<FarmParcel>
{
    public void Configure(EntityTypeBuilder<FarmParcel> builder)
    {
        builder.ToTable("farmparcels");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.GpsPolygon).HasColumnType("jsonb");
        builder.Property(x => x.AreaHectares).HasColumnType("numeric(18,2)");
        builder.Property(x => x.Soil).HasConversion<string>().HasMaxLength(50);
        builder.Property(x => x.Ownership).HasConversion<string>().HasMaxLength(50);
        builder.Property(x => x.Status).HasConversion<string>().HasMaxLength(50);
    }
}
