using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ReportingBI.Domain.Entities;

namespace ReportingBI.Infrastructure.Persistence.Configurations;

public class KpiSnapshotConfiguration : IEntityTypeConfiguration<KpiSnapshot>
{
    public void Configure(EntityTypeBuilder<KpiSnapshot> builder)
    {
        builder.ToTable("kpisnapshots");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.SnapshotDate).HasColumnType("timestamptz");
        builder.Property(x => x.TotalHectaresPlanted).HasColumnType("numeric(18,2)");
        builder.Property(x => x.ProjectedHarvestMt).HasColumnType("numeric(18,2)");
        builder.Property(x => x.ActualHarvestMt).HasColumnType("numeric(18,2)");
        builder.Property(x => x.GrossMarginEtb).HasColumnType("numeric(18,2)");
    }
}
