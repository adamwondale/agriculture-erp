using MediatR;
using FarmerPartner.Application.DTOs;

namespace FarmerPartner.Application.Queries;

public record GetFarmerProfileByIdQuery(Guid Id) : IRequest<FarmerProfileDto?>;
