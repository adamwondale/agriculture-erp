namespace Shared.Contracts.Events;

public record SyncBatchReceivedEvent(
    string DeviceId,
    Guid AgronomistId,
    int RecordCount,
    DateTimeOffset SyncTimestamp
) : BaseIntegrationEvent;
