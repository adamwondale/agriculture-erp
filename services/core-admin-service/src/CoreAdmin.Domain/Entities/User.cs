using CoreAdmin.Domain.Common;
using CoreAdmin.Domain.Enums;

namespace CoreAdmin.Domain.Entities;

public class User : BaseEntity
{
    public string Email { get; set; } = default!;
    public string PasswordHash { get; set; } = default!;
    public string Username { get; set; } = "";
    public string DisplayName { get; set; } = "";
    public Guid OrganizationId { get; set; }
    public string Status { get; set; } = "Pending";
    public Guid ProvisionedBy { get; set; }
    public Guid? ApprovedBy { get; set; }
    public string? EmployeeId { get; set; }
    public string Department { get; set; } = "";
    public string Position { get; set; } = "";
    public string PreferredLanguage { get; set; } = "en";
    public int PermissionsVersion { get; set; } = 1;
    public int FailedLoginAttempts { get; set; }
    public DateTimeOffset? LockedUntil { get; set; }
    public string? ProtectedTotpSecret { get; set; }
    public long LastTotpStep { get; set; } = -1;
    public DateTimeOffset? DeactivatedAt { get; set; }
    public Guid ConcurrencyStamp { get; set; } = Guid.NewGuid();
    public Guid? BranchId { get; set; } = default!;
    public bool MfaEnabled { get; set; } = default!;
}
