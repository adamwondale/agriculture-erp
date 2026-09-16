using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Auth;
using Finance.Application.Interfaces;
using Finance.Domain.Entities;

namespace Finance.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ChartOfAccountController : ControllerBase
{
    private readonly IRepository<ChartOfAccount> _repository;

    public ChartOfAccountController(IRepository<ChartOfAccount> repository)
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
