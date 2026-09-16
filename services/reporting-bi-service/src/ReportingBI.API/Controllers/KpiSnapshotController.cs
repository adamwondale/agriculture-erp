using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Auth;
using ReportingBI.Application.Interfaces;
using ReportingBI.Domain.Entities;

namespace ReportingBI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class KpiSnapshotController : ControllerBase
{
    private readonly IRepository<KpiSnapshot> _repository;

    public KpiSnapshotController(IRepository<KpiSnapshot> repository)
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
