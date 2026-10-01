"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const PROFIT_KPIS: KpiMetric[] = [
  {
    title: "Consolidated Revenue",
    value: "412.5M ETB",
    change: "+18.2% YoY",
    changeType: "positive",
    subtext: "Domestic processing & export sales realization",
    icon: "payments",
  },
  {
    title: "Gross Profit Margin",
    value: "28.4%",
    change: "117.1M ETB",
    changeType: "positive",
    subtext: "Net revenue minus direct inputs, labor & freight",
    icon: "trending_up",
  },
  {
    title: "Highest Margin Crop",
    value: "Specialty Coffee",
    change: "38.2% Margin",
    changeType: "positive",
    subtext: "Sidama Organic specialty export grade",
    icon: "coffee",
  },
];

export default function ProfitabilityPage() {
  return (
    <DomainPageShell
      badge="Cost Accounting & Profitability"
      badgeColor="#0F5132"
      title="Multi-Level Crop & Regional Profitability Reporting"
      subtitle="Granular P&L analysis across crops, outgrower clusters, regional hubs, and company-wide consolidated margins."
      kpis={PROFIT_KPIS}
      actions={[
        { label: "Export Full P&L Dossier", icon: "download", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Commodity Gross Margin Comparison (ETB)</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEFEA] text-[10px] font-mono uppercase text-[#718575]">
                <th className="pb-3 font-bold">Crop Commodity</th>
                <th className="pb-3 font-bold">Total Volume (MT)</th>
                <th className="pb-3 font-bold">Gross Revenue</th>
                <th className="pb-3 font-bold">Direct Input Costs</th>
                <th className="pb-3 font-bold">Logistics & Labor</th>
                <th className="pb-3 font-bold">Gross Profit (ETB)</th>
                <th className="pb-3 font-bold">Margin %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFEA]">
              {[
                { crop: "Soybean (Non-GMO)", vol: "32,000 MT", rev: "192,000,000", input: "112,000,000", log: "24,000,000", gp: "56,000,000", margin: "29.2%" },
                { crop: "Sesame (Humera-1)", vol: "10,200 MT", rev: "142,800,000", input: "81,600,000", log: "18,360,000", gp: "42,840,000", margin: "30.0%" },
                { crop: "Specialty Coffee", vol: "2,100 MT", rev: "58,800,000", input: "29,400,000", log: "6,930,000", gp: "22,470,000", margin: "38.2%" },
                { crop: "Hybrid Maize", vol: "18,400 MT", rev: "18,900,000", input: "12,200,000", log: "3,800,000", gp: "2,900,000", margin: "15.3%" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3.5 font-bold text-[#00261B]">{row.crop}</td>
                  <td className="py-3.5 font-mono text-[#00261B]">{row.vol}</td>
                  <td className="py-3.5 font-mono text-[#00261B]">{row.rev}</td>
                  <td className="py-3.5 font-mono text-[#718575]">{row.input}</td>
                  <td className="py-3.5 font-mono text-[#718575]">{row.log}</td>
                  <td className="py-3.5 font-mono font-bold text-[#0F5132]">{row.gp}</td>
                  <td className="py-3.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#D1E7DD] text-[#0F5132]">
                      {row.margin}
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
