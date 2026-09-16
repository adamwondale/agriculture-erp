using Microsoft.AspNetCore.Mvc;

namespace ContractFarming.API.Controllers;

[ApiController]
[Route("[controller]")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            status = "Healthy",
            service = "ContractFarming.API",
            database = "agri_contract_farming_db",
            timestamp = DateTimeOffset.UtcNow
        });
    }
}
