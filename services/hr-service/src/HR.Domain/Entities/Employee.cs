using HR.Domain.Common;
using HR.Domain.Enums;

namespace HR.Domain.Entities;

public class Employee : BaseEntity
{
    public string EmployeeCode { get; set; } = default!;
    public string FullName { get; set; } = default!;
    public string NationalId { get; set; } = default!;
    public Guid DepartmentId { get; set; } = default!;
    public string Designation { get; set; } = default!;
    public EmploymentType EmploymentType { get; set; } = default!;
    public string BankAccountNo { get; set; } = default!;
    public EmployeeStatus Status { get; set; } = default!;
}
