"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const CAPA_KPIS: KpiMetric[] = [
  {
    title: "Open Remediation Plans",
    value: "1 CAPA",
    change: "Action Required",
    changeType: "warning",
    subtext: "Assigned owner with binding completion deadline",
    icon: "assignment_late",
  },
  {
    title: "Closed / Resolved",
    value: "14 CAPAs",
    change: "100% Verified",
    changeType: "positive",
    subtext: "Auditor inspected corrective evidence",
    icon: "task_alt",
  },
];

export default function CapaRemediationPage() {
  return (
    <DomainPageShell
      badge="CAPA Non-Conformance & Remediation"
      badgeColor="#432874"
      title="Corrective & Preventive Action (CAPA) Tracker"
      subtitle="Logging audit non-conformances, assigning responsible department owners, setting statutory deadlines, and uploading resolution evidence."
      kpis={CAPA_KPIS}
      actions={[
        { label: "Log New Non-Conformance", icon: "add", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Active Corrective Action Plans</h2>

        <div className="space-y-4">
          {[
            {
              id: "CAPA-2026-08",
              standard: "GlobalG.A.P. Standard • Section 4.2",
              desc: "Adama Silo agrochemical store ventilation and eye-wash station missing formal monthly inspection log.",
              severity: "Minor Non-Conformance",
              owner: "Kassahun Bekele (Warehouse Manager)",
              deadline: "Due by 15 Oct 2026 (15 Days Left)",
              status: "In Remediation • Eyewash Repaired",
            },
          ].map((item, i) => (
            <div key={i} className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-[#432874]">{item.id} • {item.standard}</span>
                <span className="font-mono font-bold text-[#804A00] bg-[#FFEAC2] px-2 py-0.5 rounded-md">
                  {item.severity}
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#00261B]">{item.desc}</h3>
              <p className="text-[#718575]">
                Assigned Owner: {item.owner} • {item.deadline}
              </p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] font-mono font-semibold text-[#0F5132]">{item.status}</span>
                <button className="text-xs font-bold text-[#0B3D2E] hover:text-[#146B45]">
                  Upload Remediation Proof &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DomainPageShell>
  );
}
