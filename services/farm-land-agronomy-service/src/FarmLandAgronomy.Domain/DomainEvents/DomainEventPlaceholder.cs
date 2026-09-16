namespace FarmLandAgronomy.Domain.DomainEvents;

public interface IDomainEvent
{
    DateTimeOffset OccurredOn { get; }
}
