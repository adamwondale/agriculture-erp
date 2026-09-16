using FluentValidation;
using ComplianceTraceability.Application.Commands;

namespace ComplianceTraceability.Application.Validators;

public class CreateCapaRecordValidator : AbstractValidator<CreateCapaRecordCommand>
{
    public CreateCapaRecordValidator()
    {
    }
}
