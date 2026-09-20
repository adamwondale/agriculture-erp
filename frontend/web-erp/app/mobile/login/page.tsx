"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MobileLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("abebe.tesfaye@zorisis.com");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setLoading(true);
    setTimeout(() => {
      router.push(`/mobile/mfa?email=${encodeURIComponent(email.trim())}&new=true`);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EC] font-[Inter,system-ui,sans-serif] text-[#17231D] flex flex-col justify-between p-4 sm:p-6 select-none">
      {/* Mobile Top Nav / Brand Bar */}
      <header className="w-full max-w-md mx-auto flex items-center justify-between pt-2 pb-4">
        <Link
          href="/mobile"
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-xl bg-[#0B3D2E] flex items-center justify-center text-[#E8F1EA] shadow-sm transition-transform group-hover:scale-105">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C12 2 6 8.5 6 14.5C6 17.8 8.7 20.5 12 20.5C15.3 20.5 18 17.8 18 14.5C18 8.5 12 2 12 2Z" />
            </svg>
          </div>
          <div>
            <span className="font-bold text-sm text-[#00261B] tracking-tight">Z•ORISIS</span>
            <span className="block text-[10px] text-[#146B45] font-medium tracking-wide">Together We Grow</span>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-[11px] text-[#66736C] hover:text-[#00261B] px-2.5 py-1 rounded-full bg-white border border-[#DDE4DE] shadow-xs"
          >
            Hub ↗
          </Link>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#DDE4DE] text-[11px] text-[#66736C]">
            <span className="w-2 h-2 rounded-full bg-[#146B45]"></span>
            <span className="font-mono">v2.4 Core</span>
          </div>
        </div>
      </header>

      {/* Main Sign In Form */}
      <main className="w-full max-w-md mx-auto my-auto py-4">
        <div className="mb-6 text-left">
          <h1 className="text-2xl font-bold tracking-tight text-[#00261B]" style={{ letterSpacing: "-0.02em" }}>
            Mobile Sign In
          </h1>
          <p className="text-sm text-[#66736C] mt-1">Sign in to your authorized ERP mobile field workspace</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Identity Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#00261B] tracking-wide uppercase" htmlFor="mobile-email">
              Email or Username
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-[#66736C] pointer-events-none">
                badge
              </span>
              <input
                type="text"
                id="mobile-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="e.g. name@zorisis.com"
                className="w-full h-12 pl-11 pr-4 bg-white border border-[#DDE4DE] rounded-xl text-[#17231D] text-sm placeholder:text-[#66736C]/60 transition-all focus:border-[#146B45] focus:ring-2 focus:ring-[#146B45]/20 focus:outline-none shadow-xs"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-semibold text-[#00261B] tracking-wide uppercase" htmlFor="mobile-password">
                Password
              </label>
              <button type="button" className="text-xs text-[#146B45] font-semibold hover:underline">
                Forgot?
              </button>
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-[#66736C] pointer-events-none">
                lock
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="mobile-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                className="w-full h-12 pl-11 pr-12 bg-white border border-[#DDE4DE] rounded-xl text-[#17231D] text-sm placeholder:text-[#66736C]/60 transition-all focus:border-[#146B45] focus:ring-2 focus:ring-[#146B45]/20 focus:outline-none shadow-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 p-1.5 text-[#66736C] hover:text-[#00261B] rounded-lg transition-colors active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Biometrics & Remember Switch */}
          <div className="flex items-center justify-between py-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded text-[#146B45] border-[#DDE4DE] accent-[#146B45] focus:ring-0"
              />
              <span className="text-xs text-[#66736C]">Remember account</span>
            </label>
            <button
              type="button"
              onClick={() => {
                setLoading(true);
                setTimeout(() => router.push("/mobile/mfa"), 500);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#146B45] px-2.5 py-1 rounded-lg bg-[#E8F1EA] active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[16px]">fingerprint</span>
              <span>Face ID / Touch</span>
            </button>
          </div>

          {/* Sign In CTA Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#0B3D2E] text-white font-semibold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.97] hover:bg-[#062A20] disabled:opacity-75"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Authorizing...</span>
              </div>
            ) : (
              <>
                <span>Sign In to Mobile ERP</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        {/* SSO Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#DDE4DE]"></div>
          </div>
          <span className="relative px-3 bg-[#F7F4EC] text-[11px] font-semibold text-[#66736C] uppercase tracking-wider">
            or continue with
          </span>
        </div>

        {/* SSO Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="h-11 px-3 bg-white border border-[#DDE4DE] rounded-xl text-xs font-medium text-[#17231D] flex items-center justify-center gap-2 shadow-xs active:scale-[0.97] transition-transform hover:bg-[#F7F4EC]"
          >
            <span className="material-symbols-outlined text-[18px] text-[#0078D4]">grid_view</span>
            <span>Microsoft SSO</span>
          </button>
          <button
            type="button"
            className="h-11 px-3 bg-white border border-[#DDE4DE] rounded-xl text-xs font-medium text-[#17231D] flex items-center justify-center gap-2 shadow-xs active:scale-[0.97] transition-transform hover:bg-[#F7F4EC]"
          >
            <span className="material-symbols-outlined text-[18px] text-[#EA4335]">mail</span>
            <span>Google Work</span>
          </button>
        </div>

        {/* Switch to Web Version link */}
        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="text-xs text-[#66736C] hover:text-[#00261B] inline-flex items-center gap-1 font-medium underline underline-offset-2"
          >
            <span>Need full Desktop Console? Open Web Login</span>
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-md mx-auto text-center py-2 text-[11px] text-[#66736C]/80">
        Secured with TLS 1.3 · Holding Agricultural Infrastructure
      </footer>
    </div>
  );
}
