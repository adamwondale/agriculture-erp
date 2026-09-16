using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Auth;
using FarmerPartner.Application.Interfaces;
using FarmerPartner.Domain.Entities;

namespace FarmerPartner.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class FarmerProfileController : ControllerBase
{
    private readonly IRepository<FarmerProfile> _repository;

    public FarmerProfileController(IRepository<FarmerProfile> repository)
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
