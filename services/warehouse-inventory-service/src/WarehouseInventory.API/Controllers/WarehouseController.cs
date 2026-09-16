using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Auth;
using WarehouseInventory.Application.Interfaces;
using WarehouseInventory.Domain.Entities;

namespace WarehouseInventory.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class WarehouseController : ControllerBase
{
    private readonly IRepository<Warehouse> _repository;

    public WarehouseController(IRepository<Warehouse> repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _repository.ListAllAsync();
        return Ok(items);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var item = await _repository.GetByIdAsync(id);
        if (item == null) return NotFound();
        return Ok(item);
    }
}
