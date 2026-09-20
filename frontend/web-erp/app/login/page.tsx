"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ROLES,
  RoleId,
  detectRoleFromEmail,
  DEMO_ACCOUNTS,
  setStoredUser,
  AuthUser,
} from "@/lib/rbac";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [manualRoleOverride, setManualRoleOverride] = useState<RoleId | null>(null);

  // Dynamically detect role as user types or override manually
  const detectedRole = useMemo(() => {
    if (manualRoleOverride) return ROLES[manualRoleOverride];
    if (!email.trim()) return ROLES.super_admin;
    return detectRoleFromEmail(email);
  }, [email, manualRoleOverride]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setIsLoading(true);

    const activeRole = detectedRole;
    const matchedAccount = DEMO_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase()
    );

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

    setTimeout(() => {
      router.push(`/mfa?email=${encodeURIComponent(email.trim())}&new=true&role=${activeRole.id}&next=${encodeURIComponent(activeRole.defaultLanding)}`);
    }, 600);
  };

  const handleSelectDemo = (account: (typeof DEMO_ACCOUNTS)[0]) => {
    setEmail(account.email);
    setPassword("••••••••••••");
    setManualRoleOverride(account.role);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EC] flex flex-col items-center justify-start sm:justify-center p-3 sm:p-6 lg:p-8 xl:p-12 font-[Inter,system-ui,sans-serif] relative overflow-y-auto">
      {/* Background ambient radial glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 20%, rgba(11,61,46,0.07) 0%, transparent 65%),
            radial-gradient(ellipse at 80% 80%, rgba(20,107,69,0.05) 0%, transparent 60%)`,
        }}
      />

      {/* Main Big Card Container */}
      <div className="relative z-10 w-full max-w-5xl xl:max-w-6xl 2xl:max-w-[1240px] bg-white border border-[#DDE4DE] rounded-[24px] sm:rounded-[32px] shadow-floating overflow-hidden flex flex-col lg:flex-row min-h-[620px] lg:min-h-[680px] xl:min-h-[700px] my-auto">
        {/* Left: Picture Panel (Replacing the Green Screen) */}
        <div className="lg:w-[50%] xl:w-[52%] relative overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-12 text-white">
          {/* Natural Landscape Photo */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
            style={{
              backgroundImage: `url('/landscape.jpg')`,
            }}
          />

          {/* Gentle cinematic gradient so the picture is fully visible and vibrant */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/50" />

          {/* Top Brand Header */}
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-black/40 border border-white/25 flex items-center justify-center backdrop-blur-md shadow-sm">
                  <span className="material-symbols-outlined text-[20px] text-[#A3F4C3]">hub</span>
                </div>
                <div>
                  <div className="font-bold text-white tracking-tight text-lg drop-shadow-sm" style={{ letterSpacing: "-0.02em" }}>
                    Z•ORISIS
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-white/80 font-medium drop-shadow-sm">Enterprise Admin Console</div>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 border border-white/20 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A3F4C3] animate-pulse" />
                <span className="text-[10px] font-mono text-white/90 font-bold uppercase tracking-wider">v2.4 Core</span>
              </div>
            </div>
          </div>

          {/* Middle Content */}
          <div className="relative z-10 my-6 lg:my-auto max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/20 backdrop-blur-md w-fit mb-4 sm:mb-6 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A3F4C3]" />
              <span className="text-[11px] text-white/90 font-semibold tracking-wide">Secure Administrative Access</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]" style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}>
              Govern your enterprise with{" "}
              <span className="text-[#A3F4C3]">precision.</span>
            </h2>
            <p className="text-white/85 text-xs sm:text-sm leading-relaxed max-w-sm drop-shadow-sm">
              Z•ORISIS brings together multi-stage authorization, immutable audit trails, and hierarchical RBAC — designed for East Africa&apos;s most demanding agricultural enterprises.
            </p>

            {/* Feature list with frosted glass pill containers */}
            <div className="space-y-2.5 sm:space-y-3 mt-6 sm:mt-8">
              {[
                { icon: "verified_user", text: "Zero-trust RBAC with field-level permissions" },
                { icon: "receipt_long", text: "Cryptographically signed immutable audit chain" },
                { icon: "account_tree", text: "Multi-tier organizational hierarchy management" },
              ].map((f) => (
                <div key={f.icon} className="flex items-center gap-3 bg-black/30 backdrop-blur-md border border-white/15 px-3 py-2 rounded-xl shadow-xs">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[15px] sm:text-[16px] text-[#A3F4C3]">{f.icon}</span>
                  </div>
                  <span className="text-xs sm:text-[13px] text-white/95 font-medium drop-shadow-xs">{f.text}</span>
                </div>
              ))}
            </div>
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
              <span className="text-[11px] text-white/90 font-medium drop-shadow-sm">4,820 users across 6 regional hubs</span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-white/90 font-medium bg-black/40 px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#A3F4C3]"></span>
              <span>Online</span>
            </div>
          </div>
        </div>

        {/* Right: Login Form (Inside the Big Card) */}
        <div className="flex-1 flex flex-col justify-center p-6 sm:p-10 lg:p-12 bg-white relative">
          <div className="w-full max-w-md mx-auto">
            {/* Form Header */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#E8F1EA] text-[#146B45] font-mono text-[10px] font-bold uppercase tracking-wider">
                  Admin Gateway
                </span>
                <span className="text-[11px] text-[#66736C]">256-Bit TLS</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#00261B] tracking-tight" style={{ letterSpacing: "-0.02em" }}>
                Sign in to console
              </h1>
              <p className="text-xs sm:text-sm text-[#66736C] mt-1">
                Enter your credentials to access administrative controls.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#17231D]" htmlFor="email">
                    Work Email or Username
                  </label>
                  <span className="text-[10px] text-[#66736C]">Auto-detects role</span>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined text-[18px] text-[#B0BDB5] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
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
                    placeholder="e.g. tigist.alemu (HR), kinde (Finance), admin"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-[#F7F4EC]/60 border border-[#DDE4DE] rounded-2xl text-xs sm:text-sm text-[#17231D] placeholder-[#B0BDB5] focus:outline-none focus:ring-2 focus:ring-[#146B45]/30 focus:border-[#146B45] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Dynamic Detected Role Badge & Scope Banner */}
              <div
                className="p-3 rounded-2xl border transition-all duration-300 animate-in fade-in"
                style={{
                  backgroundColor: detectedRole.badgeBg,
                  borderColor: detectedRole.badgeBorder,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="material-symbols-outlined text-[19px]"
                      style={{ color: detectedRole.badgeColor }}
                    >
                      {detectedRole.icon}
                    </span>
                    <div>
                      <span className="text-xs font-bold block" style={{ color: detectedRole.badgeColor }}>
                        Role: {detectedRole.title}
                      </span>
                      <span className="text-[10px] block opacity-80" style={{ color: detectedRole.badgeColor }}>
                        {detectedRole.allowedRoutes.length === 15
                          ? "Full Access (All 9 Modules)"
                          : `${detectedRole.allowedRoutes.length} Permitted Modules`}
                      </span>
                    </div>
                  </div>

                  {/* Manual Role Selector Dropdown */}
                  <select
                    value={detectedRole.id}
                    onChange={(e) => setManualRoleOverride(e.target.value as RoleId)}
                    className="text-[11px] font-semibold py-1 px-2.5 rounded-xl bg-white/90 border border-black/10 focus:outline-none cursor-pointer shadow-xs"
                    style={{ color: detectedRole.badgeColor }}
                    title="Override role for demo purposes"
                  >
                    {Object.values(ROLES).map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.shortLabel}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-[11px] mt-1.5 leading-snug opacity-85" style={{ color: detectedRole.badgeColor }}>
                  {detectedRole.description}
                </p>
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
                  <span className="material-symbols-outlined text-[18px] text-[#B0BDB5] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    lock
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-12 py-3 bg-[#F7F4EC]/60 border border-[#DDE4DE] rounded-2xl text-xs sm:text-sm text-[#17231D] placeholder-[#B0BDB5] focus:outline-none focus:ring-2 focus:ring-[#146B45]/30 focus:border-[#146B45] focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B0BDB5] hover:text-[#66736C] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setRememberMe(!rememberMe)}
                    id="remember-me"
                    className={`w-4.5 h-4.5 rounded-md border-2 flex items-center justify-center transition-all active:scale-[0.92] ${
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
              </div>

              {/* Submit button */}
              <button
                type="submit"
                id="login-submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#0B3D2E] text-white hover:bg-[#062A20] active:scale-[0.98] transition-all shadow-sm disabled:opacity-60 flex flex-col items-center justify-center gap-0.5 mt-2 cursor-pointer"
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
                      Direct Landing &rarr; {detectedRole.landingTitle} ({detectedRole.defaultLanding})
                    </span>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-[#DDE4DE]" />
              <span className="text-[11px] text-[#B0BDB5] font-medium">or quick demo accounts</span>
              <div className="flex-1 h-px bg-[#DDE4DE]" />
            </div>

            {/* Quick Demo Pre-fill for All 5 Roles */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#66736C] block text-center tracking-wider">
                Click any role to test access permissions
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {DEMO_ACCOUNTS.map((account) => {
                  const roleCfg = ROLES[account.role];
                  const isSelected = detectedRole.id === account.role && email === account.email;
                  return (
                    <button
                      key={account.role}
                      type="button"
                      onClick={() => handleSelectDemo(account)}
                      className={`p-2 rounded-xl text-left transition-all border text-xs flex flex-col justify-between ${
                        isSelected
                          ? "bg-[#E8F1EA] border-[#146B45] shadow-xs"
                          : "bg-[#F7F4EC]/70 hover:bg-[#E8F1EA]/80 border-[#DDE4DE]"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className="material-symbols-outlined text-[15px]"
                          style={{ color: roleCfg.badgeColor }}
                        >
                          {roleCfg.icon}
                        </span>
                        <span
                          className="font-bold text-[11px] truncate"
                          style={{ color: roleCfg.badgeColor }}
                        >
                          {roleCfg.shortLabel}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#66736C] truncate">{account.name.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Security note */}
            <p className="text-[10px] sm:text-[11px] text-[#B0BDB5] text-center mt-5 leading-relaxed">
              Protected by TLS encryption. Access is logged and subject to immutable audit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
