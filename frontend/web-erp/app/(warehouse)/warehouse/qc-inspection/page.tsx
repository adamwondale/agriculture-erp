"use client";

import React, { useState } from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const QC_KPIS: KpiMetric[] = [
  {
    title: "Tested Batches Today",
    value: "152 Batches",
    change: "100% Tested",
    changeType: "positive",
    subtext: "Moisture, purity, aflatoxin rapid test",
    icon: "biotech",
  },
  {
    title: "Grade 1 Ratio",
    value: "91.8%",
    change: "Export Standard",
    changeType: "positive",
    subtext: "Premium export quality threshold",
    icon: "grade",
  },
  {
    title: "Gate Rejections",
    value: "2 Batches",
    change: "High Moisture",
    changeType: "danger",
    subtext: "Returned to farmer with official rejection slip",
    icon: "do_not_disturb_on",
  },
];

export default function QcInspectionPage() {
  const [moisture, setMoisture] = useState("11.2");
  const [foreignMatter, setForeignMatter] = useState("0.8");
  const [aflatoxin, setAflatoxin] = useState("Negative (< 4 ppb)");

  return (
    <DomainPageShell
      badge="Quality Assurance & Grading Desk"
      badgeColor="#7F4F24"
      title="Intake QC Inspection & Digital Quality Grading"
      subtitle="Digital recording of moisture content, foreign matter impurities, broken grain, aflatoxin test strips, and automated Grade 1/2/3/Reject classification."
      kpis={QC_KPIS}
      actions={[
        { label: "Moisture Meter Calibration", icon: "tune", variant: "outline" },
        { label: "Issue Gate Rejection Slip", icon: "do_not_disturb_on", variant: "danger" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EAEFEA]">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#7F4F24] uppercase tracking-wider block">
              QC Inspection Station • Sample ID: SMP-2026-9482
            </span>
            <h2 className="text-xl font-bold text-[#00261B]">Quality Grading Parameter Entry</h2>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-[#D1E7DD] text-[#0F5132]">
            System Grade: Grade 1 Export (Pass)
          </span>
        </div>

        {/* Parameter Form Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-2">
            <label className="font-bold text-[#00261B] block">Moisture Meter Reading (%)</label>
            <input
              type="text"
              value={moisture}
              onChange={(e) => setMoisture(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white border border-[#DDE4DE] font-mono font-bold text-sm text-[#00261B]"
            />
            <span className="text-[10px] text-[#718575] block">Tolerance: &lt; 11.5% for Grade 1</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-2">
            <label className="font-bold text-[#00261B] block">Foreign Matter / Impurities (%)</label>
            <input
              type="text"
              value={foreignMatter}
              onChange={(e) => setForeignMatter(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white border border-[#DDE4DE] font-mono font-bold text-sm text-[#00261B]"
            />
            <span className="text-[10px] text-[#718575] block">Tolerance: &lt; 1.0% for Grade 1</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-2">
            <label className="font-bold text-[#00261B] block">Aflatoxin Rapid Strip Test</label>
            <input
              type="text"
              value={aflatoxin}
              onChange={(e) => setAflatoxin(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white border border-[#DDE4DE] font-mono font-bold text-sm text-[#0F5132]"
            />
            <span className="text-[10px] text-[#718575] block">Standard: &lt; 10 ppb (Export Safe)</span>
          </div>
        </div>

        {/* Quality Certificate Sign-Off */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#EAEFEA]">
          <div className="flex items-center gap-2 text-xs text-[#718575]">
            <span className="material-symbols-outlined text-[18px] text-[#146B45]">verified</span>
            <span>Tested by Lead QC Inspector: Yohannes T. • Certified at 02:14 AM</span>
          </div>

          <button className="px-6 py-2.5 rounded-2xl text-xs font-semibold text-white bg-[#0B3D2E] hover:bg-[#146B45] transition-all shadow-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Sign QC Inspection Certificate</span>
          </button>
        </div>
      </div>
    </DomainPageShell>
  );
}
