namespace CoreAdmin.Domain.Exceptions;

public class CoreAdminDomainException : Exception
{
    public CoreAdminDomainException(string message) : base(message) { }
}
