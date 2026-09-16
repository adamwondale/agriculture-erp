using WarehouseInventory.Domain.Common;
using WarehouseInventory.Domain.Enums;

namespace WarehouseInventory.Domain.Entities;

public class Warehouse : BaseEntity
{
    public string Code { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string Location { get; set; } = default!;
    public decimal CapacityQuintals { get; set; } = default!;
}
