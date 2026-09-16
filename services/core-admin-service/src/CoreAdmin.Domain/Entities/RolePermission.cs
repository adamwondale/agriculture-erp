using CoreAdmin.Domain.Common;
using CoreAdmin.Domain.Enums;

namespace CoreAdmin.Domain.Entities;

public class RolePermission : BaseEntity
{
    public Guid RoleId { get; set; } = default!;
    public Guid PermissionId { get; set; } = default!;
}
