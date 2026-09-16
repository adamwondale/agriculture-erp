using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using BuyersSalesLogistics.Domain.Entities;

namespace BuyersSalesLogistics.Infrastructure.Persistence.Configurations;

public class LogisticsShipmentConfiguration : IEntityTypeConfiguration<LogisticsShipment>
{
    public void Configure(EntityTypeBuilder<LogisticsShipment> builder)
    {
        builder.ToTable("logisticsshipments");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.DispatchWeight).HasColumnType("numeric(18,2)");
        builder.Property(x => x.ReceivedWeight).HasColumnType("numeric(18,2)");
        builder.Property(x => x.Status).HasConversion<string>().HasMaxLength(50);
    }
}
