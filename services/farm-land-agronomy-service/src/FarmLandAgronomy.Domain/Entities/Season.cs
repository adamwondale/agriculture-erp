using FarmLandAgronomy.Domain.Common;
using FarmLandAgronomy.Domain.Enums;

namespace FarmLandAgronomy.Domain.Entities;

public class Season : BaseEntity
{
    public string SeasonCode { get; set; } = default!;
    public string Name { get; set; } = default!;
    public DateTimeOffset StartDate { get; set; } = default!;
    public DateTimeOffset EndDate { get; set; } = default!;
    public bool IsActive { get; set; } = default!;
}
