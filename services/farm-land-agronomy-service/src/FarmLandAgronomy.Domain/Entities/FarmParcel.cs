using FarmLandAgronomy.Domain.Common;
using FarmLandAgronomy.Domain.Enums;

namespace FarmLandAgronomy.Domain.Entities;

public class FarmParcel : BaseEntity
{
    public string ParcelCode { get; set; } = default!;
    public Guid FarmerId { get; set; } = default!;
    public string Region { get; set; } = default!;
    public string Woreda { get; set; } = default!;
    public string GpsPolygon { get; set; } = default!;
    public decimal AreaHectares { get; set; } = default!;
    public SoilType Soil { get; set; } = default!;
    public OwnershipType Ownership { get; set; } = default!;
    public ParcelStatus Status { get; set; } = default!;
}
