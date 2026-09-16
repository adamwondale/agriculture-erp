using FluentValidation;
using MobileSyncGateway.Application.Commands;

namespace MobileSyncGateway.Application.Validators;

public class CreateMobileSyncLogValidator : AbstractValidator<CreateMobileSyncLogCommand>
{
    public CreateMobileSyncLogValidator()
    {
    }
}
