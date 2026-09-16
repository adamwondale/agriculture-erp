namespace Procurement.Domain.Exceptions;

public class ProcurementDomainException : Exception
{
    public ProcurementDomainException(string message) : base(message) { }
}
