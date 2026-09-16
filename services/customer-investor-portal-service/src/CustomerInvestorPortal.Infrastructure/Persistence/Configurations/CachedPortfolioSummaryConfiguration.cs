using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using CustomerInvestorPortal.Domain.Entities;

namespace CustomerInvestorPortal.Infrastructure.Persistence.Configurations;

public class CachedPortfolioSummaryConfiguration : IEntityTypeConfiguration<CachedPortfolioSummary>
{
    public void Configure(EntityTypeBuilder<CachedPortfolioSummary> builder)
    {
        builder.ToTable("cachedportfoliosummarys");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.CreatedAt).HasColumnType("timestamptz").IsRequired();
        builder.Property(x => x.UpdatedAt).HasColumnType("timestamptz");
        builder.Property(x => x.IsDeleted).HasDefaultValue(false);
        builder.HasQueryFilter(x => !x.IsDeleted);

        builder.Property(x => x.TotalHectares).HasColumnType("numeric(18,2)");
        builder.Property(x => x.ProjectedYieldQuintals).HasColumnType("numeric(18,2)");
        builder.Property(x => x.LastSyncedAt).HasColumnType("timestamptz");
    }
}
