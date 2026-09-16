using Procurement.Domain.Common;
using Procurement.Domain.Enums;

namespace Procurement.Domain.Entities;

public class PurchaseRequest : BaseEntity
{
    public string PrCode { get; set; } = default!;
    public Guid RequesterId { get; set; } = default!;
    public string ItemCode { get; set; } = default!;
    public decimal Quantity { get; set; } = default!;
    public DateTimeOffset RequiredDate { get; set; } = default!;
    public string BudgetCode { get; set; } = default!;
    public PrStatus Status { get; set; } = default!;
}
