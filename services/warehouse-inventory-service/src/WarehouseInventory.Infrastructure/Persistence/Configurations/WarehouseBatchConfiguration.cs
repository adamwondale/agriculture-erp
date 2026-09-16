using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WarehouseInventory.Domain.Entities;

namespace WarehouseInventory.Infrastructure.Persistence.Configurations;

public class WarehouseBatchConfiguration : IEntityTypeConfiguration<WarehouseBatch>
{
    public void Configure(EntityTypeBuilder<WarehouseBatch> builder)
    {
        builder.ToTable("warehousebatchs");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.NetWeightQuintals).HasColumnType("numeric(18,2)");
        builder.Property(x => x.MoisturePercentage).HasColumnType("numeric(18,2)");
        builder.Property(x => x.PurityPercentage).HasColumnType("numeric(18,2)");
        builder.Property(x => x.QualityGrade).HasConversion<string>().HasMaxLength(50);
        builder.Property(x => x.Status).HasConversion<string>().HasMaxLength(50);
    }
}
