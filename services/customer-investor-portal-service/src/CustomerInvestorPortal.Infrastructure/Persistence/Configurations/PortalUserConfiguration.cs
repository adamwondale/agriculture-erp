using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using CustomerInvestorPortal.Domain.Entities;

namespace CustomerInvestorPortal.Infrastructure.Persistence.Configurations;

public class PortalUserConfiguration : IEntityTypeConfiguration<PortalUser>
{
    public void Configure(EntityTypeBuilder<PortalUser> builder)
    {
        builder.ToTable("portalusers");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.PortalRole).HasConversion<string>().HasMaxLength(50);
        builder.Property(x => x.Status).HasConversion<string>().HasMaxLength(50);
    }
}
