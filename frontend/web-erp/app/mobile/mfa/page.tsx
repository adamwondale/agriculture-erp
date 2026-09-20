"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function MobileMfaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramEmail = searchParams.get("email");
  const email = paramEmail || "abebe.tesfaye@zorisis.com";
  const isNew = searchParams.get("new") === "true";

  const [otp, setOtp] = useState(["7", "4", "1", "9", "2", ""]);
  const [countdown, setCountdown] = useState(28);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (index: number, val: string) => {
    if (!/^[0-9]?$/.test(val)) return;
    const nextOtp = [...otp];
    nextOtp[index] = val;
    setOtp(nextOtp);

    // Auto-advance
    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    if (nextOtp.every((d) => d !== "") && nextOtp.join("").length === 6) {
      handleComplete(nextOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleComplete = (code?: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/mobile");
      }, 600);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleComplete();
  };

  return (
    <div className="min-h-screen relative bg-[#F7F4EC] font-[Inter,system-ui,sans-serif] text-[#17231D] flex flex-col justify-between p-4 sm:p-6 select-none overflow-hidden">
      {/* Subtle landscape background */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url('/landscape.jpg')`,
        }}
      />
      {/* Mobile Top Bar */}
      <header className="w-full max-w-md mx-auto flex items-center justify-between pt-2 pb-4">
        <Link
          href="/mobile/login"
          className="w-10 h-10 rounded-xl bg-white border border-[#DDE4DE] flex items-center justify-center text-[#66736C] hover:text-[#00261B] active:scale-95 transition-transform shadow-xs"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </Link>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#DDE4DE] text-[11px] text-[#66736C] shadow-xs">
          <span className="material-symbols-outlined text-[14px] text-[#146B45]">security</span>
          <span>Step 2 of 2</span>
        </div>
        <Link
          href="/dashboard"
          className="text-[11px] text-[#66736C] hover:text-[#00261B] px-2.5 py-1 rounded-full bg-white border border-[#DDE4DE] shadow-xs"
        >
          Console ↗
        </Link>
      </header>

      {/* Main Card */}
      <main className="w-full max-w-md mx-auto my-auto py-4 flex flex-col items-center text-center">
        {/* Security Shield Node */}
        <div className="w-14 h-14 rounded-2xl bg-[#E8F1EA] text-[#146B45] flex items-center justify-center mb-5 shadow-xs border border-[#146B45]/20">
          <span className="material-symbols-outlined text-[28px]">verified_user</span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-[#00261B] mb-2" style={{ letterSpacing: "-0.02em" }}>
          Verify Your Identity
        </h1>
        <p className="text-sm text-[#66736C] leading-relaxed mb-4 max-w-[280px]">
          Enter the 6-digit authentication token sent to your email:
        </p>
        <div className="mb-6 px-3 py-1.5 rounded-full bg-white border border-[#DDE4DE] text-xs font-mono font-semibold text-[#00261B] shadow-xs">
          {email}
        </div>

        {/* 6-Box OTP Input */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex justify-center items-center gap-1.5 sm:gap-2.5 mb-6">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                maxLength={1}
                pattern="[0-9]*"
                inputMode="numeric"
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className={`w-9 sm:w-11 h-12 sm:h-14 text-center text-lg font-bold font-mono border rounded-xl shadow-xs transition-all focus:outline-none focus:scale-105 ${
                  success
                    ? "bg-[#E8F1EA] border-[#146B45] text-[#146B45]"
                    : "bg-white border-[#DDE4DE] text-[#00261B] focus:border-[#146B45] focus:ring-2 focus:ring-[#146B45]/20"
                }`}
              />
            ))}
          </div>

          {/* Countdown Resend Timer Pill */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF3D6] text-[#D79A19] text-xs font-medium border border-[#D79A19]/20">
              <span className="material-symbols-outlined text-[14px]">timer</span>
              <span>
                Resend code in <span className="font-mono font-semibold">00:{countdown < 10 ? `0${countdown}` : countdown}</span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 w-full">
            <button
              type="submit"
              disabled={loading || success}
              className="w-full h-12 bg-[#0B3D2E] text-white font-semibold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.97] hover:bg-[#062A20] disabled:opacity-75"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Verifying Token...</span>
                </div>
              ) : success ? (
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#A3F4C3]">check_circle</span>
                  <span>Verified! Redirecting...</span>
                </div>
              ) : (
                <>
                  <span>Verify &amp; Continue</span>
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setOtp(["9", "8", "7", "6", "5", "4"]);
                handleComplete("987654");
              }}
              className="w-full h-11 bg-white border border-[#DDE4DE] text-[#66736C] hover:text-[#00261B] font-medium text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.97] transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">key</span>
              <span>Use backup verification code</span>
            </button>
          </div>
        </form>
      </main>

      {/* Security Audit Guarantee */}
      <footer className="w-full max-w-md mx-auto text-center py-2">
        <span className="text-[11px] text-[#66736C]/80">
          Biometrically anchored session token • ISO 27001
        </span>
      </footer>
    </div>
  );
}

export default function MobileMfaPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F7F4EC] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#146B45]/20 border-t-[#146B45] rounded-full animate-spin"></div>
        </div>
      }
    >
      <MobileMfaContent />
    </Suspense>
  );
}
