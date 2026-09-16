using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using BuyersSalesLogistics.Domain.Entities;

namespace BuyersSalesLogistics.Infrastructure.Persistence.Configurations;

public class SalesContractConfiguration : IEntityTypeConfiguration<SalesContract>
{
    public void Configure(EntityTypeBuilder<SalesContract> builder)
    {
        builder.ToTable("salescontracts");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.OrderedQuantityMt).HasColumnType("numeric(18,2)");
        builder.Property(x => x.UnitPriceUsd).HasColumnType("numeric(18,2)");
        builder.Property(x => x.Status).HasConversion<string>().HasMaxLength(50);
    }
}
