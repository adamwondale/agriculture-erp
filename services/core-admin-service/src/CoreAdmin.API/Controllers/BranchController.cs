using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Auth;
using CoreAdmin.Application.Interfaces;
using CoreAdmin.Domain.Entities;

namespace CoreAdmin.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BranchController : ControllerBase
{
    private readonly IRepository<Branch> _repository;

    public BranchController(IRepository<Branch> repository)
    {
        _repository = repository;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Branch branch, CancellationToken ct) { if (string.IsNullOrWhiteSpace(branch.Code) || string.IsNullOrWhiteSpace(branch.Name)) return BadRequest(new { error = "Code and name are required" }); if (await _repository.ListAllAsync(ct) is var all && all.Any(x => x.Code == branch.Code)) return Conflict(); var created = await _repository.AddAsync(branch, ct); return CreatedAtAction(nameof(GetById), new { id = created.Id }, created); }

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


