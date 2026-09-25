# Agriculture ERP — Microservices Breakdown & Build Sequence

---

## 1. Core & Administration Service

**Modules absorbed:** Module 1

**Responsibilities:**
- Organization hierarchy (HQ → Regional Office → Branch/Woreda hub)
- User account management, RBAC (roles/permissions matrix)
- Multi-factor authentication, JWT issuance
- Central approval-chain configuration (thresholds, approver mapping)
- Immutable audit log foundation

**Owns data:** `core_branches`, `users`, `roles`, `permissions`, `audit_logs`

**Exposes (sync REST):**
- `POST /auth/login`, `POST /auth/refresh`
- `GET /users/{id}/permissions`
- `POST /branches`, `GET /branches/{code}`

**Publishes (async events):** `OrganizationBranchCreated`, `UserProvisioned`, `RoleAssigned`

**Consumes:** `AuditEventOccurred` (from any service, to centralize logging)

**Tech notes:** Highest availability requirement in the system — everything depends on auth. JWTs should carry role claims so downstream services can authorize locally without a network round-trip per request.

**Coupling discipline:** No other service ever queries `users` or `core_branches` tables directly. Consumers cache branch/role reference data locally from published events.

---

## 2. Master Data & Localization Service

**Modules absorbed:** Modules 21, 25

**Responsibilities:**
- Centralized reference/lookup tables (crop catalog, currency codes, unit conversions)
- Administrative hierarchy reference (Region/Zone/Woreda/Kebele lists)
- Multi-language translation keys (Amharic, Afaan Oromoo, Tigrinya, English)
- Dual calendar (Ethiopian/Gregorian) conversion utilities
- Master entity merge/deduplication tooling

**Owns data:** `mdm_reference_codes`, `localization_user_preferences`, translation key-value tables

**Exposes:** `GET /reference/{category}`, `GET /translations/{lang}`, `POST /calendar/convert`

**Publishes:** `MasterDataUpdated`, `ReferenceCodeChanged`

**Consumes:** Nothing critical — this is a foundational, low-traffic, mostly-read service.

**Tech notes:** Consumers should pull-and-cache this data (e.g., Redis, in-memory) rather than call it live on every request — it changes rarely. This is the safest service to start development on since nothing else needs to exist first.

---

## 3. HR & Workforce Service

**Modules absorbed:** Module 2

**Responsibilities:**
- Employee records, department structure
- Attendance tracking
- Leave request workflow (Manager → HR approval chain)
- Payroll data linkage (hooks only, not full payroll processing)

**Owns data:** `hr_employees`, `hr_leave_requests`, `departments`, `attendance_logs`

**Exposes:** `POST /leave-requests`, `GET /employees/{id}`, `PATCH /leave-requests/{id}/approve`

**Publishes:** `LeaveRequestSubmitted`, `LeaveApproved`, `EmployeeOnboarded`

**Consumes:** `UserProvisioned` (from Core & Admin, to link an employee record to a system login)

**Tech notes:** Delegate SLA escalation (48-hour manager timeout) to the Automation Engine rather than building timers here — keeps this service simple.

---

## 4. Farmer & Partner Management Service

**Modules absorbed:** Modules 3, 4

**Responsibilities:**
- Outgrower farmer registration, identity verification, cooperative clustering, reliability scoring
- Commercial partner onboarding, due diligence document tracking, contract governance status
- Performance scorecards for both farmers and partners

**Owns data:** `farmer_profiles`, `partner_profiles`, cooperative cluster mappings

**Exposes:** `POST /farmers`, `GET /farmers/{national_id}`, `POST /partners`, `PATCH /partners/{id}/status`

**Publishes:** `FarmerRegistered`, `PartnerActivated`, `FarmerReliabilityScoreUpdated`

**Consumes:** `OrganizationBranchCreated` (to validate branch codes on registration), Mobile Sync events for offline-first registration

**Tech notes:** This is the offline-first mobile entry point for field agronomists — must tolerate delayed sync gracefully (via Mobile Sync Gateway) and handle duplicate national-ID conflict resolution.

---

## 5. Farm, Land & Agronomy Service

**Modules absorbed:** Modules 5, 6, 7

**Responsibilities:**
- GPS parcel boundary mapping and verification (GeoJSON polygons, area calculation)
- Soil classification, land ownership/lease records
- Seasonal crop planning (acreage, expected yield)
- Field inspection logging, pest/disease detection, health scoring

**Owns data:** `farm_parcels`, `crop_plans`, `agronomy_inspections`

**Exposes:** `POST /parcels`, `PATCH /parcels/{id}/verify`, `POST /crop-plans`, `POST /inspections`

**Publishes:** `ParcelVerified`, `CropPlanApproved`, `CriticalHealthAlert` (pest/disease score < 60%)

**Consumes:** `FarmerRegistered` (a parcel must link to a valid farmer)

**Tech notes:** These three modules are merged because they all pivot around `parcel_id` — splitting them would mean constant cross-service joins for what is functionally one operational unit (a parcel's full lifecycle). GIS spatial-index checks for overlapping boundaries belong here.

---

## 6. Contract Farming & Input Credit Service

**Modules absorbed:** Modules 8, 9

**Responsibilities:**
- Outgrower contract generation, digital signature, pricing formulas
- Breach/side-selling penalty tracking
- Input (seed/fertilizer/chemical) credit allocation and dispatch approval
- Input loan debt tracking (feeds Finance)

**Owns data:** `contract_agreements`, `input_distributions`

**Exposes:** `POST /contracts`, `PATCH /contracts/{id}/sign`, `POST /input-distributions`

**Publishes:** `ContractActivated`, `InputCreditIssued`, `ContractBreached`

**Consumes:** `ParcelVerified`, `FarmerRegistered`, `CropPlanApproved` (contract can't be generated until parcel + plan exist)

**Tech notes:** Merged because a contract's financial terms and its input-credit lifecycle are tightly bound — same aggregate lifecycle, different splitting would need synchronous chained calls.

---

## 7. Procurement Service

**Modules absorbed:** Module 10

**Responsibilities:**
- Purchase requests, budget verification
- Vendor quotation tendering (minimum 3 quotes above threshold)
- Multi-tier approval workflow (Procurement Lead → Finance Director → CEO)
- Purchase order generation and dispatch to vendors

**Owns data:** `procurement_purchase_orders`, purchase requests, vendor quotations

**Exposes:** `POST /purchase-requests`, `POST /purchase-orders`, `PATCH /purchase-orders/{id}/approve`

**Publishes:** `PurchaseOrderIssued`, `PurchaseRequestRejected`

**Consumes:** `InventoryShortageDetected` (from Warehouse, auto-triggers a PR), budget reference data from Finance

**Tech notes:** Isolated and self-contained — its main coupling point is being *triggered* by Warehouse stock shortages, which should be event-driven, not a direct call into Procurement's database.

---

## 8. Warehouse & Inventory Service

**Modules absorbed:** Module 11

**Responsibilities:**
- Silo/hub management, batch/lot receiving
- Weighbridge intake (gross/tare/net weight)
- QC grading (moisture %, purity %, foreign matter %) → Grade 1/2/3/Reject
- Stock transfers, Goods Received Notes (GRN)

**Owns data:** `warehouse_batches`

**Exposes:** `POST /batches/receive`, `PATCH /batches/{id}/qc-grade`, `GET /inventory/{warehouse_id}`

**Publishes:** `BatchReceived`, `InventoryShortageDetected`, `QCGradeAssigned`

**Consumes:** `ContractActivated` (to link incoming harvest to the correct contract)

**Tech notes:** This is the pivot point of the whole physical supply chain — Traceability, Sales, and Finance settlement all key off `batch_id` generated here.

---

## 9. Buyers, Sales & Logistics Service

**Modules absorbed:** Modules 12, 13

**Responsibilities:**
- Buyer registration, credit limit controls
- Export sales contract creation, order allocation against available inventory
- Transporter/driver/vehicle assignment, shipment manifests
- Proof-of-delivery tracking, transit delay alerts

**Owns data:** `sales_contracts`, `logistics_shipments`

**Exposes:** `POST /sales-contracts`, `POST /shipments/dispatch`, `PATCH /shipments/{id}/deliver`

**Publishes:** `SalesContractApproved`, `ShipmentDispatched`, `ShipmentDelivered`

**Consumes:** `BatchReceived`/`QCGradeAssigned` (to know what inventory is sellable), credit-check results from Finance

**Tech notes:** Merged because a sale is meaningless without a shipment plan attached to it — same operational flow (order → allocate → dispatch → deliver).

---

## 10. Finance & Trade-Finance Service

**Modules absorbed:** Module 14

**Responsibilities:**
- Multi-currency chart of accounts, AP/AR
- Farmer harvest settlement calculation (gross value − input loan − withholding tax)
- Trade finance documents (LC/CAD), payment gateway disbursement orchestration
- Statutory tax computation, P&L consolidation

**Owns data:** `finance_settlements`, ledger tables

**Exposes:** `POST /settlements/calculate`, `PATCH /settlements/{id}/approve`, `GET /ledger/{account_id}`

**Publishes:** `SettlementDisbursed`, `PaymentFailed`

**Consumes:** `BatchReceived`, `InputCreditIssued` (to net off loan deductions), `PaymentProcessed` (from Integration Gateway)

**Tech notes:** Kept strictly isolated for audit/compliance reasons — mandates senior peer review, immutable audit logging on every ledger adjustment. Should never expose raw DB access to any other service.

---

## 11. Customer/Investor Portal Service

**Modules absorbed:** Module 15

**Responsibilities:**
- Secure external-facing dashboards for buyers, investors, lenders
- Scoped visibility — each user sees only their authorized portfolio
- Live shipment tracking maps, signed PDF invoice/certificate downloads

**Owns data:** `portal_users` (thin — mostly aggregates from other services)

**Exposes:** `GET /portal/dashboard`, `GET /portal/shipments`

**Publishes:** Nothing significant — this is a read-heavy consumer.

**Consumes:** Aggregates from Buyers/Sales, Warehouse, Finance, Reporting via API composition or a dedicated read-model (BFF pattern)

**Tech notes:** Should NOT hit five services synchronously per page load. Best built against the Reporting/BI service's denormalized read models, or its own materialized cache updated via events.

---

## 12. Mobile Sync Gateway Service

**Modules absorbed:** Module 16

**Responsibilities:**
- Offline-first sync ingestion from Flutter mobile app (SQLite local queue)
- Idempotency key validation, JSON schema validation
- Conflict resolution (server-wins rule, flag for manager review)

**Owns data:** `mobile_sync_logs`

**Exposes:** `POST /sync/batch-upload`

**Publishes:** Routes validated payloads onward as domain events (e.g., forwards to Farmer Mgmt, Agronomy) after validation — doesn't own the actual business data itself.

**Consumes:** Nothing — it's an ingestion/translation layer.

**Tech notes:** This is a technical/infrastructure service, not a domain one. Its only job is to safely get offline data into the system without loss or duplication — actual business logic still lives in the owning domain service (Farmer Mgmt, Agronomy, etc.).

---

## 13. Smart Agriculture & Risk Analytics Service

**Modules absorbed:** Modules 17, 24

**Responsibilities:**
- Satellite (NDVI/EVI) and soil moisture telemetry ingestion
- Weather anomaly detection against historical baselines
- Composite risk scoring (climate + biological + market + counterparty)
- Automated field-verification mission scheduling, insurance claim dossier generation

**Owns data:** `smart_ag_telemetry`, `risk_assessments`

**Exposes:** `GET /telemetry/{parcel_id}`, `GET /risk-score/{parcel_id}`

**Publishes:** `VegetationAnomalyDetected`, `HighRiskAlertRaised`, `InputCreditFrozen`

**Consumes:** `ParcelVerified` (needs valid GPS polygons to pull satellite data against)

**Tech notes:** Different technology profile than the rest (Python ML/data workers vs Node.js REST services) — good candidate for independent scaling and deployment cadence. Kept separate from core Agronomy service because it's automated/background-worker driven, not user-initiated.

---

## 14. Reporting & BI Service

**Modules absorbed:** Module 18

**Responsibilities:**
- Executive KPI dashboards (hectares planted, active farmers, harvest vs demand, gross margin)
- Multi-dimensional analytics, scheduled report exports (PDF/Excel)

**Owns data:** `reporting_kpi_snapshots` — a denormalized, read-optimized store

**Exposes:** `GET /reports/kpi`, `POST /reports/export`

**Publishes:** Nothing — pure consumer/aggregator.

**Consumes:** Events from nearly every other service (`BatchReceived`, `ContractActivated`, `SettlementDisbursed`, etc.) to build its own read-optimized snapshots.

**Tech notes:** This is a textbook CQRS read-model service. It should NEVER query other services' live databases for reports — it builds its own copy from the event stream, which is what keeps report generation fast and doesn't hammer transactional services.

---

## 15. Automation & Workflow Engine Service

**Modules absorbed:** Module 19

**Responsibilities:**
- Centralized SLA timers and breach detection
- Escalation routing to next organizational hierarchy level
- General notification trigger orchestration

**Owns data:** `automation_sla_rules`, active timer/job state

**Exposes:** `POST /sla-rules`, internal job scheduling API

**Publishes:** `SLABreachAlert`, `EscalationTriggered`

**Consumes:** Almost any "pending approval" event from other services (e.g., `LeaveRequestSubmitted`, `PurchaseRequestPending`) that need a deadline watched.

**Tech notes:** Centralizing this avoids every service reinventing its own timer/escalation logic. This is a strong argument for building it early — many other services will want to delegate SLA handling to it rather than build their own.

---

## 16. Integration Gateway Service

**Modules absorbed:** Module 20

**Responsibilities:**
- Payment gateway abstraction (Telebirr, CBE Birr, Chapa)
- SMS/USSD aggregator abstraction
- Maps/accounting software API translation
- Circuit breaker + failover between providers

**Owns data:** `integration_gateway_logs`

**Exposes:** `POST /payments/payout`, `POST /sms/send`

**Publishes:** `PaymentProcessed`, `PaymentFailed`, `SMSDelivered`

**Consumes:** Payout requests from Finance, notification requests from Automation/HR

**Tech notes:** All third-party outbound calls should flow through here — no other service should call Telebirr or an SMS provider directly. This is your single point of control for provider failover and credential management.

---

## 17. Compliance & Traceability Service

**Modules absorbed:** Modules 22, 23

**Responsibilities:**
- GlobalG.A.P./Organic/Fairtrade compliance tracking, CAPA (Corrective Action Plan) workflows
- Farmer-to-fork traceability dossier generation, EUDR geolocation compliance packages
- QR code landing pages for consumers

**Owns data:** `compliance_capa_records`, `traceability_batch_links`

**Exposes:** `POST /capa`, `POST /traceability/generate-dossier`, `GET /traceability/{batch_id}`

**Publishes:** `CAPAOverdue`, `TraceabilityDossierGenerated`

**Consumes:** `BatchReceived`, `ParcelVerified`, `FarmerRegistered` (needs to stitch together the full upstream chain for a dossier)

**Tech notes:** This service is a heavy *aggregator* by nature (batch → harvest → inspection → input → parcel → farmer). It should build its own denormalized linkage table (already reflected in `traceability_batch_links`) fed by events, rather than reaching live into five other services every time a dossier is requested.

---

## API Gateway (Infrastructure Layer — not a domain service)

- Single entry point for all client traffic (Web ERP, Mobile app, Portal)
- JWT validation pass-through, rate limiting, request routing
- Does not contain business logic or its own database

---

# Build Sequence — What Comes Before What

Group the 17 services into **dependency tiers**. Build and deploy each tier before starting the next; within a tier, services can be built in parallel by different teams.

### Tier 0 — Foundation (build first, everything depends on these)
1. **Core & Administration** — auth/JWT/RBAC needed by literally everything
2. **Master Data & Localization** — reference data needed for dropdowns/validation everywhere
3. **API Gateway** — routing shell, even if thin at first
4. **Automation & Workflow Engine** — build early since many later services will delegate SLA/escalation to it rather than reinvent it
5. **Integration Gateway** — payment/SMS abstraction; Finance and HR will need it soon after

### Tier 1 — Core People & Land Data
6. **HR & Workforce** — depends only on Core & Admin (user linkage)
7. **Farmer & Partner Management** — depends on Core & Admin, Master Data
8. **Mobile Sync Gateway** — needed before field data can flow in (feeds Farmer Mgmt, Agronomy)

### Tier 2 — Operational Domain
9. **Farm, Land & Agronomy** — depends on Farmer Management (a parcel needs a farmer)
10. **Smart Agriculture & Risk Analytics** — depends on Farm & Land (needs verified GPS polygons)

### Tier 3 — Commercial Core
11. **Contract Farming & Input Credit** — depends on Farmer Mgmt + Farm/Land (needs verified parcel + crop plan)
12. **Procurement** — depends on Master Data (budget codes); loosely coupled otherwise, can start earlier if needed
13. **Warehouse & Inventory** — depends on Contract Farming (batches link to a contract)

### Tier 4 — Sales, Delivery & Money
14. **Buyers, Sales & Logistics** — depends on Warehouse (needs sellable inventory/QC grade)
15. **Finance & Trade-Finance** — depends on Warehouse (batch data) + Contract Farming (loan deductions) + Integration Gateway (payouts)

### Tier 5 — Compliance, Reporting & External Views
16. **Compliance & Traceability** — depends on Warehouse, Farm/Land, Farmer Mgmt (aggregates all upstream data)
17. **Reporting & BI** — depends on events from nearly everything; naturally built last since it's a pure consumer
18. **Customer/Investor Portal** — depends on Reporting/BI + Buyers/Sales + Finance (needs stable data to display)

---

### Quick visual dependency chain:
```
Core & Admin ─┬─> HR
              ├─> Farmer & Partner Mgmt ─> Farm/Land/Agronomy ─┬─> Smart Ag & Risk
              │                                                 └─> Contract Farming ─┬─> Procurement
Master Data ──┤                                                                        └─> Warehouse ─┬─> Buyers/Sales/Logistics
              │                                                                                         └─> Finance
Automation ───┤                                                                                                │
Integration ──┘                                                                                                │
                                                                              Compliance & Traceability <───────┘
                                                                                        │
                                                                              Reporting & BI ──> Customer/Investor Portal
```

This matches the project's own phased rollout (Phase 1: Foundation → Phase 2: Field/Supply Chain/Finance → Phase 3: Portal/Automation/Risk → Phase 4: Smart Agriculture), so your microservice build order and the client-facing milestone schedule stay in sync.
