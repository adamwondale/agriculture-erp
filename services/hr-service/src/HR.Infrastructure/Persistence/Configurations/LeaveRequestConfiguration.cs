using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using HR.Domain.Entities;

namespace HR.Infrastructure.Persistence.Configurations;

public class LeaveRequestConfiguration : IEntityTypeConfiguration<LeaveRequest>
{
    public void Configure(EntityTypeBuilder<LeaveRequest> builder)
    {
        builder.ToTable("leaverequests");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.Type).HasConversion<string>().HasMaxLength(50);
        builder.Property(x => x.StartDate).HasColumnType("timestamptz");
        builder.Property(x => x.EndDate).HasColumnType("timestamptz");
        builder.Property(x => x.Status).HasConversion<string>().HasMaxLength(50);
    }
}
