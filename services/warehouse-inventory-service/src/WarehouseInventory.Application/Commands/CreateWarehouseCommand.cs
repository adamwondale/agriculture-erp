using MediatR;
using WarehouseInventory.Application.DTOs;

namespace WarehouseInventory.Application.Commands;

public record CreateWarehouseCommand() : IRequest<WarehouseDto>;
