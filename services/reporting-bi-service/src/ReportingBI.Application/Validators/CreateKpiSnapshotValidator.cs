using FluentValidation;
using ReportingBI.Application.Commands;

namespace ReportingBI.Application.Validators;

public class CreateKpiSnapshotValidator : AbstractValidator<CreateKpiSnapshotCommand>
{
    public CreateKpiSnapshotValidator()
    {
    }
}
