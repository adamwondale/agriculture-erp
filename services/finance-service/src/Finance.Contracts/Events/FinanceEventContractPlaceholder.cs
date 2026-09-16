using Shared.Contracts.Events;

namespace Finance.Contracts.Events;

public record FinanceStatusChangedEvent(Guid EntityId, string OldStatus, string NewStatus) : BaseIntegrationEvent;
