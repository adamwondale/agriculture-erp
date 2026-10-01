"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const CROP_PLAN_KPIS: KpiMetric[] = [
  {
    title: "Consolidated Plans",
    value: "4 Woredas",
    change: "Aggregated",
    changeType: "positive",
    subtext: "Aggregated from 112 field agronomist parcel plans",
    icon: "layers",
  },
  {
    title: "Planned Area",
    value: "50,000 ha",
    change: "Meher 2026",
    changeType: "neutral",
    subtext: "Soybean: 30k ha | Sesame: 15k ha | Maize: 5k ha",
    icon: "square_foot",
  },
  {
    title: "Auto-Calculated BOM",
    value: "100% Derived",
    change: "System Generated",
    changeType: "positive",
    subtext: "Exact seed & fertilizer quantities auto-derived",
    icon: "calculate",
  },
  {
    title: "Baseline Lock",
    value: "Locked",
    change: "Post-Budget",
    changeType: "positive",
    subtext: "Executive approved budget locks seasonal quotas",
    icon: "lock",
  },
];

export default function CropPlansPage() {
  return (
    <DomainPageShell
      badge="Crop Planning & Bill of Materials"
      badgeColor="#2C5E1A"
      title="Seasonal Production Quotas & Automated Input BOM"
      subtitle="Bottom-up consolidation of field agronomist parcel plans into Woreda quotas, with auto-calculated seed and fertilizer requirements."
      kpis={CROP_PLAN_KPIS}
      actions={[
        { label: "Adjust Agronomy Buffer", icon: "tune", variant: "outline" },
        { label: "Consolidate Woreda Plans", icon: "merge", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Woreda Consolidated Crop Plans & Input BOM</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEFEA] text-[10px] font-mono uppercase text-[#718575]">
                <th className="pb-3 font-bold">Woreda / Hub</th>
                <th className="pb-3 font-bold">Target Crop</th>
                <th className="pb-3 font-bold">Planned Area</th>
                <th className="pb-3 font-bold">Benchmark Yield</th>
                <th className="pb-3 font-bold">Target Output</th>
                <th className="pb-3 font-bold">Certified Seed BOM</th>
                <th className="pb-3 font-bold">NPSB Fertilizer BOM</th>
                <th className="pb-3 font-bold">Quota Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFEA]">
              {[
                { woreda: "Limmu Kosa Hub", crop: "Soybean (TGX-1335)", area: "16,000 ha", bench: "20.0 Qt/ha", target: "32,000 MT", seed: "960 MT", npsb: "1,600 MT", status: "Locked & Approved" },
                { woreda: "Arsi Robe Cluster", crop: "Sesame (Humera-1)", area: "12,000 ha", bench: "8.5 Qt/ha", target: "10,200 MT", seed: "60 MT", npsb: "1,200 MT", status: "Locked & Approved" },
                { woreda: "Gera Highland Hub", crop: "Soybean (Clark-63K)", area: "14,000 ha", bench: "18.5 Qt/ha", target: "25,900 MT", seed: "840 MT", npsb: "1,400 MT", status: "Locked & Approved" },
                { woreda: "West Gojjam Cluster", crop: "Hybrid Maize (BH-661)", area: "8,000 ha", bench: "55.0 Qt/ha", target: "44,000 MT", seed: "200 MT", npsb: "1,600 MT", status: "Review Complete" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3.5 font-bold text-[#00261B]">{row.woreda}</td>
                  <td className="py-3.5 font-medium text-[#146B45]">{row.crop}</td>
                  <td className="py-3.5 font-mono font-bold text-[#00261B]">{row.area}</td>
                  <td className="py-3.5 font-mono text-[#4A5D4E]">{row.bench}</td>
                  <td className="py-3.5 font-mono font-bold text-[#00261B]">{row.target}</td>
                  <td className="py-3.5 font-mono text-[#00261B]">{row.seed}</td>
                  <td className="py-3.5 font-mono text-[#00261B]">{row.npsb}</td>
                  <td className="py-3.5">
                    <span className="text-[11px] font-mono font-bold text-[#0F5132] bg-[#D1E7DD] px-2 py-0.5 rounded-md">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DomainPageShell>
  );
}
