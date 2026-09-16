using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Auth;
using BuyersSalesLogistics.Application.Interfaces;
using BuyersSalesLogistics.Domain.Entities;

namespace BuyersSalesLogistics.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BuyerController : ControllerBase
{
    private readonly IRepository<Buyer> _repository;

    public BuyerController(IRepository<Buyer> repository)
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
