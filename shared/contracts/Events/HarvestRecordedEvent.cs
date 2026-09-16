namespace Shared.Contracts.Events;

public record HarvestRecordedEvent(
    Guid BatchId,
    Guid ContractId,
    Guid ParcelId,
    decimal NetWeightQuintals,
    decimal MoisturePercentage,
    string QualityGrade,
    DateTimeOffset HarvestDate
) : BaseIntegrationEvent;
