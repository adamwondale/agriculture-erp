using Finance.Domain.Common;
using Finance.Domain.Enums;

namespace Finance.Domain.Entities;

public class TradeFinanceDocument : BaseEntity
{
    public string DocumentNumber { get; set; } = default!;
    public string LcNumber { get; set; } = default!;
    public string IssueBank { get; set; } = default!;
    public decimal Amount { get; set; } = default!;
    public DateTimeOffset ExpiryDate { get; set; } = default!;
    public string DocumentType { get; set; } = default!;
    public TradeDocStatus Status { get; set; } = default!;
}
