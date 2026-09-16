using Shared.Contracts.Events;

namespace ReportingBI.Contracts.Events;

public record ReportingBIStatusChangedEvent(Guid EntityId, string OldStatus, string NewStatus) : BaseIntegrationEvent;
