using Microsoft.AspNetCore.Mvc;

namespace FarmerPartner.API.Controllers;

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
            service = "FarmerPartner.API",
            database = "agri_farmer_partner_db",
            timestamp = DateTimeOffset.UtcNow
        });
    }
}
