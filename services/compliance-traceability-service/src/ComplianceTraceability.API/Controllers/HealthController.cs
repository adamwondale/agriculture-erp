using Microsoft.AspNetCore.Mvc;

namespace ComplianceTraceability.API.Controllers;

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
            service = "ComplianceTraceability.API",
            database = "agri_compliance_traceability_db",
            timestamp = DateTimeOffset.UtcNow
        });
    }
}
