using FluentValidation;
using FarmLandAgronomy.Application.Commands;

namespace FarmLandAgronomy.Application.Validators;

public class CreateFarmParcelValidator : AbstractValidator<CreateFarmParcelCommand>
{
    public CreateFarmParcelValidator()
    {
    }
}
