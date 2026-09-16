using MediatR;
using MasterData.Application.DTOs;

namespace MasterData.Application.Commands;

public record CreateReferenceCodeCommand() : IRequest<ReferenceCodeDto>;
