using AutomationWorkflow.Domain.Common;
using AutomationWorkflow.Domain.Enums;

namespace AutomationWorkflow.Domain.Entities;

public class ScheduledEscalation : BaseEntity
{
    public string EntityType { get; set; } = default!;
    public Guid EntityId { get; set; } = default!;
    public DateTimeOffset DueAt { get; set; } = default!;
    public string Status { get; set; } = default!;
}
