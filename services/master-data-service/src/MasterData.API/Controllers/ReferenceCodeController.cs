using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Auth;
using MasterData.Application.Interfaces;
using MasterData.Domain.Entities;

namespace MasterData.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ReferenceCodeController : ControllerBase
{
    private readonly IRepository<ReferenceCode> _repository;

    public ReferenceCodeController(IRepository<ReferenceCode> repository)
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
