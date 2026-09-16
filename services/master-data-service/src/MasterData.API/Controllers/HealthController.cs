using Microsoft.AspNetCore.Mvc;

namespace MasterData.API.Controllers;

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
            service = "MasterData.API",
            database = "agri_master_data_db",
            timestamp = DateTimeOffset.UtcNow
        });
    }
}
