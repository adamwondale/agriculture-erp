namespace Shared.Contracts.Events;

public abstract record BaseIntegrationEvent
{
    public Guid EventId { get; init; } = Guid.NewGuid();
    public DateTimeOffset Timestamp { get; init; } = DateTimeOffset.UtcNow;
    public string EventType => GetType().Name;
}
