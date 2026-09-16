using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using FarmerPartner.Domain.Entities;

namespace FarmerPartner.Infrastructure.Persistence.Configurations;

public class CooperativeConfiguration : IEntityTypeConfiguration<Cooperative>
{
    public void Configure(EntityTypeBuilder<Cooperative> builder)
    {
        builder.ToTable("cooperatives");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        // Standard properties
    }
}
