namespace FarmerPartner.Domain.DomainEvents;

public interface IDomainEvent
{
    DateTimeOffset OccurredOn { get; }
}
