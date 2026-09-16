using ContractFarming.Domain.Common;
using ContractFarming.Domain.Enums;

namespace ContractFarming.Domain.Entities;

public class InputDistribution : BaseEntity
{
    public string DistributionCode { get; set; } = default!;
    public Guid ContractId { get; set; } = default!;
    public string ItemCode { get; set; } = default!;
    public decimal QuantityIssued { get; set; } = default!;
    public decimal UnitCost { get; set; } = default!;
    public decimal TotalLoanValue { get; set; } = default!;
    public DistributionStatus Status { get; set; } = default!;
}
