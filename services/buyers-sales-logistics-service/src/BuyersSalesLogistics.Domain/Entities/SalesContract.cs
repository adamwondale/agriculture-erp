using BuyersSalesLogistics.Domain.Common;
using BuyersSalesLogistics.Domain.Enums;

namespace BuyersSalesLogistics.Domain.Entities;

public class SalesContract : BaseEntity
{
    public string ContractCode { get; set; } = default!;
    public Guid BuyerId { get; set; } = default!;
    public string Commodity { get; set; } = default!;
    public decimal OrderedQuantityMt { get; set; } = default!;
    public decimal UnitPriceUsd { get; set; } = default!;
    public string Incoterms { get; set; } = default!;
    public string PaymentTerms { get; set; } = default!;
    public SalesContractStatus Status { get; set; } = default!;
}
