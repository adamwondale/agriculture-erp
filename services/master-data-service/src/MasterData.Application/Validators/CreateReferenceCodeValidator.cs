using FluentValidation;
using MasterData.Application.Commands;

namespace MasterData.Application.Validators;

public class CreateReferenceCodeValidator : AbstractValidator<CreateReferenceCodeCommand>
{
    public CreateReferenceCodeValidator()
    {
    }
}
