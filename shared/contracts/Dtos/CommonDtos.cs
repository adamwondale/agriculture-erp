namespace Shared.Contracts.Dtos;

public record PagedResult<T>(
    IReadOnlyList<T> Items,
    int PageNumber,
    int PageSize,
    int TotalCount
);

public record GeoPolygonDto(
    string Type,
    double[][][] Coordinates
);
