using MasterData.Domain.Common;
using MasterData.Domain.Enums;

namespace MasterData.Domain.Entities;

public class LocalizationPreference : BaseEntity
{
    public Guid UserId { get; set; } = default!;
    public string PreferredLanguage { get; set; } = default!;
    public CalendarSystem Calendar { get; set; } = default!;
    public UnitSystem Units { get; set; } = default!;
}
