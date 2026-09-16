using Microsoft.AspNetCore.Mvc;

namespace HR.API.Controllers;

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
            service = "HR.API",
            database = "agri_hr_db",
            timestamp = DateTimeOffset.UtcNow
        });
    }
}
