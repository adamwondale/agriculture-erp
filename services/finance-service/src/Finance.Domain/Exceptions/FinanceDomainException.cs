namespace Finance.Domain.Exceptions;

public class FinanceDomainException : Exception
{
    public FinanceDomainException(string message) : base(message) { }
}
