using IntegrationGateway.Domain.Common;
using IntegrationGateway.Domain.Enums;

namespace IntegrationGateway.Domain.Entities;

public class ProviderConfig : BaseEntity
{
    public string ProviderName { get; set; } = default!;
    public bool IsActive { get; set; } = default!;
    public int PriorityOrder { get; set; } = default!;
}
