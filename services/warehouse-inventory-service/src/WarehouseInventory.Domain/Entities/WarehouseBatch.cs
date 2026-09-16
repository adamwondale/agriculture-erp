using WarehouseInventory.Domain.Common;
using WarehouseInventory.Domain.Enums;

namespace WarehouseInventory.Domain.Entities;

public class WarehouseBatch : BaseEntity
{
    public string BatchCode { get; set; } = default!;
    public Guid WarehouseId { get; set; } = default!;
    public Guid ContractId { get; set; } = default!;
    public decimal NetWeightQuintals { get; set; } = default!;
    public decimal MoisturePercentage { get; set; } = default!;
    public decimal PurityPercentage { get; set; } = default!;
    public QualityGrade QualityGrade { get; set; } = default!;
    public BatchStatus Status { get; set; } = default!;
}
