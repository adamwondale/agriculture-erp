using MediatR;
using ComplianceTraceability.Application.DTOs;

namespace ComplianceTraceability.Application.Commands;

public record CreateCapaRecordCommand() : IRequest<CapaRecordDto>;
