using MediatR;
using IntegrationGateway.Application.DTOs;

namespace IntegrationGateway.Application.Commands;

public record CreateGatewayTransactionLogCommand() : IRequest<GatewayTransactionLogDto>;
