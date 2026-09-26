using CoreAdmin.Domain.Common;
using CoreAdmin.Domain.Enums;

namespace CoreAdmin.Domain.Entities;

public class Branch : BaseEntity
{
    public Guid OrganizationId { get; set; }
    public Guid? ParentBranchId { get; set; }
    public string Level { get; set; } = "HQ";
    public string Country { get; set; } = "Ethiopia";
    public string Code { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string Region { get; set; } = default!;
    public string Zone { get; set; } = default!;
    public string Woreda { get; set; } = default!;
    public string Kebele { get; set; } = default!;
    public BranchStatus Status { get; set; } = default!;
}
