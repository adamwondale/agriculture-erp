using IntegrationGateway.Domain.Common;
using IntegrationGateway.Domain.Enums;

namespace IntegrationGateway.Domain.Entities;

public class GatewayTransactionLog : BaseEntity
{
    public string GatewayName { get; set; } = default!;
    public string TransactionReference { get; set; } = default!;
    public string RequestPayload { get; set; } = default!;
    public string ResponsePayload { get; set; } = default!;
    public GatewayStatus Status { get; set; } = default!;
}
