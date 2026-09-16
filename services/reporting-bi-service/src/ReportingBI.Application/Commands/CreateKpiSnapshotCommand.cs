using MediatR;
using ReportingBI.Application.DTOs;

namespace ReportingBI.Application.Commands;

public record CreateKpiSnapshotCommand() : IRequest<KpiSnapshotDto>;
