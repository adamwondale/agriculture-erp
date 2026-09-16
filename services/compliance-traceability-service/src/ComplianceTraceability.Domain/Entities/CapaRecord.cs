using ComplianceTraceability.Domain.Common;
using ComplianceTraceability.Domain.Enums;

namespace ComplianceTraceability.Domain.Entities;

public class CapaRecord : BaseEntity
{
    public string AuditFindingCode { get; set; } = default!;
    public string CertificationStandard { get; set; } = default!;
    public string NonConformanceDescription { get; set; } = default!;
    public Guid AssignedOwnerId { get; set; } = default!;
    public DateTimeOffset DeadlineDate { get; set; } = default!;
    public CapaStatus Status { get; set; } = default!;
}
