using Finance.Domain.Common;
using Finance.Domain.Enums;

namespace Finance.Domain.Entities;

public class LedgerEntry : BaseEntity
{
    public string JournalNumber { get; set; } = default!;
    public Guid AccountId { get; set; } = default!;
    public decimal DebitAmount { get; set; } = default!;
    public decimal CreditAmount { get; set; } = default!;
    public DateTimeOffset TransactionDate { get; set; } = default!;
    public Guid ReferenceId { get; set; } = default!;
}
