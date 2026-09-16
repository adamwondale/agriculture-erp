using MediatR;
using IntegrationGateway.Application.DTOs;

namespace IntegrationGateway.Application.Queries;

public record GetGatewayTransactionLogByIdQuery(Guid Id) : IRequest<GatewayTransactionLogDto?>;
