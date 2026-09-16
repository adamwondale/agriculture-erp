using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Auth;
using IntegrationGateway.Application.Interfaces;
using IntegrationGateway.Domain.Entities;

namespace IntegrationGateway.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class GatewayTransactionLogController : ControllerBase
{
    private readonly IRepository<GatewayTransactionLog> _repository;

    public GatewayTransactionLogController(IRepository<GatewayTransactionLog> repository)
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
