using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MasterData.Domain.Entities;

namespace MasterData.Infrastructure.Persistence.Configurations;

public class ReferenceCodeConfiguration : IEntityTypeConfiguration<ReferenceCode>
{
    public void Configure(EntityTypeBuilder<ReferenceCode> builder)
    {
        builder.ToTable("referencecodes");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        // Standard properties
    }
}
