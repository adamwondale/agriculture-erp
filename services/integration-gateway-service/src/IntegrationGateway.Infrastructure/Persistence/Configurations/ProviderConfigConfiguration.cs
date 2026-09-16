using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using IntegrationGateway.Domain.Entities;

namespace IntegrationGateway.Infrastructure.Persistence.Configurations;

public class ProviderConfigConfiguration : IEntityTypeConfiguration<ProviderConfig>
{
    public void Configure(EntityTypeBuilder<ProviderConfig> builder)
    {
        builder.ToTable("providerconfigs");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        // Standard properties
    }
}
