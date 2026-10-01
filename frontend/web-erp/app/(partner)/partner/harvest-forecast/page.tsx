"use client";

import React, { useState } from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const FORECAST_KPIS: KpiMetric[] = [
  {
    title: "Forecasted Harvest",
    value: "28,500 MT",
    change: "Coop Network",
    changeType: "positive",
    subtext: "Soybean & Specialty Coffee yield forecast",
    icon: "agriculture",
  },
  {
    title: "Collection Hub Schedule",
    value: "14 Dispatches",
    change: "Next 7 Days",
    changeType: "neutral",
    subtext: "Truck convoys scheduled with Zorisis logistics",
    icon: "local_shipping",
  },
];

export default function PartnerHarvestForecastPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <DomainPageShell
      badge="Harvest Forecast & Logistics"
      badgeColor="#2E5B70"
      title="Member Harvest Forecast & Collection Logistics Planning"
      subtitle="Submit expected harvest delivery volumes, timing windows, and coordinate transport vehicle allocations with Zorisis logistics."
      kpis={FORECAST_KPIS}
      actions={[
        { label: "Request Scale Calibration", icon: "tune", variant: "outline" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-xl font-bold text-[#00261B]">Submit Harvest Volume Forecast</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-[#00261B] block">Commodity</label>
            <input
              type="text"
              readOnly
              value="Non-GMO Soybeans (TGX-1335)"
              className="w-full p-3 rounded-xl bg-[#FAF8F3] border border-[#EBE7DD] font-medium text-[#00261B]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-[#00261B] block">Estimated Volume (MT)</label>
            <input
              type="text"
              defaultValue="2,400 MT"
              className="w-full p-3 rounded-xl bg-white border border-[#DDE4DE] font-bold font-mono text-[#00261B]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-[#00261B] block">Target Delivery Window</label>
            <input
              type="text"
              defaultValue="10 Oct 2026 - 20 Oct 2026"
              className="w-full p-3 rounded-xl bg-white border border-[#DDE4DE] font-medium text-[#00261B]"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#EAEFEA]">
          <span className="text-xs text-[#718575]">
            Submitted forecasts are reviewed by Farming Operations and Logistics to schedule trucks.
          </span>

          <button
            onClick={() => setSubmitted(true)}
            className={`px-6 py-2.5 rounded-2xl text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center gap-2 ${
              submitted
                ? "bg-[#146B45] text-white"
                : "bg-[#0B3D2E] text-white hover:bg-[#146B45]"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {submitted ? "verified" : "send"}
            </span>
            <span>{submitted ? "Forecast Submitted to Zorisis Operations" : "Submit Harvest Delivery Forecast"}</span>
          </button>
        </div>
      </div>
    </DomainPageShell>
  );
}
