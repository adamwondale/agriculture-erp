"use client";

import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ROLES,
  RoleId,
  detectRoleFromEmail,
  DEMO_ACCOUNTS,
  setStoredUser,
  AuthUser,
} from "@/lib/rbac";
import { authApi } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const roleScrollRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [manualRoleOverride, setManualRoleOverride] = useState<RoleId | null>(null);

  const scrollRoles = (direction: "left" | "right") => {
    if (roleScrollRef.current) {
      const scrollAmount = 300;
      roleScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Dynamically detect role as user types or override manually
  const detectedRole = useMemo(() => {
    if (manualRoleOverride) return ROLES[manualRoleOverride];
    if (!email.trim()) return ROLES.super_admin;
    return detectRoleFromEmail(email);
  }, [email, manualRoleOverride]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setIsLoading(true);

    const activeRole = detectedRole;
    const matchedAccount = DEMO_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase()
    );

    try {
      // 1. If password is not placeholder bullets, call backend CoreAdmin auth/login
      if (password && password !== "••••••••••••") {
        const res = await authApi.login({
          email: email.trim(),
          password: password,
        });

        if (res.mfaRequired && res.mfaTicket) {
          router.push(
            `/mfa?email=${encodeURIComponent(email.trim())}&ticket=${encodeURIComponent(res.mfaTicket)}&role=${activeRole.id}&next=${encodeURIComponent(activeRole.defaultLanding)}${res.devOtpCode ? `&devOtp=${res.devOtpCode}` : ""}`
          );
          return;
        }

        if (res.accessToken) {
          router.push(
            `/mfa?email=${encodeURIComponent(email.trim())}&role=${activeRole.id}&next=${encodeURIComponent(activeRole.defaultLanding)}`
          );
          return;
        }
      }

      // 2. Demo role selection or masked password: Mint authentic JWT from CoreAdmin switchRole
      try {
        const { authUser } = await authApi.switchRole(activeRole.id);
        setStoredUser(authUser);
        router.push(
          `/mfa?email=${encodeURIComponent(authUser.email)}&role=${activeRole.id}&next=${encodeURIComponent(activeRole.defaultLanding)}`
        );
        return;
      } catch (switchErr) {
        console.warn("Backend switch-role error, falling back to local session:", switchErr);
      }

      // Offline / fallback mode
      const authUser: AuthUser = {
        email: email.trim(),
        name: matchedAccount ? matchedAccount.name : email.split("@")[0].replace(/[._]/g, " "),
        role: activeRole.id,
        department: matchedAccount ? matchedAccount.department : activeRole.title,
        region: matchedAccount ? matchedAccount.region : "Regional Operations Node",
        avatarInitials: matchedAccount ? matchedAccount.avatarInitials : email.slice(0, 2).toUpperCase(),
        isNew: true,
        loginTime: new Date().toISOString(),
      };

      setStoredUser(authUser);

      // Route to MFA Verification Screen
      router.push(
        `/mfa?email=${encodeURIComponent(email.trim())}&role=${activeRole.id}&next=${encodeURIComponent(activeRole.defaultLanding)}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectDemo = (account: (typeof DEMO_ACCOUNTS)[0]) => {
    setEmail(account.email);
    setPassword("••••••••••••");
    setManualRoleOverride(account.role);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EC] flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8 font-sans relative overflow-y-auto">
      {/* Background ambient radial glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 20%, rgba(11,61,46,0.07) 0%, transparent 65%),
            radial-gradient(ellipse at 80% 80%, rgba(20,107,69,0.05) 0%, transparent 60%)`,
        }}
      />

      {/* Main Side-by-Side Card Container */}
      <div className="relative z-10 w-full max-w-5xl xl:max-w-6xl 2xl:max-w-[1240px] bg-white border border-[#DDE4DE] rounded-[24px] sm:rounded-[32px] shadow-floating overflow-hidden flex flex-col my-auto">
        {/* Top Section: Side-by-Side Picture + Form */}
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: Picture Panel with Natural Landscape Photo */}
          <div className="lg:w-[50%] xl:w-[52%] relative overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-12 text-white min-h-[440px] lg:min-h-[580px]">
          {/* Natural Landscape Photo */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
            style={{
              backgroundImage: `url('/landscape.jpg')`,
            }}
          />

          {/* Gentle cinematic gradient so the picture is vibrant, clear, and readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/50" />

          {/* Top Brand Header */}
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-white/95 border border-white/40 flex items-center justify-center backdrop-blur-md shadow-md p-2 shrink-0">
                  <img src="/logo-mark.png" alt="Z•ORISIS" className="w-9 h-9 sm:w-11 sm:h-11 object-contain" />
                </div>
                <div>
                  <div className="font-extrabold text-white tracking-tight text-xl sm:text-2xl drop-shadow-sm font-heading leading-tight" style={{ letterSpacing: "-0.025em" }}>
                    Z•ORISIS
                  </div>
                  <div className="text-[11px] sm:text-xs text-white/85 font-medium drop-shadow-sm">
                    Enterprise Admin Console
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Content: The Beloved Copy */}
          <div className="relative z-10 my-6 lg:my-auto max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/20 backdrop-blur-md w-fit mb-4 sm:mb-6 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A3F4C3]" />
              <span className="text-[11px] text-white/95 font-semibold tracking-wide">
                Secure Administrative Access
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 sm:mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] font-heading" style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}>
              Govern your enterprise with{" "}
              <span className="text-[#A3F4C3]">precision.</span>
            </h2>
            <p className="text-white/85 text-xs sm:text-sm leading-relaxed max-w-sm drop-shadow-sm">
              Z•ORISIS brings together multi-stage authorization, immutable audit trails, and hierarchical RBAC — designed for East Africa&apos;s most demanding agricultural enterprises.
            </p>
          </div>

          {/* Bottom Trust Signals */}
          <div className="relative z-10 hidden sm:flex items-center justify-between pt-4 border-t border-white/20 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["AT", "TW", "DK", "YT"].map((init) => (
                  <div key={init} className="w-7 h-7 rounded-full bg-black/50 border-2 border-white/40 flex items-center justify-center font-bold text-[10px] text-white backdrop-blur-sm">
                    {init}
                  </div>
                ))}
              </div>
              <span className="text-[11px] text-white/90 font-medium drop-shadow-sm">
                4,820 users across 6 regional hubs
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-white/90 font-medium bg-black/40 px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#A3F4C3]" />
              <span>Online</span>
            </div>
          </div>
        </div>

        {/* Right: Clean Login Form */}
        <div className="flex-1 flex flex-col justify-center p-6 sm:p-10 lg:p-12 bg-white relative">
          <div className="w-full max-w-md mx-auto">
            {/* Form Header */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#E8F1EA] text-[#146B45] font-mono text-[10px] font-bold uppercase tracking-wider">
                  Admin Gateway
                </span>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/mfa?email=${encodeURIComponent(email || "admin@coop.ag")}&role=${detectedRole.id}&next=${encodeURIComponent(detectedRole.defaultLanding)}`}
                    className="text-[11px] text-[#146B45] hover:underline font-semibold flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[13px]">security</span>
                    <span>MFA Gate</span>
                  </Link>
                  <span className="text-[#DDE4DE]">•</span>
                  <span className="text-[11px] text-[#66736C]">256-Bit TLS</span>
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#00261B] tracking-tight font-heading" style={{ letterSpacing: "-0.025em" }}>
                Sign in to console
              </h1>
              <p className="text-xs sm:text-sm text-[#66736C] mt-1">
                Enter your credentials to access administrative controls.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Work Email */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#17231D]" htmlFor="email">
                    Work Email or Username
                  </label>
                  <span className="text-[10px] text-[#66736C]">Auto-detects role</span>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined text-[18px] text-[#8FA396] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    mail
                  </span>
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setManualRoleOverride(null);
                    }}
                    placeholder="name@zorisis.com or username"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF8F3] border border-[#DDE4DE] rounded-2xl text-xs sm:text-sm text-[#17231D] placeholder-[#A4B5A9] focus:outline-none focus:ring-2 focus:ring-[#146B45]/25 focus:border-[#146B45] focus:bg-white transition-all shadow-2xs"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#17231D]" htmlFor="password">
                    Password
                  </label>
                  <a href="#" className="text-xs text-[#146B45] font-semibold hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined text-[18px] text-[#8FA396] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    lock
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    className="w-full pl-10 pr-12 py-3 bg-[#FAF8F3] border border-[#DDE4DE] rounded-2xl text-xs sm:text-sm text-[#17231D] placeholder-[#A4B5A9] focus:outline-none focus:ring-2 focus:ring-[#146B45]/25 focus:border-[#146B45] focus:bg-white transition-all shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8FA396] hover:text-[#4A5D4E] transition-colors p-1"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Remember me & Destination */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setRememberMe(!rememberMe)}
                    id="remember-me"
                    className={`w-4.5 h-4.5 rounded-md border-2 flex items-center justify-center transition-all active:scale-[0.92] cursor-pointer ${
                      rememberMe
                        ? "bg-[#0B3D2E] border-[#0B3D2E]"
                        : "bg-white border-[#DDE4DE] hover:border-[#146B45]"
                    }`}
                  >
                    {rememberMe && (
                      <span className="material-symbols-outlined text-[12px] text-white">check</span>
                    )}
                  </button>
                  <label htmlFor="remember-me" className="text-xs text-[#66736C] cursor-pointer select-none">
                    Remember me for 30 days
                  </label>
                </div>
                <span className="text-[11px] text-[#146B45] font-semibold">
                  {detectedRole.shortLabel}
                </span>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                id="login-submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#0B3D2E] text-white hover:bg-[#146B45] active:scale-[0.98] transition-all shadow-sm disabled:opacity-60 flex flex-col items-center justify-center gap-0.5 mt-2 cursor-pointer font-semibold"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="3" />
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                    </svg>
                    <span className="text-xs sm:text-sm font-bold">Authenticating {detectedRole.shortLabel}…</span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">login</span>
                      <span className="text-xs sm:text-sm font-bold">Sign In as {detectedRole.shortLabel}</span>
                    </div>
                    <span className="text-[10px] text-[#A3F4C3]/85 font-medium">
                      Direct Landing &rarr; {detectedRole.landingTitle}
                    </span>
                  </>
                )}
              </button>
            </form>

            {/* Security note */}
            <p className="text-[10px] sm:text-[11px] text-[#8FA396] text-center mt-6 leading-relaxed">
              Protected by TLS encryption. Access is logged and subject to immutable audit.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom: Full-Width Demo Roles Dock */}
      <div className="border-t border-[#DDE4DE] bg-[#FAF8F3] px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-[#E8F1EA] flex items-center justify-center text-[#146B45] shadow-2xs">
            <span className="material-symbols-outlined text-[18px]">switch_account</span>
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#00261B] uppercase tracking-wider font-heading leading-tight flex items-center gap-1.5">
              <span>Demo Roles</span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#E8F1EA] text-[#146B45] text-[10px] font-bold">
                {DEMO_ACCOUNTS.length}
              </span>
            </div>
            <div className="text-[10px] text-[#66736C]">
              Click any role to test authorization &amp; view permissions
            </div>
          </div>
        </div>

        {/* Scrollable Role selector with Left & Right scroll buttons */}
        <div className="relative flex items-center gap-1.5 min-w-0 flex-1 justify-start">
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={() => scrollRoles("left")}
            aria-label="Scroll left"
            className="w-7 h-7 rounded-lg bg-white border border-[#DDE4DE] hover:bg-[#E8F1EA] hover:border-[#146B45] text-[#55685B] hover:text-[#00261B] flex items-center justify-center shrink-0 cursor-pointer shadow-2xs active:scale-95 transition-all"
            title="Scroll left (Super Admin, CEO, COO...)"
          >
            <span className="material-symbols-outlined text-[16px]">chevron_left</span>
          </button>

          {/* Chips scroll container */}
          <div
            ref={roleScrollRef}
            className="flex items-center gap-1.5 overflow-x-auto py-1 scroll-smooth justify-start scrollbar-thin"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "thin",
            }}
          >
            {DEMO_ACCOUNTS.map((account) => {
              const roleCfg = ROLES[account.role];
              const isSelected = detectedRole.id === account.role && email === account.email;
              return (
                <button
                  key={account.role}
                  type="button"
                  onClick={() => handleSelectDemo(account)}
                  className={`px-3 py-1.5 rounded-xl border text-xs flex items-center gap-1.5 shrink-0 cursor-pointer transition-all active:scale-95 whitespace-nowrap ${
                    isSelected
                      ? "bg-[#E8F1EA] border-[#146B45] text-[#00261B] font-bold shadow-2xs ring-1 ring-[#146B45]"
                      : "bg-white hover:bg-[#E8F1EA]/70 border-[#DDE4DE] text-[#55685B] hover:text-[#00261B]"
                  }`}
                  title={`${account.name} (${account.email}) — ${roleCfg.title}`}
                >
                  <span
                    className="material-symbols-outlined text-[14px]"
                    style={{ color: roleCfg.badgeColor }}
                  >
                    {roleCfg.icon}
                  </span>
                  <span className="text-[11px] font-semibold">{roleCfg.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          <button
            type="button"
            onClick={() => scrollRoles("right")}
            aria-label="Scroll right"
            className="w-7 h-7 rounded-lg bg-white border border-[#DDE4DE] hover:bg-[#E8F1EA] hover:border-[#146B45] text-[#55685B] hover:text-[#00261B] flex items-center justify-center shrink-0 cursor-pointer shadow-2xs active:scale-95 transition-all"
            title="Scroll right (Field, Partner & Offtaker roles)"
          >
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);
}
