using MediatR;
using CoreAdmin.Application.DTOs;

namespace CoreAdmin.Application.Commands;

public record CreateBranchCommand() : IRequest<BranchDto>;
