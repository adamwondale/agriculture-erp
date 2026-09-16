namespace Shared.Contracts.Events;

public record PaymentSettledEvent(
    Guid SettlementId,
    Guid ContractId,
    decimal GrossValue,
    decimal NetPayable,
    string PaymentChannel,
    string Status
) : BaseIntegrationEvent;
