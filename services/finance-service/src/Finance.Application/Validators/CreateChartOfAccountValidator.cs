using FluentValidation;
using Finance.Application.Commands;

namespace Finance.Application.Validators;

public class CreateChartOfAccountValidator : AbstractValidator<CreateChartOfAccountCommand>
{
    public CreateChartOfAccountValidator()
    {
    }
}
