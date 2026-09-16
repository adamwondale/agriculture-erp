using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using FarmLandAgronomy.Domain.Entities;

namespace FarmLandAgronomy.Infrastructure.Persistence.Configurations;

public class SeasonConfiguration : IEntityTypeConfiguration<Season>
{
    public void Configure(EntityTypeBuilder<Season> builder)
    {
        builder.ToTable("seasons");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.StartDate).HasColumnType("timestamptz");
        builder.Property(x => x.EndDate).HasColumnType("timestamptz");
    }
}
