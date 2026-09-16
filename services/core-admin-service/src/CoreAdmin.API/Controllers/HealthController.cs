using Microsoft.AspNetCore.Mvc;

namespace CoreAdmin.API.Controllers;

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
            service = "CoreAdmin.API",
            database = "agri_core_admin_db",
            timestamp = DateTimeOffset.UtcNow
        });
    }
}
