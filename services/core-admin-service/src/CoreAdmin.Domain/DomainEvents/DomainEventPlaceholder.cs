namespace CoreAdmin.Domain.DomainEvents;

public interface IDomainEvent
{
    DateTimeOffset OccurredOn { get; }
}
