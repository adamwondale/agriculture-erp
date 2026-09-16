using MobileSyncGateway.Domain.Common;
using MobileSyncGateway.Domain.Enums;

namespace MobileSyncGateway.Domain.Entities;

public class MobileSyncLog : BaseEntity
{
    public string DeviceId { get; set; } = default!;
    public Guid AgronomistId { get; set; } = default!;
    public DateTimeOffset SyncTimestamp { get; set; } = default!;
    public int RecordsProcessed { get; set; } = default!;
    public int ConflictCount { get; set; } = default!;
    public SyncStatus Status { get; set; } = default!;
}
