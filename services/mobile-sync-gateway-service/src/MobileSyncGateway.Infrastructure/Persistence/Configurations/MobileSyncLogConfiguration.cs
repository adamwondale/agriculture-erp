using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobileSyncGateway.Domain.Entities;

namespace MobileSyncGateway.Infrastructure.Persistence.Configurations;

public class MobileSyncLogConfiguration : IEntityTypeConfiguration<MobileSyncLog>
{
    public void Configure(EntityTypeBuilder<MobileSyncLog> builder)
    {
        builder.ToTable("mobilesynclogs");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.SyncTimestamp).HasColumnType("timestamptz");
        builder.Property(x => x.Status).HasConversion<string>().HasMaxLength(50);
    }
}
