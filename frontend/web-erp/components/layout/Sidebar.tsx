"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./AdminShell";
import {
  ROLES,
  getStoredUser,
  hasPermission,
  AuthUser,
} from "@/lib/rbac";

interface NavItem {
  name: string;
  href: string;
  icon: string;
  badge?: string | number;
}

const ADMIN_NAV_ITEMS: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { name: "Organization", href: "/organization", icon: "corporate_fare" },
  { name: "Users", href: "/users", icon: "group" },
  { name: "Provision User", href: "/users/create", icon: "person_add", badge: "Wizard" },
  { name: "Roles & Permissions", href: "/roles", icon: "admin_panel_settings" },
  { name: "Permission Overrides", href: "/permissions/overrides", icon: "policy" },
  { name: "Delegation", href: "/delegation", icon: "swap_horiz" },
  { name: "Approvals", href: "/approvals", icon: "verified", badge: 14 },
  { name: "Audit Logs", href: "/audit-logs", icon: "receipt_long" },
];

const FIELD_NAV_ITEMS: NavItem[] = [
  { name: "Field Console", href: "/mobile", icon: "smartphone" },
  { name: "Crop Inspection", href: "/mobile/inspection", icon: "assignment_turned_in" },
  { name: "Payment Request", href: "/mobile/payment", icon: "payments" },
  { name: "Field Delegation", href: "/mobile/delegation", icon: "sync_alt" },
  { name: "Activity Audit", href: "/mobile/audit", icon: "fact_check" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, closeSidebar } = useSidebar();
  const [user, setUser] = useState<AuthUser>(() => getStoredUser());

  useEffect(() => {
    const syncUser = () => setUser(getStoredUser());
    window.addEventListener("zorisis_auth_change", syncUser);
    return () => {
      window.removeEventListener("zorisis_auth_change", syncUser);
    };
  }, []);

  const roleConfig = ROLES[user.role] || ROLES.super_admin;

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
        <div className="flex flex-col flex-1 min-h-0 overflow-y-auto px-4 pt-5 space-y-4">
          {/* Brand Logo & Close Button Row */}
          <div className="flex items-center justify-between pb-3 px-1 border-b border-white/10">
            <Link
              href={roleConfig.defaultLanding}
              onClick={closeSidebar}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#146B45] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105 shrink-0">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C12 2 6 8.5 6 14.5C6 17.8 8.7 20.5 12 20.5C15.3 20.5 18 17.8 18 14.5C18 8.5 12 2 12 2Z" />
                </svg>
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

          {/* Tenant Scope Indicator with Active Role Badge */}
          <div className="px-3 py-2 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A3F4C3] animate-pulse"></span>
              <span className="text-white/90 font-medium">Holding HQ Node</span>
            </div>
            <span
              className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md"
              style={{ backgroundColor: roleConfig.badgeBg, color: roleConfig.badgeColor }}
            >
              {roleConfig.shortLabel}
            </span>
          </div>

          {/* Core Administration Section */}
          <div>
            <div className="flex items-center justify-between px-3 mb-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                Core Administration
              </span>
              {user.role !== "super_admin" && (
                <span className="text-[10px] text-amber-300/80 font-mono font-medium">Filtered</span>
              )}
            </div>
            <nav className="flex flex-col gap-1">
              {ADMIN_NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                const isPermitted = hasPermission(user.role, item.href);

                if (isPermitted) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeSidebar}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all active:scale-[0.98] ${
                        isActive
                          ? "bg-[#146B45] text-white font-semibold shadow-sm"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                            isActive ? "bg-[#A3F4C3] text-[#062A20]" : "bg-white/20 text-white"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                }

                // Restricted Item (Shows locked state to make RBAC visibly clear)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeSidebar}
                    className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-white/40 hover:text-white/70 hover:bg-white/5 transition-all"
                    title={`Restricted to authorized roles. Current role: ${roleConfig.shortLabel}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[19px] opacity-60">{item.icon}</span>
                      <span className="line-through decoration-white/30">{item.name}</span>
                    </div>
                    <span className="material-symbols-outlined text-[15px] text-amber-300/70">lock</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Field Agritech Suite Section */}
          <div className="pt-2 border-t border-white/10">
            <div className="flex items-center justify-between px-3 mb-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                Field Operations
              </span>
            </div>
            <nav className="flex flex-col gap-1">
              {FIELD_NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                const isPermitted = hasPermission(user.role, item.href);

                if (isPermitted) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeSidebar}
                      className={`flex items-center justify-between px-3.5 py-2 rounded-xl text-xs transition-all active:scale-[0.98] ${
                        isActive
                          ? "bg-[#146B45] text-white font-semibold shadow-sm"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-[19px] text-[#A3F4C3]">{item.icon}</span>
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeSidebar}
                    className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-white/40 hover:text-white/70 hover:bg-white/5 transition-all"
                    title={`Restricted module`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[18px] opacity-50">{item.icon}</span>
                      <span className="line-through decoration-white/30">{item.name}</span>
                    </div>
                    <span className="material-symbols-outlined text-[15px] text-amber-300/70">lock</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Security & Access Section */}
          <div className="pt-2 border-t border-white/10">
            <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-1.5 block">
              Access &amp; Security
            </span>
            <nav className="flex flex-col gap-1">
              <Link
                href="/mfa"
                onClick={closeSidebar}
                className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-white/80 hover:bg-white/10 hover:text-white transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[19px]">security</span>
                  <span>MFA Token Gate</span>
                </div>
              </Link>
              <Link
                href="/login"
                onClick={closeSidebar}
                className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-white/80 hover:bg-white/10 hover:text-white transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[19px]">switch_account</span>
                  <span>Switch Role / Log Out</span>
                </div>
              </Link>
            </nav>
          </div>
        </div>

        {/* Dynamic User Profile Card Footer */}
        <div className="p-3 m-3 rounded-2xl bg-[#062A20] border border-white/10 shadow-xs">
          <Link href="/mobile/profile" onClick={closeSidebar} className="flex items-center gap-3 group">
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
    </>
  );
}
