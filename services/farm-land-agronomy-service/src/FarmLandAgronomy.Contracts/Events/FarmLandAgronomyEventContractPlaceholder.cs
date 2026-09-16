using Shared.Contracts.Events;

namespace FarmLandAgronomy.Contracts.Events;

public record FarmLandAgronomyStatusChangedEvent(Guid EntityId, string OldStatus, string NewStatus) : BaseIntegrationEvent;
