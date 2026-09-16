using MediatR;
using MasterData.Application.DTOs;

namespace MasterData.Application.Queries;

public record GetReferenceCodeByIdQuery(Guid Id) : IRequest<ReferenceCodeDto?>;
