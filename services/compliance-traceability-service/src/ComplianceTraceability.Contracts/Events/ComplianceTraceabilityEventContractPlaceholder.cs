using Shared.Contracts.Events;

namespace ComplianceTraceability.Contracts.Events;

public record ComplianceTraceabilityStatusChangedEvent(Guid EntityId, string OldStatus, string NewStatus) : BaseIntegrationEvent;
