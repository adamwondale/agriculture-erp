using Shared.Contracts.Events;

namespace HR.Contracts.Events;

public record HRStatusChangedEvent(Guid EntityId, string OldStatus, string NewStatus) : BaseIntegrationEvent;
