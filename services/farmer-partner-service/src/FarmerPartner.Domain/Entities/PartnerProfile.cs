using FarmerPartner.Domain.Common;
using FarmerPartner.Domain.Enums;

namespace FarmerPartner.Domain.Entities;

public class PartnerProfile : BaseEntity
{
    public string PartnerCode { get; set; } = default!;
    public string LegalName { get; set; } = default!;
    public string TinNumber { get; set; } = default!;
    public PartnerEntityType EntityType { get; set; } = default!;
    public string CoverageRegion { get; set; } = default!;
    public DueDiligenceStatus DueDiligenceStatus { get; set; } = default!;
    public PartnerStatus Status { get; set; } = default!;
}
