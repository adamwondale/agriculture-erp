using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using AutomationWorkflow.Domain.Entities;

namespace AutomationWorkflow.Infrastructure.Persistence.Configurations;

public class ScheduledEscalationConfiguration : IEntityTypeConfiguration<ScheduledEscalation>
{
    public void Configure(EntityTypeBuilder<ScheduledEscalation> builder)
    {
        builder.ToTable("scheduledescalations");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.DueAt).HasColumnType("timestamptz");
    }
}
