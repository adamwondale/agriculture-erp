using FluentValidation;
using AutomationWorkflow.Application.Commands;

namespace AutomationWorkflow.Application.Validators;

public class CreateSlaRuleValidator : AbstractValidator<CreateSlaRuleCommand>
{
    public CreateSlaRuleValidator()
    {
    }
}
