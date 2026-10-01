"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const CLEAR_KPIS: KpiMetric[] = [
  {
    title: "Active Clearances",
    value: "2 Profiles",
    change: "5 Departments",
    changeType: "neutral",
    subtext: "Systematic asset & finance sign-off checklist",
    icon: "checklist",
  },
  {
    title: "Preserve Historical Audits",
    value: "100% Retained",
    change: "Permanent",
    changeType: "positive",
    subtext: "Account deactivated; past digital signatures preserved",
    icon: "history_toggle_drop_down",
  },
];

export default function ClearancePage() {
  return (
    <DomainPageShell
      badge="Employee Offboarding"
      badgeColor="#804A00"
      title="5-Department Offboarding & Exit Clearance Checklist"
      subtitle="Systematic exit clearance covering Asset Return, Finance & Advance Settlement, Inventory Store Handover, IT Access Revocation, and Statutory Severance."
      kpis={CLEAR_KPIS}
      actions={[
        { label: "Initiate New Clearance", icon: "add", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Active Exit Clearance Checklists</h2>

        <div className="space-y-4">
          {[
            {
              emp: "Tamirat Mengistu (Former Extension Agent)",
              dept: "Field Agronomy • Jimma Node",
              date: "Effective 30 Sept 2026",
              steps: [
                { name: "1. Asset Return (Motorbike, Tablet, GPS Meter)", status: "Completed (Storekeeper Sign-off)", ok: true },
                { name: "2. Finance & Advance Settlement (Travel Per-diems)", status: "Completed (Zero Outstanding)", ok: true },
                { name: "3. Store Custody Handover", status: "Completed (Keys Handed Over)", ok: true },
                { name: "4. IT Access Revocation & Data Handover", status: "Completed (Account Deactivated)", ok: true },
                { name: "5. HR Statutory Severance & Unused Leave", status: "Pending Final HR Director Sign-off", ok: false },
              ],
            },
          ].map((c, i) => (
            <div key={i} className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#00261B]">{c.emp}</h3>
                  <span className="text-xs text-[#718575]">{c.dept} • {c.date}</span>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#FFEAC2] text-[#804A00]">
                  Step 4 of 5 Complete
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2">
                {c.steps.map((s, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                      s.ok ? "bg-[#D1E7DD]/40 border-[#A3CFBB] text-[#0F5132]" : "bg-[#FFEAC2]/40 border-[#FFC266] text-[#804A00]"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {s.ok ? "check_circle" : "pending"}
                    </span>
                    <span className="font-semibold">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DomainPageShell>
  );
}
