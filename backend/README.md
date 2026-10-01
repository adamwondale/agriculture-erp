# Backend Services

This directory serves as the backend root for the Agriculture ERP system.

## Architecture Overview
- **Microservices**: Located in `../services/` (17 domain-driven microservices including Core Administration, Agronomy, Farmers, Finance, HR, Inventory, Procurement, etc.).
- **API Gateway**: Located in `../gateway/api-gateway/` (YARP reverse proxy routing to all downstream microservices on port 8080).
- **Core Admin Service**: Manages enterprise users, authentication, MFA, roles, permissions, and branch nodes (running on port 5001 or port 8080 via gateway).
