using CoreAdmin.Domain.Common;
using CoreAdmin.Domain.Enums;

namespace CoreAdmin.Domain.Entities;

public class AuditLogEntry : BaseEntity
{
    public Guid? OrganizationId { get; set; }
    public string EntityId { get; set; } = "";
    public string Reason { get; set; } = "";
    public string IpAddress { get; set; } = "";
    public string DeviceInfo { get; set; } = "";
    public string EntityName { get; set; } = default!;
    public string Action { get; set; } = default!;
    public string PerformedBy { get; set; } = default!;
    public string BeforeState { get; set; } = "{}";
    public string AfterState { get; set; } = "{}";
}
