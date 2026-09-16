using MediatR;
using CustomerInvestorPortal.Application.DTOs;

namespace CustomerInvestorPortal.Application.Queries;

public record GetPortalUserByIdQuery(Guid Id) : IRequest<PortalUserDto?>;
