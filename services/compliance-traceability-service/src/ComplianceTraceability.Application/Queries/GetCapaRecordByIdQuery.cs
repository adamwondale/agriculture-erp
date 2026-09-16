using MediatR;
using ComplianceTraceability.Application.DTOs;

namespace ComplianceTraceability.Application.Queries;

public record GetCapaRecordByIdQuery(Guid Id) : IRequest<CapaRecordDto?>;
