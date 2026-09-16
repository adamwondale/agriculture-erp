using Shared.Contracts.Events;

namespace MasterData.Contracts.Events;

public record MasterDataStatusChangedEvent(Guid EntityId, string OldStatus, string NewStatus) : BaseIntegrationEvent;
