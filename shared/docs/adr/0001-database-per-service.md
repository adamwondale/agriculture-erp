# ADR 001: Database-per-Service Isolation Pattern

## Status
Accepted

## Context
The Agriculture ERP & Digital Farm Management System consists of 17 distinct business domains (Core Administration, Agronomy, Contracts, Inventory, Finance, etc.). We require high availability, domain autonomy, independent scalability, and strict tenant/data compliance.

## Decision
We enforce a strict **Database-per-Service** architecture. Each microservice manages its own PostgreSQL database instance or logical database.
- Cross-service SQL joins are strictly forbidden.
- Cross-service database foreign keys are strictly forbidden.
- Cross-domain data propagation is performed asynchronously via RabbitMQ domain events.
- Queries that require composite data across domains utilize denormalized read-models (e.g. Reporting BI service or Portal cache).

## Consequences
- Positive: Independent deployment, schema migrations do not impact other services, fault domain isolation.
- Negative: Eventual consistency across domains, distributed transaction management via Saga orchestration or Choreography.
