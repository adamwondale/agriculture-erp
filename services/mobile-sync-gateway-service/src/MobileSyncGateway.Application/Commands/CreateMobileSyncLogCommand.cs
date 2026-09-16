using MediatR;
using MobileSyncGateway.Application.DTOs;

namespace MobileSyncGateway.Application.Commands;

public record CreateMobileSyncLogCommand() : IRequest<MobileSyncLogDto>;
