"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getStoredUser, ROLES, AuthUser, DEMO_ACCOUNTS, setStoredUser } from "@/lib/rbac";

export default function MobileProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser>(() => getStoredUser());
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [lang, setLang] = useState<"en" | "am">("en");
  const [holdProgress, setHoldProgress] = useState(0);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const sync = () => setUser(getStoredUser());
    window.addEventListener("zorisis_auth_change", sync);
    return () => {
      window.removeEventListener("zorisis_auth_change", sync);
    };
  }, []);

  const roleConfig = ROLES[user.role] || ROLES.super_admin;

  const startHold = () => {
    let progress = 0;
    holdIntervalRef.current = setInterval(() => {
      progress += 5;
      setHoldProgress(progress);
      if (progress >= 100) {
        if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
        router.push("/login");
      }
    }, 90); // ~1.8 seconds
  };

  const endHold = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
    }
    setHoldProgress(0);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EC] font-[Inter,system-ui,sans-serif] text-[#17231D] flex flex-col justify-between pb-24 select-none">
      {/* Mobile Top Header */}
      <header className="sticky top-0 z-30 w-full bg-[#F7F4EC]/90 backdrop-blur-xl border-b border-[#DDE4DE]/60">
        <div className="max-w-2xl mx-auto px-4 sm:px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href={roleConfig.defaultLanding}
              className="w-9 h-9 rounded-xl bg-white border border-[#DDE4DE] flex items-center justify-center text-[#66736C] hover:text-[#00261B] active:scale-95 transition-transform shadow-xs"
              title="Return to your workspace"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            </Link>
            <h1 className="text-base font-bold text-[#00261B] tracking-tight">Profile &amp; Security</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={roleConfig.defaultLanding}
              className="text-[11px] text-[#66736C] hover:text-[#00261B] px-2.5 py-1 rounded-full bg-white border border-[#DDE4DE] shadow-xs"
            >
              Workspace ↗
            </Link>
            <div
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border shadow-xs"
              style={{
                backgroundColor: roleConfig.badgeBg,
                color: roleConfig.badgeColor,
                borderColor: roleConfig.badgeBorder,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: roleConfig.badgeColor }}></span>
              <span>{roleConfig.shortLabel}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Profile Content */}
      <main className="w-full max-w-2xl mx-auto px-4 sm:px-5 pt-4 space-y-5 flex-1">
        {/* User Identity Card */}
        <div className="p-4 rounded-2xl bg-white border border-[#DDE4DE] shadow-xs flex items-center gap-3.5 sm:gap-4">
          <div className="relative shrink-0">
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl text-white flex items-center justify-center text-lg sm:text-xl font-bold shadow-xs"
              style={{ backgroundColor: roleConfig.badgeColor }}
            >
              {user.avatarInitials}
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#146B45] ring-2 ring-white flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[10px]">check</span>
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[#00261B] truncate leading-tight">{user.name}</h2>
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold shrink-0 border"
                style={{
                  backgroundColor: roleConfig.badgeBg,
                  color: roleConfig.badgeColor,
                  borderColor: roleConfig.badgeBorder,
                }}
              >
                {roleConfig.shortLabel}
              </span>
            </div>
            <p className="text-xs text-[#66736C] truncate mt-0.5">{user.email}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#E8F1EA] text-[#146B45] font-semibold text-[10px]">
                <span className="material-symbols-outlined text-[13px]">{roleConfig.icon}</span>
                <span>{roleConfig.title}</span>
              </span>
              <span className="text-[10px] text-[#66736C] font-mono">
                Dedicated Page: {roleConfig.defaultLanding}
              </span>
            </div>
          </div>
        </div>

        {/* Active Operational Scope & Isolation Notice */}
        <div className="p-3.5 rounded-2xl bg-white border border-[#DDE4DE] shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#66736C]">Role Access Policy</span>
            <span
              className="text-[11px] font-bold px-2 py-0.5 rounded-md"
              style={{ backgroundColor: roleConfig.badgeBg, color: roleConfig.badgeColor }}
            >
              {roleConfig.id === "super_admin" ? "All Modules Allowed" : "Isolated Module Access"}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#F7F4EC] border border-[#DDE4DE]/80 text-xs">
            <span className="text-[10px] uppercase font-bold text-[#66736C] tracking-wider block mb-1">
              Authorized Workspace
            </span>
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#00261B] text-sm">{roleConfig.landingTitle}</span>
              <code className="text-[11px] font-mono text-[#146B45] font-bold bg-white px-2 py-0.5 rounded border border-[#DDE4DE]">
                {roleConfig.defaultLanding}
              </code>
            </div>
            <p className="text-[11px] text-[#66736C] mt-1.5 leading-relaxed">
              {roleConfig.id === "super_admin"
                ? "Full administrative governance across all 9 enterprise modules and field consoles."
                : `${roleConfig.shortLabel} credentials can only access ${roleConfig.landingTitle} (${roleConfig.defaultLanding}). All other modules are locked under zero-trust RBAC.`}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-[#F7F4EC]/80 border border-[#DDE4DE]/60">
              <span className="text-[10px] text-[#66736C] block">Department</span>
              <span className="font-semibold text-[#00261B] text-[11px]">{user.department}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F7F4EC]/80 border border-[#DDE4DE]/60">
              <span className="text-[10px] text-[#66736C] block">Assigned Node</span>
              <span className="font-semibold text-[#00261B] text-[11px]">{user.region}</span>
            </div>
          </div>
        </div>

        {/* Security & Hardware Keys Section */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#66736C] px-1">Security &amp; Hardware Keys</h3>
          <div className="bg-white rounded-2xl border border-[#DDE4DE] shadow-xs divide-y divide-[#DDE4DE]/60 overflow-hidden">
            {/* MFA Status */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#146B45] text-[20px]">verified_user</span>
                <div>
                  <div className="text-xs font-semibold text-[#00261B]">Two-Factor Authentication</div>
                  <div className="text-[11px] text-[#66736C]">TOTP Authenticator App Active</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#E8F1EA] text-[#146B45] font-bold text-[10px]">ENABLED</span>
            </div>

            {/* Biometrics */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#146B45] text-[20px]">fingerprint</span>
                <div>
                  <div className="text-xs font-semibold text-[#00261B]">Biometric Touch / Face ID</div>
                  <div className="text-[11px] text-[#66736C]">Enrolled on this device</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setBiometricsEnabled(!biometricsEnabled)}
                className={`w-9 h-5 rounded-full transition-colors relative flex items-center px-0.5 ${
                  biometricsEnabled ? "bg-[#146B45]" : "bg-[#DDE4DE]"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    biometricsEnabled ? "translate-x-4" : "translate-x-0"
                  }`}
                ></span>
              </button>
            </div>

            {/* Active Sessions */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#66736C] text-[20px]">devices</span>
                <div>
                  <div className="text-xs font-semibold text-[#00261B]">Active ERP Sessions</div>
                  <div className="text-[11px] text-[#66736C]">Current Device • Web Admin Console</div>
                </div>
              </div>
              <span className="text-xs text-[#66736C] font-mono">2 Active</span>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#66736C] px-1">Language &amp; Region</h3>
          <div className="bg-white rounded-2xl border border-[#DDE4DE] shadow-xs p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#66736C] text-[20px]">language</span>
              <div>
                <div className="text-xs font-semibold text-[#00261B]">Primary Language</div>
                <div className="text-[11px] text-[#66736C]">English / አማርኛ (Amharic)</div>
              </div>
            </div>
            <div className="flex items-center bg-[#F7F4EC] rounded-lg p-0.5 border border-[#DDE4DE]">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  lang === "en" ? "bg-white shadow-xs font-bold text-[#00261B]" : "text-[#66736C] font-medium"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("am")}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  lang === "am" ? "bg-white shadow-xs font-bold text-[#00261B]" : "text-[#66736C] font-medium"
                }`}
              >
                አማ
              </button>
            </div>
          </div>
        </div>

        {/* Emil Kowalski Hold-to-Sign-Out (Hold 1.8s) */}
        <div className="pt-2">
          <div className="mb-1 text-[11px] text-[#66736C] text-center">
            Press and hold for 1.8 seconds to terminate authenticated mobile session
          </div>
          <button
            type="button"
            onMouseDown={startHold}
            onMouseUp={endHold}
            onMouseLeave={endHold}
            onTouchStart={startHold}
            onTouchEnd={endHold}
            className="relative w-full h-12 bg-[#FDE8E8] border border-[#C94B4B]/20 text-[#C94B4B] rounded-xl font-semibold text-xs overflow-hidden flex items-center justify-center gap-2 active:scale-[0.98] transition-transform select-none"
          >
            {/* Hold progress bar */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-[#C94B4B]/20 transition-all pointer-events-none"
              style={{ width: `${holdProgress}%` }}
            />
            <span className="material-symbols-outlined text-[18px] relative z-10">logout</span>
            <span className="relative z-10">
              {holdProgress > 0 ? `Holding to Sign Out (${holdProgress}%)` : "Hold to Sign Out"}
            </span>
          </button>
        </div>
      </main>

      {/* Floating Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#DDE4DE] py-2 px-4 sm:px-6 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-around">
          <Link
            href="/mobile"
            className="flex flex-col items-center gap-1 text-[#66736C] hover:text-[#00261B] text-[10px] font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">home</span>
            <span>Home</span>
          </Link>
          <Link
            href="/mobile/inspection"
            className="flex flex-col items-center gap-1 text-[#66736C] hover:text-[#00261B] text-[10px] font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">assignment</span>
            <span>Inspect</span>
          </Link>
          <Link
            href="/mobile/payment"
            className="flex flex-col items-center gap-1 text-[#66736C] hover:text-[#00261B] text-[10px] font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">payments</span>
            <span>Payment</span>
          </Link>
          <Link
            href="/mobile/profile"
            className="flex flex-col items-center gap-1 text-[#146B45] font-semibold text-[10px] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">person</span>
            <span>Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
