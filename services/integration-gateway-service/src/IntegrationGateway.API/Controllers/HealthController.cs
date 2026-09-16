using Microsoft.AspNetCore.Mvc;

namespace IntegrationGateway.API.Controllers;

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
            service = "IntegrationGateway.API",
            database = "agri_integration_gateway_db",
            timestamp = DateTimeOffset.UtcNow
        });
    }
}
