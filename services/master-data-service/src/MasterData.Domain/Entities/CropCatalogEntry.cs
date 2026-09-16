using MasterData.Domain.Common;
using MasterData.Domain.Enums;

namespace MasterData.Domain.Entities;

public class CropCatalogEntry : BaseEntity
{
    public string CropCode { get; set; } = default!;
    public string CommonName { get; set; } = default!;
    public string ScientificName { get; set; } = default!;
    public string Category { get; set; } = default!;
    public int MaturityDaysMin { get; set; } = default!;
    public int MaturityDaysMax { get; set; } = default!;
}
