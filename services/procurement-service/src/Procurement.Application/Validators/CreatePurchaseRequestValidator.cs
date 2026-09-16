using FluentValidation;
using Procurement.Application.Commands;

namespace Procurement.Application.Validators;

public class CreatePurchaseRequestValidator : AbstractValidator<CreatePurchaseRequestCommand>
{
    public CreatePurchaseRequestValidator()
    {
    }
}
