using Shared.Contracts.Events;

namespace WarehouseInventory.Contracts.Events;

public record WarehouseInventoryStatusChangedEvent(Guid EntityId, string OldStatus, string NewStatus) : BaseIntegrationEvent;
