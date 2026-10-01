"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./AdminShell";
import {
  ROLES,
  hasPermission,
  useCurrentUser,
} from "@/lib/rbac";

interface NavItem {
  name: string;
  href: string;
  icon: string;
  badge?: string | number;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Core Administration",
    items: [
      { name: "Executive Dashboard", href: "/dashboard", icon: "dashboard" },
      { name: "Organization & Hubs", href: "/organization", icon: "corporate_fare" },
      { name: "User Directory", href: "/users", icon: "group" },
      { name: "Roles & Permissions", href: "/roles", icon: "admin_panel_settings" },
      { name: "Permission Overrides", href: "/permissions/overrides", icon: "policy" },
      { name: "Delegation Desk", href: "/delegation", icon: "swap_horiz" },
      { name: "Approvals Desk", href: "/approvals", icon: "verified", badge: 14 },
      { name: "Audit Vault", href: "/audit-logs", icon: "receipt_long" },
      { name: "Gateway Telemetry", href: "/it/telemetry", icon: "terminal" },
      { name: "Integrations & APIs", href: "/it/integrations", icon: "sync_alt" },
    ],
  },
  {
    title: "Executive & Operations",
    items: [
      { name: "Executive Command", href: "/executive/command-center", icon: "military_tech" },
      { name: "Macro GIS Intelligence", href: "/executive/macro-gis", icon: "public" },
      { name: "Tier 3 Approvals (>500k)", href: "/executive/approvals-tier3", icon: "gavel", badge: 3 },
      { name: "Contracts Signing", href: "/executive/contracts-signing", icon: "draw" },
      { name: "Board & ESG Reports", href: "/executive/investor-reports", icon: "menu_book" },
      { name: "Operations Cockpit", href: "/operations/command-center", icon: "hub" },
      { name: "Harvest Receiving Stream", href: "/operations/harvest-intake", icon: "scale" },
      { name: "Tier 2 Approvals", href: "/operations/approvals-tier2", icon: "verified", badge: 4 },
      { name: "Fleet Corridor Telematics", href: "/operations/fleet-logistics", icon: "local_shipping" },
    ],
  },
  {
    title: "Farming & Agronomy",
    items: [
      { name: "Farming Operations", href: "/farming-ops/dashboard", icon: "agriculture" },
      { name: "Crop Plans & BOM", href: "/farming-ops/crop-plans", icon: "layers" },
      { name: "Parcels Registry GIS", href: "/farming-ops/parcels", icon: "polyline" },
      { name: "Farmer Outgrower Roster", href: "/farming-ops/farmer-roster", icon: "groups" },
      { name: "Input Allocation Vouchers", href: "/farming-ops/input-allocations", icon: "shopping_bag" },
      { name: "Yield Variance Audit", href: "/farming-ops/yield-variance", icon: "query_stats" },
      { name: "Agronomic Intelligence", href: "/agronomy/dashboard", icon: "science" },
      { name: "Crop Variety Catalog", href: "/agronomy/crop-catalog", icon: "grain" },
      { name: "Soil Testing Labs", href: "/agronomy/soil-tests", icon: "biotech" },
      { name: "Advisory & Spray Approvals", href: "/agronomy/advisory-packages", icon: "pest_control" },
      { name: "Predictive AI Yield", href: "/agronomy/yield-predictions", icon: "insights" },
    ],
  },
  {
    title: "Warehouse & Silo Logistics",
    items: [
      { name: "Silo Storage Cockpit", href: "/warehouse/dashboard", icon: "warehouse" },
      { name: "Weighbridge GRN Desk", href: "/warehouse/weighbridge-intake", icon: "scale" },
      { name: "QC Digital Grading", href: "/warehouse/qc-inspection", icon: "grade" },
      { name: "Lot QR Traceability", href: "/warehouse/lot-traceability", icon: "qr_code_2" },
      { name: "Stock Transfers (STO)", href: "/warehouse/transfers-sto", icon: "swap_horiz" },
      { name: "Stock Shrinkage & Disposal", href: "/warehouse/stock-adjustments", icon: "opacity" },
    ],
  },
  {
    title: "Finance & Accounting",
    items: [
      { name: "Finance & Cash Flow", href: "/finance/dashboard", icon: "account_balance" },
      { name: "Settlement Netting Engine", href: "/finance/settlements", icon: "calculate" },
      { name: "Telebirr Payout Batches", href: "/finance/payout-batches", icon: "send" },
      { name: "Withholding Tax (MOR)", href: "/finance/withholding-tax", icon: "receipt_long" },
      { name: "General Ledger & IFRS", href: "/finance/general-ledger", icon: "auto_mode" },
      { name: "Budgetary Control", href: "/finance/budget-tracking", icon: "pie_chart" },
      { name: "Commodity Margin P&L", href: "/finance/profitability", icon: "trending_up" },
    ],
  },
  {
    title: "People Operations & HR",
    items: [
      { name: "HR People Operations", href: "/hr/dashboard", icon: "badge" },
      { name: "Employee Directory", href: "/hr/employees", icon: "person" },
      { name: "Attendance & GPS Audit", href: "/hr/attendance", icon: "fingerprint" },
      { name: "Statutory Leaves", href: "/hr/leave", icon: "event_available" },
      { name: "Confidential Payroll", href: "/hr/payroll", icon: "lock" },
      { name: "5-Dept Exit Clearance", href: "/hr/clearance", icon: "checklist" },
    ],
  },
  {
    title: "Partnerships & Compliance",
    items: [
      { name: "Commercial Partnerships", href: "/partnerships/dashboard", icon: "handshake" },
      { name: "Partner Due Diligence", href: "/partnerships/onboarding", icon: "policy" },
      { name: "Proposals & Terms", href: "/partnerships/proposals", icon: "description" },
      { name: "Partner Scorecards", href: "/partnerships/scorecards", icon: "analytics" },
      { name: "Compliance & Audit Vault", href: "/audit/dashboard", icon: "verified" },
      { name: "7-Year Audit Vault", href: "/audit/system-logs", icon: "history" },
      { name: "Agricultural Certifications", href: "/audit/certifications", icon: "verified_user" },
      { name: "CAPA Remediation Tracker", href: "/audit/capa-remediation", icon: "assignment_late" },
      { name: "EUDR Customs Packager", href: "/audit/eudr-export", icon: "public" },
      { name: "Rapid Product Recall", href: "/audit/product-recall", icon: "emergency" },
    ],
  },
  {
    title: "External Portals & Marketplace",
    items: [
      { name: "Cooperative Portal", href: "/partner/dashboard", icon: "groups" },
      { name: "Buyer Marketplace", href: "/buyer/marketplace", icon: "storefront" },
      { name: "Buyer Orders & Shipments", href: "/buyer/orders", icon: "shopping_cart" },
      { name: "Public QR Traceability", href: "/trace/LOT-2026-ETH-01", icon: "qr_code" },
    ],
  },
  {
    title: "Mobile Field Console",
    items: [
      { name: "Field Console", href: "/mobile", icon: "smartphone" },
      { name: "Crop Inspection Form", href: "/mobile/inspection", icon: "assignment_turned_in" },
      { name: "Field Payment Request", href: "/mobile/payment", icon: "payments" },
    ],
  },
];

import JwtClaimsInspector from "@/components/auth/JwtClaimsInspector";

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, closeSidebar } = useSidebar();
  const { user, claims, token, roleConfig, hasPermission } = useCurrentUser();
  const [inspectorOpen, setInspectorOpen] = useState(false);

  const claimsCount = Object.keys(claims?.raw || {}).length;

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden transition-opacity animate-in fade-in"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer Container */}
      <aside
        className={`fixed left-0 top-0 h-screen w-72 bg-[#0B3D2E] text-white z-50 flex flex-col justify-between shadow-2xl border-r border-white/10 select-none transition-transform duration-300 ease-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top Header & Navigation */}
        <div className="flex flex-col flex-1 min-h-0 overflow-y-auto px-4 pt-5 space-y-3.5">
          {/* Brand Logo & Close Button Row */}
          <div className="flex items-center justify-between pb-3 px-1 border-b border-white/10">
            <Link
              href={roleConfig.defaultLanding}
              onClick={closeSidebar}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-sm transition-transform group-hover:scale-105 shrink-0">
                <img src="/logo-mark.png" alt="Z•ORISIS Emblem" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-base tracking-tight text-white">Z•ORISIS</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#146B45] text-[9px] font-mono tracking-wider">ERP</span>
                </div>
                <span className="block text-[11px] text-[#A8C3A0] font-medium">Together We Grow</span>
              </div>
            </Link>

            {/* Mobile Close 'X' Button */}
            <button
              onClick={closeSidebar}
              className="lg:hidden p-1.5 rounded-xl bg-white/10 text-white/70 hover:text-white hover:bg-white/20 active:scale-95 transition-all"
              aria-label="Close sidebar"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Active JWT Claims & Role Pill */}
          <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 flex flex-col gap-1.5 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A3F4C3] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A3F4C3]"></span>
                </span>
                <span className="text-white/90 font-medium text-[11px]">
                  {claims?.branchId ? "Regional Node" : "Holding HQ Node"}
                </span>
              </div>
              <span
                className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-md"
                style={{ backgroundColor: roleConfig.badgeBg, color: roleConfig.badgeColor }}
              >
                {claims?.roles?.[0] || roleConfig.shortLabel}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setInspectorOpen(true)}
              className="w-full mt-0.5 py-1 px-2 rounded-lg bg-black/20 hover:bg-white/15 flex items-center justify-between text-[10px] font-mono text-[#A3F4C3] transition-colors"
            >
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">token</span>
                <span>Active JWT Claims ({claimsCount || 8})</span>
              </span>
              <span className="text-white/60 text-[9px] underline">Inspect</span>
            </button>
          </div>

          {/* Dynamic Navigation Groups - Evaluated directly from Active JWT */}
          <div className="space-y-4">
            {NAV_GROUPS.map((group, gIdx) => {
              // Check if any item in this group is permitted by evaluating active JWT claims
              const permittedItems = group.items.filter((item) =>
                hasPermission(item.href)
              );

              // If non-super-admin has zero permitted items in group, skip group entirely
              if (user.role !== "super_admin" && permittedItems.length === 0) {
                return null;
              }

              return (
                <div key={gIdx} className="space-y-1">
                  <div className="flex items-center justify-between px-3 mb-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
                      {group.title}
                    </span>
                  </div>
                  <nav className="flex flex-col gap-0.5">
                    {group.items.map((item) => {
                      const isActive = pathname === item.href;
                      const isPermitted = hasPermission(item.href);

                      if (isPermitted) {
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={closeSidebar}
                            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all active:scale-[0.98] ${
                              isActive
                                ? "bg-[#146B45] text-white font-semibold shadow-sm"
                                : "text-white/80 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="material-symbols-outlined text-[18px]">
                                {item.icon}
                              </span>
                              <span>{item.name}</span>
                            </div>
                            {item.badge && (
                              <span
                                className={`px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                                  isActive
                                    ? "bg-[#A3F4C3] text-[#062A20]"
                                    : "bg-white/20 text-white"
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        );
                      }


                      // Only show locked for Super Admin to show complete inventory
                      if (user.role === "super_admin") {
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={closeSidebar}
                            className="flex items-center justify-between px-3 py-1.5 rounded-xl text-xs text-white/40 hover:text-white/70 hover:bg-white/5 transition-all"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="material-symbols-outlined text-[17px] opacity-50">
                                {item.icon}
                              </span>
                              <span>{item.name}</span>
                            </div>
                          </Link>
                        );
                      }

                      return null;
                    })}
                  </nav>
                </div>
              );
            })}
          </div>

          {/* Security & Access Section */}
          <div className="pt-2 border-t border-white/10">
            <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-white/50 mb-1 block">
              Access & Security
            </span>
            <nav className="flex flex-col gap-0.5">
              <Link
                href="/mfa"
                onClick={closeSidebar}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-white/80 hover:bg-white/10 hover:text-white transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px]">security</span>
                  <span>MFA Token Gate</span>
                </div>
              </Link>
              <Link
                href="/login"
                onClick={closeSidebar}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-white/80 hover:bg-white/10 hover:text-white transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  <span>Sign Out / Switch User</span>
                </div>
              </Link>
            </nav>
          </div>
        </div>

        {/* Dynamic User Profile Card Footer */}
        <div className="p-3 m-3 rounded-2xl bg-[#062A20] border border-white/10 shadow-xs">
          <Link href="/users" onClick={closeSidebar} className="flex items-center gap-3 group">
            <div className="relative shrink-0">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition-transform group-hover:scale-105"
                style={{ backgroundColor: roleConfig.badgeColor, color: "#FFFFFF" }}
              >
                {user.avatarInitials}
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#A3F4C3] ring-2 ring-[#062A20]"></span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs font-semibold text-white truncate group-hover:text-[#A3F4C3] transition-colors">
                  {user.name}
                </span>
                <span
                  className="text-[9px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0"
                  style={{ backgroundColor: roleConfig.badgeBg, color: roleConfig.badgeColor }}
                >
                  {roleConfig.shortLabel}
                </span>
              </div>
              <span className="text-[11px] text-[#A8C3A0] block truncate">{roleConfig.title}</span>
              <span className="text-[10px] text-white/50 block truncate">{user.department}</span>
            </div>
          </Link>
        </div>
      </aside>

      <JwtClaimsInspector isOpen={inspectorOpen} onClose={() => setInspectorOpen(false)} />
    </>
  );
}

