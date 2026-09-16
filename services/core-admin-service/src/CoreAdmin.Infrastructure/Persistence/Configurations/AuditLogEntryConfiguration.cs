using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using CoreAdmin.Domain.Entities;

namespace CoreAdmin.Infrastructure.Persistence.Configurations;

public class AuditLogEntryConfiguration : IEntityTypeConfiguration<AuditLogEntry>
{
    public void Configure(EntityTypeBuilder<AuditLogEntry> builder)
    {
        builder.ToTable("auditlogentrys");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.BeforeState).HasColumnType("jsonb");
        builder.Property(x => x.AfterState).HasColumnType("jsonb");
    }
}
