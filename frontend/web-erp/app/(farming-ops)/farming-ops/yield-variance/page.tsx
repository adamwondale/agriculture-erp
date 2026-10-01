"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const VARIANCE_KPIS: KpiMetric[] = [
  {
    title: "Flagged Parcels (>20%)",
    value: "18 Parcels",
    change: "Mandatory Audit",
    changeType: "danger",
    subtext: "Delivered yield significantly deviated from benchmark",
    icon: "warning",
  },
  {
    title: "Average Yield Realized",
    value: "19.8 Qt/ha",
    change: "99% Plan Target",
    changeType: "positive",
    subtext: "Soybean national benchmark: 20.0 Qt/ha",
    icon: "trending_up",
  },
  {
    title: "Force Majeure Claims",
    value: "6 Verified",
    change: "Hail / Flooding",
    changeType: "neutral",
    subtext: "Loan restructuring recommended for next season",
    icon: "umbrella",
  },
  {
    title: "Side-Selling Cases",
    value: "2 Confirmed",
    change: "Legal Penalty",
    changeType: "danger",
    subtext: "Intentional under-delivery referred for debt recovery",
    icon: "gavel",
  },
];

export default function YieldVariancePage() {
  return (
    <DomainPageShell
      badge="Reconciliation & Field Investigation"
      badgeColor="#2C5E1A"
      title="Yield Variance & End-of-Season Debrief"
      subtitle="Automated variance detection flagging parcels with > 20% deviation between planned crop yield and actual weighbridge delivery."
      kpis={VARIANCE_KPIS}
      actions={[
        { label: "Download Seasonal Reconciliation", icon: "download", variant: "outline" },
        { label: "Dispatch Agronomy Investigation", icon: "assignment_late", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Parcels with Significant Yield Deviation (&gt; 20%)</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEFEA] text-[10px] font-mono uppercase text-[#718575]">
                <th className="pb-3 font-bold">Parcel Code</th>
                <th className="pb-3 font-bold">Farmer Name</th>
                <th className="pb-3 font-bold">Crop Commodity</th>
                <th className="pb-3 font-bold">Planned Yield</th>
                <th className="pb-3 font-bold">Actual Delivered</th>
                <th className="pb-3 font-bold">Variance %</th>
                <th className="pb-3 font-bold">Investigation Finding</th>
                <th className="pb-3 font-bold">Recommended Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFEA]">
              {[
                { code: "PRC-ETH-0814", farmer: "Mulugeta Assefa", crop: "Soybean", plan: "20.0 Qt/ha", actual: "13.2 Qt/ha", variance: "-34.0%", finding: "Verified localized hail storm in flowering phase", action: "Force Majeure • Restructure Loan" },
                { code: "PRC-ETH-0820", farmer: "Chaltu Tolosa", crop: "Soybean", plan: "20.0 Qt/ha", actual: "8.5 Qt/ha", variance: "-57.5%", finding: "Side-selling to private local aggregator confirmed", action: "Apply Penalty • Suspend Account" },
                { code: "PRC-ETH-0899", farmer: "Girma Wolde", crop: "Sesame", plan: "8.5 Qt/ha", actual: "5.4 Qt/ha", variance: "-36.5%", finding: "Late weeding due to family labor shortage", action: "Agronomy Advisory Follow-up" },
                { code: "PRC-ETH-0912", farmer: "Dawit Kebede", crop: "Hybrid Maize", plan: "55.0 Qt/ha", actual: "71.4 Qt/ha", variance: "+29.8%", finding: "High fertilizer responsiveness & optimal rainfall", action: "Purchase Surplus at Contract Rate" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#146B45]">{row.code}</td>
                  <td className="py-3.5 font-bold text-[#00261B]">{row.farmer}</td>
                  <td className="py-3.5 text-[#00261B]">{row.crop}</td>
                  <td className="py-3.5 font-mono text-[#718575]">{row.plan}</td>
                  <td className="py-3.5 font-mono font-bold text-[#00261B]">{row.actual}</td>
                  <td className="py-3.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        row.variance.startsWith("+")
                          ? "bg-[#D1E7DD] text-[#0F5132]"
                          : "bg-[#FCE4E4] text-[#C94B4B]"
                      }`}
                    >
                      {row.variance}
                    </span>
                  </td>
                  <td className="py-3.5 text-[#4A5D4E]">{row.finding}</td>
                  <td className="py-3.5 font-bold text-[#00261B]">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DomainPageShell>
  );
}
