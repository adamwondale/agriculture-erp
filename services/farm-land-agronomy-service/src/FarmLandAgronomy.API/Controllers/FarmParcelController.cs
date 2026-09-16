using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Auth;
using FarmLandAgronomy.Application.Interfaces;
using FarmLandAgronomy.Domain.Entities;

namespace FarmLandAgronomy.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class FarmParcelController : ControllerBase
{
    private readonly IRepository<FarmParcel> _repository;

    public FarmParcelController(IRepository<FarmParcel> repository)
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
