# Z-ORISIS — Microservice 1 UI Design Plan

## Core & Administration — Web + Mobile

> UI planning document based on the Z-ORISIS reference designs and the Microservice 1 — Core & Administration implementation plan.

---

# 1. UI Direction

The Z-ORISIS interface should communicate:

**Modern African agritech + enterprise ERP**

Design characteristics:

- Professional
- Clean
- Trustworthy
- Agricultural but not rustic
- Premium but approachable
- Minimal visual clutter
- Generous whitespace
- Rounded cards and panels
- Subtle shadows
- Strong information hierarchy
- Desktop-first responsive web design
- Touch-friendly mobile design
- Consistent reusable components

The UI should feel like a real enterprise ERP product rather than a generic SaaS template.

---

# 2. Color Palette

Use this palette consistently across web, Android, and iOS.

| Purpose | Color | Hex |
|---|---|---|
| Primary / Forest Green | Forest Green | `#0B3D2E` |
| Primary Dark | Dark Green | `#062A20` |
| Secondary / Emerald | Emerald Green | `#146B45` |
| Light Green | Light Green | `#E8F1EA` |
| Accent | Sage Green | `#A8C3A0` |
| Main Background | Warm Off-White | `#F7F4EC` |
| Surface | White | `#FFFFFF` |
| Primary Text | Dark Text | `#17231D` |
| Secondary Text | Muted Gray | `#66736C` |
| Border | Light Border | `#DDE4DE` |
| Warning | Amber | `#D79A19` |
| Warning Background | Light Amber | `#FFF3D6` |
| Danger | Red | `#C94B4B` |
| Danger Background | Light Red | `#FDE8E8` |
| Information | Blue | `#3978A8` |
| Information Background | Light Blue | `#E8F2FA` |

### Suggested visual distribution

- 60% — Warm off-white / white
- 25% — Forest / emerald green
- 10% — Sage / light green
- 5% — Status colors such as amber, red, and blue

Do not make every component green.

---

# 3. Typography

Preferred font:

**Inter**

Fallbacks:

- Manrope
- System sans-serif

Suggested hierarchy:

| Element | Size | Weight |
|---|---:|---|
| Page title | 24–28px | Semibold |
| Section title | 18–20px | Semibold |
| Card title | 14–16px | Semibold |
| Body | 14px | Regular |
| Metadata | 12px | Regular |
| Button | 13–14px | Semibold |

---

# 4. Web Application Screens

Microservice 1 should have **11 main web screens**.

## Web Screen List

1. Login
2. MFA Verification
3. Admin Dashboard
4. Organization & Branch Hierarchy
5. User Management
6. Create / Provision User
7. Roles & Permissions
8. Permission Overrides + Field Permissions
9. Delegation Management
10. Approval Chain Configuration
11. Audit Logs

The web application is primarily the internal administration console for Super Admin, HR, and IT users.

---

# 5. Web Navigation

Use a persistent dark forest-green sidebar.

```text
Z•ORISIS
Together We Grow

Dashboard

Organization
Users
Roles & Permissions
Delegation
Approvals
Audit Logs

──────────────

Settings

────────────────
[Avatar]
Abebe Tesfaye
System Admin
```

---

# 6. Mobile Application Screens

Microservice 1 mobile scope should intentionally remain small.

## Mobile Screen List

1. Splash
2. Login
3. MFA Verification
4. Home / Role Context
5. Profile & Security

The mobile application should not contain administration screens for editing roles, permissions, approval chains, or audit configuration.

---

# 7. Master Google Stitch Design-System Prompt

Use this design-system prompt as the foundation when generating every screen.

```text
Design a premium enterprise agricultural ERP administration interface for a product called "Z•ORISIS — Together We Grow".

This is the Core & Administration module of a larger agriculture ERP platform.

The visual identity should be inspired by modern African agriculture, sustainable farming, and professional enterprise software.

DESIGN STYLE:
- Modern enterprise SaaS
- Clean and professional
- Agricultural but NOT overly rustic
- Premium but approachable
- Minimal visual clutter
- Generous whitespace
- Rounded cards and panels
- Subtle shadows
- Clear information hierarchy
- Desktop-first responsive web design
- Consistent reusable components

COLOR PALETTE:
Primary Forest Green: #0B3D2E
Primary Dark: #062A20
Emerald Green: #146B45
Light Green: #E8F1EA
Sage Green: #A8C3A0
Warm Off-White Background: #F7F4EC
White: #FFFFFF
Primary Text: #17231D
Secondary Text: #66736C
Border: #DDE4DE
Warning Amber: #D79A19
Light Amber: #FFF3D6
Danger Red: #C94B4B
Light Red: #FDE8E8
Information Blue: #3978A8
Light Blue: #E8F2FA

TYPOGRAPHY:
Use Inter or a very similar modern sans-serif font.

LAYOUT:
- Dark forest-green left sidebar
- Warm off-white main background
- White content cards
- 12-column desktop grid
- 24px page padding
- 16–20px card padding
- 12–16px border radius
- Thin subtle borders
- Soft shadows
- Compact but readable enterprise tables

COMPONENT STYLE:
- Primary buttons use forest green
- Secondary buttons use white with green border
- Destructive buttons use red
- Warning states use amber
- Active navigation item uses emerald/light green treatment
- Status badges should be subtle pills
- Tables should be highly readable
- Icons should use simple outline icons
- Avoid excessive gradients
- Avoid glassmorphism
- Avoid neon colors
- Avoid excessive illustrations

BRANDING:
Use the Z•ORISIS name prominently.
Logo should use a simple elegant agricultural leaf/people symbol if no logo asset is provided.
The overall brand should feel trustworthy, sustainable, African, and enterprise-ready.

Maintain this exact design system across every screen generated afterward.
```

---

# 8. Google Stitch Prompt — Web Screen 01: Login

```text
Using the previously defined Z•ORISIS design system, create Screen 01: Web Admin Login.

Create a professional enterprise login page for the Z•ORISIS Core & Administration platform.

LAYOUT:
- Full desktop viewport
- Warm off-white background #F7F4EC
- Centered login card
- Z•ORISIS logo and "Together We Grow" above the form
- Large heading: "Welcome back"
- Subtitle: "Sign in to manage your organization"
- Email or username input
- Password input with show/hide icon
- "Remember me" checkbox
- "Forgot password?" link
- Large forest-green "Sign In" button
- Divider with "or continue with"
- Optional SSO buttons for Microsoft and Google
- Small security message at bottom

The page should feel like a secure enterprise ERP login, not a consumer application.

Use subtle agricultural imagery only as a very faint background element, if appropriate.

Do not add unnecessary dashboard elements.

Keep the design clean, premium and highly usable.
```

---

# 9. Google Stitch Prompt — Web Screen 02: MFA

```text
Using the exact Z•ORISIS design system, create Screen 02: MFA Verification.

Create a secure enterprise MFA verification screen.

LAYOUT:
- Warm off-white background
- Centered white card
- Z•ORISIS logo at top
- Heading: "Verify your identity"
- Subtitle explaining that a verification code was sent
- Six individual OTP input boxes
- Countdown timer
- "Resend code" option
- Primary forest-green "Verify" button
- Secondary "Use another method" option
- Small security/privacy message

Include a subtle shield/security icon.

Use forest green for primary actions and amber only for countdown or warning information.

Keep the screen minimal and trustworthy.
```

---

# 10. Google Stitch Prompt — Web Screen 03: Admin Dashboard

```text
Using the exact Z•ORISIS design system, create Screen 03: Core Administration Dashboard.

This is the main dashboard for Super Admin, System Admin, HR and IT users.

Create a professional enterprise administration dashboard.

LEFT SIDEBAR:
Dashboard
Organization
Users
Roles & Permissions
Delegation
Approvals
Audit Logs
Settings

MAIN CONTENT:
Header:
"Good morning, Abebe"
Subtitle:
"Here's what's happening across your organization."

Top KPI cards:
- Total Users
- Active Users
- Pending Approvals
- Active Roles
- Recent Audit Events

Main sections:
1. Organization hierarchy summary
2. Recent administrative activity
3. Pending approvals
4. Recently created users
5. Permission changes
6. Delegations expiring soon

Use charts sparingly.

Include a small activity timeline.

The dashboard should prioritize security, administration and organizational visibility rather than farm production metrics.

Use white cards on a warm off-white background with forest-green accents.

Make it feel like a real enterprise ERP administration console.
```

---

# 11. Google Stitch Prompt — Web Screen 04: Organization Hierarchy

```text
Using the exact Z•ORISIS design system, create Screen 04: Organization & Branch Hierarchy.

Create an enterprise organization management screen.

HEADER:
"Organization"
Subtitle:
"Manage organizations, regions, branches and field stations."

TOP ACTIONS:
- Add Organization
- Add Branch
- Search
- Filter

MAIN AREA:
Display a hierarchical tree:

Z•ORISIS Holding
 ├── East Africa Region
 │    └── Ethiopia
 │         ├── Oromia Region
 │         │    ├── Woreda
 │         │    └── Field Stations
 │         └── Amhara Region
 └── West Africa Region

Use expandable tree nodes.

RIGHT SIDE:
When a node is selected, show a detail panel containing:
- Organization/branch name
- Type
- Country
- Region
- Parent
- Status
- Created date
- Number of users
- Number of child branches

Include Edit and Add Child buttons.

The hierarchy should be visually clear and suitable for a large enterprise.
```

---

# 12. Google Stitch Prompt — Web Screen 05: User Management

```text
Using the exact Z•ORISIS design system, create Screen 05: User Management.

Create a professional enterprise user administration screen.

HEADER:
"Users"
Subtitle:
"Manage users, roles, access and account status."

Top right:
"+ Add User"

Toolbar:
- Search by name, email or username
- Organization filter
- Branch filter
- Role filter
- Status filter
- Export

MAIN CONTENT:
A clean enterprise data table with columns:

User
Email
Organization
Branch
Role
Status
Last Login
Actions

Example users:
Abebe Tesfaye
Selamawit Bekele
Kinde Gudeta
Yonas Teka
Mahlet Hale
Daniel Kebede

Status badges:
Active
Pending
Suspended
Inactive

Actions:
View
Edit
Deactivate
More

Include pagination.

The table should be dense enough for enterprise administration but remain highly readable.
```

---

# 13. Google Stitch Prompt — Web Screen 06: User Provisioning

```text
Using the exact Z•ORISIS design system, create Screen 06: Create and Provision User.

Create a multi-step enterprise user provisioning interface.

PAGE TITLE:
"Create User"

Show a horizontal stepper:

1. Employee
2. Organization
3. Role & Scope
4. Security
5. Review

STEP CONTENT:
Employee information:
- Full name
- Employee ID
- Email
- Username
- Phone
- Preferred language

Organization:
- Organization
- Country
- Region
- Branch
- Department
- Position
- Manager

Role & Scope:
- Select one or multiple roles
- Branch scope
- Organization scope
- Valid from
- Valid to

Security:
- MFA requirement
- Authentication method

Review:
Show a complete summary before submission.

Bottom actions:
Cancel
Save Draft
Continue
Submit for Approval

Make this look like a serious HR enterprise workflow.
```

---

# 14. Google Stitch Prompt — Web Screen 07: Roles & Permissions

```text
Using the exact Z•ORISIS design system, create Screen 07: Roles & Permissions.

Create a sophisticated enterprise RBAC management interface.

LEFT PANEL:
List of roles:
- Super Admin
- System Admin
- HR Officer
- Finance Officer
- Farm Manager
- Logistics Officer
- Field Officer
- Viewer

Each role shows:
- System / Custom
- Number of users

MAIN PANEL:
Selected role:
"Farm Manager"

Tabs:
Permissions
Users
Details

Under Permissions, create a permission matrix.

Categories:
Organization
Users
Farm Management
Crop Management
Inventory
Finance
Reports

Permission columns:
View
Create
Update
Delete
Approve

Use:
Green check = granted
Gray = inherited
Red = denied

Include:
"Create Role"
"Save Changes"
"Reset Changes"

Make the matrix highly usable and visually organized.
```

---

# 15. Google Stitch Prompt — Web Screen 08: Permission Overrides

```text
Using the exact Z•ORISIS design system, create Screen 08: User Permission Overrides.

Create an enterprise security permissions screen.

HEADER:
"Permission Overrides"
Subtitle:
"Grant or restrict specific permissions for an individual user."

USER SUMMARY CARD:
Abebe Tesfaye
System Admin
Organization: Z•ORISIS Holding
Branch: Oromia HQ

Show:
Base role permissions
User overrides
Effective permissions

OVERRIDE TABLE:

Permission
Inherited From
Effect
Reason
Expiration
Action

Examples:
farm.view — Grant
payment.approve — Deny
inventory.update — Grant

Allow:
Grant
Deny

Every override must require a "Reason" field.

Add an expiration date option.

Below, include a "Field-Level Permissions" section.

Example:
Employee.salary → Hidden
Payment.amount → Read
Farmer.phone → Read/Write

Use clear green, red and gray visual states.

Include a security warning explaining that permission changes are audited.
```

---

# 16. Google Stitch Prompt — Web Screen 09: Delegation

```text
Using the exact Z•ORISIS design system, create Screen 09: Delegation Management.

Create a professional enterprise delegation management screen.

HEADER:
"Delegation"
Subtitle:
"Temporarily delegate responsibilities and permissions."

Top right:
"+ Create Delegation"

TABLE:

Delegator
Delegate
Role
Scope
Start Date
End Date
Status
Actions

Example:
Finance Manager → Finance Officer
Payment Approver
Oromia Region
May 20 → May 30
Active

Use status:
Active
Scheduled
Expired
Revoked

Include a right-side or modal creation form:

Delegator
Delegate
Role
Scope
Start Date
End Date
Reason

Show a prominent note:

"Delegations automatically expire at the end date and all delegation changes are audited."

Make the interface simple and security-focused.
```

---

# 17. Google Stitch Prompt — Web Screen 10: Approval Chains

```text
Using the exact Z•ORISIS design system, create Screen 10: Approval Chain Configuration.

Create an enterprise workflow configuration screen.

HEADER:
"Approval Chains"
Subtitle:
"Configure multi-stage approval workflows."

Top filters:
Transaction Type
Organization
Department
Value Range

Main configuration:

Transaction:
Payment Request

Value:
$10,000 – $50,000

Approval stages displayed visually:

Stage 1
Finance Officer
↓
Stage 2
Finance Manager
↓
Stage 3
Executive

Each stage should be an editable card containing:
- Stage number
- Approver role
- SLA hours
- Dual authorization toggle
- Remove button

Allow:
"+ Add Approval Stage"

Maximum 4 stages.

Include a visible rule:
"Self-approval is not permitted."

Bottom:
Cancel
Save Configuration
Test Workflow

Use a clean visual workflow representation rather than a plain table.
```

---

# 18. Google Stitch Prompt — Web Screen 11: Audit Logs

```text
Using the exact Z•ORISIS design system, create Screen 11: Audit Logs.

Create a professional enterprise security audit interface.

HEADER:
"Audit Logs"
Subtitle:
"Track administrative and security activity across the platform."

FILTER BAR:
Date range
Actor
Action
Entity
Organization
Branch

Top right:
Export CSV
Export Signed PDF

MAIN TABLE:

Timestamp
Actor
Action
Entity
Reason
IP Address

Examples:
CREATE — User
UPDATE — Role
GRANT — Permission
DENY — Permission
CREATE — Delegation
UPDATE — Approval Chain

Use subtle action badges.

When a log is selected, open a right-side detail drawer.

DETAIL DRAWER:
Event Details
Actor
Timestamp
Action
Entity

Before:
JSON-style snapshot

After:
JSON-style snapshot

Reason

Make this screen feel like a serious security/compliance product.

Do not make the JSON visually overwhelming; use collapsible sections.
```

---

# 19. Google Stitch Prompt — Mobile Screen 01: Splash

```text
Create the Z•ORISIS mobile application splash screen using the established Z•ORISIS design system.

Target:
Android and iOS smartphone.

Background:
Warm off-white with a subtle agricultural landscape image or soft green gradient.

Center:
Z•ORISIS logo
"TOGETHER WE GROW"

Below:
"Smart Agriculture Management"

Minimal loading indicator.

Use a premium, calm agricultural aesthetic.

Do not include navigation or other UI elements.
```

---

# 20. Google Stitch Prompt — Mobile Screen 02: Login

```text
Create the Z•ORISIS mobile login screen for Android and iOS.

Use the established Z•ORISIS design system.

Layout:
- Z•ORISIS logo at top
- "Welcome Back"
- "Sign in to continue"
- Email / Username field
- Password field
- Forgot Password
- Large forest-green Sign In button
- Divider
- Google and Microsoft SSO options
- Create Account link

Use large touch targets.

Keep the screen clean with generous spacing.

Use warm off-white background and forest-green primary actions.

The interface should feel like a professional enterprise agricultural mobile application.
```

---

# 21. Google Stitch Prompt — Mobile Screen 03: MFA

```text
Create the Z•ORISIS mobile MFA verification screen.

Heading:
"Verify Your Identity"

Subtitle:
"Enter the 6-digit verification code"

Six large OTP input boxes.

Below:
"Resend code in 00:28"

Primary button:
"Verify"

Secondary:
"Use backup code"

Include a subtle security shield icon.

Target both Android and iOS.

Use large touch-friendly controls and the Z•ORISIS forest-green palette.
```

---

# 22. Google Stitch Prompt — Mobile Screen 04: Home / Role Context

```text
Create the Z•ORISIS mobile home screen after successful authentication.

Use the established Z•ORISIS design system.

HEADER:
Good morning,
Abebe Tesfaye

Profile avatar
Notification icon

Below the header, create an active role/context selector:

Farm Manager
Oromia HQ
▼

Show summary cards:
Farms
Crops
Tasks
Alerts

Below:
"Recent Activity"

Activity examples:
Farm inspection scheduled
Inventory updated
Task assigned
Approval completed

Use a bottom navigation:
Home
Farms
Tasks
Profile

Include a floating action button only if it feels necessary.

The role/context selector should be prominent because users may have multiple roles and scopes.

Keep the mobile interface clean, touch-friendly and enterprise professional.
```

---

# 23. Google Stitch Prompt — Mobile Screen 05: Profile & Security

```text
Create the Z•ORISIS mobile Profile & Security screen.

HEADER:
Profile

User:
Abebe Tesfaye
abebe.tesfaye@zorisis.com

Active Role:
Farm Manager

Organization:
Z•ORISIS Holding

Branch:
Oromia HQ

Sections:

Account
- Personal Information
- Preferred Language

Access
- Active Role
- Organization
- Branch Scope
- Permissions

Security
- Password
- MFA
- Active Sessions
- Sign Out

Show MFA status as:
Enabled

Show a button:
"Switch Role / Context"

Use the Z•ORISIS forest-green, sage-green and warm off-white palette.

Keep it minimal and suitable for a mobile enterprise application.
```

---

# 24. Final Screen Structure

## Web — 11 Screens

| # | Screen |
|---|---|
| 01 | Login |
| 02 | MFA |
| 03 | Admin Dashboard |
| 04 | Organization Hierarchy |
| 05 | User Management |
| 06 | User Provisioning |
| 07 | Roles & Permissions |
| 08 | Permission Overrides |
| 09 | Delegation |
| 10 | Approval Chains |
| 11 | Audit Logs |

## Mobile — 5 Screens

| # | Screen |
|---|---|
| 01 | Splash |
| 02 | Login |
| 03 | MFA |
| 04 | Home / Role Context |
| 05 | Profile & Security |

---

# 25. Recommended Stitch Workflow

Do not generate all 16 screens at once.

Generate them individually in this order:

### Web

```text
Web 01 → Web 02 → Web 03 → Web 04 → Web 05
→ Web 06 → Web 07 → Web 08 → Web 09 → Web 10 → Web 11
```

### Mobile

```text
Mobile 01 → Mobile 02 → Mobile 03 → Mobile 04 → Mobile 05
```

For every screen:

1. Start from the master design system.
2. Add the screen-specific prompt.
3. Keep the same color palette.
4. Keep typography consistent.
5. Keep button styles consistent.
6. Keep card radius and shadows consistent.
7. Keep navigation consistent.
8. Do not allow Stitch to invent a different visual style.

---

# 26. Next Design Phase

After these 16 primary screens are approved, the next phase should be:

```text
Primary Screens
      ↓
Screen Components
      ↓
Modals / Drawers
      ↓
Empty States
      ↓
Loading States
      ↓
Error States
      ↓
Success States
      ↓
Responsive States
      ↓
Developer-ready UI Specification
```

Then map the approved UI to the Microservice 1 backend:

```text
UI Screen
   ↓
Frontend Component
   ↓
API Endpoint
   ↓
Application Handler
   ↓
Domain Logic
   ↓
PostgreSQL
   ↓
Event / Outbox
```

This keeps the UI aligned with the contract-first backend approach.
