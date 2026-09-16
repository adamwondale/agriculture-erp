using MediatR;
using FarmerPartner.Application.DTOs;

namespace FarmerPartner.Application.Commands;

public record CreateFarmerProfileCommand() : IRequest<FarmerProfileDto>;
