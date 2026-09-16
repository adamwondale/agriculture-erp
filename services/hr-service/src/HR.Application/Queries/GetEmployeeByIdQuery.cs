using MediatR;
using HR.Application.DTOs;

namespace HR.Application.Queries;

public record GetEmployeeByIdQuery(Guid Id) : IRequest<EmployeeDto?>;
