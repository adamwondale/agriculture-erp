using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MasterData.Domain.Entities;

namespace MasterData.Infrastructure.Persistence.Configurations;

public class LocalizationPreferenceConfiguration : IEntityTypeConfiguration<LocalizationPreference>
{
    public void Configure(EntityTypeBuilder<LocalizationPreference> builder)
    {
        builder.ToTable("localizationpreferences");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.Calendar).HasConversion<string>().HasMaxLength(50);
        builder.Property(x => x.Units).HasConversion<string>().HasMaxLength(50);
    }
}
