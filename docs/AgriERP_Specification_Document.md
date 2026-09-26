# Digital ERP System — Client Requirements Discovery Questionnaire
**Client / Organization:** Agriculture Service Company
**Generated Date:** 31/8/2026 ከሰዓት 2:01:49

> This specification report captures client decisions and answers for backend entity modeling, workflow engines, role-based security, and module implementation.

---

## PART 1 — Cross-Cutting System Questions

### 1.1: Users, Roles & Organizational Structure

#### 1. What are ALL distinct user types who will log into the system?
*Category: Users & Roles*

**Selected Options:**
- [x] Super Admin
- [x] CEO / Executive Leadership
- [x] COO / Operations Director
- [x] Farming Operations Manager
- [x] Research & Agronomy Manager
- [x] Warehouse / Inventory Manager
- [x] Finance & Accounting Staff
- [x] HR & Payroll Staff
- [x] Partnership & Brand Team
- [x] Technology & IT Team
- [x] Internal Audit & Compliance
- [x] Field Agronomists / Extension Workers
- [x] Contract Farmers / Outgrowers
- [x] Commercial Partners / Cooperatives
- [x] Buyers / Offtakers
- [x] Logistics / Drivers

#### 2. For each user type, what is their exact job title as used internally (for labels/UI)?
*Category: Labels & Nomenclature*

**Selection:** Use standard corporate titles (Manager, Officer, Lead)

#### 3. Can one physical person hold more than one role simultaneously (e.g. a manager who is also an approver)?
*Category: Role Assignment*

**Selection:** Yes — users can hold multiple assigned roles and switch contexts seamlessly

**Specific Details / Custom Requirements:**
> Audit logs must be exportable through controlled, read-only mechanisms. Support filtered CSV/Excel exports, tamper-evident digitally signed PDF reports, and secure read-only API access for authorized external auditors and regulators. All exports must be logged and access-controlled.

#### 4. Do Farmers log into the system directly, or is their data entered on their behalf by Agronomists/Partners?
*Category: Farmer Access*

**Selection:** Hybrid: Agronomists enter primary data, farmers receive SMS confirmations & USSD balance inquiries

#### 5. Do Partners have their own login, and if so, what can they see/do vs. what Agronomists can see/do?
*Category: Partner Access*

**Selected Options:**
- [x] Agronomists have full agronomic data entry, inspection logging, and input approval rights
- [x] Partners can register farmers, submit harvest forecasts, and request inputs
- [x] Partners have dedicated portal with view of their contracted farmers and farms

**Specific Details / Custom Requirements:**
> When a Partner logs into the System, they can monitor their own farm and its performance through a private Dashboard. The Partner can view the farm’s crop status, production plans and results, input utilization, workforce and farm activities, expense and revenue summaries, Agronomy reports, Quality and Traceability information, Harvest results, and Audit reports.
> 
> In addition, the Partner can submit requests related to the farm, report problems, provide comments or feedback on Management reports, and approve matters that fall within their authorized level of access.
> 
> However, since the overall management of the farm is handled under Z-Orisis, the Partner cannot independently change or control the farm’s day-to-day operations, employees, Agronomy decisions, inputs, or Management processes.

#### 6. What is the company's organizational structure — departments, branches/regions, reporting lines? Should the system model this hierarchy explicitly?
*Category: Hierarchy*

**Selection:** Yes — Full explicit multi-level hierarchy (HQ -> Regional Offices -> Woreda/Zone Hubs -> Field Stations)

**Specific Details / Custom Requirements:**
> Holding

#### 7. Are there multiple legal entities, subsidiaries, or regional offices that need separate data scoping?
*Category: Multi-Tenancy*

**Selection:** Yes — Multi-entity / multi-company scoping with consolidated reporting at group level

#### 8. How are new employee/user accounts created — self-registration, HR-created, or admin-invited?
*Category: User Provisioning*

**Selected Options:**
- [x] HR-created automatically upon employee record creation in HR module

**Specific Details / Custom Requirements:**
> HR creates Employee
>         ↓
> Assign:
> • Department
> • Position
> • Role
> • Country
> • Region/Branch
> • Farm/Scope
>         ↓
> System creates User Account
>         ↓
> Manager/Admin Approval
>         ↓
> Secure Activation
>         ↓
> User Login
>         ↓
> Permissions automatically applied

#### 9. What happens to a user's account and historical data when they leave the company or a farmer/partner exits?
*Category: Offboarding & Lifecycle*

**Selected Options:**
- [x] Account immediately deactivated; all historical audits and past signatures permanently preserved

#### 10. Do external users (buyers, investors) get self-service registration, or are they onboarded manually?
*Category: External Users*

**Selection:** Invite-only (generated directly by account managers)

**Specific Details / Custom Requirements:**
> External users are onboarded through a controlled invitation/registration process, with verification and approval where required. Each user receives a specific external role and data scope, ensuring they only access information authorized for them.

#### 11. Is Single Sign-On (SSO) required (Google Workspace, Microsoft 365), or is username/password sufficient?
*Category: Authentication*

**Selected Options:**
- [x] Standard secure Username / Email + Password

**Specific Details / Custom Requirements:**
> Secure Username/Email + Password authentication with optional/mandatory MFA based on role and risk. The architecture will remain SSO-ready for future Google Workspace, Microsoft 365, or other identity-provider integration.

#### 12. Is multi-factor authentication (MFA) required for any user types (e.g. Finance, Admin)?
*Category: Security*

**Selected Options:**
- [x] Mandatory MFA for Super Admins and System Admins
- [x] Mandatory MFA for Finance & Payment approvers
- [x] Mandatory MFA for HR and Executive users
- [x] Optional / User-configurable MFA via SMS OTP or Authenticator App (Google Authenticator)

**Specific Details / Custom Requirements:**
> Mandatory MFA for Super Admins, System Admins, Finance/Payment Approvers, HR and Executives; optional MFA for other users, with risk-based security controls and Authenticator App/SMS OTP support.

---

### 1.2: Permissions & Access Control

#### 1. Should permissions be role-based (fixed per role) or granular/attribute-based (customizable per user)?
*Category: Access Model*

**Selection:** Granular Role + Custom Permission Overrides (Create custom roles with specific check-box capabilities)

**Specific Details / Custom Requirements:**
> RBAC as the foundation + Granular Custom Permissions + Organizational/Data Scope + Fixed Governance Rules

#### 2. Do permissions need to be scoped by region/branch (e.g. a Farming Operations Manager only sees their own region's farms)?
*Category: Geographic Scoping*

**Selection:** Yes — Regional scoping by default, with HQ staff possessing cross-regional visibility

**Specific Details / Custom Requirements:**
> Yes — Regional scoping by default, with authorized HQ/Holding users having cross-regional and cross-country visibility according to their role and permissions. Access remains controlled by organizational hierarchy and assigned data scope.

#### 3. Should some roles see aggregated/summary data only, without drill-down to individual farmer/farm records (e.g. investors)?
*Category: Data Masking & Aggregation*

**Selection:** Yes — Executive leadership sees high-level summaries with optional drill-down on request

**Specific Details / Custom Requirements:**
> Data visibility is role- and scope-based. Executive users receive high-level consolidated dashboards with controlled drill-down capability, while external users and lower-level roles only see the data necessary for their authorized scope.

#### 4. Who can create new roles or modify permission sets — is this an Admin-only function?
*Category: Role Governance*

**Selection:** Super Admin only

#### 5. Are there fields within a single record that need field-level permission (e.g. Finance sees payment amount, Agronomist does not)?
*Category: Field-Level Security*

**Selected Options:**
- [x] Yes — Payment amounts and farmer bank accounts visible only to Finance & Executive roles
- [x] Yes — Salary and compensation visible only to HR and Finance
- [x] Yes — Sensitive crop yield pricing / contract rates hidden from field staff

**Specific Details / Custom Requirements:**
> A user's access to a record does not automatically grant access to every field within that record. Sensitive financial, HR, banking, pricing, and contractual fields must be protected by field-level permissions according to role and governance rules.

#### 6. Should Partners/Agronomists only see farmers/farms assigned to them, or the full list?
*Category: Portfolio Assignment*

**Selection:** Strictly assigned only (Agronomists/Partners see only their own assigned portfolio)

**Specific Details / Custom Requirements:**
> Partners and Agronomists see only their assigned farms/farmers, fields, and operational portfolio. Reassignment can be performed by an authorized manager when required, including temporary reassignment during leave or absence. All assignment changes are recorded in the audit log.

#### 7. Do Buyers only see their own orders/contracts, or aggregated market data too?
*Category: Buyer Visibility*

**Selection:** Own orders plus general published market price indexes and seasonal crop availability forecasts

**Specific Details / Custom Requirements:**
> Buyers can view available crops, quantities, quality grades, expected harvest dates, indicative market prices, and approved inventory available for purchase. They can submit inquiries, purchase requests, and orders through the marketplace, while confidential farmer, partner, supplier, and other buyer information remains restricted.

#### 8. Is there a need for temporary/delegated access (e.g. manager on leave delegates approval rights)?
*Category: Delegation*

**Selection:** Yes — Formal delegation feature with start/end dates and full audit logging

**Specific Details / Custom Requirements:**
> Delegated access must have defined start and end dates, limited permissions based on the original role, and complete audit logging. Delegation should automatically expire at the end date. Critical approvals and high-risk actions must not be delegated unless explicitly authorized.

#### 9. Should permission changes themselves be logged in the audit trail?
*Category: Audit & Governance*

**Selection:** Yes — Include before and after permission snapshots with reason for change

**Specific Details / Custom Requirements:**
> All permission and access-control changes must be recorded in an immutable audit trail, including before/after permission snapshots, who made the change, date/time, IP/device information, and mandatory reason. High-risk permission changes must trigger security notifications to authorized administrators.

---

### 1.3: Approval Workflow (Separation of Duties)

#### 1. For EACH transaction type (expense, purchase, contract, settlement, leave, etc.) — who enters, verifies, reviews, and gives final approval?
*Category: Approval Chains*

**Selected Options:**
- [x] Expenses & Purchases: Requester -> Department Head -> Finance Review -> COO/CEO Approval
- [x] Farmer Settlements: Agronomist Input -> Farm Ops Manager Verify -> Finance Audit -> CEO Release
- [x] Employee Leave: Employee Request -> Direct Manager Approval -> HR Recording
- [x] Commercial Contracts: Sales/Partner Lead -> Legal/Audit Review -> CEO Final Sign-off

#### 2. Can the same person who enters a request also approve it under any circumstance (e.g. small amounts)?
*Category: Separation of Duties*

**Selection:** Strict NO — Submitter can never approve their own request under any circumstance

**Specific Details / Custom Requirements:**
> No self-approval is permitted. The person who creates or submits a request cannot approve the same request. All approvals must follow the configured approval hierarchy and separation-of-duties rules. Automated approval may be used for predefined low-risk transactions, but never as a mechanism for users to approve their own requests.

#### 3. Are there monetary or quantity thresholds that change the approval chain (e.g. above X ETB requires CEO approval)?
*Category: Thresholds*

**Selected Options:**
- [x] Quantity thresholds: Seed/Fertilizer distributions > X Quintals require Agronomy Manager sign-off
- [x] Tier 3 (> 500,000 ETB): CEO / Board approval required
- [x] Tier 2 (50,000 - 500,000 ETB): Finance Director + COO sign-off
- [x] Tier 1 (< 50,000 ETB): Department Manager / Operations Lead sign-off

**Specific Details / Custom Requirements:**
> Approval thresholds should be configurable by transaction type, monetary value, and quantity. The system should automatically route transactions to the appropriate approval level and allow management to adjust thresholds as the organization grows.

#### 4. How many approval levels/stages exist in total across the company (single approval vs. multi-stage)?
*Category: Workflow Depth*

**Selection:** Dynamic multi-stage (1 to 4 levels depending on module, value, and department)

**Specific Details / Custom Requirements:**
> Approval workflows should be dynamic and configurable, with 1–4 approval levels depending on transaction type, value, department, risk, and organizational hierarchy. Emergency workflows may allow expedited approval with mandatory post-approval audit.

#### 5. What happens when an approver rejects a request — does it go back to the submitter, or is it closed?
*Category: Rejection Logic*

**Selection:** Return to submitter with mandatory reason/comment for revision & resubmission

**Specific Details / Custom Requirements:**
> Rejected requests should normally return to the submitter for correction and resubmission. The approver may permanently cancel/close a request when it is invalid, unauthorized, or no longer required. All rejection reasons and resubmissions must be recorded in the audit trail.

#### 6. Can an approval be escalated or reassigned if the approver is unavailable?
*Category: Escalation*

**Selected Options:**
- [x] Yes — Automatic escalation to next hierarchy level after configured time window
- [x] Yes — Manual reassignment capability for Super Admin / System Admin
- [x] Yes — Designated peer / deputy approver can act on behalf

**Specific Details / Custom Requirements:**
> Escalation should be configurable by transaction type and urgency. The system should support automatic escalation after a defined time, authorized manual reassignment, and designated deputy approvers. Every escalation or reassignment must be fully audit logged.

#### 7. Should there be a maximum time limit before an unactioned approval is escalated automatically?
*Category: SLA & Timers*

**Selection:** Yes — Configurable SLA per transaction type (e.g. urgent seedling input = 12h, annual budget = 5 days)

**Specific Details / Custom Requirements:**
> SLA should be configurable by transaction type, urgency, value, and department. The system should send reminders before the deadline and automatically escalate overdue approvals according to the configured escalation hierarchy.

#### 8. Are approvals sequential (must happen in order) or can some happen in parallel (e.g. two reviewers at once)?
*Category: Execution Flow*

**Selection:** Support both sequential and parallel approvals (e.g. Agronomy & Finance review simultaneously)

**Specific Details / Custom Requirements:**
> The system must support both sequential and parallel approvals. Workflow designers should be able to configure which steps run sequentially and which can run simultaneously, including multiple reviewers or departments. All approval actions must be audit logged.

#### 9. Does every module (HR, Finance, Contracts, Procurement, Partnership) have a different approval chain, or is there one standard chain reused everywhere?
*Category: Workflow Customization*

**Selection:** Each module has its own specialized, independently configurable approval workflow

**Specific Details / Custom Requirements:**
> Each module should have an independently configurable approval workflow, while using common approval, escalation, delegation, notification, and audit-log components across the system. Workflows must support different rules based on transaction type, value, department, region, and organizational hierarchy.

#### 10. Should approvers be able to add comments/conditions when approving (not just approve/reject)?
*Category: Conditional Approvals*

**Selection:** Yes — Approvers can attach notes, conditions, and supporting file attachments upon approval

**Specific Details / Custom Requirements:**
> Conditions must be tracked as actionable items with an assigned owner, due date, status, supporting evidence, and audit trail. A condition should be marked fulfilled only after the required verification is completed.

#### 11. Is there a need for digital signatures on approved documents (contracts, settlements)?
*Category: Digital Signatures*

**Selected Options:**
- [x] Yes — Cryptographic digital signature / system-generated verification QR code & hash
- [x] Yes — OTP-verified mobile authorization for farmer settlement approval

**Specific Details / Custom Requirements:**
> Digital signatures must provide secure identity verification, document integrity, timestamping, and a complete audit trail. Contracts and settlement documents should support cryptographic signatures with QR/hash verification, while farmer settlements should support OTP-based mobile authorization. The implementation must comply with applicable Ethiopian electronic transaction and electronic signature requirements.

---

### 1.4: Audit Trail & Logging

#### 1. Should the audit trail capture every field change (before/after value) or just record-level changes (created/updated/deleted)?
*Category: Audit Granularity*

**Selection:** Hybrid: Field-level diff for sensitive tables (Finance, Contracts, Farmers, Inputs), Record-level for others

#### 2. Who can view the audit trail — only Internal Audit, or also managers for their own department?
*Category: Audit Access*

**Selected Options:**
- [x] Internal Audit team has comprehensive system-wide audit access
- [x] Department managers can view audit history within their own departmental records
- [x] Super Admins have full audit inspection capabilities
- [x] Record change history tab visible to all authorized record editors

**Specific Details / Custom Requirements:**
> Audit access must follow role-based and least-privilege permissions. Internal Audit and Super Admins may have system-wide access, while department managers and authorized editors may only view audit history for records within their permitted scope. Audit logs must be read-only and cannot be modified or deleted by ordinary users.

#### 3. How long must audit logs be retained (e.g. 1 year, 5 years, indefinitely)? Is this driven by any legal/regulatory requirement?
*Category: Retention Period*

**Selection:** 7 Years (Aligned with standard Ethiopian financial and tax statutory requirements)

**Specific Details / Custom Requirements:**
> Audit logs for financial, tax, procurement, contract, and settlement records should be retained for at least 7 years, with immutable archival and secure backup. Retention periods should comply with applicable Ethiopian legal, tax, financial, and regulatory requirements.

#### 4. Should audit logs be exportable (for external auditors or regulators)?
*Category: Audit Export*

**Selected Options:**
- [x] Yes — Exportable to Excel / CSV format with date and department filtering
- [x] Yes — Exportable as tamper-evident signed PDF reports
- [x] Yes — Read-only API access for external audit tools

**Specific Details / Custom Requirements:**
> Audit logs must be exportable through controlled, read-only mechanisms. Support filtered CSV/Excel exports, tamper-evident digitally signed PDF reports, and secure read-only API access for authorized external auditors and regulators. All exports must be logged and access-controlled.

#### 5. Do login/logout events, failed login attempts, and permission changes need to be logged, in addition to data changes?
*Category: Security Logging*

**Selected Options:**
- [x] Yes — Log all successful and failed authentication attempts with IP & device metadata

#### 6. Should there be alerts for suspicious activity (e.g. bulk deletions, off-hours access)?
*Category: Security Alerts*

**Selected Options:**
- [x] Instant alerts for bulk record deletion or mass data export
- [x] Alerts for unexpected off-hours logins from unusual geographic locations
- [x] Alerts for consecutive failed password / OTP attempts
- [x] Alerts for unauthorized attempts to alter payment / banking details

**Specific Details / Custom Requirements:**
> Security alerts should be routed to the IT Lead, Super Admin, and designated Security/Audit personnel, with severity-based escalation and notification.

#### 7. Is there a legal/compliance requirement (Ethiopian data protection law, sector-specific regulation) that dictates audit retention or format?
*Category: Legal Compliance*

**Selection:** Yes — Ethiopian Personal Data Protection Proclamation & National Bank regulations

**Specific Details / Custom Requirements:**
> The system should support Ethiopian data protection requirements and applicable financial regulations, while also maintaining audit trails, traceability, immutable records, and evidence suitable for international agricultural certification and export requirements such as GLOBALG.A.P. and Fairtrade.

---

### 1.5: Notifications & Communication

#### 1. Which events should trigger notifications (e.g. approval needed, contract expiring, certification expiring, harvest recorded, payment made)?
*Category: Notification Triggers*

**Selected Options:**
- [x] Pending Approval Requests & Escalation Warnings
- [x] Contract Expiration / Renewal Warnings (30, 15, 7 days prior)
- [x] Certification & Compliance Expiry Alerts
- [x] Farmer / Partner Settlement Payment Dispatched & Settled
- [x] Harvest Delivery / Warehouse Intake Logged
- [x] Input Stock Low Inventory / Reorder Alerts
- [x] Severe Weather / Agronomy Risk Alerts for Field Agents

**Specific Details / Custom Requirements:**
> Notifications should be event-driven, configurable by module and priority, with in-app, email, and SMS/push support where applicable. Critical alerts should support escalation and acknowledgement tracking.

#### 2. What channels should notifications use — in-app, SMS, email, or a combination per user type?
*Category: Delivery Channels*

**Selected Options:**
- [x] Push Notifications on Mobile App (Field Agronomists & Ops Officers)
- [x] Email Notifications (Management, Finance, HR, and External Buyers)
- [x] SMS Notifications (Essential for field agronomists, farmers, and drivers)
- [x] In-App Notification Bell & Action Center (All web & mobile users)

**Specific Details / Custom Requirements:**
> Channel preferences should be configurable by user role, event type, urgency, and user preference. Critical alerts may use multiple channels, while routine notifications should use the user's preferred channel.

#### 3. Which SMS gateway provider does the client want to use (or is this open to recommendation)?
*Category: SMS Gateway*

**Selected Options:**
- [x] Open to development team recommendation based on reliability and cost

**Specific Details / Custom Requirements:**
> Provider should be selected based on reliability, delivery rate, API quality, scalability, coverage, and cost. The system should support provider abstraction so the SMS gateway can be changed or multiple providers can be used if needed.

#### 4. Should farmers receive SMS notifications even if they don't have smartphone/internet access?
*Category: Farmer SMS*

**Selection:** Yes — Critical: Send automated SMS for harvest weigh-in confirmation, input receipts, and payment alerts

**Specific Details / Custom Requirements:**
> Critical SMS notifications should include harvest/weigh-in confirmation, input delivery receipts, payment/settlement status, important farm alerts, and approval-related messages. Messages should be sent in the farmer's preferred local language.

#### 5. What language should each notification be sent in — based on user preference, or a company-wide default?
*Category: Notification Language*

**Selection:** Amharic by default with fallback to English

**Specific Details / Custom Requirements:**
> Notifications should use each user's profile language preference. The system should support Amharic, English, Afaan Oromoo, Tigrinya, and additional languages as configured. If a translation is unavailable, use the configured fallback language.

#### 6. Should there be a daily/weekly digest option instead of instant notifications for lower-priority events?
*Category: Digest & Frequency*

**Selection:** Yes — Instant alerts for urgent tasks/approvals; Daily morning digest for routine summaries

**Specific Details / Custom Requirements:**
> Urgent and high-priority events should trigger immediate notifications. Lower-priority routine events should be consolidated into a daily morning digest. Users should be able to configure digest preferences and quiet hours.

#### 7. Who owns notification templates — can they be edited without a code change?
*Category: Template Management*

**Selection:** Yes — Built-in Admin Template Manager (Admins can edit SMS/Email text with dynamic merge tags like {{farmer_name}}, {{amount}})

**Specific Details / Custom Requirements:**
> Admins will manage and edit notification templates without code changes, using dynamic merge tags and role-based permissions.

---

### 1.6: Payments & Financial Integration

#### 1. Which payment gateway(s) does the client want to use for farmer/partner settlements (e.g. Telebirr, CBE Birr, bank transfer, Chapa)?
*Category: Settlement Gateways*

**Selected Options:**
- [x] Telebirr Bulk Payout API (Ethio Telecom)
- [x] CBE Birr API (Commercial Bank of Ethiopia)
- [x] Chapa Payout / Payment Gateway

#### 2. Which payment gateway(s) are needed for buyer/customer payments — same as above or different?
*Category: Inbound Payments*

**Selected Options:**
- [x] Telebirr In-App / QR / Web checkout
- [x] Direct Wire / RTGS / Swift Bank Transfer with payment slip upload & verification
- [x] CBE Birr & CBE Mobile Banking Transfer
- [x] Chapa Multi-channel (Cards, Telebirr, CBE, Awash)

#### 3. Are payments made in Ethiopian Birr only, or does the system need to support foreign currency (for export buyers/investors)?
*Category: Multi-Currency*

**Selection:** Multi-Currency required (ETB for domestic operations + USD / EUR / GBP for export sales and foreign investors)

#### 4. Should the system initiate payments directly (push money) or just record that a payment was made externally (reconciliation only)?
*Category: Payment Automation*

**Selection:** Hybrid: Telebirr payouts direct via API; Large bank transfers via batch file export and reconciliation

#### 5. What is the required approval chain specifically for payment execution (who authorizes releasing money)?
*Category: Payment Authorization*

**Selected Options:**
- [x] Finance Officer prepares voucher -> Finance Manager verifies -> CEO authorizes disbursement
- [x] Dual authorization required (e.g. Finance Director + Managing Director)
- [x] Tiered authorization based on total settlement batch amount
- [x] Automated check against approved contract terms before release

#### 6. Do farmers/partners need to register bank account or mobile money details in the system, and who verifies them?
*Category: Account Verification*

**Selected Options:**
- [x] Agronomist captures passbook photo / mobile confirmation during field registration
- [x] Registered during onboarding (Phone number for Telebirr/CBE Birr + Bank Name & Account Number)
- [x] Finance team verifies account name matches farmer national ID before first settlement
- [x] Automated account name lookup via Telebirr/Bank API validation

**Specific Details / Custom Requirements:**
> Account details are captured during onboarding and verified through field documentation and available bank/mobile-money APIs. Finance performs final verification against the farmer/partner identity before the first settlement. Any mismatch places the account on hold for correction and re-verification before payment.

#### 7. Are there installment or partial payment scenarios (e.g. advance payment + final settlement)?
*Category: Installment Logic*

**Selected Options:**
- [x] Advance input credit deduction (Seed/Fertilizer costs deducted from harvest payout)

**Specific Details / Custom Requirements:**
> Payment terms should be configurable by crop, contract, and farmer/partner agreement. Input advances such as seed and fertilizer may be deducted from the final harvest settlement. Other payment structures, such as 50/50 or milestone-based payments, should be supported where applicable, but should not be mandatory for all crops or partners.

#### 8. Does the system need to generate formal invoices/receipts, and in what format (PDF, government-compliant format)?
*Category: Invoicing & Receipts*

**Selected Options:**
- [x] Government-compliant Tax Invoices & Withholding Tax Receipts (Ethiopian Ministry of Revenues standard)
- [x] Automated PDF Payment Vouchers with QR Code verification
- [x] Digital SMS receipt sent to farmer phone

**Specific Details / Custom Requirements:**
> The system should generate government-compliant tax invoices, withholding tax receipts, payment vouchers, and digital receipts. Documents should be available in PDF format with QR code verification where applicable. Farmer payment receipts should also be sent by SMS in the farmer’s preferred language. TIN/VAT and other required tax information should be configurable and included where applicable.

#### 9. Are there tax withholding or government remittance requirements tied to farmer/partner payments?
*Category: Tax Withholding*

**Selection:** Yes — 2% or 30% statutory withholding tax calculation on non-exempt transactions with withholding cert generation

**Specific Details / Custom Requirements:**
> The ERP should automatically determine withholding tax based on the applicable Ethiopian tax rules, farmer/partner tax status, TIN and exemption status. Exempt transactions should not be withheld, while applicable withholding amounts should be calculated, recorded and a withholding certificate generated. Tax rules should be configurable for future legal changes.

#### 10. Should failed or reversed payments be tracked with their own status/workflow?
*Category: Failed Payments*

**Specific Details / Custom Requirements:**
> Failed or reversed payments should be logged with the exact failure reason, automatically retried where safe, and escalated to Finance for review. The system must prevent duplicate payments and maintain a complete audit trail.

---

### 1.7: Data Retention, Backup & Security

#### 1. Where should data be hosted — local Ethiopian servers, cloud (AWS/Azure/GCP), or a hybrid setup?
*Category: Hosting Environment*

**Selection:** Hybrid setup: Cloud primary with local backup replication / edge caching

**Specific Details / Custom Requirements:**
> Cloud should be the primary hosting environment, with encrypted local Ethiopian backup replication and edge/offline caching where needed. The architecture must support scalability, disaster recovery, high availability, and secure data synchronization.

#### 2. Are there data residency requirements (e.g. farmer/financial data must stay within Ethiopia)?
*Category: Data Residency*

**Selection:** Under review by legal counsel (Design architecture to be cloud-agnostic and transferable)

**Specific Details / Custom Requirements:**
> Data residency requirements will be reviewed against applicable Ethiopian laws and regulations. The system should be designed to be cloud-agnostic, with encryption, access controls, and the ability to keep sensitive data within Ethiopia if required.

#### 3. What is the required backup frequency and retention period?
*Category: Backup Strategy*

**Selected Options:**
- [x] Real-time continuous database point-in-time recovery (PITR) with 30-day retention

**Specific Details / Custom Requirements:**
> Use automated continuous PITR with at least 30-day retention, plus encrypted daily backups and weekly full backups. Maintain an off-site/geo-redundant copy for disaster recovery. Backup restoration should be tested regularly.

#### 4. What is the acceptable downtime/recovery time in case of failure (Recovery Time Objective)?
*Category: RTO / RPO*

**Selection:** High Availability: RTO < 1 Hour, RPO < 15 Minutes (Mission-critical harvest peak)

**Specific Details / Custom Requirements:**
> Target RTO is less than 1 hour and RPO less than 15 minutes for critical operations, especially during peak harvest periods. The system should support high availability, automated failover, and disaster recovery.

#### 5. Does any data need encryption at rest (e.g. financial records, national ID numbers)?
*Category: Encryption*

**Selected Options:**
- [x] Field-level encryption for National ID (Fayda / Kebele ID) and Bank Account numbers
- [x] Full database encryption at rest (AES-256)
- [x] End-to-End TLS 1.3 encryption in transit for all web and mobile traffic
- [x] Encrypted cloud document storage for contract PDFs and land certificates

**Specific Details / Custom Requirements:**
> Use strong encryption for all sensitive data, including AES-256 at rest, field-level encryption for National ID and bank account details, TLS 1.3 for data in transit, and encrypted storage for documents. Encryption keys must be securely managed and rotated.

#### 6. Are there specific document types (contracts, ID copies) that require secure, access-controlled storage separate from regular files?
*Category: Document Vault*

**Selected Options:**
- [x] Legal Land Title Deeds & Lease Agreements (Restricted to Legal & Execs)
- [x] Farmer National ID / Kebele Cards (Restricted to authorized onboarding staff)
- [x] Commercial Buyer Sales Contracts & Pricing Addendums (Restricted to Commercial Team)
- [x] Employee Salary & Medical Records (Restricted to HR)

**Specific Details / Custom Requirements:**
> Farmer contracts, bank/payment documents, tax documents, company financial records, and other confidential legal documents should be stored securely with role-based access control and audit logs.

#### 7. Who is responsible for ongoing hosting/infrastructure costs and management after launch?
*Category: Infrastructure Governance*

**Selection:** Hybrid: Client pays cloud provider invoices directly; Vendor provides monitoring & support

**Specific Details / Custom Requirements:**
> Client will own and pay for the cloud infrastructure. The vendor/development team will provide ongoing monitoring, security, maintenance, backups, updates, and technical support under an agreed SLA.

---

### 1.8: Localization & Multi-language

#### 1. Which languages must the system fully support at launch — Amharic and English only, or others (Oromiffa, Tigrinya)?
*Category: Languages Supported*

**Selected Options:**
- [x] English (System default for HQ, admin & developer interfaces)
- [x] Amharic (አማርኛ) — Full UI and field mobile application
- [x] Afaan Oromoo — Full UI and field mobile application
- [x] Tigrinya (ትግርኛ) — UI & mobile

**Specific Details / Custom Requirements:**
> Phase 1: English, Amharic, Afaan Oromoo and Tigrinya. Phase 2: Somali and Sidama. The system should be designed with a scalable multilingual architecture so additional languages can be added later without major redevelopment.

#### 2. Should each user have a personal language preference, or is language tied to their role/region?
*Category: Language Selection*

**Selection:** Personal user preference toggle in profile (switches UI instantly in header)

**Specific Details / Custom Requirements:**
> Each user can select and change their preferred language at any time from their profile. The selected language applies to the system UI and mobile application, regardless of the user's role or region. Regional defaults may be provided during onboarding, but users can override them.

#### 3. Do printed/generated documents (contracts, receipts, reports) need to be bilingual on the same page, or single-language per generation?
*Category: Document Bilingualism*

**Selection:** Bilingual side-by-side / column format (e.g. English + Amharic on standard contracts and settlement slips)

**Specific Details / Custom Requirements:**
> Formal contracts, receipts and settlement documents should support bilingual formatting (English + Amharic) where required. The system should also allow users to generate a single-language document when needed. Additional supported languages should be configurable in the future.

#### 4. Are there specific Ethiopian calendar requirements (Ethiopian calendar vs. Gregorian) for dates across the system?
*Category: Calendar System*

**Selection:** Dual Calendar support (Ethiopian Calendar / ዓ.ም + Gregorian Calendar / G.C. switchable with dual picker)

**Specific Details / Custom Requirements:**
> Both Ethiopian and Gregorian calendars should be fully supported across the system. Users should be able to switch between calendars and use either calendar for date selection. Where appropriate, documents can display both dates for clarity and legal/financial consistency.

#### 5. Should numeric/currency formatting follow a specific local convention?
*Category: Currency & Number Format*

**Selected Options:**
- [x] Ethiopian Birr format: ETB 1,234,567.89 / ብር
- [x] Land area units: Hectares (ha) with optional local conversion (Timad / ቃዳ)
- [x] Weight units: Kilograms (kg) and Quintals (qt = 100kg)
- [x] Support international metric and imperial toggle for export buyers

**Specific Details / Custom Requirements:**
> Use Ethiopian Birr (ETB/ብር) as the default currency. Support hectares (ha) and local land units such as Timad, with automatic conversion where applicable. Support kilograms (kg) and quintals (qt = 100 kg). The system should allow additional units and currencies to be configured for international/export operations in the future.

---

### 1.9: Non-Functional & Infrastructure

#### 1. How many total users (internal staff) and how many farmers/partners are expected at launch, and in 2-3 years?
*Category: User Scale*

**Selected Options:**
- [x] Year 2-3 Target: 500,000+ Pan-Ethiopian / Multi-country Agricultural Scale
- [x] Year 2-3 Target: 100,000+ Registered Farmers & Outgrower Networks
- [x] Launch: 50-150 Internal Staff | 20,000 - 50,000 Farmers | 100+ Partners
- [x] Launch: 20-50 Internal Staff | 5,000 - 15,000 Outgrower Farmers | 20-50 Partners

#### 2. What is the expected peak concurrent usage (e.g. during harvest season)?
*Category: Peak Concurrency*

**Selection:** 300 - 1,000 concurrent active users across nationwide collection centers

#### 3. What devices will field users primarily use — Android phones, tablets, feature phones (SMS only)?
*Category: Device Landscape*

**Selected Options:**
- [x] Android Smartphones (Entry-level to mid-range devices used by Agronomists)
- [x] Android Tablets for warehouse intake and mobile check-in stations
- [x] Laptops / Desktop PCs for HQ, Branch Managers, Finance, and HR
- [x] Feature Phones (SMS & USSD interaction only) for smallholder farmers
- [x] Ruggedized handheld POS / Bluetooth barcode & scale readers

#### 4. What is the internet connectivity reality in field/farm areas — should the system assume frequent offline periods?
*Category: Offline Capability*

**Selection:** Moderate: Field app works offline for inspections/gps, HQ web portal requires active internet

#### 5. Are there specific uptime/SLA requirements for the web platform (e.g. 99.5%)?
*Category: Availability & SLA*

**Selection:** 99.9% Uptime SLA with 24/7 proactive monitoring during harvest seasons

#### 6. Is there an existing IT team who will maintain the system after handover, or does the client expect ongoing vendor support?
*Category: Maintenance & Support*

**Selection:** Client internal IT team takes full ownership after comprehensive technical training & documentation handover

#### 7. Are there existing systems (Excel sheets, other software) that need one-time data migration into the new system?
*Category: Data Migration*

**Selected Options:**
- [x] Excel / CSV Spreadsheets (Farmer lists, Historical harvest records, Inventory ledgers)

---

## PART 2 — Module-by-Module Data & Business Logic Questions

### Module 1: Core & Administration

#### 1. What organizational/branch fields are needed (name, region, address, contact)?
*Category: Data to Capture*

**Selected Options:**
- [x] Branch Name, Branch Code, Region, Zone, Woreda, Kebele
- [x] Physical GPS Coordinates / Building Pin
- [x] Branch Manager contact, Phone, Official Email
- [x] Operational Status (Active, Seasonal, Decommissioned)
- [x] Assigned Warehouses and Processing Centers

#### 2. What system-wide configuration values need to be admin-editable (thresholds, statuses, code lists)?
*Category: Data to Capture*

**Selected Options:**
- [x] Financial Approval Threshold limits & currency exchange rates
- [x] Crop Quality Grades & Moisture Content deduction tolerances
- [x] System lookup codes (Crop varieties, Unit of Measure, Soil types)
- [x] Global Notification & SMS Gateway credentials
- [x] Working days calendar & statutory public holiday schedules

**Specific Details / Custom Requirements:**
> System-wide configuration should be admin-editable for crop and farm codes, statuses, workflows, approval thresholds, payment rules, tax codes and rates, quality thresholds, inventory thresholds, organizational structures, units, currencies, languages, calendars, alerts, document types and templates. High-risk financial, tax, security and approval configurations must require authorized approval, effective dates, version control and a complete audit trail. No critical business rule should be hard-coded.

#### 3. How are system-wide settings versioned/changed without downtime?
*Category: Business Rules & Workflow*

**Selection:** Draft -> Review -> Publish workflow for major parameter changes with audit trail

**Specific Details / Custom Requirements:**
> Use live hot-reload for routine configuration changes without downtime. Major or high-risk changes must follow a Draft → Review → Approve → Publish workflow with versioning, effective dates, audit trail, distributed cache invalidation, and rollback capability.

#### 4. Does document management need folder/category structure, or flat tagging?
*Category: Business Rules & Workflow*

**Selection:** Hybrid: Global central document repository with tagged entity cross-links

**Specific Details / Custom Requirements:**
> Use a hybrid document management model with a centralized repository, hierarchical organization where useful, and smart tags/cross-links to Farmers, Partners, Farms, Contracts, Inspections, Payments and other system entities. Documents must support role-based access, version history, audit trails, search, and expiry notifications.

#### 5. Which roles can access System Configuration vs. just their own module settings?
*Category: Roles Involved*

**Selected Options:**
- [x] Super Admin has exclusive global system configuration access
- [x] Department Leads can configure module-specific parameters (e.g. HR manager configures leave rules)
- [x] IT Support staff have read-only diagnostic configuration view

**Specific Details / Custom Requirements:**
> Super Admin has exclusive access to global system configuration. Department Leads may manage approved settings within their own modules, subject to role-based permissions and audit logging. IT Support has read-only access to diagnostic and technical configuration. High-risk changes require appropriate approval and must be fully audited.

---

### Module 2: HR & People Operations

#### 1. What employee fields are required (national ID, emergency contact, bank details, contract type, department, job grade)?
*Category: Data to Capture*

**Selected Options:**
- [x] Full Name, Employee ID, National ID (Fayda / Kebele ID), Gender, DOB
- [x] Emergency Contact Name, Relationship, Phone Number
- [x] Bank Account Details (Bank Name, Branch, Account No, CBE Birr / Telebirr)
- [x] Employment Type (Permanent, Fixed-Term, Seasonal Field Agent, Daily Laborer)
- [x] Department, Designation, Job Grade / Salary Scale, Work Location / Region
- [x] Educational Background, Certifications, Agronomic Specialties

**Specific Details / Custom Requirements:**
> The employee master profile should support all listed fields, with sensitive identity and banking information protected by role-based access, encryption and audit logging. Fields should be configurable by employment type and department, with mandatory fields defined according to HR and payroll requirements.

#### 2. What leave types exist and what are their entitlement rules (annual, sick, maternity, unpaid)?
*Category: Data to Capture*

**Selected Options:**
- [x] Annual Leave (Accrued monthly per Ethiopian Labor Law: 16 days + 1 day per 2 years service)
- [x] Sick Leave (Certified medical leave with statutory tiered salary compensation)
- [x] Maternity Leave (120 consecutive calendar days per Ethiopian proclamation)
- [x] Paternity Leave (3-5 consecutive working days)
- [x] Compassionate / Bereavement Leave & Marriage Leave
- [x] Unpaid Study / Personal Leave

**Specific Details / Custom Requirements:**
> The HR module should support all listed leave types with configurable entitlement, accrual, eligibility, compensation, approval and documentation rules. Statutory rules should be configurable and version-controlled so they can be updated when Ethiopian labor regulations change. Leave balances and approvals must be automatically tracked in the employee profile.

#### 3. What attendance method is used (biometric, mobile check-in, manual entry)?
*Category: Data to Capture*

**Selected Options:**
- [x] Biometric fingerprint / face recognition integration for HQ & Processing Plants
- [x] Mobile Geo-fenced GPS check-in / check-out for Field Agronomists & Extension Agents
- [x] Manager batch manual attendance logging for seasonal field laborers
- [x] Timecard sheet scanning / upload

**Specific Details / Custom Requirements:**
> Attendance should support multiple methods based on employee type and work location: GPS geo-fenced mobile check-in/out for field staff, biometric integration for HQ and processing facilities, authorized manager batch entry for seasonal laborers, and timecard scanning/upload. All attendance records must include timestamps, location or verification data where applicable, approval controls and audit trails.

#### 4. What is the performance review cycle and who conducts it?
*Category: Business Rules & Workflow*

**Selection:** Bi-annual / Seasonal review (aligned with planting and harvest crop cycles)

**Specific Details / Custom Requirements:**
> Performance management should support quarterly KPI reviews, bi-annual/seasonal reviews aligned with agricultural cycles, and an annual comprehensive appraisal. Review cycles, KPIs, weightings and evaluators should be configurable by department, role and employment type. Managers conduct primary reviews, with relevant supervisors or department leads contributing where applicable.

#### 5. What triggers a promotion/salary increment workflow — manager request, annual cycle, both?
*Category: Business Rules & Workflow*

**Selection:** Both: Formal Annual Compensation Review Cycle + Mid-year Manager Exceptional Performance Request

**Specific Details / Custom Requirements:**
> Promotion and salary increments should support both the formal annual compensation cycle and exceptional mid-year requests. A manager may submit a documented recommendation based on KPI performance, increased responsibilities or exceptional contribution. All recommendations must follow HR review, budget validation and the appropriate Executive approval workflow, with a complete audit trail. Rules, approval levels and eligibility criteria should be configurable by role and grade.

#### 6. What does the clearance/final settlement checklist include (asset return, outstanding advances, etc.)?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] Asset Return Clearance (Mobile phone, Tablet, GPS device, Motorbike, Field equipment)
- [x] Finance & Advance Settlement (Clear outstanding travel per-diems and operational advances)
- [x] Inventory & Store Custody Handover Sign-off
- [x] IT Access Revocation & Data Handover Confirmation
- [x] Severance & Unused Leave calculation per Ethiopian Labor Law

**Specific Details / Custom Requirements:**
> Final clearance must cover asset return, finance and advance settlement, inventory/store handover, IT access revocation and data handover, and final statutory settlement including severance and unused leave. Each clearance item should have an assigned responsible department, status, verification/approval, supporting evidence and audit trail. Final settlement calculations must use configurable and version-controlled HR/legal rules.

#### 7. Who approves leave — direct manager, HR, both?
*Category: Roles Involved*

**Selection:** 2-Step: Direct Line Manager approves -> HR reviews and records

**Specific Details / Custom Requirements:**
> Leave requests should follow a configurable approval workflow. Standard leave requires Direct Line Manager approval followed by HR review and recording. Leaves exceeding 5 days and designated special leaves require additional HR Head approval. The system should automatically update leave balances and maintain a complete approval and audit trail.

#### 8. Who has visibility into salary data?
*Category: Roles Involved*

**Selection:** Strictly HR Director, Payroll Accountant, and CEO only

**Specific Details / Custom Requirements:**
> Salary data must be strictly confidential. Full salary and payroll data should be accessible only to authorized HR, Payroll and Executive roles. Employees may access only their own digital payslips and compensation records. Line managers should not have access to individual salary amounts unless explicitly authorized for a specific business process. All salary-data access must be role-based, logged and auditable.

---

### Module 3: Farmer Management

#### 1. What farmer identity fields are required (full name, national ID, phone, address, photo, region/kebele)?
*Category: Data to Capture*

**Selected Options:**
- [x] Full Name (First, Father, Grandfather name), Gender, Age / DOB
- [x] National ID (Fayda) / Kebele ID Number + Document Photo Upload
- [x] Primary Mobile Phone Number (for SMS & Telebirr payments)
- [x] Alternate Family Phone Number
- [x] Region, Zone, Woreda, Kebele, Village / Got
- [x] Farmer Profile Photo (captured via mobile camera)
- [x] Household size, Number of dependents, Farming experience (years)
- [x] Bank / Mobile Wallet Provider & Account details

#### 2. What farmer group/cooperative fields are needed (group name, leadership, member list)?
*Category: Data to Capture*

**Selected Options:**
- [x] Primary Cooperative / Union Name, Registration ID, Type
- [x] Self-Help Group / Cluster Name & Cluster Leader Name + Phone
- [x] Group Executive Committee Members & Roles
- [x] Total Group Membership Count & Active Farmer Roster
- [x] Group Bank Account & Collective Settlement Details

#### 3. What farmer performance metrics should be tracked (yield history, compliance, reliability score)?
*Category: Data to Capture*

**Selected Options:**
- [x] Input Loan Repayment History & Reliability Score (0-100 Rating)
- [x] Quality Grade Consistency Score (Moisture & purity rating)
- [x] Contract Delivery Compliance Rate (% delivered vs % contracted)
- [x] Historical Crop Yield per Hectare by season
- [x] Training Attendance & Agronomy Protocol Adherence

**Specific Details / Custom Requirements:**
> Track all listed farmer performance metrics and maintain a season-by-season performance history. The system should calculate configurable performance and reliability scores using weighted metrics, with transparent scoring rules, audit history and the ability to adjust weights by crop, contract type or program. Scores should support contract eligibility, input-credit decisions, quality management and farmer development without replacing human review.

#### 4. What are the eligibility criteria to register a new farmer?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] Valid Kebele / National ID and confirmed land tenure / lease proof
- [x] Minimum cultivable land size (e.g. >= 0.5 Hectares)
- [x] Located within designated target agro-ecological cluster / woreda
- [x] Endorsement from Local Kebele Administration or Cooperative Leader
- [x] No active default on previous input credit

**Specific Details / Custom Requirements:**
> Farmer registration should validate identity, land tenure, minimum cultivable area, target geographic/agro-ecological eligibility and required local endorsement. Previous input-credit defaults should be checked and flagged for risk review rather than automatically preventing registration in all cases. Eligibility thresholds and criteria must be configurable by program, crop, contract type and region, with approval and audit trails.

#### 5. Can a farmer belong to multiple groups or only one at a time?
*Category: Business Rules & Workflow*

**Selection:** Multiple group memberships permitted without system restriction

#### 6. What causes a farmer's status to change (active, suspended, exited) and who approves that change?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] Land sale / relocation triggers Inactive / Exited status
- [x] Side-selling / contract default triggers automatic flag for Suspension review
- [x] Agronomist recommends status change -> Farming Operations Manager approves
- [x] Suspended farmers cannot be allocated input loans or new contracts

**Specific Details / Custom Requirements:**
> Farmer status changes should be event-driven and approval-controlled. Side-selling or contract defaults automatically trigger a suspension review, while land sale or permanent relocation may trigger an inactive/exit review. Agronomists can recommend status changes, but the Farming Operations Manager must approve them. Suspended farmers should be restricted from new input loans and contracts until reinstatement is approved. All status changes, reasons, evidence, approvals and timestamps must be recorded in the audit trail.

#### 7. Who registers farmers — Agronomist, Partner, or dedicated data entry staff?
*Category: Roles Involved*

**Selected Options:**
- [x] Field Agronomists register farmers directly in the field via offline mobile app
- [x] Commercial Partners register farmers in their contracted clusters
- [x] Branch Data Entry Clerks batch-upload farmer registers verified by Kebele leads

**Specific Details / Custom Requirements:**
> Farmer registration should support multiple authorized channels: Field Agronomists can register farmers through an offline-first mobile app; Commercial Partners can register farmers within their contracted clusters; and Branch Data Entry Clerks can batch-upload farmer registers verified by authorized Kebele or cooperative leads. All registrations must pass duplicate checks, eligibility validation, verification and approval workflows with full audit trails. Self-registration via USSD/SMS should be designed as a future phase.

---

### Module 4: Partner Management

#### 1. What partner/organization fields are needed (legal name, registration number, leadership, region covered)?
*Category: Data to Capture*

**Selected Options:**
- [x] Legal Organization Name, Trade Name, Legal Entity Type (Cooperative Union, Private Enterprise, NGO)
- [x] Commercial Registration Number, TIN, VAT Registration Certificate
- [x] Key Leadership / Board Members (Names, Titles, Contact Numbers)
- [x] Assigned Geographic Coverage (Regions, Zones, Woredas)
- [x] Bank Account Details & Authorized Signatories
- [x] Aggregated Farmer Base Size & Total Land Capacity (ha)

**Specific Details / Custom Requirements:**
> Partner profiles should capture all listed legal, tax, leadership, geographic, banking and operational capacity fields. Farmer base size and total land capacity should be dynamically calculated from linked Farmer and Farm records where possible. Sensitive legal, banking and leadership information must be protected by role-based access, with document verification, approval controls and a complete audit trail.

#### 2. What does a Partnership Proposal document need to include?
*Category: Data to Capture*

**Selected Options:**
- [x] Proposed Input Credit Requirements & Subsidy Structure
- [x] Target Crops, Planned Acreage, and Estimated Production Volume
- [x] Farmer Aggregation & Extension Service Model
- [x] Logistics & Aggregation Hub locations
- [x] Profit-Sharing / Commission / Management Fee proposal

**Specific Details / Custom Requirements:**
> Partnership Proposals should include all listed commercial and operational components, plus implementation timelines, roles and responsibilities, KPIs, quality and delivery targets, financial assumptions, risk allocation, payment/settlement terms, and proposal validity. Proposal templates should be configurable by partnership type, crop, region and contract model.

#### 3. What Due Diligence checklist items are required (legal standing, financial capacity, references)?
*Category: Data to Capture*

**Selected Options:**
- [x] Valid Trade License & Tax Clearance Certificate verification
- [x] Bank Reference Letter & 2-year Audited Financial Statements
- [x] Previous Commodity Aggregation Track Record & References
- [x] Physical Warehouse / Collection Center inspection report
- [x] Legal Background Check & Conflict of Interest Declaration

**Specific Details / Custom Requirements:**
> Partner due diligence should include all listed legal, financial, operational, track-record and integrity checks. Each checklist item must support document upload, verification status, responsible reviewer, verification date, expiry date, risk rating, comments and audit trail. Partner activation should require completion of mandatory due diligence and appropriate approval. Checklist requirements should be configurable by partner type, contract value and risk level.

#### 4. What is the exact approval chain for a new partnership (who reviews, who signs off)?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] Board / Executive Committee approval required for partnerships > X hectares
- [x] Partnership Officer initiates -> Partnership Manager reviews due diligence -> Legal reviews contract -> CEO signs agreement

**Specific Details / Custom Requirements:**
> New partnerships should follow a configurable approval workflow: Partnership Officer initiates → Partnership Manager completes due-diligence review → Legal reviews the agreement → CEO or authorized signatory executes the contract. Partnerships exceeding configured land-area, contract-value or risk thresholds require additional Executive Committee/Board approval before signing. All reviews, approvals, documents and decisions must be recorded in the audit trail.

#### 5. How is Partner Performance measured (KPIs, scorecards) and how often is it reviewed?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] Volume Delivery Rate (% Actual Harvest Delivered vs Target Contracted)
- [x] Crop Quality Compliance (% Grade 1 & Grade 2 vs Rejection rate)
- [x] Input Loan Recovery Rate (% repaid by farmers under partner)
- [x] Agronomic Extension Quality & Farmer Retention Rate
- [x] Monthly Performance Scorecards + Seasonal Comprehensive Review

**Specific Details / Custom Requirements:**
> Partner performance should be measured using all listed KPIs and reviewed through automated monthly scorecards and seasonal comprehensive reviews. KPI weights, targets and scoring rules must be configurable by crop, contract type and partnership model. The system should calculate performance scores automatically from verified operational data, flag underperformance, track corrective actions and maintain historical scorecards and audit trails.

#### 6. What triggers contract renewal vs. termination for a partner?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] Auto-recommend renewal if Scorecard >= 80% and Loan Recovery >= 95%
- [x] Trigger termination warning if Delivery Deficit > 25% without force majeure
- [x] Contract expiration alert 60 days before season start requiring manual review
- [x] Immediate freeze upon unresolved financial default or fraud flag

**Specific Details / Custom Requirements:**
> Partner renewal and termination should be rule-driven but approval-controlled. The system should automatically recommend renewal when configurable performance and recovery thresholds are met, issue termination warnings for material delivery deficits excluding verified force majeure, and alert stakeholders 60 days before contract expiry. Unresolved financial defaults or confirmed fraud risks should trigger an immediate operational freeze. Final renewal, suspension or termination decisions must require authorized human approval, with documented reasons, corrective actions and a complete audit trail.

#### 7. Who owns the relationship — Partnership & Brand Team? Who has final approval authority?
*Category: Roles Involved*

**Selection:** Owned day-to-day by Partnership & Brand Team; Final sign-off by CEO / COO

**Specific Details / Custom Requirements:**
> The Partnership & Brand Team owns day-to-day partner relationship management, while the Partnership Lead and Farming Operations Manager jointly oversee commercial and operational performance. Final approval and contractual sign-off rests with the CEO/COO according to configured authority thresholds. The system must enforce role-based responsibilities, approval limits, delegation and a complete audit trail.

---

### Module 5: Farm & Land Management

#### 1. What farm/field fields are needed (GPS boundary/polygon, size in hectares, soil type, ownership type, farmer/partner linkage)?
*Category: Data to Capture*

**Selected Options:**
- [x] Farm / Parcel Name & Unique Parcel Code
- [x] GPS Boundary Polygon (GeoJSON / Multi-coordinate mapping)
- [x] Calculated Area (Hectares / Timad)
- [x] Soil Classification (Clay, Loam, Sandy, Vertisol) & pH Level
- [x] Ownership Type (Owned, Leased, Sharecropped, Communal)
- [x] Primary Farmer ID & Linked Cooperative / Partner ID
- [x] Topography, Slope, Altitude (meters above sea level)
- [x] Water Source & Irrigation Accessibility (Rainfed, Borehole, River, Drip)

**Specific Details / Custom Requirements:**
> The Farm/Parcel master record should support all listed fields, with GPS polygon as the authoritative spatial boundary and area calculated automatically from the polygon. Each parcel must have a unique code and be linked to its farmer, cooperative and/or partner. Soil, pH, topography, slope, altitude and water/irrigation data should support historical updates and field verification. Spatial data should support GeoJSON and standard coordinate formats, with role-based access, validation and audit trails.

#### 2. What land agreement details need to be captured (lease term, rental terms, land owner details)?
*Category: Data to Capture*

**Selected Options:**
- [x] Lease Start Date, End Date, Duration (Years / Seasons)
- [x] Landowner Full Name, Contact, Kebele ID
- [x] Lease Payment Structure (Fixed ETB/ha/year vs Sharecrop % ratio)
- [x] Payment Schedule & Milestone Receipts
- [x] Land Use Certificate / Rural Landholding Book Reference Number

**Specific Details / Custom Requirements:**
> The Land Agreement module should capture all listed landowner, lease-term, payment, receipt and landholding-reference details. Each agreement must be linked to the relevant Farm/Parcel and support status, renewal/notice periods, supporting documents, verification, approval, amendments and termination history. Lease expiry and payment milestones should generate automated alerts. Payment terms and agreement rules should be configurable by contract type, with full audit trails.

#### 3. What farm documentation types must be stored (title deed, lease contract, land certificate)?
*Category: Data to Capture*

**Selected Options:**
- [x] Rural Landholding Green Book (የገጠር መሬት ይዞታ ደብተር) scan
- [x] Notarized Kebele Land Lease Agreement document
- [x] Farm GPS Boundary Survey Map / KML file
- [x] Water Rights & Environmental Clearance Permit
- [x] Soil Lab Analysis Report Attachment

**Specific Details / Custom Requirements:**
> The Farm Document Management module should support all listed document types, including scanned certificates, notarized agreements, GPS/KML files, soil reports, water rights and environmental permits. Each document must be linked to the relevant Farm/Parcel and support document number, issuing authority, issue/expiry dates, verification status, verified-by information, version history, access control and audit trail. Expiry-sensitive documents should generate automated alerts.

#### 4. How is land boundary data collected — GPS app in the field, satellite digitization, or both?
*Category: Business Rules & Workflow*

**Selection:** Both: Agronomist walks boundary with mobile GPS app in field + GIS team reviews/refines on satellite map

**Specific Details / Custom Requirements:**
> Land boundaries should be captured using both field GPS and satellite/GIS verification. Agronomists should walk the parcel boundary using an offline-capable mobile GPS application to collect the initial polygon and coordinates. The GIS team should then review the polygon against satellite imagery, refine or flag discrepancies, validate the calculated area, and maintain the verified boundary with its source, accuracy, verification date and audit history.

#### 5. What happens if a farm's boundary or ownership changes mid-season?
*Category: Business Rules & Workflow*

**Selection:** Versioned Boundary History: Creates new revision without modifying historical yield data for past seasons

**Specific Details / Custom Requirements:**
> Farm boundary and ownership changes must be version-controlled without altering historical production or yield records. Active parcel changes require Farm Operations Manager approval and should normally be locked during an active production season, taking effect in the next season. Ownership or lease changes must include updated supporting documents, verification and approval. Emergency or legally required mid-season changes may be permitted through an exception workflow with full audit history.

#### 6. Who has authority to register/edit farm boundaries?
*Category: Roles Involved*

**Selected Options:**
- [x] GIS / Agronomy Manager approves and finalizes boundary polygon
- [x] Field Agronomists submit initial GPS boundary survey
- [x] Farming Operations Manager can authorize parcel boundary modifications

**Specific Details / Custom Requirements:**
> Field Agronomists submit the initial GPS boundary survey. GIS/Agronomy Manager reviews, validates and finalizes the polygon using field and satellite/GIS evidence. Farming Operations Manager authorizes modifications to approved parcel boundaries, subject to the applicable seasonal lock and change-control workflow. All boundary submissions, edits, approvals, versions and supporting evidence must be fully audited.

---

### Module 6: Crop & Production

#### 1. What crop/variety master data is needed (name, maturity period, expected yield per hectare)?
*Category: Data to Capture*

**Selected Options:**
- [x] Crop Common Name, Scientific Name, Commercial Variety Code
- [x] Maturity Period (Days from planting to harvest)
- [x] Seed Type (Hybrid, OPV, Local Landrace)
- [x] Expected Benchmark Yield Range (Quintals / Hectare)
- [x] Optimal Planting Window, Temperature, and Rainfall Requirements
- [x] Target Quality Standards (Standard Moisture %, Minimum Purity %)

**Specific Details / Custom Requirements:**
> The Crop/Variety Master should capture all listed agronomic and quality attributes. Benchmark yield, maturity, planting windows, climate requirements and quality standards must be version-controlled and configurable by crop, variety, agro-ecological zone and season. The master data should integrate with farm planning, crop calendars, input recommendations, yield forecasting, harvest and quality-control workflows.

#### 2. What season definition fields are needed (start/end date, season name, region)?
*Category: Data to Capture*

**Selected Options:**
- [x] Season Name (e.g., Meher 2026 / 2018 ዓ.ም, Belg 2026, Irrigation Cycle 1)
- [x] Target Crop Year & Operational Calendar
- [x] Season Start Date, Planting Cut-off Date, Expected Harvest Window End Date
- [x] Target Operational Regions / Agro-ecological zones for this season
- [x] Target Company-wide Production Quota (Metric Tons)

**Specific Details / Custom Requirements:**
> The Season Master should capture all listed fields and support multiple season types such as Meher, Belg and Irrigation Cycles. Seasons must have configurable operational calendars, planting cut-off dates, harvest windows, target regions/agro-ecological zones and production quotas. Production quotas should be allocatable and trackable from company level down to region, zone, woreda, farm and crop. Season definitions must be version-controlled and linked to all relevant production records.

#### 3. What field operation records need logging (planting date, weeding, spraying, labor used)?
*Category: Data to Capture*

**Selected Options:**
- [x] Land Preparation (Plowing, Harrowing, Furrowing date & tractor/oxen hours)
- [x] Planting Activity (Date, seed rate used kg/ha, row spacing, basal fertilizer applied)
- [x] Weeding & Cultivation records (1st, 2nd, 3rd weeding dates, manual vs chemical)
- [x] Agro-chemical Spraying (Date, chemical product, dosage, target pest/disease, operator)
- [x] Top-dressing Fertilizer Application (Date, Urea/NPS rate, soil moisture condition)
- [x] Irrigation logs (Volume applied, method, hours run)
- [x] Labor logs (Number of casual workers, daily rate, total labor cost)

**Specific Details / Custom Requirements:**
> The Field Operations module should capture all listed activities as structured, time-stamped records linked to Farm/Parcel, Season, Crop/Variety, responsible operator, inputs and costs. The mobile application must support offline data capture and synchronization, standardized units and input/product master data, GPS/time verification where applicable, photo/evidence attachments, approval workflows and audit trails. Operation records should feed automatically into input inventory, labor costing, farm costing, crop traceability and yield analysis.

#### 4. How is a Crop Plan created and approved before planting begins?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] Agronomist creates field-level crop plan -> Aggregated to Woreda plan -> Farm Ops Manager approves
- [x] System auto-calculates seed, fertilizer, and chemical requirements based on planned acreage
- [x] Executive sign-off locks seasonal procurement budget before distribution begins

**Specific Details / Custom Requirements:**
> Crop planning should follow a bottom-up workflow: Agronomists create field-level crop plans, which are aggregated automatically into Woreda and higher-level production plans for Farm Operations Manager approval. The system should calculate seed, fertilizer, agro-chemical, labor and irrigation requirements based on planned acreage and approved agronomic recommendations. The approved plan should feed procurement and distribution planning, while Executive approval locks the seasonal procurement budget before distribution. All plans, revisions, approvals and budget changes must be version-controlled and auditable.

#### 5. How is actual yield reconciled against planned/expected yield?
*Category: Business Rules & Workflow*

**Selection:** Flags parcels with > 20% variance for mandatory agronomy inspection & explanation report

**Specific Details / Custom Requirements:**
> Actual yield should be automatically reconciled against the approved crop plan and expected yield at parcel, farm and farmer levels. The system should provide variance dashboards, configurable variance thresholds, automatic alerts and mandatory agronomy investigation for significant deviations. Investigation results, root causes and corrective actions must be recorded. An end-of-season reconciliation report should be generated automatically and reviewed by the Operations Lead, with all adjustments and approvals fully audited.

#### 6. Who creates crop plans — Farming Operations Manager, Agronomist, or Partner?
*Category: Roles Involved*

**Selection:** Field Agronomists draft parcel plans; Farming Operations Manager consolidates and approves

**Specific Details / Custom Requirements:**
> Crop plans should be created at the operational level: Field Agronomists prepare parcel-level plans, while Commercial Partners may submit cluster-level plans for their contracted farmers. The system validates and aggregates these plans, and the Farming Operations Manager consolidates, reviews and approves the final operational plan. All revisions, assumptions, approvals and changes must be version-controlled and auditable.

---

### Module 7: Agronomy & Field Advisory

#### 1. What fields are needed for a Field Inspection record (date, findings, photos, GPS)?
*Category: Data to Capture*

**Selected Options:**
- [x] Inspection Date, Time, Inspector Name & ID
- [x] Farm / Parcel ID & Automated GPS Coordinate verification
- [x] Crop Growth Stage (Germination, Vegetative, Flowering, Pod/Grain filling, Maturity)
- [x] Crop Health & Vigour Rating (Excellent, Good, Fair, Poor, Critical)
- [x] Identified Pests, Diseases, or Weed Infestation (Species, Severity %)
- [x] Moisture Stress & Weather Damage assessment
- [x] High-resolution Field Photos with automated timestamp and geotag
- [x] Actionable Agronomic Advice given to farmer

**Specific Details / Custom Requirements:**
> Field Inspection records should capture all listed data points and be linked to the Farm/Parcel, Crop/Variety and Season. The mobile app should support offline-first inspection capture with GPS verification, timestamped/geotagged photos and standardized crop-health, pest, disease and severity classifications. Agronomic findings should automatically generate actionable recommendations, responsible persons, due dates and follow-up tasks. Inspection records must be immutable after approval, with corrections handled through versioning and a complete audit trail.

#### 2. What soil test data fields are required (pH, nutrients, lab reference)?
*Category: Data to Capture*

**Selected Options:**
- [x] Sample Collection Date, Sample Code, Lab Reference / Certificate No
- [x] Soil pH & Electrical Conductivity (EC)
- [x] Macronutrients: Nitrogen (N), Phosphorus (P - Olsen/Bray), Potassium (K)
- [x] Secondary & Micronutrients: Sulfur (S), Zinc (Zn), Boron (B), Organic Matter (%)
- [x] Soil Texture Class & Cation Exchange Capacity (CEC)
- [x] PDF Laboratory Analysis Certificate attachment

**Specific Details / Custom Requirements:**
> The Soil Test module should capture all listed laboratory and field data and maintain historical soil-test records linked to Farm/Parcel, Crop and Season. Laboratory certificates must be attachable and traceable to the corresponding sample and lab reference. Nutrient results should retain the analytical method and units used, support comparison across sampling dates, and feed approved agronomic decision-support workflows such as crop and fertilizer recommendations. All edits, uploads, verification and approvals must be version-controlled and auditable.

#### 3. What structure should a Fertilizer/Irrigation Recommendation follow (product, quantity, timing, target field)?
*Category: Data to Capture*

**Selected Options:**
- [x] Target Farm Parcel & Crop Variety
- [x] Recommended Input Product Name (e.g. NPSB, Urea, Bio-fertilizer)
- [x] Exact Application Dosage (kg per Hectare & kg per Parcel)
- [x] Optimal Application Timing / Growth Stage Window
- [x] Application Method (Broadcasting, Side-dressing, Foliar spray, Fertigation)
- [x] Safety & Environmental instructions

**Specific Details / Custom Requirements:**
> Fertilizer and irrigation recommendations should capture all listed fields and be linked to the specific Farm/Parcel, Crop/Variety and Season. Recommendations should be generated or approved based on soil-test results, crop requirements, acreage, agro-ecological conditions and growth stage. The system should calculate both per-hectare and total parcel quantities, specify timing and application method, and include safety and environmental instructions. Each recommendation must record its agronomic basis, author, approval, date, version and audit trail.

#### 4. Does every recommendation require approval before reaching the farmer, and by whom?
*Category: Business Rules & Workflow*

**Selection:** Standard pre-approved agronomy advisory packages auto-sent; Custom/emergency chemical recommendations require Research & Agronomy Manager sign-off

**Specific Details / Custom Requirements:**
> advisory packages may be automatically dispatched to eligible farmers. Custom, high-risk or emergency chemical recommendations must require Senior Agronomist and/or Research & Agronomy Manager approval before dispatch. The system should enforce configurable approval rules based on recommendation type, chemical risk, crop, region and urgency. Every recommendation must record its author, approval, recipient, dispatch time, version and audit trail.

#### 5. How often are field inspections required (fixed schedule vs. as-needed)?
*Category: Business Rules & Workflow*

**Selection:** Fixed Mandatory Schedule: Minimum 4 visits per season (Planting, Mid-vegetative, Flowering, Pre-harvest)

**Specific Details / Custom Requirements:**
> Field inspection scheduling should combine a configurable mandatory minimum schedule, increased frequency for high-value/export crops, risk-triggered inspections and on-demand farmer requests. The system should automatically generate inspection schedules based on crop, season, growth stage, risk level and farm priority, while allowing authorized managers to adjust frequency. Pest alerts, satellite anomalies and farmer requests should create additional inspection tasks. All scheduled, completed, missed and rescheduled inspections must be tracked and auditable.

#### 6. How is Yield Estimation calculated and updated through the season?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] Multi-stage algorithmic forecast: Stage 1 (Planned) -> Stage 2 (Mid-season NDVI) -> Stage 3 (Pre-harvest sample cut)

**Specific Details / Custom Requirements:**
> Yield estimation should use a multi-stage forecasting model: Stage 1 based on the approved crop plan and benchmark yield; Stage 2 updated using mid-season field observations and satellite/NDVI indicators; and Stage 3 refined using pre-harvest crop-cut or field sampling. The final estimate should be reconciled against actual harvested and received quantities, with all forecast versions, data sources, assumptions and adjustments retained for historical analysis and audit.

#### 7. What is the exact hierarchy — Agronomist reports to Research & Agronomy Manager?
*Category: Roles Involved*

**Selection:** Field Agronomist -> Lead Zone Agronomist -> Research & Agronomy Manager

---

### Module 8: Contract Farming & Outgrower Schemes

#### 1. What contract fields are required (parties, crop, target quantity, price formula, duration, penalties)?
*Category: Data to Capture*

**Selected Options:**
- [x] Contract Number, Agreement Date, Effective Season
- [x] Contracting Parties (Company Name, Farmer/Cooperative Name, ID, Kebele)
- [x] Target Crop, Variety, Target Cultivated Area (ha)
- [x] Guaranteed Minimum Supply Volume / Expected Yield (Quintals)
- [x] Pricing Mechanism (Fixed Price/kg, Floor Price + Market Premium %, Government Minimum Support Price)
- [x] Input Financing Package & Advance Credit Schedule
- [x] Delivery Location, Quality Criteria & Moisture Deductions
- [x] Default & Side-selling Penalties, Dispute Resolution Clause
- [x] Scanned Signed Contract / Digital Biometric Signature

**Specific Details / Custom Requirements:**
> The Contract Management module should capture all listed fields, including contract parties, crop/variety, cultivated area, guaranteed supply, pricing mechanism, input financing, delivery and quality requirements, penalties, dispute resolution, and signed contract/digital signature. Contracts should be linked to the relevant farmer/cooperative, farm parcel and season, with configurable terms, approval workflow, version control, expiry alerts and a complete audit trail.

#### 2. What are the standard Contract Terms templates, and do they vary by crop or region?
*Category: Data to Capture*

**Selected Options:**
- [x] Standard Individual Outgrower Farmer Contract Template
- [x] Cooperative Union Tripartite Agreement (Company + Union + Input Provider)
- [x] Commercial Nucleus Farm Partner Contract
- [x] Templates customized dynamically by crop commodity and regional jurisdiction

**Specific Details / Custom Requirements:**
> The Contract Management module should support all listed contract templates, including Individual Outgrower Farmer Contracts, Cooperative Union Tripartite Agreements, Commercial Nucleus Farm Partner Contracts, and dynamically customized templates based on crop commodity and regional jurisdiction. Templates should support version control, legal review, approval workflows and audit trails.

#### 3. How is a contract's performance measured mid-season (progress vs. target)?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] Real-time Dashboard comparing Field Planting Area vs Contracted Area
- [x] Agronomic Health score vs Projected Delivery volume
- [x] Input recovery exposure vs current crop value in the field
- [x] Early warning flag for farmers at risk of default

#### 4. What triggers Contract Settlement — harvest completion, season end, both?
*Category: Business Rules & Workflow*

**Selection:** Hybrid: 80% interim settlement per delivery, with 20% final balance settled at season close

**Specific Details / Custom Requirements:**
> Contract settlement should follow a hybrid model: 80% interim settlement upon each verified harvest delivery, with the remaining 20% settled at season close after final delivery reconciliation, quality adjustments, deductions, and input-credit recovery.

#### 5. What happens if a farmer under-delivers or over-delivers against the contract target?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] Under-delivery due to verified Force Majeure (drought, hail): Input loan carried forward / restructured to next season
- [x] Intentional Under-delivery (Side-selling): Penalty applied, input debt escalated, farmer blacklisted
- [x] Over-delivery: Company purchases excess volume at prevailing market / contract rate subject to warehouse capacity
- [x] Automatic agronomist field loss investigation triggered for under-delivery > 15%

**Specific Details / Custom Requirements:**
> The system should distinguish verified Force Majeure from intentional under-delivery or side-selling. Verified Force Majeure should trigger input-loan carry-forward or restructuring; intentional under-delivery should trigger applicable penalties and debt escalation according to the contract. Over-delivery should allow the company to purchase excess volume at the prevailing market or contracted rate, subject to warehouse capacity. Under-delivery exceeding a configurable threshold should automatically trigger an agronomist field-loss investigation, with findings and corrective actions recorded in the system.

#### 6. Who negotiates and signs contracts on behalf of the company?
*Category: Roles Involved*

**Selection:** Commercial / Partnership Team negotiates; CEO / Authorized Legal Signatory signs

**Specific Details / Custom Requirements:**
> Contract negotiation and signing should follow a role-based delegated authority structure. The Commercial/Partnership Team negotiates strategic agreements, with the CEO or authorized legal signatory providing final execution. Regional Branch Managers may sign within configurable delegated limits, such as contracted hectares or contract value, while the Farming Operations Director may sign standard farmer outgrower agreements. All signing authorities, limits, approvals, digital signatures and contract versions must be controlled and fully auditable by the system.

---

### Module 9: Agricultural Inputs & Supply

#### 1. What seed/fertilizer/chemical master data is needed (name, type, supplier, unit cost)?
*Category: Data to Capture*

**Selected Options:**
- [x] Item Code, Commercial Name, Chemical Active Ingredient
- [x] Category (Certified Seed, Inorganic Fertilizer, Bio-Fertilizer, Herbicide, Insecticide, Fungicide)
- [x] Manufacturer / Certified Supplier Name, Country of Origin
- [x] Batch Number, Manufacturing Date, Expiration Date
- [x] Unit of Measure (Kg, Liter, 50kg Bag, 100kg Bag), Unit Cost & Standard Selling / Subsidy Price
- [x] Recommended Application Rate per Hectare & Target Crops
- [x] Safety Data Sheet (MSDS) & Toxicity / Storage Guidelines

#### 2. What equipment records are needed (asset tag, condition, assigned farm/partner)?
*Category: Data to Capture*

**Selected Options:**
- [x] Asset Tag / Serial Number, Equipment Type (Tractor, Planter, Harvester, Knapsack Sprayer, Moisture Meter)
- [x] Manufacturer, Model, Purchase Date, Purchase Cost, Depreciation Rate
- [x] Operational Condition (New, Good, Fair, In-Repair, Decommissioned)
- [x] Current Custodian / Assigned Agronomist / Partner / Farm Hub
- [x] Maintenance & Service Log (Service date, cost, parts replaced, next due date)

**Specific Details / Custom Requirements:**
> The Asset Management module should capture all listed equipment records, including asset identification, specifications, purchase and depreciation data, operational condition, current custodian and assignment, and complete maintenance history. Each asset should be traceable to its assigned employee, partner, farm or hub, with transfer history, maintenance schedules, service costs and next-due dates. Asset records, assignments, maintenance updates and status changes must be version-controlled and fully auditable.

#### 3. How is Input Planning derived — from crop plan automatically, or manually entered?
*Category: Business Rules & Workflow*

**Selection:** Hybrid: Auto-calculated baseline with manual agronomist buffer adjustments

**Specific Details / Custom Requirements:**
> Input Planning should use a hybrid approach: the system automatically calculates the baseline requirement from approved Crop Plans, cultivated acreage and agronomically approved dosage formulas, while authorized Agronomists can apply justified buffer adjustments based on field conditions, seasonal risk and expected losses. All manual adjustments must require a reason, authorization and audit trail, with the original automated calculation preserved for comparison.

#### 4. Is input distributed on credit against future harvest, cash, or company-subsidized?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] Input Credit / In-Kind Loan: Repaid via automatic deduction at harvest settlement

**Specific Details / Custom Requirements:**
> Company/Investor-Funded Input Package: Inputs are provided upfront by the investor as part of the farming partnership agreement, with costs recovered/allocated according to the agreed harvest revenue-sharing or settlement model.

#### 5. Who approves input allocation before distribution?
*Category: Business Rules & Workflow*

**Selection:** 2-Step Approval: Lead Agronomist verifies farmer eligibility -> Farm Ops Manager approves distribution voucher

#### 6. Who physically distributes inputs and who confirms receipt?
*Category: Roles Involved*

**Selected Options:**
- [x] Distribution Center Officer / Cooperative Leader witnesses and co-signs distribution sheet
- [x] Farmer confirms receipt via digital signature, biometric fingerprint, or SMS OTP on agronomist mobile device
- [x] Warehouse Storekeeper dispenses physical inputs

---

### Module 10: Procurement & Vendor Management

#### 1. What supplier fields are needed (name, category, payment terms, performance history)?
*Category: Data to Capture*

**Selected Options:**
- [x] Supplier Legal Name, Trade Name, TIN, VAT Registration No
- [x] Vendor Category (Seeds, Agrochemicals, Machinery, Packaging, Transport, Services)
- [x] Contact Person Name, Phone, Email, Physical Office Address
- [x] Bank Account Details for Electronic Fund Transfer
- [x] Payment Terms (Immediate, Net 15, Net 30, Advance + Milestone)
- [x] Vendor Quality & Delivery Timeliness Rating History

#### 2. What fields does a Purchase Request/Order need (item, quantity, budget line, requested by)?
*Category: Data to Capture*

**Selected Options:**
- [x] PR / PO Number, Creation Date, Required Delivery Date
- [x] Requesting Department, Project / Season, Requester Name & Title
- [x] Budget Line / Account Code & Budget Availability confirmation
- [x] Line Items (Item description, part/item code, quantity, unit, estimated unit price, total price)
- [x] Vendor Quotations Attached (Minimum 3 competitive bids for tender threshold)
- [x] Delivery Location / Receiving Warehouse

#### 3. Is RFQ (Request for Quotation) mandatory above a certain amount?
*Category: Business Rules & Workflow*

**Selection:** Configurable threshold per purchase category

#### 4. What is the approval chain for procurement, and does it differ by purchase category (inputs vs. equipment vs. office supplies)?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] Agricultural Inputs: Agronomy Manager -> Procurement Lead -> Finance -> COO
- [x] Capital Machinery / Equipment: Department Head -> Procurement Lead -> Finance Director -> CEO
- [x] Routine Office & Field Supplies: Requester -> Department Head -> Procurement Officer
- [x] Emergency field purchases: Expedited single approval by Regional Branch Manager

#### 5. Who can request purchases, and who has final procurement approval?
*Category: Roles Involved*

**Selection:** Any authorized Department Lead can submit PRs; Final PO approval held by CEO / COO / Finance Director

---

### Module 11: Warehouse & Inventory Management

#### 1. What warehouse/location fields are needed (name, capacity, region)?
*Category: Data to Capture*

**Selected Options:**
- [x] Warehouse Name, Unique Warehouse Code, Warehouse Type (Central Silo, Regional Hub, Aggregation Center)
- [x] Physical Location (Region, Zone, Woreda, GPS Coordinates)
- [x] Total Storage Capacity (Metric Tons / Bags / Pallets) & Volume (m3)
- [x] Storage Infrastructure (Aerated Silo, Traditional Shed, Cold Room, Open Yard)
- [x] Warehouse Manager / Lead Storekeeper Contact details

#### 2. What batch/lot fields are needed (batch ID, source farm, quantity, quality grade, date received)?
*Category: Data to Capture*

**Selected Options:**
- [x] Unique Batch / Lot Number (with barcode / QR generation)
- [x] Source Origin (Farmer ID, Outgrower Cluster, Primary Cooperative, Commercial Farm)
- [x] Crop Commodity & Variety
- [x] Received Quantity (Gross weight, Tare weight, Net weight in Quintals/Kg, Bag count)
- [x] Moisture Content %, Purity %, Foreign Matter %, Broken Grain %, Color Grade
- [x] Assigned Quality Grade (Grade 1 Export, Grade 2 Domestic, Grade 3 Processing, Reject)
- [x] Receiving Date & Intake Weighbridge Ticket Number
- [x] Assigned Storage Zone / Bin / Silo Number

#### 3. What quality control criteria/fields need to be recorded at receiving?
*Category: Data to Capture*

**Selected Options:**
- [x] Moisture Level (using digital moisture meter reading)
- [x] Foreign Matter / Impurity Percentage
- [x] Pest / Weevil / Insect Damage Percentage
- [x] Aflatoxin / Mycotoxin Rapid Test Result (PPM / PPB) for grain/oilseeds
- [x] Visual Color, Odor, and Live Infestation check
- [x] Quality Inspector Signature & QC Certificate attachment

#### 4. What triggers automatic stock updates from Harvest Receiving?
*Category: Business Rules & Workflow*

**Selection:** Real-time: Stock instantly increases upon QC sign-off and Goods Received Note (GRN) generation at weighbridge

#### 5. What is the process for stock transfer between warehouses?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] Destination Warehouse inspects, weighs, and records Goods Receipt Note (GRN)
- [x] Stock Transfer Order (STO) created -> Approved by Inventory Manager
- [x] Automatic discrepancy / transit loss logging if dispatch weight != received weight

#### 6. How are damaged/rejected goods handled in the system?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] Rejection at Gate: Return to farmer/supplier with official rejection slip citing failure reasons
- [x] Downgrade / Re-conditioning workflow (e.g. Re-cleaning, drying, grading to lower tier)
- [x] Write-off / Disposal workflow requiring formal Board / Finance sign-off

#### 7. Who has authority to approve stock adjustments/write-offs?
*Category: Roles Involved*

**Selection:** Warehouse Manager can adjust up to X Quintals (normal shrinkage); Higher amounts require COO approval

---

### Module 12: Buyers & Sales Management

#### 1. What buyer/customer fields are needed (company name, contact, credit terms, market/region)?
*Category: Data to Capture*

**Selected Options:**
- [x] Buyer Company Name, Registration No, TIN, VAT Certificate
- [x] Buyer Category (Export Offtaker, Domestic Processor, Food Manufacturer, Institutional Buyer)
- [x] Contact Persons, Designation, Phone, Email, Office Address
- [x] Destination Country / Market (Domestic, European Union, Middle East, Asia, USA)
- [x] Credit Limit & Payment Terms (Advance Payment, LC, CAD, Net 30, Net 60)
- [x] Special Quality & Packaging Specifications Required

**Specific Details / Custom Requirements:**
> Buyer Company Name, Registration No, TIN, VAT Certificate; Buyer Category; Contact Persons & Details; Destination Country/Market; Credit Limit & Payment Terms; Special Quality & Packaging Specifications

#### 2. What does a Sales Order need to capture (product, quantity, price, delivery terms)?
*Category: Data to Capture*

**Selected Options:**
- [x] Sales Order Number, Order Date, Required Shipment Date
- [x] Buyer Name & Billing / Shipping Address
- [x] Crop Commodity, Variety, and Quality Grade
- [x] Ordered Quantity (Metric Tons / Bags) and Packaging Type (50kg Jute, PP Bags, Bulk Container)
- [x] Contract Unit Price (ETB/Quintal or USD/Metric Ton)
- [x] Incoterms (EXW, FOB Djibouti, CIF destination port, DAP)
- [x] Payment Terms & Proforma Invoice Number

**Specific Details / Custom Requirements:**
> Sales Order Number, Order Date, Required Shipment Date; Buyer & Billing/Shipping Address; Commodity, Variety & Quality Grade; Quantity & Packaging; Contract Unit Price; Incoterms; Payment Terms & Proforma Invoice Number; Custom Contract Terms.

#### 3. How is Order Allocation decided — first-come, contract priority, or manual assignment?
*Category: Business Rules & Workflow*

**Selection:** Contract Priority Allocation: Long-term contracted export buyers prioritized over spot market buyers

#### 4. What are the credit/payment terms typically offered to buyers?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] 100% Advance Payment / Cash before loading
- [x] Irrevocable Confirmed Letter of Credit (LC) at Sight (Export standard)
- [x] Cash Against Documents (CAD) through National Bank
- [x] 30-day / 60-day credit for vetted institutional domestic processors

#### 5. Who approves a new buyer's onboarding and credit limit?
*Category: Business Rules & Workflow*

**Selection:** Commercial Lead proposes -> Finance Director conducts credit check -> CEO approves onboarding & credit limit

#### 6. Who owns buyer relationships and negotiates pricing?
*Category: Roles Involved*

**Selection:** Commercial Sales & Marketing Team; CEO approves custom export pricing discounts

---

### Module 13: Logistics & Fleet Management

#### 1. What vehicle/driver fields are needed (plate number, capacity, license, assigned routes)?
*Category: Data to Capture*

**Selected Options:**
- [x] Vehicle Plate Number, Make, Model, Vehicle Type (Isuzu, Sino Truck, Flatbed, Pickup, Trailer)
- [x] Payload Capacity (Quintals / Metric Tons) and Cargo Volume (m3)
- [x] Ownership (Company-Owned Fleet vs Third-Party Contracted Transporter)
- [x] GPS Tracker Unit ID & Real-time Telematics linkage
- [x] Transporter Company Name, Agreement Reference, Tax TIN (if third-party)
- [x] Assigned Transport Corridor / Regular Operational Routes

#### 2. What delivery route and shipment fields are needed?
*Category: Data to Capture*

**Selected Options:**
- [x] Shipment / Waybill Number, Dispatch Date & Expected Arrival Time
- [x] Origin (Collection Center / Farm Hub) & Destination (Central Warehouse / Processing Plant / Port Djibouti)
- [x] Cargo Manifest (Batch IDs, Commodity, Bag Count, Gross Weight, Net Weight)
- [x] Driver Name, Vehicle Plate Number, Escort / Security Details
- [x] Fuel Allocation & Distance (km)
- [x] Dispatch Weighbridge Slip & Seal Numbers

#### 3. Are vehicles company-owned, contracted, or both — does this affect workflow?
*Category: Business Rules & Workflow*

**Selection:** 100% Third-party contracted transport companies & union freight associations

#### 4. What confirms successful delivery — driver sign-off, buyer confirmation, both?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] Destination Warehouse / Buyer signed Goods Receipt Note (GRN) with stamped Waybill
- [x] Destination weighbridge ticket confirming received weight vs dispatch weight
- [x] Mobile App photo upload of signed delivery voucher and container seals intact
- [x] Digital OTP confirmation entered by receiving warehouse manager

#### 5. Who assigns routes/drivers to shipments?
*Category: Roles Involved*

**Selection:** Logistics & Fleet Coordinator schedules dispatches and assigns vehicles

---

### Module 14: Finance & Cost Accounting

#### 1. What does the Chart of Accounts structure look like — does the client have an existing one?
*Category: Data to Capture*

**Selected Options:**
- [x] Standard Ethiopian GAAP / IFRS Chart of Accounts structure (Assets, Liabilities, Equity, Revenue, COGS, OpEx)
- [x] Segmented / Multi-dimensional Chart of Accounts (Account Code - Department - Region - Crop/Project)
- [x] Existing Chart of Accounts from Peachtree / QuickBooks / ERP will be provided for import

#### 2. What budget fields/structure are needed (by department, by season, by farm)?
*Category: Data to Capture*

**Selected Options:**
- [x] Seasonal Operational Budget (Seed, Fertilizer, Chemicals, Field Labor, Transport per Crop/Region)
- [x] Departmental Annual Operating Budget (HR, IT, Marketing, Admin)
- [x] Capital Expenditure (CapEx) Budget (Machinery, Warehouse construction, IT infrastructure)
- [x] Budget Line Item Code, Allocated Amount, Committed Amount, Actual Spend, Variance

#### 3. What fields define a Farmer/Partner Settlement calculation (gross revenue, deductions, management fee, net payable)?
*Category: Data to Capture*

**Selected Options:**
- [x] Gross Crop Value (Net Weight Delivered x Contract Price/Grade)
- [x] Quality Deductions (Moisture penalty, impurity deduction, broken grain deduction)
- [x] Input Loan Deductions (Seed loan, fertilizer credit, chemical advances recovered)
- [x] Cash Advances / Sacking / Bag Cost Deductions
- [x] Cooperative / Partner Management Fee / Commission (%)
- [x] Statutory Withholding Tax Deduction (if applicable)
- [x] Net Payable Amount to Farmer Bank / Telebirr Account

#### 4. What is the exact formula for calculating Management Fees?
*Category: Business Rules & Workflow*

**Selection:** Percentage of Gross Harvest Value (e.g. 3% - 5% commission to Partner Cooperative)

**Specific Details / Custom Requirements:**
> Management Fee Formula:
> Management Fee = Contracted Price per Hectare × Total Contracted Hectares × Management Fee Rate (default: 10%).
> 
> Configurable: The formula, percentage/rate, pricing basis, and other calculation parameters must be configurable in the system. Different contracts may use different rates, amounts, or calculation methods; therefore, the system must not apply the same fixed formula to every contract.

#### 5. How is Profitability calculated — per farm, per contract, per season, company-wide?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] Multi-level Profitability Reporting: Company-Wide consolidated P&L
- [x] Seasonal Crop / Commodity P&L (e.g. Soybean 2026 Margin vs Sesame 2026 Margin)
- [x] Regional Hub / Branch Level Profitability
- [x] Per-Farm / Per-Outgrower Cluster Gross Margin analysis (Revenue minus all direct inputs, labor, and transport)

#### 6. What is the approval chain specifically for releasing a farmer/partner settlement payment?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] Warehouse GRN & QC Verified -> Finance Accountant audits deduction calculations -> Finance Manager verifies -> CEO signs disbursement batch
- [x] Automated check ensuring all input debt is fully accounted for before releasing balance
- [x] Branch Finance Officer approves local cash payouts up to regional ceiling

#### 7. Who in Finance has authority over budget vs. payment execution vs. reporting?
*Category: Roles Involved*

**Selected Options:**
- [x] Budget Formulation & Modification: Finance Director & CEO
- [x] Payment Execution & Bank Disbursement: Finance Manager + Designated Check/API Signatories
- [x] Daily Bookkeeping & Voucher Preparation: Accounts Payable / Payroll Accountants
- [x] Financial Reporting & Statutory Filings: Chief Financial Officer / Senior Finance Manager

---

### Module 15: Customer & Investor Portal

#### 1. Which specific data points should each customer/investor type see (full financials vs. summary only)?
*Category: Data to Capture*

**Selected Options:**
- [x] Commercial Buyers: Order status, live shipment tracking, batch quality certificates, digital invoices, account balance
- [x] Equity / Fund Investors: High-level KPI dashboards (Total Hectares Planted, Yield Forecasts, ESG Impact Metrics, Revenue Summary)
- [x] Lenders / Development Banks: Loan portfolio performance, farmer input recovery rates, audited financial reports
- [x] Impact Metrics: Number of smallholder farmers supported, female farmer %, household income uplift

#### 2. Should investors see cross-farm/portfolio views, or only the specific farms tied to their investment?
*Category: Data to Capture*

**Selection:** Aggregated portfolio-wide view across all company operations (anonymized)

#### 3. How real-time does portal data need to be — instant, hourly, daily refresh?
*Category: Business Rules & Workflow*

**Selection:** Real-time instant live updates for shipment tracking & warehouse arrivals

#### 4. Can customers/investors download reports/documents, or view-only?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] Download PDF Quality Certificates, Invoices, and Proof of Delivery
- [x] Download Board / Investor Deck summaries (PDF / Excel data export)

#### 5. Should there be a request/inquiry feature so investors can ask questions directly through the portal?
*Category: Business Rules & Workflow*

**Selection:** Yes — Built-in Ticketing / Inquiry system routed to Investor Relations & Commercial team

#### 6. Are there different portal permission tiers among customers/investors?
*Category: Roles Involved*

**Selection:** Yes — Tier 1 (Lead Investors & Strategic Offtakers: Full reporting) vs Tier 2 (Standard Buyers: Orders only)

#### 7. Who is responsible for onboarding a new investor/customer onto the portal?
*Category: Roles Involved*

**Selection:** Automated self-service registration with vetting

---

### Module 16: Mobile & Field Operations

#### 1. What field data collection forms are needed (inspection, photo, GPS check-in)?
*Category: Data to Capture*

**Selected Options:**
- [x] Farmer Registration & National ID Capture Form
- [x] Farm Boundary GPS Polygon Mapping Form
- [x] Routine Agronomy Crop Inspection & Pest Scoring Form
- [x] Input Distribution Receipt & Farmer Confirmation Form
- [x] Harvest Weigh-in & QC Intake Form
- [x] Farmer Training & Attendance Roster Form

#### 2. Should photos be geo-tagged and timestamped automatically for verification purposes?
*Category: Data to Capture*

**Selection:** Yes — Mandatory automatic EXIF GPS coordinate extraction, server timestamp watermarking, and camera-only capture (prevent uploading old gallery photos)

#### 3. How long can the app operate fully offline before requiring sync?
*Category: Business Rules & Workflow*

**Selection:** Indefinitely: App must store thousands of records locally in SQLite / IndexedDB and sync whenever connection is restored (days or weeks in remote areas)

#### 4. What happens when there's a data conflict between offline entries and server data during sync?
*Category: Business Rules & Workflow*

**Selection:** Server Wins with Field Change Review (Server master data preserved; conflicting field submissions flagged for manual manager review)

#### 5. What is the minimum device specification the app must support (older/low-cost Android phones)?
*Category: Business Rules & Workflow*

**Selection:** Budget Android devices: Android 8.0 (Oreo) or higher, 2GB RAM, low-cost Transsion/Tecno/Infinix phones

#### 6. Which roles need the mobile app — Agronomists only, or Partners/Farmers too?
*Category: Roles Involved*

**Selected Options:**
- [x] Field Agronomists & Extension Agents (Primary heavy daily users)
- [x] Partner Supervisors & Cooperative Cluster Leaders
- [x] Warehouse Weighbridge & QC Receiving Officers
- [x] Logistics Drivers (Delivery sign-off app)
- [x] Farmers (Simplified lightweight farmer portal / USSD in Phase 2)

#### 7. Do farmers need any mobile access at all, even read-only?
*Category: Roles Involved*

**Selection:** SMS / USSD service only (Receive instant SMS alerts for payments, inputs, and weather advisory; Dial *888# for balance)

---

### Module 17: Smart Agriculture & AI Analytics

#### 1. What specific satellite/vegetation indices matter most to the client (NDVI, soil moisture, etc.)?
*Category: Data to Capture*

**Selected Options:**
- [x] Normalized Difference Vegetation Index (NDVI) — Crop health & vigor monitoring
- [x] Enhanced Vegetation Index (EVI) / NDRE — High biomass canopy monitoring
- [x] Soil Moisture Index (SMAP / Sentinel-1 SAR) & Water Stress detection
- [x] Land Surface Temperature (LST) & Heat anomaly alerts
- [x] Automated Weather & Precipitation historical & 14-day forecasts (ECMWF / GFS)

#### 2. What historical data (past seasons, yields) already exists that could train initial models?
*Category: Data to Capture*

**Selected Options:**
- [x] 3+ years of historical GPS farm boundaries, planting dates, and final yield quintals in Excel
- [x] Historical soil laboratory test results across target woredas
- [x] Historical weather station rainfall and temperature records
- [x] No structured historical data available (System will gather baseline data in Season 1)

#### 3. What accuracy/confidence level is acceptable for yield predictions before they're trusted operationally?
*Category: Business Rules & Workflow*

**Selection:** +/- 20% Directional guidance acceptable in Phase 1; refinement in Phase 2

#### 4. Should risk alerts trigger any automatic action, or always route to a human for review first?
*Category: Business Rules & Workflow*

**Selection:** Automatic Field Task Generation: Create inspection ticket automatically on agronomist mobile when parcel NDVI drops > 15%

#### 5. Who reviews AI/satellite-driven alerts before they reach agronomists or farmers?
*Category: Roles Involved*

**Selection:** Research & Agronomy Manager / GIS Specialist

---

### Module 18: Reporting & Management Intelligence

#### 1. What are the top 10 KPIs management wants visible on the Executive Dashboard on day one?
*Category: Data to Capture*

**Selected Options:**
- [x] Total Hectares Planted vs Seasonal Target Acreage
- [x] Total Registered Active Farmers & Gender Breakdown
- [x] Real-time Crop Health Index & Pest Incident Heatmap
- [x] Projected Total Harvest Volume (MT) vs Buyer Demand
- [x] Harvest Delivered to Date vs Target (MT)
- [x] Input Credit Disbursed vs Harvest Recovery Rate (%)
- [x] Gross Revenue, Direct Costs, and Gross Margin (ETB)
- [x] Warehouse Stock Levels & Available Export Inventory
- [x] Outstanding Approval Requests & Operational Bottlenecks
- [x] Farmer Payment Disbursement Status & Outstanding Payables

#### 2. What specific metrics define 'Farm Performance' and 'Farmer Performance' numerically?
*Category: Data to Capture*

**Selected Options:**
- [x] Yield per Hectare (Quintals/ha) relative to regional crop benchmark
- [x] Delivery Contract Fulfillment Rate (% delivered vs committed)
- [x] Grade 1 / Export Quality Ratio (%)
- [x] Input Credit Repayment Timeliness (%)
- [x] Agronomic Protocol & Good Agricultural Practices (GAP) compliance score

#### 3. What reporting periods matter most — weekly, monthly, seasonal, annual?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] Daily Operational Snapshot during peak harvest intake
- [x] Weekly Regional Progress Reports for Operations Meetings
- [x] Monthly Financial & Departmental Performance Reports
- [x] Seasonal Post-Harvest Comprehensive Crop Debrief
- [x] Annual Statutory & Board Reporting Pack

#### 4. Do reports need to be exportable (PDF/Excel) for board/investor meetings?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] Yes — Pixel-perfect branded PDF executive reports with charts and summaries
- [x] Yes — Raw data export to Excel / CSV with multi-level filtering
- [x] Yes — PowerBI / Tableau integration via secure analytical database replica

#### 5. Should dashboards be customizable per user, or fixed by role?
*Category: Business Rules & Workflow*

**Selection:** Role-based Standard Dashboards (Clean, consistent dashboards designed specifically for each role)

**Specific Details / Custom Requirements:**
> Role-based Standard Dashboards with customizable Drag-and-Drop Widgets and configurable Date, Season, Region, Farm, and Crop Filters

#### 6. Who defines/approves new KPIs or report formats going forward?
*Category: Roles Involved*

**Selection:** Executive Leadership & Department Heads define KPIs; IT / Analytics team configures reports

**Specific Details / Custom Requirements:**
> Executive Leadership & Department Heads define and approve KPIs; IT / Analytics configures and maintains standardized reports and dashboards, with controlled custom reporting available to authorized department users.

---

### Module 19: Workflow Automation

#### 1. Which calculations are highest priority to automate first (settlement, buyer matching, notifications)?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] Farmer Settlement Calculation (Automatic calculation of Gross, Deductions, Net Payout from weighbridge GRN)
- [x] Input Requirement Formula (Auto-generation of seed/fertilizer BOM from acreage)
- [x] Automated SMS Notification Triggers on weighbridge intake and payment release
- [x] Automated Grading & Price Matrix Lookup based on lab QC parameters
- [x] Buyer Sales Order Inventory Allocation & Reservation

#### 2. Should automated actions always have a human review step, or can some execute fully unattended?
*Category: Business Rules & Workflow*

**Selection:** Hybrid: Routine status updates and SMS notifications run unattended; Financial payouts and stock write-offs always require human review/sign-off

**Specific Details / Custom Requirements:**
> Hybrid: Routine operational updates, alerts, and SMS notifications execute automatically; financial transactions, payouts, inventory adjustments/write-offs, and other high-impact actions require authorized human review and sign-off.

#### 3. What is the fallback process if an automated calculation produces an unexpected/out-of-range result?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] Reverts to last known valid state and prompts user for manual override entry with mandatory reason
- [x] Logs error details to system audit log without blocking other queue items

**Specific Details / Custom Requirements:**
> Exception Handling: The system immediately pauses the affected automated job, flags the record as “Calculation Exception,” preserves/reverts to the last known valid state, logs full details in the audit trail, alerts the responsible Finance/Admin user, and requires an authorized manual override with a mandatory reason before processing can continue.

---

### Module 20: Third-Party Integrations

#### 1. Beyond payment/SMS/weather/maps, are there any existing government or industry systems the client must integrate with (tax authority, export licensing)?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] Ministry of Revenues (ERCA / MOR) Electronic Sales Register / Tax Invoice API
- [x] National ID Program (Fayda / NIDP) biometric / e-KYC verification API
- [x] Ethiopian Commodity Exchange (ECX) market price integration
- [x] National Bank of Ethiopia (NBE) FX & foreign exchange permit tracking
- [x] Ethiopian Coffee and Tea Authority / Agricultural Transformation Institute (ATI) reporting platforms
- [x] No external government API integration needed in Phase 1 (Stand-alone ERP)

**Specific Details / Custom Requirements:**
> Government & Industry Integration: Integrate with required Ethiopian government and industry platforms, including Ministry of Revenues tax/e-invoicing, Fayda/NIDP e-KYC, ECX market prices, and NBE FX/permit tracking. Coffee & Tea Authority, ATI, and other sector-specific reporting/export platforms will be integrated as required by the business and phased implementation plan. The system should support API-based integration while allowing Phase 1 operation where an external API is not yet available.

#### 2. Are there preferred/mandated vendors for any integration (e.g. a specific SMS gateway already under contract)?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] Open to vendor recommendations based on technical documentation and cost

#### 3. Should third-party API costs/usage be tracked and capped within the system?
*Category: Business Rules & Workflow*

**Selection:** Yes — Built-in API Usage & Cost Monitor with monthly quota thresholds and alert notifications (SMS credits, Maps API calls, Satellite tiles)

---

### Module 21: Master Data Management

#### 1. What is the definitive list of regions/zones/woredas the company operates in?
*Category: Data to Capture*

**Selected Options:**
- [x] Oromia Region (e.g. Jimma, Bale, Arsi, East Shewa, West Hararghe)
- [x] Amhara Region (e.g. West Gojjam, North Gondar, South Wollo)
- [x] Sidama & SNNPR / Central Ethiopia / South Ethiopia Regions
- [x] Tigray Region
- [x] Benishangul-Gumuz / Gambella / Somali / Afar Regions
- [x] Pre-populated Ethiopian Administrative Hierarchy (Regions -> Zones -> Woredas -> Kebeles) built into system

#### 2. What crop and unit-of-measure master lists already exist that should be imported?
*Category: Data to Capture*

**Selected Options:**
- [x] Master Crop & Variety Catalog with agronomic parameters
- [x] Unit of Measure Catalog (Kg, Quintal, Metric Ton, Liter, Bag 50kg, Hectare, Timad)
- [x] Input Products Master (Pesticides, Fungicides, Fertilizers, Seeds)
- [x] Standard Chart of Accounts & Financial Codes
- [x] Client will provide consolidated Excel Master Data workbook before setup

#### 3. Who has authority to add/edit master data entries after launch?
*Category: Business Rules & Workflow*

**Selection:** Super Admin & Master Data Governance Lead only (Strictly controlled to prevent duplicate entries)

**Specific Details / Custom Requirements:**
> Master Data Governance: Super Admin & Master Data Governance Lead retain overall control and approval authority. Designated Department Leads may propose/add master data within their authorized domain (e.g., Agronomy Lead adds seed varieties), subject to validation, approval, role-based permissions, and full audit tracking. Standard Admin users cannot directly modify controlled master data.

#### 4. What happens to existing records if a master data value (e.g. a region name) is later renamed or merged?
*Category: Business Rules & Workflow*

**Selection:** Immutable ID References: System stores unique numeric IDs; renaming a label updates display without breaking historical records

**Specific Details / Custom Requirements:**
> Master Data Changes: Use immutable unique IDs to preserve historical records when names or labels are renamed; provide a controlled Merge Entity Tool to consolidate duplicate master records and remap linked transactions; and soft-deprecate old codes/records so they remain available for historical reporting while all new transactions use the new approved code.

---

### Module 22: Compliance & Certification

#### 1. Which certifications does the company currently hold or plan to pursue (Organic, GlobalGAP, Fair Trade, other)?
*Category: Data to Capture*

**Selected Options:**
- [x] EU / USDA Organic Certification (EOS / NOP)
- [x] GlobalG.A.P. (Good Agricultural Practices) & GRASP
- [x] Fairtrade International Certification
- [x] Rainforest Alliance Certification
- [x] Non-GMO Project Verified
- [x] ISO 22000 / HACCP Food Safety Certification (Processing Plants)
- [x] Ethiopian Conformity Assessment Enterprise (ECAE) National Standards

#### 2. What documents/evidence must be attached to prove each certification requirement is met?
*Category: Data to Capture*

**Selected Options:**
- [x] Farmer Training Logs & Good Agricultural Practice Attendance Sheets
- [x] Agro-chemical Storage & Safe Chemical Application logs
- [x] Soil & Water Heavy Metal / Residue Laboratory Test Reports
- [x] Internal Control System (ICS) Farm Inspection Audit checklists
- [x] Child Labor & Forced Labor Prohibition declarations
- [x] Environmental Buffer Zone & Deforestation-free GPS mapping

#### 3. What is the renewal lead time and process for each certification type?
*Category: Business Rules & Workflow*

**Selection:** Automated Renewal Reminders: 90 days, 60 days, and 30 days before certificate expiration

**Specific Details / Custom Requirements:**
> Certification Renewal & Compliance: Maintain a standard compliance calendar for each certification type, with automated renewal reminders at 90, 60, and 30 days before expiration. Run an annual internal audit simulation before external certification audits, track identified gaps and corrective actions, and assign responsible owners with clear deadlines until renewal is completed.

#### 4. Who is responsible for responding to a non-conformance finding?
*Category: Business Rules & Workflow*

**Selection:** Compliance & Certification Manager initiates Corrective Action Plan (CAPA) with assigned owners and deadline

#### 5. Does losing a certification affect existing contracts, and if so how should the system flag that?
*Category: Business Rules & Workflow*

**Selection:** Yes — System automatically locks export contracts requiring that certification and alerts Commercial & Legal Leads

**Specific Details / Custom Requirements:**
> Certification Loss Impact: When a required certification expires or is lost, the system automatically flags affected contracts and certified inventory batches, alerts Commercial, Legal, and relevant responsible users, and restricts/locks certification-dependent contract and export actions until authorized review. Affected certified batches are downgraded to “Conventional / Certification Expired,” while all changes and approvals are recorded in the audit trail.

---

### Module 23: Traceability & Food Safety

#### 1. What level of traceability granularity is required — per batch/lot, or per individual farmer contribution within a batch?
*Category: Data to Capture*

**Selection:** Full Farmer-to-Fork Traceability: Each pallet/bag QR code traces back to exact individual farmer contributions, farm GPS parcels, harvest dates, and input logs

**Specific Details / Custom Requirements:**
> Full Farmer-to-Fork Traceability: Every pallet/bag/lot must be traceable back to individual farmer contributions, farm GPS/geolocation parcels, harvest dates, input/application logs, aggregation points, processing records, and final export shipment. The system must support EUDR geolocation requirements where applicable and provide configurable traceability/compliance rules for each target export market (e.g., EU, Saudi Arabia, UAE).

#### 2. Do any current or target buyers have specific traceability report formats they require?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] Public Consumer / Buyer QR Code Landing Page (Scan QR on packaging to view farm story, origin map, and farmer profiles)
- [x] EUDR XML / JSON Geolocation Data Package for European customs compliance
- [x] Standard Batch Certificate of Analysis & Provenance Dossier (PDF)
- [x] Blockchain / GS1 Global Traceability Standard (EPCIS)

**Specific Details / Custom Requirements:**
> Flexible Buyer Traceability Formats: Support all required formats, including public Buyer/Consumer QR Code landing pages, EUDR-compliant geolocation data packages (XML/JSON where required), standardized Batch Certificate of Analysis & Provenance Dossiers (PDF), and GS1 Global Traceability/EPCIS standards. Blockchain should be supported as an optional layer where commercially required. The system must also support configurable buyer-specific traceability reports, documents, and data formats.

#### 3. What triggers a recall process, and who has authority to initiate one?
*Category: Business Rules & Workflow*

**Selection:** Quality Safety Issue (e.g. Aflatoxin / pesticide residue detection): Triggered by QC Lead -> Approved by CEO -> System instantly traces all distributed sub-batches and affected buyers

**Specific Details / Custom Requirements:**
> Recall Management: Quality/Safety issues such as aflatoxin, pesticide residues, contamination, or other critical non-conformities trigger an immediate product hold/quarantine by the QC Lead, followed by documented investigation and authorized executive approval for a full recall. The system automatically traces affected batches, sub-batches, farm/farmer sources, inventory, shipments, and buyers, while notifying responsible teams. A controlled manual investigation, corrective-action workflow, audit trail, and periodic mock recall exercises must be supported.

---

### Module 24: Risk Management & Crop Insurance

#### 1. What risk categories matter most to the client (weather, price, partner reliability, political/regional)?
*Category: Data to Capture*

**Selected Options:**
- [x] Climate & Weather Risks (Drought, excessive rainfall, hail, unseasonal frost)
- [x] Biological Risks (Locusts, Fall Armyworm, fungal blights, viral crop diseases)
- [x] Market & Commodity Price Volatility (Local market surge causing side-selling vs global commodity price drops)
- [x] Operational & Counterparty Default (Partner default, farmer contract non-compliance)
- [x] Regional Security, Road Blockades, and Supply Chain Disruptions
- [x] Currency Devaluation & Foreign Exchange Liquidity Shortage

**Specific Details / Custom Requirements:**
> Risk Management: The system must monitor all major agricultural and business risks, including Climate & Weather, Biological/Crop Disease, Market & Commodity Price Volatility, Operational & Counterparty Default, Regional Security & Supply Chain Disruptions, and Currency Devaluation/FX Liquidity. Top 3 operational priorities are: (1) Climate & Weather Risk, (2) Market & Commodity Price Volatility, and (3) Operational & Counterparty Default. Each risk should support configurable thresholds, early-warning alerts, risk scoring, responsible owners, mitigation actions, and escalation workflows.

#### 2. Does the client currently use or plan to use crop/weather-index insurance, and with which provider?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] Yes — Satellite Weather-Index Crop Insurance for Outgrower Farmers (Drought / Excess Rain trigger)
- [x] No — Currently self-insuring through contingency reserves; plan to evaluate in Year 2
- [x] Yes — Multi-Peril Crop Insurance (MPCI) with local insurance companies (e.g. Nyala, Awash, Ethiopian Insurance Corp, Oromia Insurance)
- [x] Yes — Transit & Warehouse Inventory Fire / Peril Insurance

**Specific Details / Custom Requirements:**
> Insurance Management: Support a flexible insurance framework covering satellite weather-index crop insurance for outgrower farmers, Multi-Peril Crop Insurance (MPCI), and transit/warehouse inventory insurance. The system must support configurable insurance providers, policy coverage, premiums, insured assets/batches, policy periods, trigger conditions, claims, and payouts. Where insurance is not yet adopted, contingency-reserve/self-insurance may be used initially, with the option to evaluate commercial insurance coverage in later phases.

#### 3. How is a risk score calculated, and who reviews/updates it periodically?
*Category: Business Rules & Workflow*

**Selection:** Automated Composite Risk Score (0 - 100): Combines weather satellite anomaly, historical farmer reliability score, and regional security index

**Specific Details / Custom Requirements:**
> Hybrid Risk Scoring: Use an automated 0–100 composite risk score combining weather/satellite anomalies, farmer/partner reliability, regional security/supply-chain risk, biological/crop risk, and market/price risk, with configurable weightings. Risk & Audit Committee reviews the risk matrix monthly, while Agronomists provide qualitative field assessments during seasonal visits. The system must support configurable risk thresholds, alerts, mitigation actions, escalation workflows, and full audit history.

#### 4. What is the escalation process when a farm/contract is flagged as high risk?
*Category: Business Rules & Workflow*

**Selected Options:**
- [x] High-Risk Alert generated to Farming Operations Manager & Agronomy Lead
- [x] Dispatch immediate agronomist field verification mission within 48 hours
- [x] Freeze further input credit disbursement until risk is verified / mitigated
- [x] Initiate Insurance Claim Documentation if weather threshold is breached

---

### Module 25: Localization & Legal Enforceability

#### 1. Who will provide/approve Amharic translations for system text and legal documents?
*Category: Business Rules & Workflow*

**Selection:** Client In-House Legal & Communications Team will review and sign off on all Ethiopian language strings

**Specific Details / Custom Requirements:**
> Translation Governance: The Development Team will prepare initial professional agricultural and system translations, while the Client’s Legal & Communications Team will validate and formally approve all Amharic system text, terminology, and user-facing content. A Certified Legal Translation Bureau will be used for formal contracts and legally binding documents where required. The client will designate a translation review team and official point of contact for final sign-off.

#### 2. Are there legal documents (contracts) that must be bilingual for enforceability, per Ethiopian law?
*Category: Business Rules & Workflow*

**Selection:** English valid for international buyer contracts; Amharic mandatory for all domestic farmer/labor contracts

---

