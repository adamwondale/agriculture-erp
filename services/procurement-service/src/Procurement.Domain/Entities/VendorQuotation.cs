using Procurement.Domain.Common;
using Procurement.Domain.Enums;

namespace Procurement.Domain.Entities;

public class VendorQuotation : BaseEntity
{
    public Guid PrId { get; set; } = default!;
    public Guid VendorId { get; set; } = default!;
    public decimal QuotedAmount { get; set; } = default!;
    public string AttachmentUrl { get; set; } = default!;
}
