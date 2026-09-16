using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ComplianceTraceability.Domain.Entities;

namespace ComplianceTraceability.Infrastructure.Persistence.Configurations;

public class CapaRecordConfiguration : IEntityTypeConfiguration<CapaRecord>
{
    public void Configure(EntityTypeBuilder<CapaRecord> builder)
    {
        builder.ToTable("caparecords");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.DeadlineDate).HasColumnType("timestamptz");
        builder.Property(x => x.Status).HasConversion<string>().HasMaxLength(50);
    }
}
