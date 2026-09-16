using MediatR;
using HR.Application.DTOs;

namespace HR.Application.Commands;

public record CreateEmployeeCommand() : IRequest<EmployeeDto>;
