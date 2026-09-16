using BuyersSalesLogistics.Domain.Common;
using BuyersSalesLogistics.Domain.Enums;

namespace BuyersSalesLogistics.Domain.Entities;

public class LogisticsShipment : BaseEntity
{
    public string ShipmentCode { get; set; } = default!;
    public Guid SalesContractId { get; set; } = default!;
    public string TransporterName { get; set; } = default!;
    public string DriverName { get; set; } = default!;
    public string VehiclePlate { get; set; } = default!;
    public Guid OriginWarehouseId { get; set; } = default!;
    public string Destination { get; set; } = default!;
    public decimal DispatchWeight { get; set; } = default!;
    public decimal ReceivedWeight { get; set; } = default!;
    public ShipmentStatus Status { get; set; } = default!;
}
