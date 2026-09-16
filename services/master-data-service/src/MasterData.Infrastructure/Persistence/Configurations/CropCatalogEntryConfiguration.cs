using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MasterData.Domain.Entities;

namespace MasterData.Infrastructure.Persistence.Configurations;

public class CropCatalogEntryConfiguration : IEntityTypeConfiguration<CropCatalogEntry>
{
    public void Configure(EntityTypeBuilder<CropCatalogEntry> builder)
    {
        builder.ToTable("cropcatalogentrys");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        // Standard properties
    }
}
