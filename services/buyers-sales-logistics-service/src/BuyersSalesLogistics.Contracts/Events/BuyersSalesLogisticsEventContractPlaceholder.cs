using Shared.Contracts.Events;

namespace BuyersSalesLogistics.Contracts.Events;

public record BuyersSalesLogisticsStatusChangedEvent(Guid EntityId, string OldStatus, string NewStatus) : BaseIntegrationEvent;
