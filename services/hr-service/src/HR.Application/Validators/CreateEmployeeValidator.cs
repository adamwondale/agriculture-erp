using FluentValidation;
using HR.Application.Commands;

namespace HR.Application.Validators;

public class CreateEmployeeValidator : AbstractValidator<CreateEmployeeCommand>
{
    public CreateEmployeeValidator()
    {
    }
}
