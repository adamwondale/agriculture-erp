using ComplianceTraceability.Domain.Common;
using ComplianceTraceability.Domain.Enums;

namespace ComplianceTraceability.Domain.Entities;

public class TraceabilityBatchLink : BaseEntity
{
    public Guid BatchId { get; set; } = default!;
    public Guid ParcelId { get; set; } = default!;
    public Guid FarmerId { get; set; } = default!;
    public DateTimeOffset HarvestDate { get; set; } = default!;
    public EudrComplianceStatus EudrComplianceStatus { get; set; } = default!;
}
