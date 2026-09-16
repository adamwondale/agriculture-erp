using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Auth;
using CustomerInvestorPortal.Application.Interfaces;
using CustomerInvestorPortal.Domain.Entities;

namespace CustomerInvestorPortal.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PortalUserController : ControllerBase
{
    private readonly IRepository<PortalUser> _repository;

    public PortalUserController(IRepository<PortalUser> repository)
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
