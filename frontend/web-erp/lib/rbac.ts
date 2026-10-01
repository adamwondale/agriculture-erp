import { useState, useEffect } from "react";
import {
  decodeJwt,
  isJwtExpired,
  mapClaimsToAuthUser,
  evaluateJwtAccess,
  JwtClaims,
} from "@/lib/auth/jwt";
import { authApi } from "@/lib/api/auth";

export type RoleId =
  | "super_admin"
  | "tech_it"
  | "ceo_exec"
  | "coo_ops"
  | "farming_ops_mgr"
  | "research_agronomy_mgr"
  | "warehouse_mgr"
  | "finance_staff"
  | "hr_staff"
  | "partnership_brand"
  | "internal_audit"
  | "field_agronomist"
  | "logistics_driver"
  | "commercial_partner"
  | "buyer_offtaker"
  | "contract_farmer"
  // Aliases for backwards compatibility
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
    description: "Global governance, system parameters, tenant configuration & break-glass access.",
    allowedRoutes: ["*"],
    restrictedRoutes: [],
    defaultLanding: "/dashboard",
    landingTitle: "Executive Dashboard",
  },
  tech_it: {
    id: "tech_it",
    title: "Technology & IT Lead",
    shortLabel: "IT Lead",
    badgeColor: "#1B3B6F",
    badgeBg: "#D7E3FC",
    badgeBorder: "#4895EF",
    icon: "terminal",
    description: "API gateway health, microservices telemetry, offline sync & integrations.",
    allowedRoutes: ["/it", "/dashboard", "/audit-logs", "/system-config"],
    restrictedRoutes: ["/hr/payroll", "/finance/settlements"],
    defaultLanding: "/it/telemetry",
    landingTitle: "Gateway Telemetry",
  },
  ceo_exec: {
    id: "ceo_exec",
    title: "CEO / Executive Leadership",
    shortLabel: "CEO / Exec",
    badgeColor: "#4A0E17",
    badgeBg: "#FCE4E4",
    badgeBorder: "#C94B4B",
    icon: "military_tech",
    description: "Strategic KPI command center, Tier 3 capital approvals (>500k ETB), macro GIS & board reporting.",
    allowedRoutes: ["/executive", "/dashboard", "/approvals", "/audit-logs", "/finance/profitability"],
    restrictedRoutes: [],
    defaultLanding: "/executive/command-center",
    landingTitle: "Executive Command Center",
  },
  coo_ops: {
    id: "coo_ops",
    title: "COO / Operations Director",
    shortLabel: "COO / Ops",
    badgeColor: "#003F5C",
    badgeBg: "#D4EDF8",
    badgeBorder: "#2F4B7C",
    icon: "hub",
    description: "National operations, harvest intake, supply chain bottleneck solver & Tier 2 approvals.",
    allowedRoutes: ["/operations", "/farming-ops", "/warehouse", "/dashboard", "/approvals"],
    restrictedRoutes: ["/hr/payroll"],
    defaultLanding: "/operations/command-center",
    landingTitle: "Operations Command Center",
  },
  farming_ops_mgr: {
    id: "farming_ops_mgr",
    title: "Farming Operations Manager",
    shortLabel: "Farm Ops",
    badgeColor: "#2C5E1A",
    badgeBg: "#E3F2DC",
    badgeBorder: "#588157",
    icon: "agriculture",
    description: "Crop plan consolidation, farm parcel polygons, farmer lifecycle & input allocation sign-off.",
    allowedRoutes: ["/farming-ops", "/agronomy", "/dashboard", "/approvals"],
    restrictedRoutes: ["/hr/payroll", "/finance/general-ledger"],
    defaultLanding: "/farming-ops/dashboard",
    landingTitle: "Farming Operations",
  },
  research_agronomy_mgr: {
    id: "research_agronomy_mgr",
    title: "Research & Agronomy Manager",
    shortLabel: "Chief Agronomist",
    badgeColor: "#1B4332",
    badgeBg: "#D8F3DC",
    badgeBorder: "#40916C",
    icon: "science",
    description: "Crop & variety catalog, soil laboratory analysis, emergency chemical sign-off & yield AI.",
    allowedRoutes: ["/agronomy", "/farming-ops/parcels", "/dashboard"],
    restrictedRoutes: ["/hr/payroll", "/finance"],
    defaultLanding: "/agronomy/dashboard",
    landingTitle: "Agronomic Intelligence",
  },
  warehouse_mgr: {
    id: "warehouse_mgr",
    title: "Warehouse & Inventory Manager",
    shortLabel: "Warehouse",
    badgeColor: "#7F4F24",
    badgeBg: "#F0E6DF",
    badgeBorder: "#936639",
    icon: "warehouse",
    description: "Silo capacity, weighbridge intake GRN, quality control grading (Grades 1-3) & stock transfers.",
    allowedRoutes: ["/warehouse", "/dashboard", "/approvals"],
    restrictedRoutes: ["/hr/payroll"],
    defaultLanding: "/warehouse/dashboard",
    landingTitle: "Storage & Weighbridge Intake",
  },
  finance_staff: {
    id: "finance_staff",
    title: "Finance & Accounting Staff",
    shortLabel: "Finance",
    badgeColor: "#0F5132",
    badgeBg: "#D1E7DD",
    badgeBorder: "#A3CFBB",
    icon: "account_balance",
    description: "Farmer harvest settlement netting, dual-authorization payouts, withholding tax & ledger.",
    allowedRoutes: ["/finance", "/approvals", "/dashboard", "/audit-logs"],
    restrictedRoutes: [],
    defaultLanding: "/finance/dashboard",
    landingTitle: "Finance & Accounting",
  },
  finance_controller: {
    id: "finance_controller",
    title: "Finance Controller",
    shortLabel: "Finance",
    badgeColor: "#0F5132",
    badgeBg: "#D1E7DD",
    badgeBorder: "#A3CFBB",
    icon: "account_balance",
    description: "Access to Financial Approvals, Settlements & Ledger.",
    allowedRoutes: ["/finance", "/approvals", "/dashboard", "/audit-logs"],
    restrictedRoutes: [],
    defaultLanding: "/finance/dashboard",
    landingTitle: "Finance & Accounting",
  },
  hr_staff: {
    id: "hr_staff",
    title: "HR & People Operations",
    shortLabel: "HR",
    badgeColor: "#804A00",
    badgeBg: "#FFEAC2",
    badgeBorder: "#FFC266",
    icon: "badge",
    description: "Employee onboarding, attendance audit, leave administration, confidential payroll & exit clearance.",
    allowedRoutes: ["/hr", "/users", "/dashboard", "/approvals"],
    restrictedRoutes: ["/finance/settlements"],
    defaultLanding: "/hr/dashboard",
    landingTitle: "People Operations & HR",
  },
  hr_manager: {
    id: "hr_manager",
    title: "HR & People Operations",
    shortLabel: "HR",
    badgeColor: "#804A00",
    badgeBg: "#FFEAC2",
    badgeBorder: "#FFC266",
    icon: "badge",
    description: "Employee onboarding, attendance audit, leave administration, confidential payroll & exit clearance.",
    allowedRoutes: ["/hr", "/users", "/dashboard", "/approvals"],
    restrictedRoutes: ["/finance/settlements"],
    defaultLanding: "/hr/dashboard",
    landingTitle: "People Operations & HR",
  },
  partnership_brand: {
    id: "partnership_brand",
    title: "Partnership & Brand Team",
    shortLabel: "Partnerships",
    badgeColor: "#3F2E56",
    badgeBg: "#E8E1EF",
    badgeBorder: "#7251B5",
    icon: "handshake",
    description: "Cooperative partnerships, due-diligence verification, proposals & partner scorecards.",
    allowedRoutes: ["/partnerships", "/dashboard", "/approvals"],
    restrictedRoutes: ["/hr/payroll"],
    defaultLanding: "/partnerships/dashboard",
    landingTitle: "Commercial Partnerships",
  },
  internal_audit: {
    id: "internal_audit",
    title: "Internal Audit & Compliance",
    shortLabel: "Auditor",
    badgeColor: "#432874",
    badgeBg: "#E2D9F3",
    badgeBorder: "#C5B3E6",
    icon: "policy",
    description: "7-year immutable audit log explorer, GlobalG.A.P./Organic certification, CAPA & product recalls.",
    allowedRoutes: ["/audit", "/audit-logs", "/dashboard"],
    restrictedRoutes: [],
    defaultLanding: "/audit/dashboard",
    landingTitle: "Compliance & Audit",
  },
  compliance_auditor: {
    id: "compliance_auditor",
    title: "Compliance & Security Auditor",
    shortLabel: "Auditor",
    badgeColor: "#432874",
    badgeBg: "#E2D9F3",
    badgeBorder: "#C5B3E6",
    icon: "policy",
    description: "Security and compliance audit vault explorer.",
    allowedRoutes: ["/audit", "/audit-logs", "/dashboard"],
    restrictedRoutes: [],
    defaultLanding: "/audit/dashboard",
    landingTitle: "Compliance & Audit",
  },
  field_agronomist: {
    id: "field_agronomist",
    title: "Field Agronomist / Extension Worker",
    shortLabel: "Agronomist",
    badgeColor: "#055160",
    badgeBg: "#CFF4FC",
    badgeBorder: "#9EEAF9",
    icon: "psychiatry",
    description: "Offline mobile app operations: farmer registration, GPS polygon walk, field inspections & inputs.",
    allowedRoutes: ["/mobile", "/farming-ops/parcels", "/agronomy/soil-tests", "/agronomy/dashboard", "/dashboard"],
    restrictedRoutes: ["/hr/payroll", "/finance", "/executive"],
    defaultLanding: "/mobile",
    landingTitle: "Mobile Field Console",
  },
  field_inspector: {
    id: "field_inspector",
    title: "Field Inspector / Agronomist",
    shortLabel: "Field Inspector",
    badgeColor: "#055160",
    badgeBg: "#CFF4FC",
    badgeBorder: "#9EEAF9",
    icon: "agriculture",
    description: "Field crop inspections, parcels registry and mobile collection.",
    allowedRoutes: ["/mobile", "/farming-ops/parcels", "/agronomy/soil-tests", "/dashboard"],
    restrictedRoutes: ["/hr/payroll", "/finance", "/executive"],
    defaultLanding: "/mobile",
    landingTitle: "Mobile Field Console",
  },
  logistics_driver: {
    id: "logistics_driver",
    title: "Logistics & Fleet Driver",
    shortLabel: "Logistics",
    badgeColor: "#D66800",
    badgeBg: "#FFEAD4",
    badgeBorder: "#FFA94D",
    icon: "local_shipping",
    description: "Waybill dispatch checklist, container seals, en-route check-ins & weighbridge delivery.",
    allowedRoutes: ["/operations/fleet-logistics", "/operations/harvest-intake", "/dashboard"],
    restrictedRoutes: ["/hr", "/finance", "/executive"],
    defaultLanding: "/operations/fleet-logistics",
    landingTitle: "Logistics Waybill & Fleet",
  },
  commercial_partner: {
    id: "commercial_partner",
    title: "Commercial Partner / Cooperative",
    shortLabel: "Cooperative",
    badgeColor: "#2E5B70",
    badgeBg: "#DCEBF2",
    badgeBorder: "#689BB0",
    icon: "groups",
    description: "Private cooperative portal: contracted farmers, crop status, input allotments & commission statements.",
    allowedRoutes: ["/partner"],
    restrictedRoutes: ["/admin", "/executive", "/hr", "/finance/general-ledger"],
    defaultLanding: "/partner/dashboard",
    landingTitle: "Partner Cooperative Portal",
  },
  buyer_offtaker: {
    id: "buyer_offtaker",
    title: "Commercial Buyer / Offtaker",
    shortLabel: "Buyer",
    badgeColor: "#1D3557",
    badgeBg: "#E0E8F5",
    badgeBorder: "#457B9D",
    icon: "storefront",
    description: "Commercial marketplace, sales orders, live shipment tracking & digital quality certificates.",
    allowedRoutes: ["/buyer", "/trace"],
    restrictedRoutes: ["/admin", "/executive", "/hr", "/finance"],
    defaultLanding: "/buyer/marketplace",
    landingTitle: "Commercial Buyer Portal",
  },
  contract_farmer: {
    id: "contract_farmer",
    title: "Contract Outgrower Farmer",
    shortLabel: "Farmer",
    badgeColor: "#47624B",
    badgeBg: "#E3ECE4",
    badgeBorder: "#87A98D",
    icon: "yard",
    description: "USSD (*888#) & SMS notification profile, delivery confirmations and public lot provenance.",
    allowedRoutes: ["/trace", "/partner/dashboard", "/dashboard"],
    restrictedRoutes: ["/admin", "/executive", "/finance", "/hr"],
    defaultLanding: "/trace/LOT-2026-ETH-01",
    landingTitle: "Farmer Provenance & Traceability",
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
    email: "dawit.haile@zorisis.com",
    name: "Dawit Haile",
    role: "ceo_exec",
    department: "Executive Committee",
    region: "Holding HQ • Addis Ababa",
    avatarInitials: "DH",
  },
  {
    email: "meron.tadesse@zorisis.com",
    name: "Meron Tadesse",
    role: "coo_ops",
    department: "Field Operations & Supply Chain",
    region: "Holding HQ • Addis Ababa",
    avatarInitials: "MT",
  },
  {
    email: "solomon.girma@zorisis.com",
    name: "Solomon Girma",
    role: "farming_ops_mgr",
    department: "Farming Operations",
    region: "Western Cluster • Jimma",
    avatarInitials: "SG",
  },
  {
    email: "dr.alemayehu@zorisis.com",
    name: "Dr. Alemayehu Worku",
    role: "research_agronomy_mgr",
    department: "Research & Agronomy Advisory",
    region: "Agricultural Research Hub • Hawassa",
    avatarInitials: "AW",
  },
  {
    email: "kassahun.bekele@zorisis.com",
    name: "Kassahun Bekele",
    role: "warehouse_mgr",
    department: "Warehouse & Silo Logistics",
    region: "Central Silo Hub • Adama",
    avatarInitials: "KB",
  },
  {
    email: "kinde.gudeta@zorisis.com",
    name: "Kinde Gudeta",
    role: "finance_staff",
    department: "Finance & Treasury",
    region: "East Africa Hub • Jimma",
    avatarInitials: "KG",
  },
  {
    email: "tigist.alemu@zorisis.com",
    name: "Tigist Alemu",
    role: "hr_staff",
    department: "Human Resources & Talent",
    region: "Central Operations • Addis Ababa",
    avatarInitials: "TA",
  },
  {
    email: "helen.mulugeta@zorisis.com",
    name: "Helen Mulugeta",
    role: "partnership_brand",
    department: "Partnership & Brand Management",
    region: "Holding HQ • Addis Ababa",
    avatarInitials: "HM",
  },
  {
    email: "chala.bekele@zorisis.com",
    name: "Chala Bekele",
    role: "internal_audit",
    department: "Risk & Regulatory Audit",
    region: "Independent Assurance Unit",
    avatarInitials: "CB",
  },
  {
    email: "yared.kebede@zorisis.com",
    name: "Yared Kebede",
    role: "tech_it",
    department: "Technology & Systems Integration",
    region: "Holding HQ • Addis Ababa",
    avatarInitials: "YK",
  },
  {
    email: "dagnachew.kebede@zorisis.com",
    name: "Dagnachew Kebede",
    role: "field_agronomist",
    department: "Agritech & Crop Inspection",
    region: "Limmu Kosa Zone • Field Node",
    avatarInitials: "DK",
  },
  {
    email: "gemechu.tola@zorisis.com",
    name: "Gemechu Tola",
    role: "commercial_partner",
    department: "Oromia Coffee & Grain Farmers Cooperative",
    region: "Oromia Regional Union",
    avatarInitials: "GT",
  },
  {
    email: "procurement@globalgrain.com",
    name: "Marcus Vance",
    role: "buyer_offtaker",
    department: "Global Grain Commodity Offtakers",
    region: "Europe & Middle East Desk",
    avatarInitials: "MV",
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
  if (clean.includes("ceo") || clean.includes("exec") || clean.includes("director")) return ROLES.ceo_exec;
  if (clean.includes("coo") || clean.includes("operation")) return ROLES.coo_ops;
  if (clean.includes("farming") || clean.includes("crop-ops")) return ROLES.farming_ops_mgr;
  if (clean.includes("agronomy") || clean.includes("research") || clean.includes("scientist")) return ROLES.research_agronomy_mgr;
  if (clean.includes("warehouse") || clean.includes("silo") || clean.includes("inventory")) return ROLES.warehouse_mgr;
  if (clean.includes("finance") || clean.includes("account") || clean.includes("billing") || clean.includes("treasury")) return ROLES.finance_staff;
  if (clean.includes("hr") || clean.includes("people") || clean.includes("talent")) return ROLES.hr_staff;
  if (clean.includes("partner") || clean.includes("coop") || clean.includes("union")) return ROLES.commercial_partner;
  if (clean.includes("buyer") || clean.includes("offtake") || clean.includes("importer")) return ROLES.buyer_offtaker;
  if (clean.includes("audit") || clean.includes("compliance") || clean.includes("risk")) return ROLES.internal_audit;
  if (clean.includes("it") || clean.includes("tech") || clean.includes("engineer")) return ROLES.tech_it;
  if (clean.includes("agronomist") || clean.includes("field") || clean.includes("extension")) return ROLES.field_agronomist;
  if (clean.includes("driver") || clean.includes("logistics") || clean.includes("fleet")) return ROLES.logistics_driver;

  // Default to Super Admin for unknown/gmail so the app remains demo-friendly
  return ROLES.super_admin;
}

/**
 * Checks if a role is permitted to view a given route
 */
export function hasPermission(roleId: RoleId, pathname: string): boolean {
  const role = ROLES[roleId] || ROLES.super_admin;

  // Super Admin has universal access
  if (role.allowedRoutes.includes("*")) {
    return true;
  }

  // Exact or sub-route permission check
  const isAllowed = role.allowedRoutes.some((route) => {
    if (pathname === route) return true;
    if (route !== "/dashboard" && route !== "/mobile" && pathname.startsWith(route)) return true;
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
    // 1. Prioritize active JWT from CoreAdmin
    const token =
      sessionStorage.getItem("zorisis_access_token") ||
      localStorage.getItem("zorisis_access_token");
    if (token) {
      const claims = decodeJwt(token);
      if (claims && !isJwtExpired(claims)) {
        return mapClaimsToAuthUser(claims);
      }
    }

    // 2. Fall back to stored session object
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
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("zorisis_auth_change"));
}

/**
 * Hook to evaluate claims directly from the active JWT issued by core-admin-service.
 */
export function useJwtClaims() {
  const [user, setUser] = useState<AuthUser>(DEMO_ACCOUNTS[0]);
  const [claims, setClaims] = useState<JwtClaims | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  const sync = () => {
    if (typeof window === "undefined") return;
    const currentToken =
      sessionStorage.getItem("zorisis_access_token") ||
      localStorage.getItem("zorisis_access_token");
    setToken(currentToken);

    if (currentToken) {
      const decoded = decodeJwt(currentToken);
      setClaims(decoded);
      if (decoded) {
        setUser(mapClaimsToAuthUser(decoded));
        return;
      }
    }

    setUser(getStoredUser());
  };

  useEffect(() => {
    setMounted(true);
    sync();

    // If no JWT is in storage on initial boot, bootstrap with default admin token from CoreAdmin
    const activeToken =
      sessionStorage.getItem("zorisis_access_token") ||
      localStorage.getItem("zorisis_access_token");
    if (!activeToken) {
      authApi.switchRole("super_admin").catch((e) => {
        console.warn("Initial JWT bootstrap:", e);
      });
    }

    window.addEventListener("zorisis_auth_change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("zorisis_auth_change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const switchRole = async (roleIdOrEmail: string): Promise<boolean> => {
    setIsSwitching(true);
    try {
      await authApi.switchRole(roleIdOrEmail);
      sync();
      return true;
    } catch (e) {
      console.error("Failed to switch role:", e);
      return false;
    } finally {
      setIsSwitching(false);
    }
  };

  const hasAccess = (pathnameOrCode: string): boolean => {
    if (claims) {
      return evaluateJwtAccess(claims, pathnameOrCode);
    }
    return hasPermission(user.role, pathnameOrCode);
  };

  return {
    user,
    claims,
    token,
    mounted,
    isSwitching,
    roleConfig: ROLES[user.role] || ROLES.super_admin,
    permissions: claims?.permissions || [],
    hasPermission: hasAccess,
    switchRole,
    reloadClaims: sync,
  };
}

export function useCurrentUser() {
  return useJwtClaims();
}

