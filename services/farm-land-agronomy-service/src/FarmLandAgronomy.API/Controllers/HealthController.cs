using Microsoft.AspNetCore.Mvc;

namespace FarmLandAgronomy.API.Controllers;

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
            service = "FarmLandAgronomy.API",
            database = "agri_farm_land_agronomy_db",
            timestamp = DateTimeOffset.UtcNow
        });
    }
}
