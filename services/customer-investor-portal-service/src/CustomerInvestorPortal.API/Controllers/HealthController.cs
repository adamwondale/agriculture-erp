using Microsoft.AspNetCore.Mvc;

namespace CustomerInvestorPortal.API.Controllers;

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
            service = "CustomerInvestorPortal.API",
            database = "agri_customer_investor_portal_db",
            timestamp = DateTimeOffset.UtcNow
        });
    }
}
