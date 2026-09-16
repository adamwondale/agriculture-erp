using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Auth;
using ComplianceTraceability.Application.Interfaces;
using ComplianceTraceability.Domain.Entities;

namespace ComplianceTraceability.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CapaRecordController : ControllerBase
{
    private readonly IRepository<CapaRecord> _repository;

    public CapaRecordController(IRepository<CapaRecord> repository)
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
