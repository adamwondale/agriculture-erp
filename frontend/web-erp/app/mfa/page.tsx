"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ROLES,
  RoleId,
  getStoredUser,
  setStoredUser,
  AuthUser,
  DEMO_ACCOUNTS,
} from "@/lib/rbac";

function MFAContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramEmail = searchParams.get("email");
  const paramRole = searchParams.get("role") as RoleId | null;
  const paramNext = searchParams.get("next");
  const isNewAccount = searchParams.get("new") === "true";
  const provider = searchParams.get("provider");

  const [currentUser, setCurrentUser] = useState<AuthUser>(() => getStoredUser());
  const [email, setEmail] = useState<string>(currentUser.email);
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(28);
  const [isExpiring, setIsExpiring] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const user = getStoredUser();
    if (paramEmail) {
      user.email = paramEmail;
      setEmail(paramEmail);
    }
    if (paramRole && paramRole in ROLES) {
      user.role = paramRole;
      const matched = DEMO_ACCOUNTS.find((a) => a.role === paramRole);
      if (matched) {
        user.name = matched.name;
        user.department = matched.department;
        user.avatarInitials = matched.avatarInitials;
      }
    }
    setCurrentUser(user);
    setStoredUser(user);
  }, [paramEmail, paramRole]);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        if (t <= 8) setIsExpiring(true);
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDigitChange = (idx: number, val: string) => {
    const cleaned = val.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[idx] = cleaned;
    setDigits(next);
    setIsError(false);
    if (cleaned && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
    if (next.every((d) => d !== "") && next.join("").length === 6) {
      handleVerify(next.join(""));
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      const arr = pasted.split("");
      setDigits(arr);
      e.preventDefault();
      handleVerify(pasted);
    }
  };

  const handleVerify = (code?: string) => {
    const fullCode = code || digits.join("");
    if (fullCode.length !== 6) return;
    setIsVerifying(true);
    setIsError(false);

    // Any standard 6-digit code succeeds
    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);

      const targetRole = currentUser.role;
      const roleCfg = ROLES[targetRole] || ROLES.super_admin;

      // Save verified user session
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "zorisis_verified_session",
          JSON.stringify({
            email,
            name: currentUser.name,
            role: targetRole,
            verifiedAt: new Date().toISOString(),
            status: "authenticated",
          })
        );
      }

      // Smooth transition to destination based on role
      const targetLanding = paramNext || roleCfg.defaultLanding;
      setTimeout(() => {
        router.push(targetLanding);
      }, 700);
    }, 850);
  };

  const handleQuickFill = () => {
    const demoCode = ["7", "4", "1", "9", "2", "0"];
    setDigits(demoCode);
    handleVerify("741920");
  };

  const handleSendSMS = () => {
    setToastMessage("A fresh 6-digit backup code has been sent via SMS.");
    setTimeLeft(30);
    setIsExpiring(false);
    setTimeout(() => setToastMessage(""), 4000);
  };

  // Derive initials
  const initials = email
    .split("@")[0]
    .split(/[._-]/)
    .map((p) => p[0]?.toUpperCase())
    .join("")
    .slice(0, 2) || "US";

  const displayName = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  const progressRatio = timeLeft / 30;
  const circumference = 2 * Math.PI * 22;
  const strokeDashoffset = circumference * (1 - progressRatio);

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 font-[Inter,system-ui,sans-serif] overflow-y-auto">
      {/* Full-Screen Natural Landscape Photo Background */}
      <div
        className="fixed inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url('/landscape.jpg')`,
        }}
      />

      {/* Gentle vignette to ground the floating card while keeping the photo bright & clear */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.4) 100%)`,
        }}
      />

      {/* Floating Verification Card */}
      <div className="relative z-10 w-full max-w-[460px] my-auto">
        {/* Card */}
        <div className="bg-white/95 backdrop-blur-2xl border border-white/80 rounded-[28px] sm:rounded-[32px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5),0_10px_25px_-5px_rgba(0,0,0,0.25)] overflow-hidden">
          {/* Forest top accent */}
          <div className="h-1 bg-gradient-to-r from-[#0B3D2E] via-[#146B45] to-[#A3F4C3]" />

          <div className="p-5 sm:p-8">
            {/* Logo & Role Badge */}
            {(() => {
              const roleCfg = ROLES[currentUser.role] || ROLES.super_admin;
              const targetLanding = paramNext || roleCfg.defaultLanding;
              return (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-2xl bg-[#0B3D2E] flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px] text-white">hub</span>
                      </div>
                      <div>
                        <div className="font-bold text-[#00261B] tracking-tight" style={{ letterSpacing: "-0.02em" }}>
                          Z•ORISIS
                        </div>
                        <div className="text-[10px] text-[#66736C] font-medium">Enterprise Admin Console</div>
                      </div>
                    </div>

                    <div
                      className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 border"
                      style={{
                        backgroundColor: roleCfg.badgeBg,
                        color: roleCfg.badgeColor,
                        borderColor: roleCfg.badgeBorder,
                      }}
                    >
                      <span className="material-symbols-outlined text-[14px]">{roleCfg.icon}</span>
                      <span>{roleCfg.shortLabel}</span>
                    </div>
                  </div>

                  {/* Role-Aware Authentication Alert with Direct Landing */}
                  <div className="mb-5 p-3.5 rounded-2xl bg-[#E8F1EA] border border-[#146B45]/20 flex items-start gap-3">
                    <span className="material-symbols-outlined text-[20px] text-[#146B45] shrink-0 mt-0.5">
                      verified_user
                    </span>
                    <div>
                      <div className="text-xs font-bold text-[#00261B]">
                        Verifying {currentUser.name} ({roleCfg.shortLabel})
                      </div>
                      <div className="text-[11px] text-[#66736C] leading-relaxed mt-0.5">
                        Authorizing access for <span className="font-semibold text-[#00261B]">{email}</span>.
                      </div>
                      <div className="mt-1.5 pt-1.5 border-t border-[#146B45]/15 flex items-center gap-1.5 text-[11px] text-[#0B3D2E] font-medium">
                        <span className="material-symbols-outlined text-[15px] text-[#146B45]">arrow_forward</span>
                        <span>Direct destination: <strong>{roleCfg.landingTitle}</strong> ({targetLanding})</span>
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}

            {/* Header & Animated circular timer */}
            <div className="text-center mb-6">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="22" fill="none" stroke="#DDE4DE" strokeWidth="3" />
                  <circle
                    cx="24"
                    cy="24"
                    r="22"
                    fill="none"
                    stroke={isExpiring ? "#C94B4B" : "#146B45"}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className={`text-lg font-bold font-mono transition-colors ${
                      isExpiring ? "text-[#C94B4B]" : "text-[#0B3D2E]"
                    }`}
                  >
                    {timeLeft}
                  </span>
                  <span className="text-[9px] text-[#66736C] font-medium">SEC</span>
                </div>
              </div>

              <h1 className="text-xl font-bold text-[#00261B] mb-1.5" style={{ letterSpacing: "-0.02em" }}>
                Verify Your Identity
              </h1>
              <p className="text-xs text-[#66736C] leading-relaxed">
                Enter the 6-digit token from your authenticator app or Google verification.
              </p>
            </div>

            {/* User context pill */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F7F4EC] border border-[#DDE4DE] mb-6">
              <div className="w-9 h-9 rounded-xl bg-[#0B3D2E] flex items-center justify-center text-white font-bold text-xs shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-xs text-[#17231D] truncate">{displayName}</div>
                <div className="text-[11px] text-[#66736C] truncate font-mono">{email}</div>
              </div>
              <Link href="/login" className="text-[11px] text-[#146B45] font-semibold hover:underline shrink-0">
                Not you?
              </Link>
            </div>

            {/* Toast Message */}
            {toastMessage && (
              <div className="mb-4 p-2.5 rounded-xl bg-[#FFF3D6] border border-[#D79A19]/30 text-[#D79A19] text-xs font-semibold text-center animate-in fade-in">
                {toastMessage}
              </div>
            )}

            {/* OTP Input */}
            <div className="space-y-3 mb-6">
              <div className="flex gap-1.5 sm:gap-2 justify-center" onPaste={handlePaste}>
                {digits.map((d, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      inputRefs.current[idx] = el;
                    }}
                    id={`otp-digit-${idx + 1}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onChange={(e) => handleDigitChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className={`w-9 sm:w-11 h-12 sm:h-14 text-center text-lg sm:text-xl font-bold rounded-xl sm:rounded-2xl border-2 bg-white transition-all focus:outline-none ${
                      isError
                        ? "border-[#C94B4B] text-[#C94B4B] shake"
                        : isSuccess
                        ? "border-[#146B45] bg-[#E8F1EA] text-[#146B45]"
                        : d
                        ? "border-[#146B45] text-[#0B3D2E]"
                        : "border-[#DDE4DE] text-[#17231D] focus:border-[#146B45] focus:ring-2 focus:ring-[#146B45]/20"
                    }`}
                    style={{
                      fontSize: "18px",
                      caretColor: "transparent",
                    }}
                  />
                ))}
              </div>

              {/* Quick Fill Helper for Easy Testing */}
              <div className="flex items-center justify-between text-[11px] text-[#66736C] px-1">
                <span>Demo Code: <strong>741920</strong></span>
                <button
                  type="button"
                  onClick={handleQuickFill}
                  className="text-[#146B45] font-semibold hover:underline"
                >
                  Auto-Fill Demo Code
                </button>
              </div>

              {/* Error message */}
              {isError && (
                <div className="flex items-center justify-center gap-1.5 pt-1">
                  <span className="material-symbols-outlined text-[15px] text-[#C94B4B]">error</span>
                  <span className="text-xs text-[#C94B4B] font-semibold">
                    {errorMessage || "Incorrect code. Please try again."}
                  </span>
                </div>
              )}
            </div>

            {/* Verify button */}
            <button
              id="verify-mfa"
              onClick={() => handleVerify()}
              disabled={digits.some((d) => !d) || isVerifying || isSuccess}
              className="w-full py-3.5 rounded-2xl bg-[#0B3D2E] text-white text-sm font-bold hover:bg-[#062A20] active:scale-[0.98] transition-all shadow-sm disabled:opacity-40 flex items-center justify-center gap-2.5"
            >
              {isVerifying ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="3" />
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                  </svg>
                  Verifying Token…
                </>
              ) : isSuccess ? (
                <>
                  <span className="material-symbols-outlined text-[18px] text-[#A3F4C3]">check_circle</span>
                  Verified! Entering Console…
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">shield_check</span>
                  Verify &amp; Sign In
                </>
              )}
            </button>

            {/* Fallback options */}
            <div className="flex items-center justify-between mt-5 pt-5 border-t border-[#DDE4DE]">
              <button
                type="button"
                onClick={handleSendSMS}
                className="text-xs text-[#66736C] hover:text-[#146B45] font-semibold transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[15px]">sms</span>
                Send SMS code
              </button>
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-xs text-[#66736C] hover:text-[#146B45] font-semibold transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[15px]">vpn_key</span>
                Use backup code
              </button>
            </div>
          </div>
        </div>

        {/* Trust note */}
        <div className="flex items-center justify-center mt-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/25 shadow-xs">
            <span className="material-symbols-outlined text-[14px] text-[#A3F4C3]">verified_user</span>
            <span className="text-[11px] text-white font-medium drop-shadow-xs">
              Cryptographically anchored login event • MS1 Secure Gateway
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-4px); }
          40% { transform: translateX(4px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .shake { animation: shake 0.4s ease; }
      `}</style>
    </div>
  );
}

export default function MFAPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F7F4EC] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#146B45]/20 border-t-[#146B45] rounded-full animate-spin"></div>
        </div>
      }
    >
      <MFAContent />
    </Suspense>
  );
}
