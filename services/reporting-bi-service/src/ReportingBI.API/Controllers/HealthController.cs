using Microsoft.AspNetCore.Mvc;

namespace ReportingBI.API.Controllers;

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
            service = "ReportingBI.API",
            database = "agri_reporting_bi_db",
            timestamp = DateTimeOffset.UtcNow
        });
    }
}
