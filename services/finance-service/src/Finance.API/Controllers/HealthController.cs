using Microsoft.AspNetCore.Mvc;

namespace Finance.API.Controllers;

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
            service = "Finance.API",
            database = "agri_finance_db",
            timestamp = DateTimeOffset.UtcNow
        });
    }
}
