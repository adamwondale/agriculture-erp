# Agriculture ERP & Digital Farm Management System (Zorisis) — Agent Ecosystem

This repository enforces **pstack-grade engineering rigor** (zero slop, boundary discipline, blast-radius awareness, verifiable units, and adversarial reviews) across its microservices, web portal, and mobile field application.

---

## 1. Registered Subagents

The following specialized subagents are configured and ready for invocation via `invoke_subagent` or direct agent delegation:

| Subagent Name | Role | Primary Domain & Working Directories | Key Skills & Tools |
|---|---|---|---|
| `planner` | Lead Systems Architect & Multi-Phase Planner | Monorepo-wide, `shared/contracts`, `shared/docs/adr`, `gateway/api-gateway`, `services/*` | `domain-modeling`, `codebase-design`, `to-spec`, `to-tickets`, `improve-codebase-architecture` |
| `backend-csharp-master` | C# .NET 8 Clean Architecture & RabbitMQ Master | `services/*` (16 C# services), `gateway/api-gateway`, `shared/contracts`, `shared/auth-library` | `domain-modeling`, `tdd`, `diagnosing-bugs`, `resolving-merge-conflicts` |
| `frontend-web-master` | Next.js 14 App Router & TypeScript Master | `frontend/web-erp` | `setup-ts-deep-modules`, `diagnosing-bugs`, `impeccable`, `next-dev-loop` |
| `flutter-master` | Offline-First Mobile Field App Master | `frontend/mobile-field-app` | `diagnosing-bugs`, `tdd`, `apple-design`, `flutter-ui` |
| `code-quality-reviewer` | Adversarial Reviewer & Quality Auditor | Monorepo-wide | `code-review`, `diagnosing-bugs`, pstack `interrogate`, security audits |

---

## 2. Core pstack Engineering Principles

Every subagent working on this repository strictly adheres to these non-negotiable rules:

### A. Boundary Discipline (ADR 0001 & ADR 0002)
- **Database-per-Service Isolation:** Never query or join across microservice databases. Each of the 17 microservices owns its PostgreSQL database exclusively.
- **Asynchronous Event Communication:** Cross-service side effects must be communicated through RabbitMQ topic exchanges using contracts defined in `shared/contracts`.
- **Clean Architecture Dependency Inversion:** In C# services, `Domain` depends on nothing. `Application` depends only on `Domain`. `Infrastructure` and `API` depend on `Application`.
- **Next.js Server/Client Boundary:** Data fetching and sensitive secrets belong in Server Components and route handlers. Interactive client components (`'use client'`) must receive serializable props only.

### B. Sequence Verifiable Units
- Never implement large monolithic changes without intermediate checkpoints.
- Break every feature into small, atomic commits that compile, pass static analysis, and pass unit tests.
- Every state mutation or database change must be accompanied by an automated test proving behavior.

### C. Make Operations Idempotent
- Offline mobile sync actions replayed from `frontend/mobile-field-app` must use deterministic client UUIDs.
- All RabbitMQ event consumers must track processed message IDs to handle at-least-once message delivery without double-writes.

### D. Eliminate Code and Comment Slop (pstack `unslop`)
- **No obvious comments:** Strip comments like `// constructor`, `// handle click`, `// save to db`.
- **No shallow abstractions:** Do not introduce empty wrapper interfaces or single-use helper classes.
- **No sycophancy or filler prose:** State technical findings, file paths, line numbers, and exact reproduction steps directly.

### E. Adversarial Review (`interrogate` Framework)
Before merging or completing any multi-file feature, `code-quality-reviewer` must inspect the changeset and categorize findings into:
1. **Act On:** Definite bugs, security vulnerabilities, boundary leaks, or missing tests (blocks completion).
2. **Consider:** Architectural trade-offs or performance improvements.
3. **Noted:** Minor contextual remarks.
4. **Dismissed:** Nitpicks evaluated and rejected with rationale.

---

## 3. Delegation & Workflow Patterns

### Workflow 1: New Cross-Cutting Business Feature
1. **Plan:** Invoke `planner` with the requirement. It uses `to-spec` and `domain-modeling` to map affected services, writes event schemas into `shared/contracts`, and outputs a sequenced phase breakdown.
2. **Backend:** Invoke `backend-csharp-master` to implement domain entities, MediatR handlers, EF Core configurations, and RabbitMQ publishers/consumers with `tdd`.
3. **Frontend / Mobile:** Invoke `frontend-web-master` (for Web ERP) and/or `flutter-master` (for Field App) to implement user-facing flows using the new API endpoints and sync contracts.
4. **Review:** Invoke `code-quality-reviewer` using `code-review` and `interrogate` to audit the diff, test coverage, and boundary compliance.

### Workflow 2: Mobile Offline Sync & Conflict Resolution
1. Invoke `flutter-master` to adjust Drift SQLite tables and write local offline-first mutations.
2. Invoke `backend-csharp-master` to verify `services/mobile-sync-gateway-service` and `SyncBatchReceivedEvent` idempotency.
3. Invoke `code-quality-reviewer` with `diagnosing-bugs` to verify race conditions, dirty-flag clearing, and rollback safety under connection dropouts.

### Workflow 3: Rigorous Code Review & Pre-Commit Audit
- Run `code-quality-reviewer` pointing at the working tree or specific diff.
- Address all `Act On` items before marking work done.

---

## 4. Agent skills

### Issue tracker

Issues and specs live in GitHub (`adamwondale/agriculture-erp`). See [`docs/agents/issue-tracker.md`](docs/agents/issue-tracker.md).

### Domain docs

Multi-context monorepo with 17 microservices and shared ADRs. See [`docs/agents/domain.md`](docs/agents/domain.md).

### Installed Skill Matrix

| Skill | Installed Path | Used By Subagent | Purpose |
|---|---|---|---|
| `setup-matt-pocock-skills` | `.agents/skills/setup-matt-pocock-skills` | All | Scaffolds repo-wide tracking and domain config |
| `domain-modeling` | `.agents/skills/domain-modeling` | `planner`, `backend-csharp-master` | Domain-driven design, bounded contexts, ADR authoring |
| `codebase-design` | `.agents/skills/codebase-design` | `planner`, `backend-csharp-master` | Design It Twice, deep interface design |
| `to-spec` | `.agents/skills/to-spec` | `planner` | Converts user requests to detailed technical specifications |
| `to-tickets` | `.agents/skills/to-tickets` | `planner` | Breaks features down into ordered, dependency-linked issues |
| `diagnosing-bugs` | `.agents/skills/diagnosing-bugs` | `backend-csharp-master`, `flutter-master`, `code-quality-reviewer` | Hypothesis-driven root-cause debugging |
| `tdd` | `.agents/skills/tdd` | `backend-csharp-master`, `flutter-master` | Test-driven development with mock boundaries |
| `setup-ts-deep-modules` | `.agents/skills/setup-ts-deep-modules` | `frontend-web-master` | Module boundary and dependency constraints for TypeScript |
| `code-review` | `.agents/skills/code-review` | `code-quality-reviewer` | Structured review process and lead judgment |
| `resolving-merge-conflicts` | `.agents/skills/resolving-merge-conflicts` | All | Deterministic git merge conflict resolution |
