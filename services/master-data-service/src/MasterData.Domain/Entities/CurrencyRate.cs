using MasterData.Domain.Common;
using MasterData.Domain.Enums;

namespace MasterData.Domain.Entities;

public class CurrencyRate : BaseEntity
{
    public string CurrencyCode { get; set; } = default!;
    public decimal RateToEtb { get; set; } = default!;
    public DateTimeOffset EffectiveDate { get; set; } = default!;
}
