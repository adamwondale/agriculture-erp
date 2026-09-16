using Shared.Contracts.Events;

namespace MobileSyncGateway.Contracts.Events;

public record MobileSyncGatewayStatusChangedEvent(Guid EntityId, string OldStatus, string NewStatus) : BaseIntegrationEvent;
