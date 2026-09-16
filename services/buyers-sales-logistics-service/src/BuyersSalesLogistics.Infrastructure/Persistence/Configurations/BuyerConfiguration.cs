using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using BuyersSalesLogistics.Domain.Entities;

namespace BuyersSalesLogistics.Infrastructure.Persistence.Configurations;

public class BuyerConfiguration : IEntityTypeConfiguration<Buyer>
{
    public void Configure(EntityTypeBuilder<Buyer> builder)
    {
        builder.ToTable("buyers");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.CreditLimit).HasColumnType("numeric(18,2)");
    }
}
