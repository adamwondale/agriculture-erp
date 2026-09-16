using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Auth;
using AutomationWorkflow.Application.Interfaces;
using AutomationWorkflow.Domain.Entities;

namespace AutomationWorkflow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class SlaRuleController : ControllerBase
{
    private readonly IRepository<SlaRule> _repository;

    public SlaRuleController(IRepository<SlaRule> repository)
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
