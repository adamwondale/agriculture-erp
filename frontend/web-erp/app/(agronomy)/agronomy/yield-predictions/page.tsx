"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const YIELD_KPIS: KpiMetric[] = [
  {
    title: "Current Seasonal Forecast",
    value: "84,000 MT",
    change: "+4.2% vs Baseline",
    changeType: "positive",
    subtext: "Aggregated Stage 2 algorithmic forecast",
    icon: "insights",
  },
  {
    title: "Forecast Accuracy (Phase 1)",
    value: "±14.8%",
    change: "Within ±20% SLA",
    changeType: "positive",
    subtext: "Validated against pre-harvest crop cuts",
    icon: "model_training",
  },
  {
    title: "Multi-Stage Models",
    value: "3 Stages",
    change: "Active Pipeline",
    changeType: "positive",
    subtext: "Planned -> Satellite NDVI -> Pre-Harvest Cut",
    icon: "timeline",
  },
];

export default function YieldPredictionsPage() {
  return (
    <DomainPageShell
      badge="Predictive AI & Yield Analytics"
      badgeColor="#1B4332"
      title="Multi-Stage Algorithmic Yield Forecasting"
      subtitle="3-Stage yield prediction models: Stage 1 (Planned Benchmark) -> Stage 2 (Mid-Season Satellite NDVI) -> Stage 3 (Pre-Harvest Field Crop Cuts)."
      kpis={YIELD_KPIS}
      actions={[
        { label: "Publish Harvest Forecast to Sales", icon: "publish", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">3-Stage Multi-Stage Forecast Comparison</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEFEA] text-[10px] font-mono uppercase text-[#718575]">
                <th className="pb-3 font-bold">Commodity Cluster</th>
                <th className="pb-3 font-bold">Stage 1 (Crop Plan)</th>
                <th className="pb-3 font-bold">Stage 2 (Mid-Season NDVI)</th>
                <th className="pb-3 font-bold">Stage 3 (Field Sampling)</th>
                <th className="pb-3 font-bold">Current Projected Output</th>
                <th className="pb-3 font-bold">Confidence Interval</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFEA]">
              {[
                { cluster: "Oromia Soybean (TGX-1335)", s1: "20.0 Qt/ha", s2: "21.4 Qt/ha (+7%)", s3: "21.2 Qt/ha (Crop Cut)", output: "48,200 MT", conf: "±12% High Confidence" },
                { cluster: "Arsi Sesame (Humera-1)", s1: "8.5 Qt/ha", s2: "8.2 Qt/ha (-3%)", s3: "8.1 Qt/ha (Crop Cut)", output: "12,150 MT", conf: "±15% Medium Confidence" },
                { cluster: "West Gojjam Maize (BH-661)", s1: "55.0 Qt/ha", s2: "58.2 Qt/ha (+6%)", s3: "59.0 Qt/ha (Crop Cut)", output: "23,650 MT", conf: "±10% High Confidence" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3.5 font-bold text-[#00261B]">{row.cluster}</td>
                  <td className="py-3.5 font-mono text-[#718575]">{row.s1}</td>
                  <td className="py-3.5 font-mono text-[#0B3D2E] font-semibold">{row.s2}</td>
                  <td className="py-3.5 font-mono font-bold text-[#146B45]">{row.s3}</td>
                  <td className="py-3.5 font-mono font-bold text-[#00261B]">{row.output}</td>
                  <td className="py-3.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#D1E7DD] text-[#0F5132]">
                      {row.conf}
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
