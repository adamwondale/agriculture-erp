namespace HR.Domain.Exceptions;

public class HRDomainException : Exception
{
    public HRDomainException(string message) : base(message) { }
}
