using MediatR;
using Procurement.Application.DTOs;

namespace Procurement.Application.Queries;

public record GetPurchaseRequestByIdQuery(Guid Id) : IRequest<PurchaseRequestDto?>;
