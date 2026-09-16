using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Auth;
using HR.Application.Interfaces;
using HR.Domain.Entities;

namespace HR.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class EmployeeController : ControllerBase
{
    private readonly IRepository<Employee> _repository;

    public EmployeeController(IRepository<Employee> repository)
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
