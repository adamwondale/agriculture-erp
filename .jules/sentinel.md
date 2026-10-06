## 2025-05-18 - Missing Role Enforcement on Administrative User Creation and Activation
**Vulnerability:** `CreateUser` and `ActivateUser` in `UsersController` only had class-level `[Authorize]`, allowing any authenticated user to create accounts, assign roles, and activate suspended accounts.
**Learning:** Class-level `[Authorize]` without role filters leaves mutative endpoints accessible to any logged-in role.
**Prevention:** Explicitly annotate sensitive admin endpoints with `[Authorize(Roles = "SuperAdmin")]`.
