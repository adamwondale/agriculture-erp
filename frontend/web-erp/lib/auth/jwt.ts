/**
 * Z•ORISIS ERP — Dynamic JWT & Claims Decoding Engine
 * Evaluates claims directly from active JWT issued by core-admin-service (.NET 8).
 */

import { RoleId, ROLES, AuthUser } from "@/lib/rbac";
import { getAccessToken } from "@/lib/api/client";

export interface JwtClaims {
  sub: string;
  email: string;
  username: string;
  name: string;
  roles: string[];
  permissions: string[];
  department?: string;
  branchId?: string;
  permissionsVersion?: number;
  exp: number; // Unix timestamp in seconds
  iat?: number;
  nbf?: number;
  iss?: string;
  aud?: string;
  raw: Record<string, any>;
}

/**
 * Universal base64url decode that works in both browser and server runtimes.
 */
function base64UrlDecode(str: string): string {
  // Replace standard URL safe chars
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  // Pad with trailing '='
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }

  if (typeof window !== "undefined" && typeof window.atob === "function") {
    try {
      return decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
    } catch {
      return window.atob(base64);
    }
  }

  // Node.js fallback
  return Buffer.from(base64, "base64").toString("utf-8");
}

/**
 * Safely decodes a 3-part JWT and extracts standardized claims.
 */
export function decodeJwt(token: string): JwtClaims | null {
  if (!token || typeof token !== "string") return null;

  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;

    const payloadJson = base64UrlDecode(parts[1]);
    const payload = JSON.parse(payloadJson);

    // Extract roles from standard JWT or Microsoft claim URI
    const msRoleUri = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    const rawRoles = payload[msRoleUri] || payload.role || payload.roles || [];
    const roles: string[] = Array.isArray(rawRoles)
      ? rawRoles
      : typeof rawRoles === "string"
      ? [rawRoles]
      : [];

    // Extract permissions
    const rawPermissions = payload.permission || payload.permissions || [];
    const permissions: string[] = Array.isArray(rawPermissions)
      ? rawPermissions
      : typeof rawPermissions === "string"
      ? [rawPermissions]
      : [];

    // Extract subject/nameIdentifier
    const msSubUri = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
    const sub = payload.sub || payload[msSubUri] || "";

    // Extract email
    const msEmailUri = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
    const email = payload.email || payload[msEmailUri] || "";

    // Extract display name
    const msNameUri = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
    const name = payload.name || payload.displayName || payload[msNameUri] || payload.username || email.split("@")[0] || "User";

    return {
      sub,
      email,
      username: payload.username || email.split("@")[0] || "",
      name,
      roles,
      permissions,
      department: payload.department,
      branchId: payload.branch_id || payload.branchId,
      permissionsVersion: payload.permissions_version ? Number(payload.permissions_version) : undefined,
      exp: payload.exp || Math.floor(Date.now() / 1000) + 3600,
      iat: payload.iat,
      nbf: payload.nbf,
      iss: payload.iss,
      aud: payload.aud,
      raw: payload,
    };
  } catch (err) {
    console.warn("Failed to decode JWT token:", err);
    return null;
  }
}

/**
 * Checks if a JWT token or decoded claims is expired.
 */
export function isJwtExpired(tokenOrClaims: string | JwtClaims | null): boolean {
  if (!tokenOrClaims) return true;
  const claims = typeof tokenOrClaims === "string" ? decodeJwt(tokenOrClaims) : tokenOrClaims;
  if (!claims || !claims.exp) return true;

  // Add 10-second grace buffer
  const now = Math.floor(Date.now() / 1000);
  return claims.exp < now + 10;
}

/**
 * Maps backend roles to the frontend RoleId.
 */
export function mapJwtRolesToRoleId(roles: string[]): RoleId {
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

/**
 * Converts decoded JWT claims to an AuthUser structure.
 */
export function mapClaimsToAuthUser(claims: JwtClaims): AuthUser {
  const roleId = mapJwtRolesToRoleId(claims.roles);
  const roleCfg = ROLES[roleId] || ROLES.super_admin;

  return {
    email: claims.email,
    name: claims.name || claims.username || claims.email.split("@")[0],
    role: roleId,
    department: claims.department || roleCfg.title,
    region: claims.branchId ? "Assigned Branch Node" : "Holding HQ Node",
    avatarInitials:
      claims.name
        ?.split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() ||
      claims.email.slice(0, 2).toUpperCase() ||
      "AT",
    loginTime: new Date(claims.exp * 1000 - 3600 * 1000).toISOString(),
  };
}

/**
 * Reads the active JWT from storage and returns decoded claims.
 */
export function getActiveJwtClaims(): JwtClaims | null {
  const token = getAccessToken();
  if (!token) return null;
  return decodeJwt(token);
}

/**
 * Evaluates whether the active JWT claims permit a given route or permission code.
 */
export function evaluateJwtAccess(
  claims: JwtClaims | null,
  pathnameOrCode: string
): boolean {
  if (!claims) return false;

  // 1. Super Admin role always has universal access
  if (claims.roles.some((r) => r.toLowerCase().includes("superadmin") || r.toLowerCase() === "admin")) {
    return true;
  }

  // 2. Direct permission code match (e.g. "CAN_APPROVE_FINANCE")
  if (pathnameOrCode.startsWith("CAN_") || pathnameOrCode.startsWith("PERMISSION_")) {
    return claims.permissions.includes(pathnameOrCode);
  }

  // 3. Route check via role configuration
  const roleId = mapJwtRolesToRoleId(claims.roles);
  const roleCfg = ROLES[roleId];
  if (!roleCfg) return false;

  if (roleCfg.allowedRoutes.includes("*")) return true;

  return roleCfg.allowedRoutes.some((route) => {
    if (pathnameOrCode === route) return true;
    if (route !== "/dashboard" && route !== "/mobile" && pathnameOrCode.startsWith(route)) {
      return true;
    }
    return false;
  });
}

/**
 * Creates a valid fallback JWT (unsigned mock) for offline testing if backend is unreachable.
 */
export function createOfflineFallbackJwt(user: AuthUser): string {
  const header = { alg: "HS256", typ: "JWT" };
  const exp = Math.floor(Date.now() / 1000) + 3600 * 8; // 8 hours
  const payload = {
    sub: "00000000-0000-0000-0000-000000000001",
    email: user.email,
    username: user.email.split("@")[0],
    name: user.name,
    department: user.department,
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": user.role,
    role: user.role,
    permission: ["CAN_VIEW_DASHBOARD", "CAN_READ_DATA"],
    exp,
    iss: "AgricultureERP.OfflineFallback",
    aud: "AgricultureERP",
  };

  const toBase64 = (obj: any) => {
    const json = JSON.stringify(obj);
    if (typeof window !== "undefined" && typeof window.btoa === "function") {
      return window.btoa(unescape(encodeURIComponent(json))).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    return Buffer.from(json).toString("base64url");
  };

  return `${toBase64(header)}.${toBase64(payload)}.MOCK_SIGNATURE_${Date.now()}`;
}
