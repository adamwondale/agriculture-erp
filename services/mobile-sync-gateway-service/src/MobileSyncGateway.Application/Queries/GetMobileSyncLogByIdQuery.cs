using MediatR;
using MobileSyncGateway.Application.DTOs;

namespace MobileSyncGateway.Application.Queries;

public record GetMobileSyncLogByIdQuery(Guid Id) : IRequest<MobileSyncLogDto?>;
