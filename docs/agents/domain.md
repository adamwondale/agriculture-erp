# Domain Docs

How the engineering skills and subagents consume this repository's domain documentation.

## Architecture & Context Map

This monorepo is a multi-context system with strict database-per-service isolation across 17 microservices, a YARP API gateway, a Next.js web ERP portal, and an offline-first Flutter field mobile app.

### 1. System-Wide Architectural Decisions
Before exploring or modifying cross-cutting concerns, read the ADRs in:
- `shared/docs/adr/0001-database-per-service.md`: Strict database isolation (no cross-DB queries or foreign keys).
- `shared/docs/adr/0002-event-driven-messaging.md`: Asynchronous messaging via RabbitMQ topic exchanges.
- `shared/docs/adr/0003-offline-first-field-sync.md`: Offline sync protocol and conflict resolution.

### 2. Shared Contracts & Schemas
- `shared/contracts/Dtos/CommonDtos.cs`: Canonical data transfer shapes.
- `shared/contracts/Events/`: Base integration event classes and cross-service domain event contracts.
- `shared/auth-library/`: JWT claims and permission enforcement attributes (`[RequirePermission]`).

### 3. Context Boundaries
- **Core Agribusiness Services:** `services/core-admin-service`, `services/master-data-service`, `services/farmer-partner-service`, `services/farm-land-agronomy-service`, `services/contract-farming-service`, `services/procurement-service`, `services/warehouse-inventory-service`, `services/buyers-sales-logistics-service`, `services/finance-service`, `services/hr-service`.
- **Field & Integration Services:** `services/mobile-sync-gateway-service`, `services/integration-gateway-service`, `services/compliance-traceability-service`, `services/smart-agriculture-risk-service` (FastAPI), `services/reporting-bi-service`, `services/automation-workflow-service`, `services/customer-investor-portal-service`.
- **Presentation Portals:** `frontend/web-erp` (Web ERP Next.js 14), `frontend/mobile-field-app` (Flutter 3+ offline-first mobile app).

## Use Ubiquitous Language

When outputting domain terms (in issue titles, MediatR commands, aggregate roots, Drift SQLite tables, or PR descriptions), use exact terms from the service domains (e.g. `Parcel`, `AgronomyScoutingReport`, `HarvestBatch`, `SyncBatch`, `KycVerification`).

## Flag ADR Conflicts

If any proposed change contradicts an existing ADR, explicitly surface the conflict rather than silently bypassing it:
> _Contradicts ADR 0001 (database-per-service), but proposed because..._
