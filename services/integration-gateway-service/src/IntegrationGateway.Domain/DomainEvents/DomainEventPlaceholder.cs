namespace IntegrationGateway.Domain.DomainEvents;

public interface IDomainEvent
{
    DateTimeOffset OccurredOn { get; }
}
