using WarehouseInventory.Domain.Common;
using WarehouseInventory.Domain.Enums;

namespace WarehouseInventory.Domain.Entities;

public class StockTransfer : BaseEntity
{
    public string TransferCode { get; set; } = default!;
    public Guid SourceWarehouseId { get; set; } = default!;
    public Guid DestinationWarehouseId { get; set; } = default!;
    public Guid BatchId { get; set; } = default!;
    public decimal QuantityQuintals { get; set; } = default!;
    public TransferStatus Status { get; set; } = default!;
}
