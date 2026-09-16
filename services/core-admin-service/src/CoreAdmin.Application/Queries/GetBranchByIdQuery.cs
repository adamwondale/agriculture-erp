using MediatR;
using CoreAdmin.Application.DTOs;

namespace CoreAdmin.Application.Queries;

public record GetBranchByIdQuery(Guid Id) : IRequest<BranchDto?>;
