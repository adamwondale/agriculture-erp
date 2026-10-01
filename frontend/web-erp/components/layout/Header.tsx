"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSidebar } from "./AdminShell";
import {
  ROLES,
  RoleId,
  useCurrentUser,
  setStoredUser,
  AuthUser,
} from "@/lib/rbac";
import DualDateBadge from "@/components/common/DualDateBadge";
import JwtClaimsBadge from "@/components/auth/JwtClaimsBadge";
import JwtClaimsInspector from "@/components/auth/JwtClaimsInspector";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

interface CommandItem {
  id: string;
  title: string;
  category: "Core Admin" | "Field Operations" | "Security & Auth" | "Farming & Agronomy";
  href: string;
  icon: string;
  badge?: string;
}

const COMMAND_ITEMS: CommandItem[] = [
  { id: "dash", title: "Enterprise Dashboard", category: "Core Admin", href: "/dashboard", icon: "dashboard" },
  { id: "org", title: "Organization & Branch Hierarchy", category: "Core Admin", href: "/organization", icon: "corporate_fare" },
  { id: "users", title: "User Management Directory", category: "Core Admin", href: "/users", icon: "group" },
  { id: "provision", title: "Provision New User (5-Step Wizard)", category: "Core Admin", href: "/users/create", icon: "person_add", badge: "Wizard" },
  { id: "roles", title: "Roles & Permissions Matrix", category: "Core Admin", href: "/roles", icon: "admin_panel_settings" },
  { id: "overrides", title: "Permission Overrides & Masking", category: "Core Admin", href: "/permissions/overrides", icon: "policy" },
  { id: "delegation", title: "Delegation Management", category: "Core Admin", href: "/delegation", icon: "swap_horiz" },
  { id: "approvals", title: "Workflow Approval Chains", category: "Core Admin", href: "/approvals", icon: "verified", badge: "14 Pending" },
  { id: "agronomy-dash", title: "Agronomic Health & Decision Support", category: "Farming & Agronomy", href: "/agronomy/dashboard", icon: "psychiatry" },
  { id: "farming-dash", title: "Farming Operations Management", category: "Farming & Agronomy", href: "/farming-ops/dashboard", icon: "agriculture" },
  { id: "crop-plans", title: "Crop Production Plans & BOM", category: "Farming & Agronomy", href: "/farming-ops/crop-plans", icon: "layers" },
  { id: "soil-tests", title: "Soil Laboratory Fertility Repositories", category: "Farming & Agronomy", href: "/agronomy/soil-tests", icon: "science" },
  { id: "parcels", title: "Farm Parcels Registry GIS", category: "Farming & Agronomy", href: "/farming-ops/parcels", icon: "polyline" },
  { id: "mobile-home", title: "Mobile Field Operations Console", category: "Field Operations", href: "/mobile", icon: "smartphone" },
  { id: "inspection", title: "Log Field Crop Inspection", category: "Field Operations", href: "/mobile/inspection", icon: "assignment_turned_in" },
  { id: "payment", title: "Submit Field Payment Request", category: "Field Operations", href: "/mobile/payment", icon: "payments" },
  { id: "mob-delegation", title: "My Field Delegations", category: "Field Operations", href: "/mobile/delegation", icon: "sync_alt" },
  { id: "mob-audit", title: "Personal Signed Audit Trail", category: "Field Operations", href: "/mobile/audit", icon: "fact_check" },
  { id: "mfa", title: "Two-Factor MFA Token Gate", category: "Security & Auth", href: "/mfa", icon: "security" },
  { id: "login", title: "Enterprise Sign In Screen", category: "Security & Auth", href: "/login", icon: "login" },
];

export default function Header({ title, subtitle }: HeaderProps) {
  const router = useRouter();
  const { toggleSidebar } = useSidebar();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { user, claims, roleConfig, hasPermission } = useCurrentUser();


  // Keyboard shortcut for Command Palette (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setPaletteOpen(false);
        setNotificationsOpen(false);
        setUserMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (paletteOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchQuery("");
    }
  }, [paletteOpen]);

  // Filter commands by search query AND permission
  const filteredCommands = COMMAND_ITEMS.filter((item) => {
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const isPermitted = hasPermission(item.href);
    return matchesQuery && isPermitted;
  });

  const handleSelectCommand = (href: string) => {
    setPaletteOpen(false);
    router.push(href);
  };

  return (
    <>
      <header className="sticky top-0 z-30 h-16 w-full bg-white/85 backdrop-blur-xl border-b border-[#DDE4DE] flex items-center justify-between px-2.5 sm:px-6 lg:px-8 shadow-xs select-none">
        {/* Left: Hamburger & Global Search */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1 max-w-xl min-w-0 pr-2">
          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={toggleSidebar}
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F7F4EC] hover:bg-[#E8F1EA] border border-[#DDE4DE] flex items-center justify-center text-[#0B3D2E] active:scale-95 transition-all shrink-0 shadow-xs"
            aria-label="Open navigation menu"
          >
            <span className="material-symbols-outlined text-[20px] sm:text-[22px]">menu</span>
          </button>

          <div className="relative w-full">
            <span className="material-symbols-outlined text-[16px] sm:text-[18px] text-[#66736C] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim() && !paletteOpen) {
                  setPaletteOpen(true);
                }
              }}
              onFocus={() => {
                if (searchQuery.trim()) setPaletteOpen(true);
              }}
              onClick={() => setPaletteOpen(true)}
              placeholder="Search console, modules, roles..."
              className="w-full h-9 sm:h-10 pl-9 pr-8 bg-[#F7F4EC] hover:bg-[#E8F1EA] focus:bg-white border border-[#DDE4DE] focus:border-[#146B45] focus:ring-2 focus:ring-[#146B45]/20 rounded-xl text-xs text-[#17231D] placeholder-[#66736C] transition-all outline-none"
            />
            {/* Clear / Close X Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSearchQuery("");
                setPaletteOpen(false);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-md hover:bg-[#DDE4DE] text-[#66736C] hover:text-[#00261B] flex items-center justify-center transition-colors cursor-pointer"
              title="Clear search"
              aria-label="Clear search"
            >
              <span className="material-symbols-outlined text-[15px]">close</span>
            </button>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <DualDateBadge className="hidden md:inline-flex" />
          <JwtClaimsBadge className="hidden sm:inline-flex" />

          {/* Notifications Dropdown Toggle */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setUserMenuOpen(false);
              }}
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all active:scale-95 relative shadow-xs ${
                notificationsOpen
                  ? "bg-[#0B3D2E] text-white border-[#0B3D2E]"
                  : "bg-white border-[#DDE4DE] text-[#66736C] hover:text-[#0B3D2E] hover:bg-[#F7F4EC]"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C94B4B] ring-2 ring-white"></span>
            </button>

            {/* Notification Popover */}
            {notificationsOpen && (
              <div className="absolute right-0 top-12 w-[calc(100vw-2rem)] sm:w-84 max-w-sm bg-white rounded-2xl border border-[#DDE4DE] shadow-floating p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-[#DDE4DE] mb-2.5">
                  <span className="font-bold text-xs text-[#00261B]">System Notifications</span>
                  <span className="text-[10px] text-[#146B45] font-semibold cursor-pointer hover:underline">
                    Mark all read
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <Link
                    href="/approvals"
                    onClick={() => setNotificationsOpen(false)}
                    className="p-2.5 rounded-xl bg-[#F7F4EC] hover:bg-[#E8F1EA] flex items-start gap-2.5 transition-colors block"
                  >
                    <span className="material-symbols-outlined text-[#D79A19] text-[18px] shrink-0 mt-0.5">pending_actions</span>
                    <div>
                      <div className="font-semibold text-[#17231D]">Payment approval pending</div>
                      <div className="text-[11px] text-[#66736C]">Seed consignment #8821 requires dual authorization.</div>
                      <span className="text-[10px] text-[#146B45] font-semibold mt-1 inline-block">Review in Approvals &rarr;</span>
                    </div>
                  </Link>

                  <Link
                    href="/delegation"
                    onClick={() => setNotificationsOpen(false)}
                    className="p-2.5 rounded-xl bg-[#F7F4EC] hover:bg-[#E8F1EA] flex items-start gap-2.5 transition-colors block"
                  >
                    <span className="material-symbols-outlined text-[#146B45] text-[18px] shrink-0 mt-0.5">verified</span>
                    <div>
                      <div className="font-semibold text-[#17231D]">Delegation approved</div>
                      <div className="text-[11px] text-[#66736C]">Finance Manager delegation active until May 30.</div>
                      <span className="text-[10px] text-[#146B45] font-semibold mt-1 inline-block">View Delegation &rarr;</span>
                    </div>
                  </Link>

                  <Link
                    href="/permissions/overrides"
                    onClick={() => setNotificationsOpen(false)}
                    className="p-2.5 rounded-xl bg-[#F7F4EC] hover:bg-[#E8F1EA] flex items-start gap-2.5 transition-colors block"
                  >
                    <span className="material-symbols-outlined text-[#0B3D2E] text-[18px] shrink-0 mt-0.5">policy</span>
                    <div>
                      <div className="font-semibold text-[#17231D]">Security override logged</div>
                      <div className="text-[11px] text-[#66736C]">Emergency field access granted to Kinde Gudeta.</div>
                      <span className="text-[10px] text-[#146B45] font-semibold mt-1 inline-block">Inspect Policy &rarr;</span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar & Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setUserMenuOpen(!userMenuOpen);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-2 pl-2 border-l border-[#DDE4DE] active:scale-95 transition-transform"
            >
              <div
                className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xs shadow-xs"
                style={{ backgroundColor: roleConfig.badgeColor }}
              >
                {user.avatarInitials}
              </div>
              <div className="hidden md:flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[#17231D] truncate max-w-[90px]">
                  {user.name.split(" ")[0]}
                </span>
                <span
                  className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold border"
                  style={{
                    backgroundColor: roleConfig.badgeBg,
                    color: roleConfig.badgeColor,
                    borderColor: roleConfig.badgeBorder,
                  }}
                >
                  {roleConfig.shortLabel}
                </span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-[#66736C]">arrow_drop_down</span>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-12 w-[calc(100vw-2rem)] sm:w-72 max-w-xs bg-white rounded-2xl border border-[#DDE4DE] shadow-floating p-3 z-50 animate-in fade-in zoom-in-95 duration-150 text-xs">
                <div className="p-2.5 rounded-xl bg-[#F7F4EC] mb-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#00261B]">{user.name}</span>
                    <span
                      className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold"
                      style={{ backgroundColor: roleConfig.badgeBg, color: roleConfig.badgeColor }}
                    >
                      {roleConfig.shortLabel}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#66736C] truncate">{user.email}</div>
                  <span className="inline-block mt-1 text-[10px] text-[#0B3D2E] font-medium">
                    {roleConfig.title}
                  </span>
                </div>

                <div className="space-y-1">
                  <Link
                    href="/users"
                    onClick={() => setUserMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-[#F7F4EC] flex items-center gap-2 text-[#17231D] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#146B45]">person</span>
                    <span>Directory &amp; Profile</span>
                  </Link>
                  <Link
                    href="/mfa"
                    onClick={() => setUserMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-[#F7F4EC] flex items-center gap-2 text-[#17231D] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#0B3D2E]">security</span>
                    <span>MFA Token Gate</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      setInspectorOpen(true);
                    }}
                    className="w-full p-2 rounded-lg hover:bg-[#F7F4EC] flex items-center justify-between text-[#17231D] transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#0B3D2E]">token</span>
                      <span>Inspect Active JWT</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#146B45] font-bold">
                      {claims?.permissions.length || 0} Claims
                    </span>
                  </button>

                  <div className="pt-1.5 border-t border-[#DDE4DE] mt-1">
                    <Link
                      href="/login"
                      onClick={() => setUserMenuOpen(false)}
                      className="p-2 rounded-lg hover:bg-[#FDE8E8] text-[#C94B4B] flex items-center gap-2 font-semibold transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      <span>Sign Out from Workspace</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* =========================================================================
          GLOBAL COMMAND PALETTE MODAL (⌘K)
          ========================================================================= */}
      {paletteOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-12 sm:pt-24 px-3 sm:px-4 animate-in fade-in duration-150">
          <div
            className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#DDE4DE] overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="p-3.5 sm:p-4 border-b border-[#DDE4DE] flex items-center gap-2.5 sm:gap-3">
              <span className="material-symbols-outlined text-[20px] sm:text-[22px] text-[#146B45]">search</span>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type a screen, command, or workflow..."
                className="w-full text-xs sm:text-sm font-medium text-[#17231D] placeholder:text-[#66736C]/60 focus:outline-none bg-transparent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="w-6 h-6 rounded-md hover:bg-[#F7F4EC] text-[#66736C] hover:text-[#00261B] flex items-center justify-center transition-colors cursor-pointer"
                  title="Clear search query"
                  aria-label="Clear search query"
                >
                  <span className="material-symbols-outlined text-[15px]">backspace</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setPaletteOpen(false)}
                className="w-7 h-7 rounded-lg bg-[#F7F4EC] hover:bg-[#FDE8E8] text-[#66736C] hover:text-[#C94B4B] flex items-center justify-center transition-colors cursor-pointer"
                title="Close search"
                aria-label="Close search"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-96 overflow-y-auto p-2 space-y-1">
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#66736C]">
                  No matching screens or commands found for &ldquo;{searchQuery}&rdquo;.
                </div>
              ) : (
                filteredCommands.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectCommand(item.href)}
                    className="w-full p-2.5 rounded-xl hover:bg-[#F7F4EC] flex items-center justify-between text-left transition-colors group gap-2"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#E8F1EA] text-[#0B3D2E] flex items-center justify-center group-hover:bg-[#146B45] group-hover:text-white transition-colors shrink-0">
                        <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-[#17231D] group-hover:text-[#0B3D2E] truncate">
                          {item.title}
                        </div>
                        <span className="text-[10px] text-[#66736C] font-mono truncate block">{item.href}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      {item.badge && (
                        <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-[#FFF3D6] text-[#D79A19] font-semibold text-[9px] sm:text-[10px]">
                          {item.badge}
                        </span>
                      )}
                      <span className="text-[9px] sm:text-[10px] font-semibold px-1.5 sm:px-2 py-0.5 rounded bg-[#F7F4EC] text-[#66736C] hidden xs:inline-block">
                        {item.category}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Footer Tip */}
            <div className="p-2.5 sm:p-3 bg-[#F7F4EC]/80 border-t border-[#DDE4DE] flex items-center justify-between text-[10px] sm:text-[11px] text-[#66736C]">
              <span>Navigate with tap, click or arrow keys</span>
              <span className="font-mono">Z•ORISIS</span>
            </div>
          </div>
        </div>
      )}

      <JwtClaimsInspector isOpen={inspectorOpen} onClose={() => setInspectorOpen(false)} />
    </>
  );
}

