export type RoleId =
  | "super_admin"
  | "hr_manager"
  | "finance_controller"
  | "field_inspector"
  | "compliance_auditor";

export interface RoleConfig {
  id: RoleId;
  title: string;
  shortLabel: string;
  badgeColor: string;
  badgeBg: string;
  badgeBorder: string;
  icon: string;
  description: string;
  allowedRoutes: string[];
  restrictedRoutes: string[];
  defaultLanding: string;
  landingTitle: string;
}

export interface AuthUser {
  email: string;
  name: string;
  role: RoleId;
  department: string;
  region: string;
  avatarInitials: string;
  loginTime?: string;
  isNew?: boolean;
  provider?: string;
}

export const ROLES: Record<RoleId, RoleConfig> = {
  super_admin: {
    id: "super_admin",
    title: "Super Administrator",
    shortLabel: "Admin",
    badgeColor: "#0B3D2E",
    badgeBg: "#A3F4C3",
    badgeBorder: "#146B45",
    icon: "shield_person",
    description: "Full administrative access across all 9 core enterprise modules and field consoles.",
    allowedRoutes: [
      "/dashboard",
      "/organization",
      "/users",
      "/users/create",
      "/roles",
      "/permissions/overrides",
      "/delegation",
      "/approvals",
      "/audit-logs",
      "/mobile",
      "/mobile/inspection",
      "/mobile/payment",
      "/mobile/delegation",
      "/mobile/audit",
      "/mobile/profile",
    ],
    restrictedRoutes: [],
    defaultLanding: "/dashboard",
    landingTitle: "Executive Dashboard",
  },
  hr_manager: {
    id: "hr_manager",
    title: "HR & People Operations",
    shortLabel: "HR",
    badgeColor: "#804A00",
    badgeBg: "#FFEAC2",
    badgeBorder: "#FFC266",
    icon: "badge",
    description: "Access strictly restricted to the HR User Directory.",
    allowedRoutes: [
      "/users",
      "/mobile/profile",
    ],
    restrictedRoutes: [
      "/dashboard",
      "/organization",
      "/users/create",
      "/roles",
      "/permissions/overrides",
      "/delegation",
      "/approvals",
      "/audit-logs",
      "/mobile",
      "/mobile/inspection",
      "/mobile/payment",
      "/mobile/delegation",
      "/mobile/audit",
    ],
    defaultLanding: "/users",
    landingTitle: "User Management Directory",
  },
  finance_controller: {
    id: "finance_controller",
    title: "Finance Controller",
    shortLabel: "Finance",
    badgeColor: "#0F5132",
    badgeBg: "#D1E7DD",
    badgeBorder: "#A3CFBB",
    icon: "account_balance",
    description: "Access strictly restricted to Financial Approvals & Authorizations.",
    allowedRoutes: [
      "/approvals",
      "/mobile/profile",
    ],
    restrictedRoutes: [
      "/dashboard",
      "/organization",
      "/users",
      "/users/create",
      "/roles",
      "/permissions/overrides",
      "/delegation",
      "/audit-logs",
      "/mobile",
      "/mobile/inspection",
      "/mobile/payment",
      "/mobile/delegation",
      "/mobile/audit",
    ],
    defaultLanding: "/approvals",
    landingTitle: "Financial Approvals & Chains",
  },
  field_inspector: {
    id: "field_inspector",
    title: "Field Inspector / Agronomist",
    shortLabel: "Field Inspector",
    badgeColor: "#055160",
    badgeBg: "#CFF4FC",
    badgeBorder: "#9EEAF9",
    icon: "agriculture",
    description: "Access strictly restricted to Field Crop Inspection.",
    allowedRoutes: [
      "/mobile/inspection",
      "/mobile",
      "/mobile/profile",
    ],
    restrictedRoutes: [
      "/dashboard",
      "/organization",
      "/users",
      "/users/create",
      "/roles",
      "/permissions/overrides",
      "/delegation",
      "/approvals",
      "/audit-logs",
      "/mobile/payment",
      "/mobile/delegation",
      "/mobile/audit",
    ],
    defaultLanding: "/mobile/inspection",
    landingTitle: "Crop Inspection",
  },
  compliance_auditor: {
    id: "compliance_auditor",
    title: "Compliance & Security Auditor",
    shortLabel: "Auditor",
    badgeColor: "#432874",
    badgeBg: "#E2D9F3",
    badgeBorder: "#C5B3E6",
    icon: "policy",
    description: "Access strictly restricted to Security & Regulatory Audit Logs.",
    allowedRoutes: [
      "/audit-logs",
      "/mobile/profile",
    ],
    restrictedRoutes: [
      "/dashboard",
      "/organization",
      "/users",
      "/users/create",
      "/roles",
      "/permissions/overrides",
      "/delegation",
      "/approvals",
      "/mobile",
      "/mobile/inspection",
      "/mobile/payment",
      "/mobile/delegation",
      "/mobile/audit",
    ],
    defaultLanding: "/audit-logs",
    landingTitle: "Security Audit Logs",
  },
};

export const DEMO_ACCOUNTS: AuthUser[] = [
  {
    email: "abebe.tesfaye@zorisis.com",
    name: "Abebe Tesfaye",
    role: "super_admin",
    department: "Executive & Core Systems",
    region: "Holding HQ • Oromia",
    avatarInitials: "AT",
  },
  {
    email: "tigist.alemu@zorisis.com",
    name: "Tigist Alemu",
    role: "hr_manager",
    department: "Human Resources & Talent",
    region: "Central Operations • Addis Ababa",
    avatarInitials: "TA",
  },
  {
    email: "kinde.gudeta@zorisis.com",
    name: "Kinde Gudeta",
    role: "finance_controller",
    department: "Finance & Treasury",
    region: "East Africa Hub • Jimma",
    avatarInitials: "KG",
  },
  {
    email: "dagnachew.kebede@zorisis.com",
    name: "Dagnachew Kebede",
    role: "field_inspector",
    department: "Agritech & Crop Inspection",
    region: "Limmu Kosa Zone • Field Node",
    avatarInitials: "DK",
  },
  {
    email: "chala.bekele@zorisis.com",
    name: "Chala Bekele",
    role: "compliance_auditor",
    department: "Risk & Regulatory Audit",
    region: "Independent Assurance Unit",
    avatarInitials: "CB",
  },
];

/**
 * Dynamically detects a role based on email or username patterns
 */
export function detectRoleFromEmail(input: string): RoleConfig {
  const clean = input.trim().toLowerCase();

  // 1. Check exact match in demo accounts
  const matchedDemo = DEMO_ACCOUNTS.find((a) => a.email.toLowerCase() === clean);
  if (matchedDemo) return ROLES[matchedDemo.role];

  // 2. Keyword detection
  if (clean.includes("hr") || clean.includes("people") || clean.includes("talent") || clean.includes("recruitment")) {
    return ROLES.hr_manager;
  }
  if (clean.includes("finance") || clean.includes("account") || clean.includes("billing") || clean.includes("payroll")) {
    return ROLES.finance_controller;
  }
  if (clean.includes("inspector") || clean.includes("field") || clean.includes("agronomist") || clean.includes("farm")) {
    return ROLES.field_inspector;
  }
  if (clean.includes("audit") || clean.includes("compliance") || clean.includes("security") || clean.includes("regulator")) {
    return ROLES.compliance_auditor;
  }
  if (clean.includes("admin") || clean.includes("root") || clean.includes("system") || clean.includes("super")) {
    return ROLES.super_admin;
  }

  // Default to Super Admin for unknown/gmail so the app remains demo-friendly
  return ROLES.super_admin;
}

/**
 * Checks if a role is permitted to view a given route
 */
export function hasPermission(roleId: RoleId, pathname: string): boolean {
  const role = ROLES[roleId] || ROLES.super_admin;

  // Exact or sub-route permission check
  const isAllowed = role.allowedRoutes.some((route) => {
    if (pathname === route) return true;
    if (route !== "/dashboard" && route !== "/mobile" && pathname.startsWith(route + "/")) return true;
    return false;
  });

  return isAllowed;
}

/**
 * Storage helpers
 */
const STORAGE_KEY = "zorisis_auth_user";

export function getStoredUser(): AuthUser {
  if (typeof window === "undefined") return DEMO_ACCOUNTS[0];
  try {
    // Check tab-isolated sessionStorage first so different tabs can run different roles concurrently
    const raw = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEMO_ACCOUNTS[0];
    const parsed = JSON.parse(raw);
    const roleId: RoleId = parsed.role in ROLES ? parsed.role : "super_admin";
    return {
      email: parsed.email || DEMO_ACCOUNTS[0].email,
      name: parsed.name || parsed.email?.split("@")[0]?.replace(/[._]/g, " ") || DEMO_ACCOUNTS[0].name,
      role: roleId,
      department: parsed.department || ROLES[roleId].description,
      region: parsed.region || "Holding HQ Node",
      avatarInitials: parsed.avatarInitials || parsed.name?.slice(0, 2)?.toUpperCase() || "AT",
      loginTime: parsed.loginTime,
      isNew: parsed.isNew,
      provider: parsed.provider,
    };
  } catch {
    return DEMO_ACCOUNTS[0];
  }
}

export function setStoredUser(user: AuthUser): void {
  if (typeof window === "undefined") return;
  // Write to tab-isolated sessionStorage
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  // Dispatch tab-local event for instant component reactivity without kicking other tabs
  window.dispatchEvent(new Event("zorisis_auth_change"));
}
