using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client;
using Shared.Contracts.Events;
using Finance.Application.Interfaces;

namespace Finance.Infrastructure.Messaging.Publishers;

public class RabbitMqEventPublisher : IEventPublisher
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<RabbitMqEventPublisher> _logger;
    private readonly string _exchange;

    public RabbitMqEventPublisher(IConfiguration configuration, ILogger<RabbitMqEventPublisher> logger)
    {
        _configuration = configuration;
        _logger = logger;
        _exchange = _configuration["RabbitMQ:Exchange"] ?? "finance.events.exchange";
    }

    public Task PublishAsync<T>(T integrationEvent, string routingKey, CancellationToken cancellationToken = default)
        where T : BaseIntegrationEvent
    {
        _logger.LogInformation("Publishing event {EventType} with routing key {RoutingKey} to exchange {Exchange}",
            integrationEvent.EventType, routingKey, _exchange);
        
        // In full implementation, retrieve persistent channel and BasicPublish
        return Task.CompletedTask;
    }
}
