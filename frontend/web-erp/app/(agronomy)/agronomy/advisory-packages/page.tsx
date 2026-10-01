"use client";

import React, { useState } from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const ADVISORY_KPIS: KpiMetric[] = [
  {
    title: "Pending Chemical Approvals",
    value: "2 Requisitions",
    change: "Restricted Spray",
    changeType: "warning",
    subtext: "High-risk agrochemical application sign-off",
    icon: "pest_control",
  },
  {
    title: "Dispatched Advisories",
    value: "128,400 SMS",
    change: "100% Delivered",
    changeType: "positive",
    subtext: "Amharic, Afaan Oromoo, Tigrinya routines",
    icon: "sms",
  },
  {
    title: "Safety Standard",
    value: "WHO Class II/III",
    change: "Eco-Compliant",
    changeType: "positive",
    subtext: "Strict prohibition of banned organophosphates",
    icon: "eco",
  },
];

export default function AdvisoryPackagesPage() {
  const [approvedCount, setApprovedCount] = useState(0);

  return (
    <DomainPageShell
      badge="Advisory & Chemical Governance"
      badgeColor="#1B4332"
      title="Standard Agronomic Packages & Emergency Chemical Authorization"
      subtitle="Management of automated growth-stage advisory routines and mandatory Research & Agronomy Manager sign-off for high-risk chemical sprays."
      kpis={ADVISORY_KPIS}
      actions={[
        { label: "Create Advisory Package", icon: "add", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Emergency Chemical Spray Approval Queue</h2>

        <div className="space-y-3">
          {[
            {
              id: "CHEM-2026-041",
              target: "Limmu Kosa • Babu Kebele (420 Hectares)",
              pest: "Fall Armyworm Outbreak (Canopy damage > 20%)",
              product: "Coragen 20 SC (Chlorantraniliprole)",
              dosage: "150 ml / ha (Water volume: 200 L/ha)",
              safety: "Pre-Harvest Interval (PHI): 14 Days • Re-entry: 24h",
              requester: "Dagnachew Kebede (Lead Zone Agronomist)",
            },
            {
              id: "CHEM-2026-042",
              target: "Arsi Robe • Robe Kebele (180 Hectares)",
              pest: "Soybean Rust (Phakopsora pachyrhizi)",
              product: "Amistar Top (Azoxystrobin + Difenoconazole)",
              dosage: "500 ml / ha (Foliar spray)",
              safety: "PHI: 21 Days • Protective gear mandatory",
              requester: "Fatuma Hassen (Zone Agronomist)",
            },
          ].map((req, idx) => (
            <div
              key={req.id}
              className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-[#C94B4B]">{req.id}</span>
                  <span className="text-xs font-bold text-[#00261B] bg-white px-2 py-0.5 rounded-md border border-[#DDE4DE]">
                    {req.pest}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#00261B]">{req.target}</h3>
                <p className="text-xs text-[#0B3D2E] font-medium">
                  Prescribed: {req.product} • Dosage: {req.dosage}
                </p>
                <p className="text-[11px] text-[#718575]">{req.safety} • Submitted by {req.requester}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#C94B4B] bg-[#FCE4E4] hover:bg-[#F8D7DA]">
                  Reject
                </button>
                <button
                  onClick={() => setApprovedCount((p) => p + 1)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#0B3D2E] hover:bg-[#146B45] transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>Sign-off Chemical Application</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DomainPageShell>
  );
}
