using CoreAdmin.Domain.Common;
using CoreAdmin.Domain.Enums;

namespace CoreAdmin.Domain.Entities;

public class Role : BaseEntity
{
    public bool IsSystemRole { get; set; }
    public bool RequiresMfa { get; set; }
    public Guid? OrganizationId { get; set; }
    public string Code { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string Description { get; set; } = default!;
}
