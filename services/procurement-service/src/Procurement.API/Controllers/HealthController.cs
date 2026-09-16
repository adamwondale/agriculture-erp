using Microsoft.AspNetCore.Mvc;

namespace Procurement.API.Controllers;

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
            service = "Procurement.API",
            database = "agri_procurement_db",
            timestamp = DateTimeOffset.UtcNow
        });
    }
}
