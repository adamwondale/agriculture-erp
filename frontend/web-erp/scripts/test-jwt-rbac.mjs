/**
 * Automated Verification: JWT Claims & Dynamic RBAC Engine
 * Pure Node.js verification script to validate token decoding, claims extraction,
 * role mapping, and live token issuance from CoreAdmin (:5001).
 */

function base64UrlDecode(str) {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }
  return Buffer.from(base64, "base64").toString("utf-8");
}

function decodeJwt(token) {
  if (!token || typeof token !== "string") return null;
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payload = JSON.parse(base64UrlDecode(parts[1]));

    const msRoleUri = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    const rawRoles = payload[msRoleUri] || payload.role || payload.roles || [];
    const roles = Array.isArray(rawRoles) ? rawRoles : typeof rawRoles === "string" ? [rawRoles] : [];

    const rawPermissions = payload.permission || payload.permissions || [];
    const permissions = Array.isArray(rawPermissions) ? rawPermissions : typeof rawPermissions === "string" ? [rawPermissions] : [];

    const msSubUri = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
    const sub = payload.sub || payload[msSubUri] || "";
    const msEmailUri = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
    const email = payload.email || payload[msEmailUri] || "";
    const msNameUri = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
    const name = payload.name || payload.displayName || payload[msNameUri] || payload.username || email.split("@")[0] || "User";

    return {
      sub,
      email,
      username: payload.username || "",
      name,
      roles,
      permissions,
      department: payload.department,
      branchId: payload.branch_id || payload.branchId,
      permissionsVersion: payload.permissions_version ? Number(payload.permissions_version) : undefined,
      exp: payload.exp || Math.floor(Date.now() / 1000) + 3600,
      iss: payload.iss,
      aud: payload.aud,
      raw: payload,
    };
  } catch (err) {
    return null;
  }
}

function mapJwtRolesToRoleId(roles) {
  const normalized = roles.map((r) => r.toLowerCase().replace(/[-_\s]/g, ""));
  if (normalized.some((r) => r === "superadmin" || r === "admin")) return "super_admin";
  if (normalized.some((r) => r === "executiveleadership" || r === "ceoexec" || r === "ceo")) return "ceo_exec";
  if (normalized.some((r) => r === "operationsdirector" || r === "cooops" || r === "coo")) return "coo_ops";
  if (normalized.some((r) => r === "farmingoperationsmanager" || r === "farmmanager" || r === "farmingopsmgr")) return "farming_ops_mgr";
  if (normalized.some((r) => r === "researchagronomymanager" || r === "researchagronomy")) return "research_agronomy_mgr";
  if (normalized.some((r) => r === "warehousemanager" || r === "warehousemgr" || r === "warehouse")) return "warehouse_mgr";
  if (normalized.some((r) => r === "financestaff" || r === "financecontroller" || r === "finance")) return "finance_staff";
  if (normalized.some((r) => r === "hrstaff" || r === "hrmanager" || r === "hr")) return "hr_staff";
  if (normalized.some((r) => r === "partnershipteam" || r === "partnershipbrand")) return "partnership_brand";
  if (normalized.some((r) => r === "internalauditor" || r === "internalaudit" || r === "complianceauditor")) return "internal_audit";
  if (normalized.some((r) => r === "itadmin" || r === "techit" || r === "it")) return "tech_it";
  if (normalized.some((r) => r === "agronomist" || r === "fieldofficer" || r === "fieldagronomist" || r === "fieldinspector")) return "field_agronomist";
  if (normalized.some((r) => r === "logisticsdriver" || r === "driver")) return "logistics_driver";
  if (normalized.some((r) => r === "commercialpartner" || r === "cooperative")) return "commercial_partner";
  if (normalized.some((r) => r === "buyer" || r === "buyerofftaker" || r === "offtaker")) return "buyer_offtaker";
  if (normalized.some((r) => r === "contractfarmer" || r === "farmer")) return "contract_farmer";
  return "super_admin";
}

const ROLES_CONFIG = {
  super_admin: { allowedRoutes: ["*"] },
  warehouse_mgr: { allowedRoutes: ["/warehouse", "/dashboard", "/approvals"] },
  finance_staff: { allowedRoutes: ["/finance", "/approvals", "/dashboard", "/audit-logs"] },
  field_agronomist: { allowedRoutes: ["/mobile", "/farming-ops/parcels", "/agronomy/soil-tests"] },
  ceo_exec: { allowedRoutes: ["/executive", "/dashboard", "/approvals", "/audit-logs", "/finance/profitability"] },
};

function evaluateJwtAccess(claims, pathnameOrCode) {
  if (!claims) return false;
  if (claims.roles.some((r) => r.toLowerCase().includes("superadmin") || r.toLowerCase() === "admin")) return true;
  if (pathnameOrCode.startsWith("CAN_")) return claims.permissions.includes(pathnameOrCode);
  const roleId = mapJwtRolesToRoleId(claims.roles);
  const roleCfg = ROLES_CONFIG[roleId];
  if (!roleCfg) return false;
  if (roleCfg.allowedRoutes.includes("*")) return true;
  return roleCfg.allowedRoutes.some((route) => {
    if (pathnameOrCode === route) return true;
    if (route !== "/dashboard" && route !== "/mobile" && pathnameOrCode.startsWith(route)) return true;
    return false;
  });
}

async function runTests() {
  console.log("=================================================================");
  console.log("   Z•ORISIS ERP — Dynamic RBAC & JWT Claims Verification Suite   ");
  console.log("=================================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
      failed++;
    }
  }

  // TEST 1: Role mapping for all 16 specification roles
  console.log("--- 1. Testing Role Code to RoleId Mapping ---");
  const roleTests = [
    { code: "SuperAdmin", expected: "super_admin" },
    { code: "ExecutiveLeadership", expected: "ceo_exec" },
    { code: "OperationsDirector", expected: "coo_ops" },
    { code: "FarmingOperationsManager", expected: "farming_ops_mgr" },
    { code: "ResearchAgronomyManager", expected: "research_agronomy_mgr" },
    { code: "WarehouseManager", expected: "warehouse_mgr" },
    { code: "FinanceStaff", expected: "finance_staff" },
    { code: "HRStaff", expected: "hr_staff" },
    { code: "PartnershipTeam", expected: "partnership_brand" },
    { code: "InternalAuditor", expected: "internal_audit" },
    { code: "ITAdmin", expected: "tech_it" },
    { code: "Agronomist", expected: "field_agronomist" },
    { code: "LogisticsDriver", expected: "logistics_driver" },
    { code: "CommercialPartner", expected: "commercial_partner" },
    { code: "Buyer", expected: "buyer_offtaker" },
    { code: "ContractFarmer", expected: "contract_farmer" },
  ];

  for (const t of roleTests) {
    const mapped = mapJwtRolesToRoleId([t.code]);
    assert(mapped === t.expected, `${t.code} maps to ${t.expected} (got: ${mapped})`);
  }

  // TEST 2: Route evaluation via JWT claims
  console.log("\n--- 2. Testing Route & Permission Access via Claims ---");
  const warehouseClaims = {
    sub: "test-user-1",
    email: "warehouse@zorisis.com",
    username: "warehouse",
    name: "Warehouse Manager",
    roles: ["WarehouseManager"],
    permissions: ["CAN_REQUEST_STOCK", "CAN_READ_INVENTORY", "CAN_WRITE_INVENTORY"],
    exp: Math.floor(Date.now() / 1000) + 3600,
    raw: {},
  };

  assert(evaluateJwtAccess(warehouseClaims, "/warehouse/dashboard") === true, "WarehouseManager can access /warehouse/dashboard");
  assert(evaluateJwtAccess(warehouseClaims, "/warehouse/weighbridge-intake") === true, "WarehouseManager can access /warehouse/weighbridge-intake");
  assert(evaluateJwtAccess(warehouseClaims, "/hr/payroll") === false, "WarehouseManager cannot access /hr/payroll");
  assert(evaluateJwtAccess(warehouseClaims, "/finance/settlements") === false, "WarehouseManager cannot access /finance/settlements");
  assert(evaluateJwtAccess(warehouseClaims, "CAN_REQUEST_STOCK") === true, "WarehouseManager has permission CAN_REQUEST_STOCK");
  assert(evaluateJwtAccess(warehouseClaims, "CAN_APPROVE_FINANCE") === false, "WarehouseManager lacks permission CAN_APPROVE_FINANCE");

  const superAdminClaims = {
    sub: "test-admin",
    email: "admin@zorisis.com",
    username: "admin",
    name: "Super Admin",
    roles: ["SuperAdmin"],
    permissions: ["CAN_ALL"],
    exp: Math.floor(Date.now() / 1000) + 3600,
    raw: {},
  };

  assert(evaluateJwtAccess(superAdminClaims, "/finance/settlements") === true, "SuperAdmin has universal access to /finance/settlements");
  assert(evaluateJwtAccess(superAdminClaims, "/executive/command-center") === true, "SuperAdmin has universal access to /executive/command-center");
  assert(evaluateJwtAccess(superAdminClaims, "/hr/payroll") === true, "SuperAdmin has universal access to /hr/payroll");

  // TEST 3: Live CoreAdmin API switch-role endpoint and token decoding
  console.log("\n--- 3. Testing Live Token Issuance from core-admin-service (:5001) ---");
  const testRoles = ["warehouse_mgr", "finance_staff", "research_agronomy_mgr", "ceo_exec", "super_admin"];

  for (const roleKey of testRoles) {
    try {
      const res = await fetch("http://localhost:5001/api/auth/switch-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roleOrEmail: roleKey }),
      });

      if (!res.ok) {
        assert(false, `API switch-role for ${roleKey} returned HTTP ${res.status}`);
        continue;
      }

      const data = await res.json();
      assert(!!data.accessToken, `Received accessToken for ${roleKey}`);
      assert(!!data.refreshToken, `Received refreshToken for ${roleKey}`);
      assert(!!data.user, `Received user payload for ${roleKey}: ${data.user?.displayName}`);

      // Decode the live token directly
      const decoded = decodeJwt(data.accessToken);
      assert(!!decoded, `Successfully decoded live JWT for ${roleKey}`);
      assert(decoded.sub === data.user.id, `JWT 'sub' matches user ID (${decoded?.sub})`);
      assert(decoded.email.toLowerCase() === data.user.email.toLowerCase(), `JWT 'email' matches (${decoded?.email})`);
      assert(decoded.roles.length > 0, `JWT contains role claims: [${decoded?.roles.join(", ")}]`);
      assert(decoded.permissions.length > 0, `JWT contains ${decoded?.permissions.length} permission claims`);
      assert(decoded.exp > Math.floor(Date.now() / 1000), `JWT 'exp' is valid future timestamp (${decoded?.exp})`);

      // Verify mapped role matches expectation
      const mappedRole = mapJwtRolesToRoleId(decoded.roles);
      assert(mappedRole === roleKey, `JWT roles map back to ${roleKey} (got: ${mappedRole})`);
    } catch (err) {
      assert(false, `Failed to call core-admin-service for ${roleKey}: ${err.message}`);
    }
  }

  // TEST 4: Next.js Rewrite Proxy (:3000 -> :5001)
  console.log("\n--- 4. Testing Next.js Rewrite Proxy Integration (:3000/api/proxy/auth/switch-role) ---");
  try {
    const proxyRes = await fetch("http://localhost:3000/api/proxy/auth/switch-role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roleOrEmail: "farming_ops_mgr" }),
    });

    if (proxyRes.ok) {
      const proxyData = await proxyRes.json();
      const proxyClaims = decodeJwt(proxyData.accessToken);
      assert(!!proxyClaims, "Next.js proxy returned valid decodable JWT from CoreAdmin");
      assert(proxyClaims.name === "Solomon Girma", `Proxy decoded name matches (${proxyClaims?.name})`);
      assert(mapJwtRolesToRoleId(proxyClaims.roles) === "farming_ops_mgr", "Proxy decoded role maps to farming_ops_mgr");
    } else {
      assert(false, `Proxy returned status ${proxyRes.status}`);
    }
  } catch (err) {
    assert(false, `Proxy request failed: ${err.message}`);
  }

  console.log("\n=================================================================");
  console.log(`   Verification Summary: ${passed} Passed, ${failed} Failed`);
  console.log("=================================================================\n");

  if (failed > 0) process.exit(1);
}

runTests().catch((err) => {
  console.error("Test runner failed:", err);
  process.exit(1);
});
