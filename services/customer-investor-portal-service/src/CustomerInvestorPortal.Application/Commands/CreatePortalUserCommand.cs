using MediatR;
using CustomerInvestorPortal.Application.DTOs;

namespace CustomerInvestorPortal.Application.Commands;

public record CreatePortalUserCommand() : IRequest<PortalUserDto>;
