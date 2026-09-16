using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MasterData.Domain.Entities;

namespace MasterData.Infrastructure.Persistence.Configurations;

public class CurrencyRateConfiguration : IEntityTypeConfiguration<CurrencyRate>
{
    public void Configure(EntityTypeBuilder<CurrencyRate> builder)
    {
        builder.ToTable("currencyrates");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.RateToEtb).HasColumnType("numeric(18,2)");
        builder.Property(x => x.EffectiveDate).HasColumnType("timestamptz");
    }
}
