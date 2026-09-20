"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function MobileSplashPage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F4EC] font-[Inter,system-ui,sans-serif] text-[#17231D] flex flex-col justify-between items-center p-6 relative select-none overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 45%, rgba(168, 195, 160, 0.28) 0%, rgba(247, 244, 236, 0) 70%)"
        }}
      />

      {/* Top Status Bar */}
      <div className="w-full max-w-md flex justify-between items-center pt-3 text-xs text-[#66736C] z-10">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-[#DDE4DE] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#146B45] animate-pulse"></span>
          <span className="font-semibold text-[11px] text-[#146B45]">Secured Node</span>
        </div>
        <Link
          href="/"
          className="text-[11px] font-mono text-[#66736C] hover:text-[#00261B] px-2.5 py-1 rounded-lg bg-white/60 border border-[#DDE4DE] active:scale-95 transition-all"
        >
          All Screens ↗
        </Link>
      </div>

      {/* Center Hero Branding */}
      <main className="flex flex-col items-center justify-center text-center my-auto z-10 w-full max-w-sm px-4">
        {/* Animated Brand Symbol */}
        <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-[#A3F4C3]/40 animate-ping opacity-30"></div>
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#0B3D2E] to-[#062A20] shadow-[0_12px_28px_rgba(11,61,46,0.25)] flex items-center justify-center border border-white/20 transform transition-transform duration-300 hover:scale-105 active:scale-95">
            <svg className="w-10 h-10 text-[#E8F1EA]" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 5C20 5 11 14 11 23C11 27.97 15.03 32 20 32C24.97 32 29 27.97 29 23C29 14 20 5 20 5Z" fill="currentColor" fillOpacity="0.9" />
              <path d="M20 12V28M15 20L20 15L25 20" stroke="#062A20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-[#00261B] mb-1.5" style={{ letterSpacing: "-0.025em" }}>
          Z•ORISIS
        </h1>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#146B45] mb-3">
          Together We Grow
        </p>
        <p className="text-sm text-[#66736C] font-normal max-w-[260px] leading-relaxed">
          Smart Agriculture Management &amp; Multi-Tier Enterprise ERP
        </p>

        {/* Loading Indicator or Ready Action */}
        <div className="mt-10 w-full flex flex-col items-center">
          {!ready ? (
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-6 h-6 border-2 border-[#146B45]/20 border-t-[#146B45] rounded-full animate-spin"
                style={{ animationDuration: "0.65s" }}
              ></div>
              <span className="text-xs text-[#66736C] font-medium animate-pulse">Initializing verified session...</span>
            </div>
          ) : (
            <div className="w-full space-y-2.5 animate-in fade-in duration-500">
              <Link
                href="/mobile"
                className="w-full h-12 bg-[#0B3D2E] text-white font-semibold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.97] hover:bg-[#062A20] transition-all"
              >
                <span>Launch Mobile Field App</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
              <Link
                href="/mobile/login"
                className="w-full h-11 bg-white border border-[#DDE4DE] text-[#00261B] font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 active:scale-[0.97] hover:bg-[#F7F4EC] transition-all"
              >
                <span className="material-symbols-outlined text-[16px] text-[#146B45]">login</span>
                <span>Sign In with Credentials</span>
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Compliance & Security Footer */}
      <footer className="w-full max-w-md text-center pb-4 z-10 space-y-1.5">
        <div className="inline-flex items-center gap-1.5 text-[11px] text-[#66736C] bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full border border-[#DDE4DE]/80 shadow-xs">
          <span className="material-symbols-outlined text-[14px] text-[#146B45]">verified</span>
          <span>256-Bit Encrypted Agricultural Infrastructure</span>
        </div>
        <div className="text-[10px] text-[#66736C]/70">
          Federal Democratic Republic of Ethiopia &amp; Regional Operations
        </div>
      </footer>
    </div>
  );
}
