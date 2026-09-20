"use client";

import React, { useState } from "react";
import Link from "next/link";

const DELEGATION_HISTORY = [
  {
    id: "del-1",
    role: "Payment Approver",
    from: "Dawit Alemu (CEO)",
    validFrom: "Sep 19, 2026",
    validTo: "Oct 3, 2026",
    scope: "Oromia Regional Hub",
    status: "active",
    daysLeft: 14,
    totalDays: 14,
  },
  {
    id: "del-2",
    role: "Field Inspection Lead",
    from: "Abebe Tesfaye (Admin)",
    validFrom: "Sep 10, 2026",
    validTo: "Sep 19, 2026",
    scope: "Ada'a Cluster",
    status: "expired",
    daysLeft: 0,
    totalDays: 9,
  },
];

const PERMISSIONS = [
  { perm: "payment.approve", scope: "Oromia Hub · ≤ $50,000" },
  { perm: "workflow.advance", scope: "Approval Stage 1–2 only" },
  { perm: "expense.create", scope: "Operational budgets" },
];

export default function MobileDelegationPage() {
  const [showRequest, setShowRequest] = useState(false);
  const [requestRole, setRequestRole] = useState("");
  const [requestReason, setRequestReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
            <h1 className="font-bold text-sm text-[#00261B] truncate">My Delegations</h1>
            <p className="text-[11px] sm:text-xs text-[#66736C] truncate">Active role grants & authority transfers</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/delegation"
              className="hidden sm:flex px-3 py-2 rounded-xl border border-[#DDE4DE] bg-white text-xs font-semibold text-[#0B3D2E] hover:bg-[#F7F4EC] items-center gap-1.5 active:scale-95 transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-[15px]">desktop_windows</span>
              <span>Admin Console</span>
            </Link>
            <button
              onClick={() => setShowRequest(!showRequest)}
              className="px-3 sm:px-4 py-2 rounded-xl bg-[#0B3D2E] text-white text-xs font-bold flex items-center gap-1.5 active:scale-[0.95] transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-[15px]">add</span>
              Request
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-5 sm:py-8 space-y-6 sm:space-y-8 pb-20">
        {/* Active delegation hero card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#062A20] via-[#0B3D2E] to-[#146B45] p-5 sm:p-6 text-white shadow-floating">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(ellipse at 80% 0%, white 0%, transparent 60%)" }} />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="material-symbols-outlined text-[18px] text-[#A3F4C3]">verified_user</span>
              <span className="text-[10px] sm:text-[11px] text-white/70 font-bold uppercase tracking-wider">Active Delegation</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold mb-1" style={{ letterSpacing: "-0.02em" }}>Payment Approver</div>
            <div className="text-xs sm:text-sm text-white/70 mb-4 sm:mb-5">Delegated by Dawit Alemu · CEO · Oromia Regional Hub</div>

            <div className="flex items-center justify-between text-xs sm:text-sm mb-2.5 sm:mb-3">
              <span className="text-white/60">Started Sep 19, 2026</span>
              <span className="font-bold text-[#A3F4C3]">14 days remaining</span>
            </div>
            <div className="h-2 rounded-full bg-white/20">
              <div className="h-full rounded-full bg-[#A3F4C3]" style={{ width: "50%" }} />
            </div>
            <div className="flex justify-between text-[10px] sm:text-[11px] text-white/50 mt-1.5">
              <span>Sep 19</span>
              <span>Oct 3, 2026</span>
            </div>
          </div>
        </div>

        {/* Request form */}
        {showRequest && !submitted && (
          <div className="p-4 sm:p-6 rounded-2xl border-2 border-[#DDE4DE] bg-white space-y-4">
            <h3 className="font-bold text-sm text-[#00261B]">Request Delegation</h3>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#66736C]">Role Requested</label>
              <div className="relative">
                <select
                  value={requestRole}
                  onChange={(e) => setRequestRole(e.target.value)}
                  className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 bg-[#F7F4EC] border border-[#DDE4DE] rounded-2xl text-sm text-[#17231D] focus:outline-none focus:ring-2 focus:ring-[#146B45]/30 focus:border-[#146B45] transition-all appearance-none pr-10"
                >
                  <option value="">Select role…</option>
                  <option>Payment Approver</option>
                  <option>Field Inspection Lead</option>
                  <option>Procurement Officer</option>
                  <option>Data Analyst</option>
                </select>
                <span className="material-symbols-outlined text-[18px] text-[#B0BDB5] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">expand_more</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#66736C]">Justification</label>
              <textarea
                value={requestReason}
                onChange={(e) => setRequestReason(e.target.value)}
                placeholder="Why do you need this delegation?"
                rows={3}
                className="w-full px-3.5 sm:px-4 py-3 bg-[#F7F4EC] border border-[#DDE4DE] rounded-2xl text-sm text-[#17231D] placeholder-[#B0BDB5] focus:outline-none focus:ring-2 focus:ring-[#146B45]/30 focus:border-[#146B45] transition-all resize-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRequest(false)}
                className="flex-1 py-3 rounded-2xl border border-[#DDE4DE] text-sm font-bold text-[#66736C] hover:bg-[#F7F4EC] active:scale-[0.97] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => setSubmitted(true)}
                className="flex-1 py-3 rounded-2xl bg-[#0B3D2E] text-white text-sm font-bold hover:bg-[#062A20] active:scale-[0.97] transition-all"
              >
                Submit Request
              </button>
            </div>
          </div>
        )}

        {submitted && (
          <div className="p-4 sm:p-5 rounded-2xl border border-[#A3F4C3] bg-[#A3F4C3]/15 flex items-center gap-3 sm:gap-4">
            <span className="material-symbols-outlined text-[24px] sm:text-[28px] text-[#146B45] shrink-0">check_circle</span>
            <div>
              <div className="text-sm font-bold text-[#0B3D2E]">Request Submitted</div>
              <div className="text-xs text-[#66736C] mt-0.5">Pending approval from your line manager.</div>
            </div>
          </div>
        )}

        {/* Permissions via active delegation */}
        <section>
          <div className="text-[11px] font-bold text-[#66736C] uppercase tracking-wider mb-3 sm:mb-4">
            Permissions via Active Delegation
          </div>
          <div className="rounded-2xl bg-white border border-[#DDE4DE] overflow-hidden divide-y divide-[#DDE4DE]/60">
            {PERMISSIONS.map((p) => (
              <div key={p.perm} className="flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 gap-2">
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-xs sm:text-sm font-bold text-[#0B3D2E] truncate">{p.perm}</div>
                  <div className="text-[11px] sm:text-xs text-[#66736C] mt-0.5">{p.scope}</div>
                </div>
                <span className="material-symbols-outlined text-[18px] sm:text-[20px] text-[#146B45] shrink-0">verified</span>
              </div>
            ))}
          </div>
        </section>

        {/* Delegation history */}
        <section>
          <div className="text-[11px] font-bold text-[#66736C] uppercase tracking-wider mb-3 sm:mb-4">Delegation History</div>
          <div className="space-y-3">
            {DELEGATION_HISTORY.map((d) => (
              <div key={d.id} className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDE4DE] shadow-subtle">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="font-bold text-sm text-[#17231D]">{d.role}</div>
                  <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold shrink-0 ${
                    d.status === "active" ? "bg-[#E8F1EA] text-[#146B45]" : "bg-[#F0F0F0] text-[#66736C]"
                  }`}>
                    {d.status === "active" ? "Active" : "Expired"}
                  </span>
                </div>
                <div className="text-xs text-[#66736C] space-y-1.5">
                  <div>Delegated by: <span className="font-semibold text-[#17231D]">{d.from}</span></div>
                  <div>Scope: <span className="font-semibold text-[#17231D]">{d.scope}</span></div>
                  <div className="font-mono">{d.validFrom} → {d.validTo}</div>
                </div>
                {d.status === "active" && (
                  <div className="mt-3 h-1.5 rounded-full bg-[#DDE4DE]">
                    <div className="h-full rounded-full bg-[#146B45]" style={{ width: "50%" }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
