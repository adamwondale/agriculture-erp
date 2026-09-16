using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WarehouseInventory.Domain.Entities;

namespace WarehouseInventory.Infrastructure.Persistence.Configurations;

public class WarehouseConfiguration : IEntityTypeConfiguration<Warehouse>
{
    public void Configure(EntityTypeBuilder<Warehouse> builder)
    {
        builder.ToTable("warehouses");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.CapacityQuintals).HasColumnType("numeric(18,2)");
    }
}
