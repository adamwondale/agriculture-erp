using MediatR;
using Finance.Application.DTOs;

namespace Finance.Application.Commands;

public record CreateChartOfAccountCommand() : IRequest<ChartOfAccountDto>;
