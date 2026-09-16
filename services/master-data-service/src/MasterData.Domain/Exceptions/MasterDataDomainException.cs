namespace MasterData.Domain.Exceptions;

public class MasterDataDomainException : Exception
{
    public MasterDataDomainException(string message) : base(message) { }
}
