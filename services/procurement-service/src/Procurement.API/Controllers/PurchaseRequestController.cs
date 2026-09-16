using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Auth;
using Procurement.Application.Interfaces;
using Procurement.Domain.Entities;

namespace Procurement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PurchaseRequestController : ControllerBase
{
    private readonly IRepository<PurchaseRequest> _repository;

    public PurchaseRequestController(IRepository<PurchaseRequest> repository)
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
