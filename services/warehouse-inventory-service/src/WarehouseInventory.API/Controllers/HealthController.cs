using Microsoft.AspNetCore.Mvc;

namespace WarehouseInventory.API.Controllers;

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
            service = "WarehouseInventory.API",
            database = "agri_warehouse_inventory_db",
            timestamp = DateTimeOffset.UtcNow
        });
    }
}
