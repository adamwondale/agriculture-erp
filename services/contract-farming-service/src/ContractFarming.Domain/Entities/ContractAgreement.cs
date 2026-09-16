using ContractFarming.Domain.Common;
using ContractFarming.Domain.Enums;

namespace ContractFarming.Domain.Entities;

public class ContractAgreement : BaseEntity
{
    public string ContractCode { get; set; } = default!;
    public Guid FarmerId { get; set; } = default!;
    public Guid ParcelId { get; set; } = default!;
    public Guid SeasonId { get; set; } = default!;
    public string TargetCrop { get; set; } = default!;
    public decimal ContractedHectares { get; set; } = default!;
    public decimal GuaranteedVolumeQuintals { get; set; } = default!;
    public string PricingMechanism { get; set; } = default!;
    public ContractStatus Status { get; set; } = default!;
}
