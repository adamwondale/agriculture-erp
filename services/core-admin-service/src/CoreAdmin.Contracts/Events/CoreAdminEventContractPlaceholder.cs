using Shared.Contracts.Events;

namespace CoreAdmin.Contracts.Events;

public record CoreAdminStatusChangedEvent(Guid EntityId, string OldStatus, string NewStatus) : BaseIntegrationEvent;
