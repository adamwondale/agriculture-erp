using BuyersSalesLogistics.Domain.Common;
using BuyersSalesLogistics.Domain.Enums;

namespace BuyersSalesLogistics.Domain.Entities;

public class Buyer : BaseEntity
{
    public string LegalName { get; set; } = default!;
    public string TinNumber { get; set; } = default!;
    public decimal CreditLimit { get; set; } = default!;
    public string Country { get; set; } = default!;
}
