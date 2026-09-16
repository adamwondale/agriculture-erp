using AutomationWorkflow.Domain.Common;
using AutomationWorkflow.Domain.Enums;

namespace AutomationWorkflow.Domain.Entities;

public class SlaRule : BaseEntity
{
    public string TaskType { get; set; } = default!;
    public int WarningThresholdHours { get; set; } = default!;
    public int EscalationThresholdHours { get; set; } = default!;
    public string EscalationRole { get; set; } = default!;
    public SlaRuleStatus Status { get; set; } = default!;
}
