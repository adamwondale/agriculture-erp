using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace MasterData.Infrastructure.Messaging.Consumers;

public class EventConsumerStub : BackgroundService
{
    private readonly ILogger<EventConsumerStub> _logger;

    public EventConsumerStub(ILogger<EventConsumerStub> logger)
    {
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("MasterData Event Consumer background service active.");
        while (!stoppingToken.IsCancellationRequested)
        {
            await Task.Delay(10000, stoppingToken);
        }
    }
}
