using MediatR;
using BuyersSalesLogistics.Application.DTOs;

namespace BuyersSalesLogistics.Application.Queries;

public record GetBuyerByIdQuery(Guid Id) : IRequest<BuyerDto?>;
