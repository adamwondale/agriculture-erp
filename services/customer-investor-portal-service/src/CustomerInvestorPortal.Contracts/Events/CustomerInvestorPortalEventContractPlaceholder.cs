using Shared.Contracts.Events;

namespace CustomerInvestorPortal.Contracts.Events;

public record CustomerInvestorPortalStatusChangedEvent(Guid EntityId, string OldStatus, string NewStatus) : BaseIntegrationEvent;
