using FarmLandAgronomy.Domain.Common;
using FarmLandAgronomy.Domain.Enums;

namespace FarmLandAgronomy.Domain.Entities;

public class CropVariety : BaseEntity
{
    public string VarietyCode { get; set; } = default!;
    public Guid CropId { get; set; } = default!;
    public string VarietyName { get; set; } = default!;
    public bool DroughtTolerance { get; set; } = default!;
    public decimal YieldPotentialQuintals { get; set; } = default!;
}
