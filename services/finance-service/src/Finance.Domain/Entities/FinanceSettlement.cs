using Finance.Domain.Common;
using Finance.Domain.Enums;

namespace Finance.Domain.Entities;

public class FinanceSettlement : BaseEntity
{
    public string SettlementCode { get; set; } = default!;
    public Guid ContractId { get; set; } = default!;
    public decimal GrossValue { get; set; } = default!;
    public decimal InputLoanDeduction { get; set; } = default!;
    public decimal WithholdingTax { get; set; } = default!;
    public decimal NetPayable { get; set; } = default!;
    public PaymentChannel PaymentChannel { get; set; } = default!;
    public SettlementStatus Status { get; set; } = default!;
}
