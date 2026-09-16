using MobileSyncGateway.Domain.Common;
using MobileSyncGateway.Domain.Enums;

namespace MobileSyncGateway.Domain.Entities;

public class SyncQueueItem : BaseEntity
{
    public string Payload { get; set; } = default!;
    public string TargetService { get; set; } = default!;
    public string IdempotencyKey { get; set; } = default!;
    public DateTimeOffset? ProcessedAt { get; set; } = default!;
}
