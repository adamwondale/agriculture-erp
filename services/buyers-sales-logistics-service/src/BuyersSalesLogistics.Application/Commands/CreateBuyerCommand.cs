using MediatR;
using BuyersSalesLogistics.Application.DTOs;

namespace BuyersSalesLogistics.Application.Commands;

public record CreateBuyerCommand() : IRequest<BuyerDto>;
