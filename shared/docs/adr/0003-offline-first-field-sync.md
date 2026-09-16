# ADR 003: Offline-First Architecture for Mobile Field Operations

## Status
Accepted

## Context
Agronomists and field extension officers operate in remote rural woredas and kebeles with intermittent or non-existent cellular network connectivity.

## Decision
The Flutter mobile application implements an offline-first architecture:
- Local persistence using Drift (SQLite).
- All mutations (farmer registration, GPS boundary surveying, agronomic inspections) write immediately to local storage and an append-only sync queue.
- Background sync engine streams local changes to `mobile-sync-gateway-service` when connectivity is restored.
- Conflict resolution strategy: Server-wins with field conflict audit logging.

## Consequences
- Seamless offline field experience.
- Mobile Sync Gateway handles queue idempotency and dispatches verified domain commands.
