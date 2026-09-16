using FluentValidation;
using CoreAdmin.Application.Commands;

namespace CoreAdmin.Application.Validators;

public class CreateBranchValidator : AbstractValidator<CreateBranchCommand>
{
    public CreateBranchValidator()
    {
    }
}
