"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const HARVEST_KPIS: KpiMetric[] = [
  {
    title: "Today's Intake",
    value: "1,240 MT",
    change: "+12% vs Yesterday",
    changeType: "positive",
    subtext: "148 trucks weighed across all collection hubs",
    icon: "scale",
  },
  {
    title: "Cumulative Delivered",
    value: "14,850 MT",
    change: "Soybean & Sesame",
    changeType: "positive",
    subtext: "Season target: 84,000 MT (17.7% completed)",
    icon: "inventory_2",
  },
  {
    title: "Grade 1 Ratio",
    value: "91.8%",
    change: "Export Standard",
    changeType: "positive",
    subtext: "Average moisture: 11.2% | Purity: 99.1%",
    icon: "grade",
  },
  {
    title: "Gate Rejections",
    value: "1.4%",
    change: "2 Trucks",
    changeType: "danger",
    subtext: "Excessive moisture (>14%) returned for drying",
    icon: "do_not_disturb_on",
  },
];

export default function HarvestIntakePage() {
  return (
    <DomainPageShell
      badge="Harvest Operations & Weighbridge Intake"
      badgeColor="#003F5C"
      title="National Harvest Receiving & Real-Time Intake Stream"
      subtitle="Live weighbridge tickets, Goods Received Note (GRN) issuance, automated digital moisture scoring, and gate rejections."
      kpis={HARVEST_KPIS}
      actions={[
        { label: "Download Daily Intake Report", icon: "download", variant: "outline" },
        { label: "Log New Weighbridge Ticket", icon: "add", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
          <h2 className="text-base font-bold text-[#00261B]">Today's Live Weighbridge Intake Stream</h2>
          <span className="text-xs font-mono text-[#146B45] font-semibold">Auto-refreshes every 60s</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEFEA] text-[10px] font-mono uppercase text-[#718575]">
                <th className="pb-3 font-bold">Ticket #</th>
                <th className="pb-3 font-bold">Collection Hub</th>
                <th className="pb-3 font-bold">Origin / Cluster</th>
                <th className="pb-3 font-bold">Commodity</th>
                <th className="pb-3 font-bold">Net Weight</th>
                <th className="pb-3 font-bold">Moisture</th>
                <th className="pb-3 font-bold">Quality Grade</th>
                <th className="pb-3 font-bold">GRN Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFEA]">
              {[
                { ticket: "WB-9482", hub: "Jimma Central Silo", origin: "Limmu Kosa Outgrowers", crop: "Soybean", weight: "124.5 Qt", moisture: "11.2%", grade: "Grade 1 Export", status: "GRN Issued" },
                { ticket: "WB-9481", hub: "Adama Silo Hub", origin: "Arsi Grain Union", crop: "Sesame", weight: "185.0 Qt", moisture: "7.4%", grade: "Grade 1 Export", status: "GRN Issued" },
                { ticket: "WB-9480", hub: "Bahir Dar Station", origin: "West Gojjam Cluster", crop: "Soybean", weight: "98.2 Qt", moisture: "13.8%", grade: "Grade 2 Domestic", status: "QC Approved" },
                { ticket: "WB-9479", hub: "Hawassa Hub", origin: "Sidama Organic Union", crop: "Coffee", weight: "64.0 Qt", moisture: "11.0%", grade: "Specialty Grade 1", status: "GRN Issued" },
                { ticket: "WB-9478", hub: "Jimma Central Silo", origin: "Gera Cooperative", crop: "Soybean", weight: "142.0 Qt", moisture: "14.6%", grade: "Rejected (High Moisture)", status: "Rejection Slip" },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#146B45]">{row.ticket}</td>
                  <td className="py-3.5 font-medium text-[#00261B]">{row.hub}</td>
                  <td className="py-3.5 text-[#4A5D4E]">{row.origin}</td>
                  <td className="py-3.5 font-bold text-[#00261B]">{row.crop}</td>
                  <td className="py-3.5 font-mono font-bold text-[#00261B]">{row.weight}</td>
                  <td className="py-3.5 font-mono text-[#00261B]">{row.moisture}</td>
                  <td className="py-3.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        row.grade.includes("Grade 1")
                          ? "bg-[#D1E7DD] text-[#0F5132]"
                          : row.grade.includes("Grade 2")
                          ? "bg-[#FFEAC2] text-[#804A00]"
                          : "bg-[#FCE4E4] text-[#C94B4B]"
                      }`}
                    >
                      {row.grade}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span className="text-[11px] font-mono text-[#146B45] font-semibold">{row.status}</span>
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
