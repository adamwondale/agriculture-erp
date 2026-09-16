using FluentValidation;
using ContractFarming.Application.Commands;

namespace ContractFarming.Application.Validators;

public class CreateContractAgreementValidator : AbstractValidator<CreateContractAgreementCommand>
{
    public CreateContractAgreementValidator()
    {
    }
}
