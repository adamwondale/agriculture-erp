using FarmLandAgronomy.Domain.Common;
using FarmLandAgronomy.Domain.Enums;

namespace FarmLandAgronomy.Domain.Entities;

public class AgronomyInspection : BaseEntity
{
    public string InspectionCode { get; set; } = default!;
    public Guid ParcelId { get; set; } = default!;
    public Guid AgronomistId { get; set; } = default!;
    public DateTimeOffset InspectionDate { get; set; } = default!;
    public string GrowthStage { get; set; } = default!;
    public int HealthScore { get; set; } = default!;
    public bool PestDiseaseDetected { get; set; } = default!;
    public decimal SeverityPercentage { get; set; } = default!;
    public string PhotoUrl { get; set; } = default!;
}
