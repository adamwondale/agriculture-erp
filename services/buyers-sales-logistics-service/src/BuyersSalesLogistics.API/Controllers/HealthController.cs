using Microsoft.AspNetCore.Mvc;

namespace BuyersSalesLogistics.API.Controllers;

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
            service = "BuyersSalesLogistics.API",
            database = "agri_buyers_sales_logistics_db",
            timestamp = DateTimeOffset.UtcNow
        });
    }
}
