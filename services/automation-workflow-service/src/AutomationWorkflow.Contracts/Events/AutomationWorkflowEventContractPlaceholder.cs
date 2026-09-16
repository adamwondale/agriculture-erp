using Shared.Contracts.Events;

namespace AutomationWorkflow.Contracts.Events;

public record AutomationWorkflowStatusChangedEvent(Guid EntityId, string OldStatus, string NewStatus) : BaseIntegrationEvent;
