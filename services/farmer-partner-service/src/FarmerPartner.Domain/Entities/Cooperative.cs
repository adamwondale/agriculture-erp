using FarmerPartner.Domain.Common;
using FarmerPartner.Domain.Enums;

namespace FarmerPartner.Domain.Entities;

public class Cooperative : BaseEntity
{
    public string Code { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string RegistrationNumber { get; set; } = default!;
    public string ContactPerson { get; set; } = default!;
    public string PrimaryPhone { get; set; } = default!;
}
