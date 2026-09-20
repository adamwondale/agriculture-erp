"use client";

import React, { useState } from "react";
import Link from "next/link";

const MY_LOGS = [
  { id: "AL-8820", action: "User Provisioned", target: "Selamawit Bekele", time: "10:06 AM", outcome: "success" as const, icon: "person_add" },
  { id: "AL-8819", action: "Permission Override Granted", target: "farm.inspection.write", time: "10:28 AM", outcome: "success" as const, icon: "security" },
  { id: "AL-8817", action: "Role Assignment Modified", target: "Payment Approver", time: "9:14 AM", outcome: "success" as const, icon: "policy" },
  { id: "AL-8812", action: "Field Inspection Logged", target: "ADA-14B · Wheat", time: "8:30 AM", outcome: "success" as const, icon: "assignment_turned_in" },
  { id: "AL-8810", action: "Login — TOTP Verified", target: "Admin Console", time: "8:01 AM", outcome: "success" as const, icon: "lock_person" },
  { id: "AL-8807", action: "Payment Request Submitted", target: "PAY-040 · $320", time: "Yesterday", outcome: "success" as const, icon: "payments" },
  { id: "AL-8800", action: "Login Attempt Failed", target: "Invalid TOTP (3rd attempt)", time: "Sep 18, 11:22 PM", outcome: "failure" as const, icon: "gpp_bad" },
];

const EXTRA_DETAILS: Record<string, Record<string, string>> = {
  "AL-8820": { "Actor": "Kinde Gudeta", "IP": "196.188.4.14", "Session": "sess_7xK2mN", "Hash": "SHA-256: c2f1a9…d47b" },
  "AL-8819": { "Actor": "Kinde Gudeta", "Permission": "farm.inspection.write", "Expires": "Dec 31, 2026", "Hash": "SHA-256: f8e2b1…091c" },
  "AL-8817": { "Actor": "Kinde Gudeta", "From Role": "Field Agronomist", "To Role": "Payment Approver", "Hash": "SHA-256: 7d3ca0…5fe1" },
  "AL-8812": { "Actor": "Kinde Gudeta", "GPS": "8.9806° N, 38.7578° E", "Plot": "ADA-14B", "Hash": "SHA-256: 2b9e14…8ac3" },
  "AL-8810": { "Actor": "Kinde Gudeta", "MFA": "TOTP verified", "Device": "iPhone 16 Pro", "Hash": "SHA-256: a3f9e1…b47f" },
  "AL-8807": { "Actor": "Kinde Gudeta", "Amount": "$320", "Category": "Equipment", "Hash": "SHA-256: 9f1c3d…6e82" },
  "AL-8800": { "Actor": "Unknown", "Attempts": "3 of 3", "Account Locked": "15 minutes", "Hash": "SHA-256: e4d72b…3a19" },
};

export default function MobileAuditPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#F7F4EC] font-[Inter,system-ui,sans-serif]">
      {/* Header */}
      <div className="bg-white border-b border-[#DDE4DE] sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex items-center gap-3 sm:gap-4">
          <Link
            href="/mobile"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F7F4EC] border border-[#DDE4DE] flex items-center justify-center active:scale-[0.93] transition-all shrink-0"
          >
            <span className="material-symbols-outlined text-[20px] text-[#66736C]">arrow_back</span>
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-sm text-[#00261B] truncate">My Audit Log</h1>
            <p className="text-xs text-[#66736C] truncate">Personal cryptographically signed activity trail</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/audit-logs"
              className="hidden sm:flex px-2.5 py-1 text-[11px] font-semibold text-[#66736C] hover:text-[#00261B] rounded-lg border border-[#DDE4DE] bg-[#F7F4EC] shadow-xs items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[15px]">receipt_long</span>
              <span>Enterprise Log</span>
            </Link>
            <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#E8F1EA]">
              <span className="material-symbols-outlined text-[14px] sm:text-[15px] text-[#146B45]">verified_user</span>
              <span className="text-[10px] sm:text-[11px] text-[#146B45] font-bold">Verified</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-5 sm:py-8 space-y-5 sm:space-y-6 pb-16">
        {/* Chain integrity card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0B3D2E] text-white flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 shadow-floating">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px] sm:text-[24px] text-[#A3F4C3]">link</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-bold text-sm">Chain Integrity: 100%</div>
            <div className="font-mono text-[10px] sm:text-[11px] text-white/60 mt-0.5 truncate">Last verified: SHA-256 · a3f9e1c2…b8d47f0e</div>
            <div className="text-[10px] sm:text-[11px] text-white/50 mt-0.5">7 events · All signed & immutable</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {[
            { label: "Total Events", value: "7", icon: "receipt_long", color: "text-[#0B3D2E]", bg: "bg-[#E8F1EA]" },
            { label: "Successes", value: "6", icon: "task_alt", color: "text-[#146B45]", bg: "bg-[#E8F1EA]" },
            { label: "Failures", value: "1", icon: "gpp_bad", color: "text-[#C94B4B]", bg: "bg-[#FDE8E8]" },
          ].map((s) => (
            <div key={s.label} className="p-2.5 sm:p-4 rounded-2xl bg-white border border-[#DDE4DE] text-center">
              <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl ${s.bg} flex items-center justify-center mx-auto mb-1.5 sm:mb-2`}>
                <span className={`material-symbols-outlined text-[16px] sm:text-[18px] ${s.color}`}>{s.icon}</span>
              </div>
              <div className="font-bold text-sm sm:text-base text-[#00261B]">{s.value}</div>
              <div className="text-[9px] sm:text-[10px] text-[#66736C] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Log entries */}
        <section>
          <div className="text-[11px] font-bold text-[#66736C] uppercase tracking-wider mb-4">Event Log</div>
          <div className="space-y-3">
            {MY_LOGS.map((log) => {
              const isExpanded = expanded === log.id;
              const details = EXTRA_DETAILS[log.id];
              return (
                <div key={log.id} className="rounded-2xl bg-white border border-[#DDE4DE] overflow-hidden shadow-subtle">
                  <button
                    onClick={() => setExpanded(isExpanded ? null : log.id)}
                    className="w-full flex items-center gap-4 p-4 text-left hover:bg-[#F7F4EC] active:bg-[#F7F4EC] transition-colors"
                  >
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${log.outcome === "failure" ? "bg-[#FDE8E8]" : "bg-[#E8F1EA]"}`}>
                      <span className={`material-symbols-outlined text-[22px] ${log.outcome === "failure" ? "text-[#C94B4B]" : "text-[#146B45]"}`}>
                        {log.icon}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-[#17231D] truncate">{log.action}</div>
                      <div className="text-xs text-[#66736C] truncate mt-0.5">{log.target}</div>
                    </div>
                    <div className="text-right shrink-0 flex flex-col items-end gap-1">
                      <div className="text-xs text-[#66736C] font-mono">{log.time}</div>
                      <span className={`text-[10px] font-bold capitalize px-2 py-0.5 rounded-full ${log.outcome === "failure" ? "bg-[#FDE8E8] text-[#C94B4B]" : "bg-[#E8F1EA] text-[#146B45]"}`}>
                        {log.outcome}
                      </span>
                    </div>
                    <span className={`material-symbols-outlined text-[18px] text-[#B0BDB5] transition-transform shrink-0 ${isExpanded ? "rotate-180" : ""}`}>
                      expand_more
                    </span>
                  </button>

                  {isExpanded && details && (
                    <div className="px-4 pb-4 border-t border-[#DDE4DE] pt-4 space-y-2.5 bg-[#F7F4EC]/50">
                      <div className="text-[10px] font-bold text-[#66736C] uppercase tracking-wider mb-1">Event Payload</div>
                      {Object.entries(details).map(([k, v]) => (
                        <div key={k} className="flex justify-between text-xs">
                          <span className="text-[#66736C]">{k}</span>
                          <span className="font-mono font-semibold text-[#17231D]">{v}</span>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-[#DDE4DE] flex items-center gap-2 text-[11px] text-[#66736C]">
                        <span className="material-symbols-outlined text-[14px] text-[#146B45]">verified_user</span>
                        <span>Event ID: <span className="font-mono font-bold text-[#17231D]">{log.id}</span></span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
