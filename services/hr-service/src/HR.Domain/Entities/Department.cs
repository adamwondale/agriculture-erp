using HR.Domain.Common;
using HR.Domain.Enums;

namespace HR.Domain.Entities;

public class Department : BaseEntity
{
    public string Code { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string Description { get; set; } = default!;
}
