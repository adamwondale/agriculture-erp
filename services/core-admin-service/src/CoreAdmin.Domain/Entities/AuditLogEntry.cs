using CoreAdmin.Domain.Common;
using CoreAdmin.Domain.Enums;

namespace CoreAdmin.Domain.Entities;

public class AuditLogEntry : BaseEntity
{
    public string EntityName { get; set; } = default!;
    public string Action { get; set; } = default!;
    public string PerformedBy { get; set; } = default!;
    public string BeforeState { get; set; } = default!;
    public string AfterState { get; set; } = default!;
}
