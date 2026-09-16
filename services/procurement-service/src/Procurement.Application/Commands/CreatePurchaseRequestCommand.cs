using MediatR;
using Procurement.Application.DTOs;

namespace Procurement.Application.Commands;

public record CreatePurchaseRequestCommand() : IRequest<PurchaseRequestDto>;
