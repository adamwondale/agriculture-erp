using FarmLandAgronomy.Domain.Common;
using FarmLandAgronomy.Domain.Enums;

namespace FarmLandAgronomy.Domain.Entities;

public class CropPlan : BaseEntity
{
    public string PlanCode { get; set; } = default!;
    public Guid SeasonId { get; set; } = default!;
    public Guid ParcelId { get; set; } = default!;
    public Guid CropVarietyId { get; set; } = default!;
    public decimal PlannedHectares { get; set; } = default!;
    public decimal ExpectedYieldQuintals { get; set; } = default!;
    public CropPlanStatus Status { get; set; } = default!;
}
