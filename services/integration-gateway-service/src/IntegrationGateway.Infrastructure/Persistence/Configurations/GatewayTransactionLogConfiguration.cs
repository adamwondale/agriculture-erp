using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using IntegrationGateway.Domain.Entities;

namespace IntegrationGateway.Infrastructure.Persistence.Configurations;

public class GatewayTransactionLogConfiguration : IEntityTypeConfiguration<GatewayTransactionLog>
{
    public void Configure(EntityTypeBuilder<GatewayTransactionLog> builder)
    {
        builder.ToTable("gatewaytransactionlogs");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.RequestPayload).HasColumnType("jsonb");
        builder.Property(x => x.ResponsePayload).HasColumnType("jsonb");
        builder.Property(x => x.Status).HasConversion<string>().HasMaxLength(50);
    }
}
