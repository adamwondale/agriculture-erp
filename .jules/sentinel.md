## 2025-02-28 - Broken Function-Level Access Control on Core Admin Endpoints
**Vulnerability:** Endpoints performing sensitive identity management (`POST /api/admin/users` for user creation and `PATCH /api/admin/users/{id}/activate` for account activation) were missing explicit `[Authorize(Roles = "SuperAdmin")]` attributes, allowing any logged-in user to provision accounts and assign roles.
**Learning:** Controller-level `[Authorize]` only verifies JWT authentication. Actions modifying critical identities or access levels require explicit role/permission authorization attributes.
**Prevention:** Always verify that sensitive state-changing endpoints in admin controllers explicitly declare required role or permission authorization attributes.
