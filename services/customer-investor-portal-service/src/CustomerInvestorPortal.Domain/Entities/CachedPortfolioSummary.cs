using CustomerInvestorPortal.Domain.Common;
using CustomerInvestorPortal.Domain.Enums;

namespace CustomerInvestorPortal.Domain.Entities;

public class CachedPortfolioSummary : BaseEntity
{
    public Guid EntityId { get; set; } = default!;
    public int TotalParcels { get; set; } = default!;
    public decimal TotalHectares { get; set; } = default!;
    public decimal ProjectedYieldQuintals { get; set; } = default!;
    public DateTimeOffset LastSyncedAt { get; set; } = default!;
}
