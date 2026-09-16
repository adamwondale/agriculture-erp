using Microsoft.AspNetCore.Mvc;

namespace AutomationWorkflow.API.Controllers;

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
            service = "AutomationWorkflow.API",
            database = "agri_automation_workflow_db",
            timestamp = DateTimeOffset.UtcNow
        });
    }
}
