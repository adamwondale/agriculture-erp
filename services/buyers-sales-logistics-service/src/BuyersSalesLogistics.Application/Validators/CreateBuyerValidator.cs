using FluentValidation;
using BuyersSalesLogistics.Application.Commands;

namespace BuyersSalesLogistics.Application.Validators;

public class CreateBuyerValidator : AbstractValidator<CreateBuyerCommand>
{
    public CreateBuyerValidator()
    {
    }
}
