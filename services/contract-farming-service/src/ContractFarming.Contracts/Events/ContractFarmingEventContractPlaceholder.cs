using Shared.Contracts.Events;

namespace ContractFarming.Contracts.Events;

public record ContractFarmingStatusChangedEvent(Guid EntityId, string OldStatus, string NewStatus) : BaseIntegrationEvent;
