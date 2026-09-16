using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ComplianceTraceability.Domain.Entities;

namespace ComplianceTraceability.Infrastructure.Persistence.Configurations;

public class TraceabilityBatchLinkConfiguration : IEntityTypeConfiguration<TraceabilityBatchLink>
{
    public void Configure(EntityTypeBuilder<TraceabilityBatchLink> builder)
    {
        builder.ToTable("traceabilitybatchlinks");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.HarvestDate).HasColumnType("timestamptz");
        builder.Property(x => x.EudrComplianceStatus).HasConversion<string>().HasMaxLength(50);
    }
}
