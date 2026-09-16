using Shared.Contracts.Events;

namespace FarmerPartner.Contracts.Events;

public record FarmerPartnerStatusChangedEvent(Guid EntityId, string OldStatus, string NewStatus) : BaseIntegrationEvent;
