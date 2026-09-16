using FluentValidation;
using IntegrationGateway.Application.Commands;

namespace IntegrationGateway.Application.Validators;

public class CreateGatewayTransactionLogValidator : AbstractValidator<CreateGatewayTransactionLogCommand>
{
    public CreateGatewayTransactionLogValidator()
    {
    }
}
