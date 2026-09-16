using Shared.Contracts.Events;

namespace IntegrationGateway.Contracts.Events;

public record IntegrationGatewayStatusChangedEvent(Guid EntityId, string OldStatus, string NewStatus) : BaseIntegrationEvent;
