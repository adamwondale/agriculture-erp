"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const SOIL_KPIS: KpiMetric[] = [
  {
    title: "Analyzed Samples",
    value: "1,420 Labs",
    change: "Certified Labs",
    changeType: "positive",
    subtext: "Hawassa & Jimma National Soil Labs",
    icon: "science",
  },
  {
    title: "Average pH Level",
    value: "6.4 pH",
    change: "Neutral Range",
    changeType: "positive",
    subtext: "Optimal rhizobial nitrogen nodulation",
    icon: "water_ph",
  },
  {
    title: "PDF Certificates",
    value: "100% Attached",
    change: "Traceable",
    changeType: "positive",
    subtext: "Digital laboratory test certificates verified",
    icon: "picture_as_pdf",
  },
];

export default function SoilTestsPage() {
  return (
    <DomainPageShell
      badge="Laboratory Soil Analysis"
      badgeColor="#1B4332"
      title="Soil Nutrient Testing & Chemical Formulation Repository"
      subtitle="Historical laboratory soil test records linked to farm parcels, macronutrient N-P-K readings, micronutrients, and attached PDF certificates."
      kpis={SOIL_KPIS}
      actions={[
        { label: "Download Soil Lab Ledger", icon: "download", variant: "outline" },
        { label: "Upload Lab Certificate", icon: "upload_file", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Parcel Laboratory Soil Test Records</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEFEA] text-[10px] font-mono uppercase text-[#718575]">
                <th className="pb-3 font-bold">Sample Code</th>
                <th className="pb-3 font-bold">Parcel Code</th>
                <th className="pb-3 font-bold">Farmer Name</th>
                <th className="pb-3 font-bold">pH Level</th>
                <th className="pb-3 font-bold">Avail. P (ppm)</th>
                <th className="pb-3 font-bold">Total N (%)</th>
                <th className="pb-3 font-bold">Potassium (K)</th>
                <th className="pb-3 font-bold">Recommended Formulation</th>
                <th className="pb-3 font-bold">Lab Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFEA]">
              {[
                { code: "SOIL-2026-0814", parcel: "PRC-ETH-0941", farmer: "Bekele Tadesse", ph: "6.4", p: "12.4 ppm", n: "0.14%", k: "1.2 meq", form: "NPSB (100 kg/ha) + Bradyrhizobium", cert: "Hawassa-LAB-891.pdf" },
                { code: "SOIL-2026-0815", parcel: "PRC-ETH-0942", farmer: "Almaz Haile", ph: "6.8", p: "16.8 ppm", n: "0.18%", k: "1.5 meq", form: "NPSB (80 kg/ha)", cert: "Jimma-LAB-442.pdf" },
                { code: "SOIL-2026-0816", parcel: "PRC-ETH-0943", farmer: "Worku Desta", ph: "7.1", p: "9.2 ppm", n: "0.11%", k: "0.9 meq", form: "NPSB (120 kg/ha) + Urea Side-dress", cert: "Hawassa-LAB-895.pdf" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#146B45]">{row.code}</td>
                  <td className="py-3.5 font-mono text-[#00261B]">{row.parcel}</td>
                  <td className="py-3.5 font-bold text-[#00261B]">{row.farmer}</td>
                  <td className="py-3.5 font-mono font-bold text-[#00261B]">{row.ph}</td>
                  <td className="py-3.5 font-mono text-[#4A5D4E]">{row.p}</td>
                  <td className="py-3.5 font-mono text-[#4A5D4E]">{row.n}</td>
                  <td className="py-3.5 font-mono text-[#4A5D4E]">{row.k}</td>
                  <td className="py-3.5 font-medium text-[#0B3D2E]">{row.form}</td>
                  <td className="py-3.5">
                    <button className="text-xs font-bold text-[#146B45] hover:text-[#0B3D2E] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                      <span>PDF</span>
                    </button>
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
