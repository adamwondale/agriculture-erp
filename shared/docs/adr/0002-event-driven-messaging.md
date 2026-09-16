# ADR 002: Event-Driven Asynchronous Messaging with RabbitMQ

## Status
Accepted

## Context
High volume agricultural operational events (field registrations, agronomy inspections, harvest weigh-ins, inventory batch updates, mobile sync uploads) need reliable, decoupled delivery between services.

## Decision
We utilize RabbitMQ with topic exchanges for all asynchronous integration events:
- Each service publishes events to its own topic exchange (e.g., `core.events.exchange`, `farmer.events.exchange`, `agronomy.events.exchange`).
- Subscribing services bind their dedicated queues with appropriate routing keys (e.g., `farmer.registered`, `inspection.completed`).
- Standard event envelope defined in `Shared.Contracts.Events.BaseIntegrationEvent`.

## Consequences
- Guaranteed at-least-once message delivery.
- Services must implement idempotency handlers using event deduplication / idempotency keys.
