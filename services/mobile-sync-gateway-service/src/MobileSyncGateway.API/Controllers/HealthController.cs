using Microsoft.AspNetCore.Mvc;

namespace MobileSyncGateway.API.Controllers;

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
            service = "MobileSyncGateway.API",
            database = "agri_mobile_sync_gateway_db",
            timestamp = DateTimeOffset.UtcNow
        });
    }
}
