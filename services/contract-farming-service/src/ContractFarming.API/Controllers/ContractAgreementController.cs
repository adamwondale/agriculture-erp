using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Auth;
using ContractFarming.Application.Interfaces;
using ContractFarming.Domain.Entities;

namespace ContractFarming.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ContractAgreementController : ControllerBase
{
    private readonly IRepository<ContractAgreement> _repository;

    public ContractAgreementController(IRepository<ContractAgreement> repository)
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
