namespace WarehouseInventory.Domain.Exceptions;

public class WarehouseInventoryDomainException : Exception
{
    public WarehouseInventoryDomainException(string message) : base(message) { }
}
