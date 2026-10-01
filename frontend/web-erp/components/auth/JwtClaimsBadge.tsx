"use client";

import React, { useState } from "react";
import { useCurrentUser } from "@/lib/rbac";
import JwtClaimsInspector from "./JwtClaimsInspector";

interface JwtClaimsBadgeProps {
  className?: string;
}

export default function JwtClaimsBadge({ className = "" }: JwtClaimsBadgeProps) {
  const { claims, token, roleConfig } = useCurrentUser();
  const [inspectorOpen, setInspectorOpen] = useState(false);

  const claimsCount = Object.keys(claims?.raw || {}).length;
  const isReady = !!token;

  return (
    <>
      <button
        type="button"
        onClick={() => setInspectorOpen(true)}
        title="Inspect active JWT claims and permissions from core-admin-service"
        className={`px-2.5 py-1.5 rounded-xl border border-[#DDE4DE] bg-white hover:bg-[#E8F1EA] text-[#0B3D2E] text-xs font-semibold flex items-center gap-2 transition-all active:scale-95 shadow-xs ${className}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#146B45] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#146B45]"></span>
        </span>

        <span className="material-symbols-outlined text-[15px] text-[#146B45]">token</span>
        <span className="hidden sm:inline font-mono text-[11px] font-bold">
          {claims?.roles?.[0] || roleConfig.shortLabel}
        </span>
        <span className="text-[10px] text-[#66736C] font-mono hidden md:inline">
          ({claimsCount || 8} claims)
        </span>
      </button>

      <JwtClaimsInspector isOpen={inspectorOpen} onClose={() => setInspectorOpen(false)} />
    </>
  );
}
