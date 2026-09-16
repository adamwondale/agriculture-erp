# Agriculture ERP & Digital Farm Management System

Enterprise-grade **Agriculture ERP and Digital Farm Management Monorepo** built on an **event-driven microservices architecture**.

---

## Architecture Overview

- **Backend (Core Agribusiness):** C# / .NET 8 Clean Architecture (16 services)
- **Backend (AI/ML & Telemetry):** Python 3.11 FastAPI (1 service)
- **API Gateway:** .NET 8 YARP (Yet Another Reverse Proxy)
- **Web Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Mobile Frontend:** Flutter (offline-first with Drift SQLite local engine)
- **Database:** PostgreSQL 16 (strict database-per-service isolation, 17 distinct databases)
- **Messaging:** RabbitMQ with dedicated per-service topic exchanges
- **Security:** Asymmetric / HMAC JWT issued by CoreAdmin, validated at Gateway & downstream services

---

## Service Registry

| Port | Service Folder | Service Name | Stack | Primary DB | Exchange |
|---|---|---|---|---|---|
| `8080` | `gateway/api-gateway` | `Gateway.API` | .NET 8 YARP | N/A | N/A |
| `5001` | `services/core-admin-service` | `CoreAdmin` | C# / .NET 8 | `agri_core_admin_db` | `core.events.exchange` |
| `5002` | `services/master-data-service` | `MasterData` | C# / .NET 8 | `agri_master_data_db` | `masterdata.events.exchange` |
| `5003` | `services/hr-service` | `HR` | C# / .NET 8 | `agri_hr_db` | `hr.events.exchange` |
| `5004` | `services/farmer-partner-service` | `FarmerPartner` | C# / .NET 8 | `agri_farmer_partner_db` | `farmer.events.exchange` |
| `5005` | `services/farm-land-agronomy-service` | `FarmLandAgronomy` | C# / .NET 8 | `agri_farm_land_agronomy_db` | `agronomy.events.exchange` |
| `5006` | `services/contract-farming-service` | `ContractFarming` | C# / .NET 8 | `agri_contract_farming_db` | `contract.events.exchange` |
| `5007` | `services/procurement-service` | `Procurement` | C# / .NET 8 | `agri_procurement_db` | `procurement.events.exchange` |
| `5008` | `services/warehouse-inventory-service` | `WarehouseInventory` | C# / .NET 8 | `agri_warehouse_inventory_db` | `inventory.events.exchange` |
| `5009` | `services/buyers-sales-logistics-service` | `BuyersSalesLogistics` | C# / .NET 8 | `agri_buyers_sales_logistics_db` | `sales.events.exchange` |
| `5010` | `services/finance-service` | `Finance` | C# / .NET 8 | `agri_finance_db` | `finance.events.exchange` |
| `5011` | `services/customer-investor-portal-service` | `CustomerInvestorPortal` | C# / .NET 8 | `agri_customer_investor_portal_db` | `portal.events.exchange` |
| `5012` | `services/mobile-sync-gateway-service` | `MobileSyncGateway` | C# / .NET 8 | `agri_mobile_sync_gateway_db` | `mobilesync.events.exchange` |
| `5013` | `services/smart-agriculture-risk-service` | `SmartAgRisk` | Python / FastAPI | `agri_smart_agriculture_risk_db` | `smartag.events.exchange` |
| `5014` | `services/reporting-bi-service` | `ReportingBI` | C# / .NET 8 | `agri_reporting_bi_db` | `reporting.events.exchange` |
| `5015` | `services/automation-workflow-service` | `AutomationWorkflow` | C# / .NET 8 | `agri_automation_workflow_db` | `workflow.events.exchange` |
| `5016` | `services/integration-gateway-service` | `IntegrationGateway` | C# / .NET 8 | `agri_integration_gateway_db` | `integration.events.exchange` |
| `5017` | `services/compliance-traceability-service` | `ComplianceTraceability` | C# / .NET 8 | `agri_compliance_traceability_db` | `compliance.events.exchange` |
| `3000` | `frontend/web-erp` | Next.js Web ERP | Next.js 14 / TS | N/A | N/A |
| Mobile | `frontend/mobile-field-app` | Flutter Field App | Flutter / Drift SQLite | Local SQLite | N/A |

---

## Monorepo Directory Structure

```
agriculture-erp/
├── services/                      # 17 microservices (16 C# Clean Arch + 1 Python FastAPI)
├── gateway/
│   └── api-gateway/               # YARP reverse proxy (.NET 8)
├── frontend/
│   ├── web-erp/                   # Next.js 14 role-based ERP portal
│   └── mobile-field-app/          # Offline-first Flutter app with Drift SQLite
├── shared/
│   ├── contracts/                 # Shared event schemas + DTOs (Shared.Contracts)
│   ├── auth-library/              # JWT validation + RBAC authorization (Shared.Auth)
│   └── docs/                      # OpenAPI specs, Architecture Decision Records (ADRs)
├── infra/
│   ├── docker-compose.yml         # Postgres 16, RabbitMQ, Gateway, Services
│   ├── k8s/                       # Kubernetes base manifests & overlays (dev/staging/prod)
│   └── postgres-init-scripts/     # Auto-creates 17 isolated PostgreSQL databases
├── .github/
│   └── workflows/                 # CI/CD pipelines
└── README.md
```

---

## Quickstart (Local Development)

### 1. Start Infrastructure (PostgreSQL & RabbitMQ)
```bash
cd infra
docker compose up -d postgres rabbitmq
```
PostgreSQL is available on `localhost:5432` (user `postgres`, pass `postgres`).
RabbitMQ management UI is accessible at `http://localhost:15672` (guest/guest).

### 2. Start Full Stack with Docker Compose
```bash
cd infra
docker compose up --build
```
- API Gateway: `http://localhost:8080`
- Web ERP: `http://localhost:3000`
- Health check: `curl http://localhost:8080/health`

### 3. Running an Individual C# Service
```bash
cd services/core-admin-service/src/CoreAdmin.API
dotnet run
```
Swagger UI will be available at `http://localhost:5001/swagger`.

### 4. Running Python AI/ML Service
```bash
cd services/smart-agriculture-risk-service
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --port 5013 --reload
```
Interactive docs at `http://localhost:5013/docs`.

### 5. Running Next.js Web ERP
```bash
cd frontend/web-erp
npm install
npm run dev
```

### 6. Running Flutter Mobile Field App
```bash
cd frontend/mobile-field-app
flutter pub get
flutter run
```

---

## Architecture Decision Records (ADRs)

Detailed architectural rationale is documented in `shared/docs/adr/`:
- **ADR 001:** [Database-per-Service Isolation Pattern](shared/docs/adr/0001-database-per-service.md)
- **ADR 002:** [Event-Driven Asynchronous Messaging with RabbitMQ](shared/docs/adr/0002-event-driven-messaging.md)
- **ADR 003:** [Offline-First Architecture for Mobile Field Operations](shared/docs/adr/0003-offline-first-field-sync.md)
