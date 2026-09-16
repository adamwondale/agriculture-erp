using Shared.Contracts.Events;

namespace Procurement.Contracts.Events;

public record ProcurementStatusChangedEvent(Guid EntityId, string OldStatus, string NewStatus) : BaseIntegrationEvent;
