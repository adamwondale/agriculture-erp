using FarmerPartner.Domain.Common;
using FarmerPartner.Domain.Enums;

namespace FarmerPartner.Domain.Entities;

public class FarmerProfile : BaseEntity
{
    public string FarmerCode { get; set; } = default!;
    public string FullName { get; set; } = default!;
    public string NationalId { get; set; } = default!;
    public string PrimaryPhone { get; set; } = default!;
    public string Region { get; set; } = default!;
    public string Zone { get; set; } = default!;
    public string Woreda { get; set; } = default!;
    public string Kebele { get; set; } = default!;
    public Guid? CooperativeId { get; set; } = default!;
    public decimal ReliabilityScore { get; set; } = default!;
    public FarmerStatus Status { get; set; } = default!;
}
