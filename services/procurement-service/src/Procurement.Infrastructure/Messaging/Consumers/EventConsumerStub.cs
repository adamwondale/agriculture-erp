using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Procurement.Infrastructure.Messaging.Consumers;

public class EventConsumerStub : BackgroundService
{
    private readonly ILogger<EventConsumerStub> _logger;

    public EventConsumerStub(ILogger<EventConsumerStub> logger)
    {
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Procurement Event Consumer background service active.");
        while (!stoppingToken.IsCancellationRequested)
        {
            await Task.Delay(10000, stoppingToken);
        }
    }
}
