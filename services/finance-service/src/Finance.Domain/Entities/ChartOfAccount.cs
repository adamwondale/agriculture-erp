using Finance.Domain.Common;
using Finance.Domain.Enums;

namespace Finance.Domain.Entities;

public class ChartOfAccount : BaseEntity
{
    public string AccountCode { get; set; } = default!;
    public string AccountName { get; set; } = default!;
    public string AccountType { get; set; } = default!;
    public bool IsActive { get; set; } = default!;
}
