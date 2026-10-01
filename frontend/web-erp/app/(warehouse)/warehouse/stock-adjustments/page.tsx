"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const ADJUST_KPIS: KpiMetric[] = [
  {
    title: "Normal Shrinkage",
    value: "0.24%",
    change: "Natural Moisture",
    changeType: "positive",
    subtext: "Allowable grain respiration loss",
    icon: "opacity",
  },
  {
    title: "Write-Off Limit",
    value: "50 Qt",
    change: "Delegated Ceiling",
    changeType: "neutral",
    subtext: "Warehouse Manager approval limit; higher routes to COO",
    icon: "security",
  },
];

export default function StockAdjustmentsPage() {
  return (
    <DomainPageShell
      badge="Inventory Adjustments & Write-Offs"
      badgeColor="#7F4F24"
      title="Stock Count Reconciliation & Shrinkage Disposal Desk"
      subtitle="Reconciling book stock against physical grain counts, calculating allowable moisture shrinkage, and routing write-offs above delegated limits."
      kpis={ADJUST_KPIS}
      actions={[
        { label: "Post Routine Shrinkage", icon: "add", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Recent Stock Adjustment Vouchers</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEFEA] text-[10px] font-mono uppercase text-[#718575]">
                <th className="pb-3 font-bold">Adjustment ID</th>
                <th className="pb-3 font-bold">Silo Location</th>
                <th className="pb-3 font-bold">Reason</th>
                <th className="pb-3 font-bold">Quantity (Qt)</th>
                <th className="pb-3 font-bold">Approver Role</th>
                <th className="pb-3 font-bold">Approval State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFEA]">
              {[
                { id: "ADJ-2026-012", silo: "Adama Silo Bin A1", reason: "Standard Moisture Drying Shrinkage (12.0% -> 11.2%)", qty: "-18.5 Qt", role: "Warehouse Manager (Under Ceiling)", status: "Approved & Posted" },
                { id: "ADJ-2026-013", silo: "Jimma Hub Bin C1", reason: "Water leak spoilage in lower hopper gate", qty: "-82.0 Qt", role: "COO / Operations Director Required", status: "Pending COO Review" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#146B45]">{row.id}</td>
                  <td className="py-3.5 font-medium text-[#00261B]">{row.silo}</td>
                  <td className="py-3.5 text-[#4A5D4E]">{row.reason}</td>
                  <td className="py-3.5 font-mono font-bold text-[#C94B4B]">{row.qty}</td>
                  <td className="py-3.5 text-[#00261B]">{row.role}</td>
                  <td className="py-3.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#D1E7DD] text-[#0F5132]">
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
