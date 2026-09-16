using ReportingBI.Domain.Common;
using ReportingBI.Domain.Enums;

namespace ReportingBI.Domain.Entities;

public class KpiSnapshot : BaseEntity
{
    public DateTimeOffset SnapshotDate { get; set; } = default!;
    public string Region { get; set; } = default!;
    public decimal TotalHectaresPlanted { get; set; } = default!;
    public int ActiveFarmersCount { get; set; } = default!;
    public decimal ProjectedHarvestMt { get; set; } = default!;
    public decimal ActualHarvestMt { get; set; } = default!;
    public decimal GrossMarginEtb { get; set; } = default!;
}
