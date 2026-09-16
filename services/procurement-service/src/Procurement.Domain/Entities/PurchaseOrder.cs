using Procurement.Domain.Common;
using Procurement.Domain.Enums;

namespace Procurement.Domain.Entities;

public class PurchaseOrder : BaseEntity
{
    public string PoCode { get; set; } = default!;
    public Guid SupplierId { get; set; } = default!;
    public decimal TotalAmount { get; set; } = default!;
    public ApprovalTier ApprovalTier { get; set; } = default!;
    public PoStatus Status { get; set; } = default!;
}
