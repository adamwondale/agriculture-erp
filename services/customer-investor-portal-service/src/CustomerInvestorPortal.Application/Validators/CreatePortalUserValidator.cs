using FluentValidation;
using CustomerInvestorPortal.Application.Commands;

namespace CustomerInvestorPortal.Application.Validators;

public class CreatePortalUserValidator : AbstractValidator<CreatePortalUserCommand>
{
    public CreatePortalUserValidator()
    {
    }
}
