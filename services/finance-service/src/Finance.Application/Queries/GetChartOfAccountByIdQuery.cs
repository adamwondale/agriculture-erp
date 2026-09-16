using MediatR;
using Finance.Application.DTOs;

namespace Finance.Application.Queries;

public record GetChartOfAccountByIdQuery(Guid Id) : IRequest<ChartOfAccountDto?>;
