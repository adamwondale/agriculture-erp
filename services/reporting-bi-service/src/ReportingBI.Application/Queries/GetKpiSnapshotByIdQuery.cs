using MediatR;
using ReportingBI.Application.DTOs;

namespace ReportingBI.Application.Queries;

public record GetKpiSnapshotByIdQuery(Guid Id) : IRequest<KpiSnapshotDto?>;
