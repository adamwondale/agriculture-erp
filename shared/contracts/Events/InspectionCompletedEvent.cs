namespace Shared.Contracts.Events;

public record InspectionCompletedEvent(
    Guid InspectionId,
    Guid ParcelId,
    Guid AgronomistId,
    int HealthScore,
    bool PestDiseaseDetected,
    decimal SeverityPercentage,
    DateTimeOffset InspectionDate
) : BaseIntegrationEvent;
