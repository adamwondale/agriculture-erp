using Shared.Contracts.Events;

namespace WarehouseInventory.Application.Interfaces;

public interface IEventPublisher
{
    Task PublishAsync<T>(T integrationEvent, string routingKey, CancellationToken cancellationToken = default) 
        where T : BaseIntegrationEvent;
}
