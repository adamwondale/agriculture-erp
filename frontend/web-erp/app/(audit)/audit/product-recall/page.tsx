"use client";

import React, { useState } from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const RECALL_KPIS: KpiMetric[] = [
  {
    title: "Recall Speed",
    value: "< 15 Minutes",
    change: "Mock Tested",
    changeType: "positive",
    subtext: "Trace from retail pack to farm GPS parcel",
    icon: "timer",
  },
  {
    title: "System Freeze Capability",
    value: "One-Click Lock",
    change: "Instant Hold",
    changeType: "positive",
    subtext: "Freezes warehouse bins & in-transit waybills",
    icon: "lock",
  },
];

export default function ProductRecallPage() {
  const [quarantined, setQuarantined] = useState(false);

  return (
    <DomainPageShell
      badge="Food Safety & Crisis Traceability"
      badgeColor="#C94B4B"
      title="Rapid Product Recall & Upstream/Downstream Traceability"
      subtitle="Immediate response protocol triggered by QC Lead or Auditor upon contamination: instant batch freeze, upstream parcel trace, and buyer notifications."
      kpis={RECALL_KPIS}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EAEFEA]">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#C94B4B] uppercase tracking-wider block">
              Emergency Trace Simulation / Crisis Desk
            </span>
            <h2 className="text-xl font-bold text-[#00261B]">Rapid Incident Isolation Engine</h2>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-[#FAF8F3] border border-[#DDE4DE] text-[#00261B]">
            Simulation Status: Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-2">
            <h4 className="font-bold text-[#00261B] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#146B45]">arrow_upward</span>
              <span>Upstream Trace (Farm Source)</span>
            </h4>
            <p className="text-[#718575] leading-relaxed">
              Traces suspect grain lot back to exact contributor farmer IDs, harvest weighbridge dates, chemical spray records, and GPS coordinates.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-2">
            <h4 className="font-bold text-[#00261B] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#0B3D2E]">arrow_downward</span>
              <span>Downstream Trace (Market Distribution)</span>
            </h4>
            <p className="text-[#718575] leading-relaxed">
              Identifies all processed sub-batches, warehouse silo locations, active truck waybills, and export buyer purchase orders.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#EAEFEA]">
          <span className="text-xs text-[#718575]">
            Requires QC Lead authorization and CEO notification.
          </span>

          <button
            onClick={() => setQuarantined(true)}
            className={`px-6 py-2.5 rounded-2xl text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center gap-2 ${
              quarantined
                ? "bg-[#146B45] text-white"
                : "bg-[#C94B4B] text-white hover:bg-[#A83232]"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {quarantined ? "verified" : "emergency"}
            </span>
            <span>{quarantined ? "Simulation Passed: 100% Lots Isolated in 8 mins" : "Run Emergency Mock Recall Simulation"}</span>
          </button>
        </div>
      </div>
    </DomainPageShell>
  );
}
