using CoreAdmin.Domain.Common;
using CoreAdmin.Domain.Enums;

namespace CoreAdmin.Domain.Entities;

public class Permission : BaseEntity
{
    public string Code { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string Resource { get; set; } = default!;
    public string Action { get; set; } = default!;
}
