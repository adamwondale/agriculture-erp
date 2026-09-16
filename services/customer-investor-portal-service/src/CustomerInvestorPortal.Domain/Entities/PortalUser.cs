using CustomerInvestorPortal.Domain.Common;
using CustomerInvestorPortal.Domain.Enums;

namespace CustomerInvestorPortal.Domain.Entities;

public class PortalUser : BaseEntity
{
    public string UserEmail { get; set; } = default!;
    public PortalRole PortalRole { get; set; } = default!;
    public Guid AssociatedEntityId { get; set; } = default!;
    public PortalUserStatus Status { get; set; } = default!;
}
