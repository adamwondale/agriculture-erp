"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ROLES,
  getStoredUser,
  hasPermission,
  AuthUser,
  DEMO_ACCOUNTS,
  setStoredUser,
} from "@/lib/rbac";

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AuthUser>(() => getStoredUser());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const syncUser = () => {
      setUser(getStoredUser());
    };

    window.addEventListener("zorisis_auth_change", syncUser);
    return () => {
      window.removeEventListener("zorisis_auth_change", syncUser);
    };
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  // Public/Auth routes are always allowed
  if (
    pathname === "/login" ||
    pathname === "/mfa" ||
    pathname === "/mobile/login" ||
    pathname === "/mobile/mfa" ||
    pathname === "/mobile/splash"
  ) {
    return <>{children}</>;
  }

  const roleConfig = ROLES[user.role] || ROLES.super_admin;
  const isAllowed = hasPermission(user.role, pathname);

  if (isAllowed) {
    return <>{children}</>;
  }

  // Render 403 Access Restricted screen
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-xl bg-white rounded-3xl border border-[#DDE4DE] shadow-card overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Restricted Warning Strip */}
        <div className="h-1.5 bg-gradient-to-r from-[#C94B4B] via-[#E88E45] to-[#FFEAC2]" />

        <div className="p-6 sm:p-8">
          {/* Header row */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FDF2F2] border border-[#F8D7DA] flex items-center justify-center text-[#C94B4B] shadow-xs">
                <span className="material-symbols-outlined text-[26px]">gpp_maybe</span>
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-[#C94B4B] uppercase tracking-wider block">
                  Security Gateway • Error 403
                </span>
                <h1 className="text-xl sm:text-2xl font-bold text-[#00261B] tracking-tight">
                  Access Restricted
                </h1>
              </div>
            </div>

            {/* Current Role Badge */}
            <div
              className="px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 border"
              style={{
                backgroundColor: roleConfig.badgeBg,
                color: roleConfig.badgeColor,
                borderColor: roleConfig.badgeBorder,
              }}
            >
              <span className="material-symbols-outlined text-[15px]">{roleConfig.icon}</span>
              <span>{roleConfig.shortLabel}</span>
            </div>
          </div>

          {/* Description Box */}
          <div className="p-4 rounded-2xl bg-[#F7F4EC] border border-[#DDE4DE] text-xs sm:text-sm text-[#17231D] space-y-2 mb-6">
            <p>
              Signed in as <strong className="font-semibold text-[#00261B]">{user.name}</strong> ({user.email}).
            </p>
            <p className="text-[#66736C]">
              Your role <strong className="text-[#00261B]">{roleConfig.shortLabel}</strong> is strictly restricted to{" "}
              <strong className="text-[#00261B]">{roleConfig.landingTitle}</strong> ({roleConfig.defaultLanding}). You do not have permission to view or access{" "}
              <code className="px-1.5 py-0.5 rounded bg-white font-mono text-[11px] text-[#C94B4B] border border-[#DDE4DE]">{pathname}</code>.
            </p>
          </div>

          {/* Permitted Modules for this user */}
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#66736C] block mb-2.5">
              Authorized Module for {roleConfig.shortLabel}:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {roleConfig.allowedRoutes.slice(0, 6).map((route) => (
                <Link
                  key={route}
                  href={route}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-[#DDE4DE] hover:border-[#146B45] hover:bg-[#E8F1EA]/50 text-xs font-medium text-[#00261B] transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#146B45]">check_circle</span>
                  <span className="capitalize">{route.replace("/", "").replace(/-/g, " ") || "Home"}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Actions & Demo Switch */}
          <div className="pt-5 border-t border-[#DDE4DE] flex flex-col sm:flex-row items-center justify-between gap-3">
            <Link
              href={roleConfig.defaultLanding}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0B3D2E] text-white text-xs font-bold hover:bg-[#062A20] active:scale-95 transition-all text-center shadow-xs"
            >
              Return to {roleConfig.shortLabel} Workspace ({roleConfig.defaultLanding})
            </Link>

            {/* Demo Quick Switch to Super Admin */}
            <button
              type="button"
              onClick={() => {
                const adminAccount = DEMO_ACCOUNTS[0];
                setStoredUser(adminAccount);
                setUser(adminAccount);
                router.refresh();
              }}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#E8F1EA] text-[#0B3D2E] text-xs font-semibold hover:bg-[#D4E6D7] transition-all border border-[#146B45]/20 flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[15px]">switch_account</span>
              <span>Test as Admin (Unlock All)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
