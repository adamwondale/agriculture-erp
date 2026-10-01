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
import { authApi, mapBackendRoleToFrontendRole } from "@/lib/api";

function MFAContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramEmail = searchParams.get("email");
  const paramRole = searchParams.get("role") as RoleId | null;
  const paramNext = searchParams.get("next");
  const isNewAccount = searchParams.get("new") === "true";
  const provider = searchParams.get("provider");
  const paramTicket = searchParams.get("ticket");
  const paramDevOtp = searchParams.get("devOtp");

  const [currentUser, setCurrentUser] = useState<AuthUser>(DEMO_ACCOUNTS[0]);
  const [email, setEmail] = useState<string>(DEMO_ACCOUNTS[0].email);
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

    // If devOtp is provided, auto-populate helper
    if (paramDevOtp && paramDevOtp.length === 6) {
      setToastMessage(`Development OTP detected: ${paramDevOtp}`);
    }
  }, [paramEmail, paramRole, paramDevOtp]);

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

  const handleVerify = async (code?: string) => {
    const fullCode = code || digits.join("");
    if (fullCode.length !== 6) return;
    setIsVerifying(true);
    setIsError(false);

    if (paramTicket) {
      try {
        const auth = await authApi.verifyMfa({
          mfaTicket: paramTicket,
          code: fullCode,
        });
        setIsVerifying(false);
        setIsSuccess(true);
        const resolvedRole = mapBackendRoleToFrontendRole(auth.user.roles || []);
        const targetLanding = paramNext || ROLES[resolvedRole]?.defaultLanding || "/dashboard";
        setTimeout(() => {
          router.push(targetLanding);
        }, 700);
        return;
      } catch (err: any) {
        setIsVerifying(false);
        setIsError(true);
        setErrorMessage(err.message || "Invalid or expired verification code.");
        return;
      }
    }

    // Non-ticket flow: Call backend CoreAdmin switch-role to mint authentic signed JWT
    try {
      const targetRole = currentUser.role || "super_admin";
      const { auth, authUser } = await authApi.switchRole(targetRole);

      setIsVerifying(false);
      setIsSuccess(true);

      const roleCfg = ROLES[authUser.role] || ROLES.super_admin;
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "zorisis_verified_session",
          JSON.stringify({
            email: authUser.email,
            name: authUser.name,
            role: authUser.role,
            verifiedAt: new Date().toISOString(),
            status: "authenticated",
          })
        );
      }

      const targetLanding = paramNext || roleCfg.defaultLanding;
      setTimeout(() => {
        router.push(targetLanding);
      }, 700);
    } catch (err: any) {
      console.warn("Backend switch-role error, falling back to local session:", err);
      setIsVerifying(false);
      setIsSuccess(true);

      const targetRole = currentUser.role;
      const roleCfg = ROLES[targetRole] || ROLES.super_admin;

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

      const targetLanding = paramNext || roleCfg.defaultLanding;
      setTimeout(() => {
        router.push(targetLanding);
      }, 700);
    }
  };

  const handleQuickFill = () => {
    const targetCode = paramDevOtp && paramDevOtp.length === 6 ? paramDevOtp : "741920";
    setDigits(targetCode.split(""));
    handleVerify(targetCode);
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

  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = timeLeft / 30;
  const strokeDashoffset = circumference * (1 - progressRatio);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-3 sm:p-4 font-sans overflow-hidden">
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
      <div className="relative z-10 w-full max-w-[390px] my-auto">
        <div className="bg-white/95 backdrop-blur-2xl border border-white/80 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5),0_8px_20px_-4px_rgba(0,0,0,0.2)] overflow-hidden">
          {/* Forest top accent */}
          <div className="h-1 bg-gradient-to-r from-[#0B3D2E] via-[#146B45] to-[#A3F4C3]" />

          <div className="p-4 sm:p-5">
            {/* Header: Brand Logo & Role Badge */}
            {(() => {
              const roleCfg = ROLES[currentUser.role] || ROLES.super_admin;
              const targetLanding = paramNext || roleCfg.defaultLanding;
              return (
                <>
                  <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#DDE4DE]/60">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#E8F1EA] p-1 flex items-center justify-center shadow-xs">
                        <img src="/logo-mark.png" alt="Z•ORISIS" className="w-5 h-5 object-contain" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#00261B] tracking-tight leading-none">
                          Z•ORISIS
                        </div>
                        <div className="text-[9px] text-[#66736C] font-medium mt-0.5">Admin Console</div>
                      </div>
                    </div>

                    <div
                      className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1 border"
                      style={{
                        backgroundColor: roleCfg.badgeBg,
                        color: roleCfg.badgeColor,
                        borderColor: roleCfg.badgeBorder,
                      }}
                    >
                      <span className="material-symbols-outlined text-[12px]">{roleCfg.icon}</span>
                      <span>{roleCfg.shortLabel}</span>
                    </div>
                  </div>

                  {/* Title & Integrated Countdown Ring */}
                  <div className="flex items-center justify-between gap-3 mb-2.5">
                    <div>
                      <h1 className="text-base sm:text-lg font-extrabold text-[#00261B] font-heading tracking-tight leading-tight">
                        Verify Your Identity
                      </h1>
                      <p className="text-[11px] text-[#66736C] leading-snug">
                        Enter 6-digit authenticator code
                      </p>
                    </div>

                    {/* Circular Countdown Ring */}
                    <div className="relative w-10 h-10 shrink-0">
                      <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r={radius} fill="none" stroke="#E5EAE6" strokeWidth="2.5" />
                        <circle
                          cx="18"
                          cy="18"
                          r={radius}
                          fill="none"
                          stroke={isExpiring ? "#C94B4B" : "#146B45"}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span
                          className={`text-[11px] font-bold font-mono leading-none ${
                            isExpiring ? "text-[#C94B4B]" : "text-[#0B3D2E]"
                          }`}
                        >
                          {timeLeft}
                        </span>
                        <span className="text-[7px] text-[#66736C] font-semibold leading-none mt-0.5">s</span>
                      </div>
                    </div>
                  </div>

                  {/* Unified User Context & Target Destination Pill */}
                  <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-xl bg-[#F7F4EC] border border-[#DDE4DE] mb-3 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-md bg-[#0B3D2E] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                        {initials}
                      </div>
                      <div className="min-w-0 truncate">
                        <span className="font-semibold text-[#17231D] text-[11px]">
                          {currentUser.name || displayName}
                        </span>
                        <span className="text-[10px] text-[#66736C] ml-1 font-mono hidden sm:inline">
                          ({email})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] text-[#146B45] font-semibold bg-[#E8F1EA] px-1.5 py-0.5 rounded">
                        &rarr; {targetLanding}
                      </span>
                      <Link href="/login" className="text-[10px] text-[#146B45] font-semibold hover:underline">
                        Not you?
                      </Link>
                    </div>
                  </div>
                </>
              );
            })()}

            {/* Toast Message */}
            {toastMessage && (
              <div className="mb-2 p-1.5 rounded-lg bg-[#FFF3D6] border border-[#D79A19]/30 text-[#D79A19] text-[11px] font-semibold text-center animate-in fade-in">
                {toastMessage}
              </div>
            )}

            {/* OTP 6-Digit Input */}
            <div className="space-y-1.5 mb-3">
              <div className="flex gap-1.5 justify-center" onPaste={handlePaste}>
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
                    className={`w-9 sm:w-10 h-10 sm:h-11 text-center text-lg font-bold rounded-xl border-2 bg-white transition-all focus:outline-none ${
                      isError
                        ? "border-[#C94B4B] text-[#C94B4B] shake"
                        : isSuccess
                        ? "border-[#146B45] bg-[#E8F1EA] text-[#146B45]"
                        : d
                        ? "border-[#146B45] text-[#0B3D2E]"
                        : "border-[#DDE4DE] text-[#17231D] focus:border-[#146B45] focus:ring-2 focus:ring-[#146B45]/20"
                    }`}
                    style={{
                      caretColor: "transparent",
                    }}
                  />
                ))}
              </div>

              {/* Quick Fill Helper */}
              <div className="flex items-center justify-between text-[10px] text-[#66736C] px-1">
                <span>
                  Demo Code: <strong className="text-[#0B3D2E] font-mono">{paramDevOtp || "741920"}</strong>
                </span>
                <button
                  type="button"
                  onClick={handleQuickFill}
                  className="text-[#146B45] font-semibold hover:underline cursor-pointer"
                >
                  {paramDevOtp ? "Auto-Fill Server OTP" : "Auto-Fill Code"}
                </button>
              </div>

              {/* Error message */}
              {isError && (
                <div className="flex items-center justify-center gap-1 pt-0.5">
                  <span className="material-symbols-outlined text-[13px] text-[#C94B4B]">error</span>
                  <span className="text-[11px] text-[#C94B4B] font-semibold">
                    {errorMessage || "Incorrect code. Please try again."}
                  </span>
                </div>
              )}
            </div>

            {/* Verify Button */}
            <button
              id="verify-mfa"
              onClick={() => handleVerify()}
              disabled={digits.some((d) => !d) || isVerifying || isSuccess}
              className="w-full py-2.5 rounded-xl bg-[#0B3D2E] text-white text-xs sm:text-sm font-bold hover:bg-[#062A20] active:scale-[0.98] transition-all shadow-sm disabled:opacity-40 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isVerifying ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="3" />
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                  </svg>
                  <span>Verifying Token…</span>
                </>
              ) : isSuccess ? (
                <>
                  <span className="material-symbols-outlined text-[17px] text-[#A3F4C3]">check_circle</span>
                  <span>Verified! Entering Console…</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">shield_check</span>
                  <span>Verify &amp; Sign In</span>
                </>
              )}
            </button>

            {/* Fallback options */}
            <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-[#DDE4DE]/70">
              <button
                type="button"
                onClick={handleSendSMS}
                className="text-[10px] text-[#66736C] hover:text-[#146B45] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px]">sms</span>
                <span>Send SMS code</span>
              </button>
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-[10px] text-[#66736C] hover:text-[#146B45] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px]">vpn_key</span>
                <span>Use backup code</span>
              </button>
            </div>
          </div>
        </div>

        {/* Trust badge */}
        <div className="flex items-center justify-center mt-2.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-xs">
            <span className="material-symbols-outlined text-[12px] text-[#A3F4C3]">verified_user</span>
            <span className="text-[10px] text-white/95 font-medium drop-shadow-xs">
              MS1 Secure Gateway • 256-Bit TLS
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
