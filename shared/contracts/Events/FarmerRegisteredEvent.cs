namespace Shared.Contracts.Events;

public record FarmerRegisteredEvent(
    Guid FarmerId,
    string FarmerCode,
    string FullName,
    string NationalId,
    string Region,
    string PrimaryPhone
) : BaseIntegrationEvent;
