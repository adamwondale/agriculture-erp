"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const BUDGET_KPIS: KpiMetric[] = [
  {
    title: "Seasonal Budget",
    value: "148.5M ETB",
    change: "Meher 2026",
    changeType: "positive",
    subtext: "Operational allocation for inputs, field labor & transport",
    icon: "account_balance",
  },
  {
    title: "Committed & Spent",
    value: "114.2M ETB",
    change: "76.9% Utilized",
    changeType: "neutral",
    subtext: "Variance within acceptable 5% seasonal buffer",
    icon: "pie_chart",
  },
];

export default function BudgetTrackingPage() {
  return (
    <DomainPageShell
      badge="Budgetary Control"
      badgeColor="#0F5132"
      title="Seasonal Operational Budget & Expenditure Control"
      subtitle="Real-time monitoring of operational expenditure against approved seasonal budgets per department, region, and crop project."
      kpis={BUDGET_KPIS}
      actions={[
        { label: "Export Budget Variance Report", icon: "download", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Departmental Budget Line Allocations</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEFEA] text-[10px] font-mono uppercase text-[#718575]">
                <th className="pb-3 font-bold">Budget Line Code</th>
                <th className="pb-3 font-bold">Line Item Description</th>
                <th className="pb-3 font-bold">Allocated (ETB)</th>
                <th className="pb-3 font-bold">Committed (ETB)</th>
                <th className="pb-3 font-bold">Actual Spend (ETB)</th>
                <th className="pb-3 font-bold">Remaining Balance</th>
                <th className="pb-3 font-bold">Burn Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFEA]">
              {[
                { code: "BGT-AGR-01", desc: "Certified Seed Procurement", alloc: "45,000,000", comm: "44,200,000", act: "43,800,000", rem: "1,200,000", burn: "97.3%" },
                { code: "BGT-AGR-02", desc: "Inorganic Fertilizer (NPSB & Urea)", alloc: "68,000,000", comm: "65,400,000", act: "64,900,000", rem: "3,100,000", burn: "95.4%" },
                { code: "BGT-OPS-01", desc: "Seasonal Field Labor & Check-in", alloc: "12,500,000", comm: "9,800,000", act: "8,950,000", rem: "3,550,000", burn: "71.6%" },
                { code: "BGT-LOG-01", desc: "Third-Party Freight Logistics", alloc: "23,000,000", comm: "18,400,000", act: "16,200,000", rem: "6,800,000", burn: "70.4%" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#146B45]">{row.code}</td>
                  <td className="py-3.5 font-bold text-[#00261B]">{row.desc}</td>
                  <td className="py-3.5 font-mono text-[#00261B]">{row.alloc}</td>
                  <td className="py-3.5 font-mono text-[#4A5D4E]">{row.comm}</td>
                  <td className="py-3.5 font-mono font-bold text-[#00261B]">{row.act}</td>
                  <td className="py-3.5 font-mono font-bold text-[#0F5132]">{row.rem}</td>
                  <td className="py-3.5 font-mono text-[#00261B]">{row.burn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DomainPageShell>
  );
}
