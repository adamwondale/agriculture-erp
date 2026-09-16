using MediatR;
using FarmLandAgronomy.Application.DTOs;

namespace FarmLandAgronomy.Application.Queries;

public record GetFarmParcelByIdQuery(Guid Id) : IRequest<FarmParcelDto?>;
