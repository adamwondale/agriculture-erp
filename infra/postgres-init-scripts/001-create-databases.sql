-- =========================================================================
-- 001-create-databases.sql
-- Automatic database initialization for all 17 isolated microservices
-- =========================================================================

SELECT 'CREATE DATABASE agri_core_admin_db' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'agri_core_admin_db')\gexec
SELECT 'CREATE DATABASE agri_master_data_db' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'agri_master_data_db')\gexec
SELECT 'CREATE DATABASE agri_hr_db' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'agri_hr_db')\gexec
SELECT 'CREATE DATABASE agri_farmer_partner_db' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'agri_farmer_partner_db')\gexec
SELECT 'CREATE DATABASE agri_farm_land_agronomy_db' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'agri_farm_land_agronomy_db')\gexec
SELECT 'CREATE DATABASE agri_contract_farming_db' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'agri_contract_farming_db')\gexec
SELECT 'CREATE DATABASE agri_procurement_db' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'agri_procurement_db')\gexec
SELECT 'CREATE DATABASE agri_warehouse_inventory_db' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'agri_warehouse_inventory_db')\gexec
SELECT 'CREATE DATABASE agri_buyers_sales_logistics_db' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'agri_buyers_sales_logistics_db')\gexec
SELECT 'CREATE DATABASE agri_finance_db' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'agri_finance_db')\gexec
SELECT 'CREATE DATABASE agri_customer_investor_portal_db' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'agri_customer_investor_portal_db')\gexec
SELECT 'CREATE DATABASE agri_mobile_sync_gateway_db' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'agri_mobile_sync_gateway_db')\gexec
SELECT 'CREATE DATABASE agri_smart_agriculture_risk_db' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'agri_smart_agriculture_risk_db')\gexec
SELECT 'CREATE DATABASE agri_reporting_bi_db' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'agri_reporting_bi_db')\gexec
SELECT 'CREATE DATABASE agri_automation_workflow_db' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'agri_automation_workflow_db')\gexec
SELECT 'CREATE DATABASE agri_integration_gateway_db' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'agri_integration_gateway_db')\gexec
SELECT 'CREATE DATABASE agri_compliance_traceability_db' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'agri_compliance_traceability_db')\gexec

-- Enable standard extensions per database
\c agri_core_admin_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
\c agri_master_data_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
\c agri_hr_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
\c agri_farmer_partner_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
\c agri_farm_land_agronomy_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
\c agri_contract_farming_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
\c agri_procurement_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
\c agri_warehouse_inventory_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
\c agri_buyers_sales_logistics_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
\c agri_finance_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
\c agri_customer_investor_portal_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
\c agri_mobile_sync_gateway_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
\c agri_smart_agriculture_risk_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
\c agri_reporting_bi_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
\c agri_automation_workflow_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
\c agri_integration_gateway_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
\c agri_compliance_traceability_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
