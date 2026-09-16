using MasterData.Domain.Common;
using MasterData.Domain.Enums;

namespace MasterData.Domain.Entities;

public class ReferenceCode : BaseEntity
{
    public string Category { get; set; } = default!;
    public string CodeKey { get; set; } = default!;
    public string CodeValue { get; set; } = default!;
    public bool IsActive { get; set; } = default!;
}
