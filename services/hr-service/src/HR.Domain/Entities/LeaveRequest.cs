using HR.Domain.Common;
using HR.Domain.Enums;

namespace HR.Domain.Entities;

public class LeaveRequest : BaseEntity
{
    public Guid EmployeeId { get; set; } = default!;
    public LeaveType Type { get; set; } = default!;
    public DateTimeOffset StartDate { get; set; } = default!;
    public DateTimeOffset EndDate { get; set; } = default!;
    public string Reason { get; set; } = default!;
    public LeaveStatus Status { get; set; } = default!;
}
