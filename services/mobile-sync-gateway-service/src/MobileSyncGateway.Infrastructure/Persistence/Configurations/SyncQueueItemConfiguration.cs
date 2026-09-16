using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobileSyncGateway.Domain.Entities;

namespace MobileSyncGateway.Infrastructure.Persistence.Configurations;

public class SyncQueueItemConfiguration : IEntityTypeConfiguration<SyncQueueItem>
{
    public void Configure(EntityTypeBuilder<SyncQueueItem> builder)
    {
        builder.ToTable("syncqueueitems");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.Payload).HasColumnType("jsonb");
        builder.Property(x => x.ProcessedAt).HasColumnType("timestamptz");
    }
}
