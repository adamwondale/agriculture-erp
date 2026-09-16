namespace WarehouseInventory.Domain.DomainEvents;

public interface IDomainEvent
{
    DateTimeOffset OccurredOn { get; }
}
