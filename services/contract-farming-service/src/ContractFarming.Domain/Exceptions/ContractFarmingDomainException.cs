namespace ContractFarming.Domain.Exceptions;

public class ContractFarmingDomainException : Exception
{
    public ContractFarmingDomainException(string message) : base(message) { }
}
