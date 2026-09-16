using MediatR;
using WarehouseInventory.Application.DTOs;

namespace WarehouseInventory.Application.Queries;

public record GetWarehouseByIdQuery(Guid Id) : IRequest<WarehouseDto?>;
