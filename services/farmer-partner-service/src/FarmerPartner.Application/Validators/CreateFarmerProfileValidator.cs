using FluentValidation;
using FarmerPartner.Application.Commands;

namespace FarmerPartner.Application.Validators;

public class CreateFarmerProfileValidator : AbstractValidator<CreateFarmerProfileCommand>
{
    public CreateFarmerProfileValidator()
    {
    }
}
