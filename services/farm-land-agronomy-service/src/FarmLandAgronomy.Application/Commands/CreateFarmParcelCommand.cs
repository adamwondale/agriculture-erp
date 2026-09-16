using MediatR;
using FarmLandAgronomy.Application.DTOs;

namespace FarmLandAgronomy.Application.Commands;

public record CreateFarmParcelCommand() : IRequest<FarmParcelDto>;
