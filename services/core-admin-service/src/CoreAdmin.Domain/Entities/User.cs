using CoreAdmin.Domain.Common;
using CoreAdmin.Domain.Enums;

namespace CoreAdmin.Domain.Entities;

public class User : BaseEntity
{
    public string Email { get; set; } = default!;
    public string PasswordHash { get; set; } = default!;
    public Guid RoleId { get; set; } = default!;
    public Guid? BranchId { get; set; } = default!;
    public bool MfaEnabled { get; set; } = default!;
}
