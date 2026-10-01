"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const STO_KPIS: KpiMetric[] = [
  {
    title: "Active Transfer Orders",
    value: "8 STOs",
    change: "In Transit",
    changeType: "positive",
    subtext: "Transfer between regional hubs and export silos",
    icon: "swap_horiz",
  },
  {
    title: "Average Transit Loss",
    value: "0.14%",
    change: "< 0.5% Limit",
    changeType: "positive",
    subtext: "Dispatch vs destination receiving weight",
    icon: "trending_down",
  },
];

export default function TransfersStoPage() {
  return (
    <DomainPageShell
      badge="Inter-Warehouse Movements"
      badgeColor="#7F4F24"
      title="Stock Transfer Orders (STO) & Transit Loss Tracking"
      subtitle="Management of inter-warehouse commodity movements, seal verification checklists, destination weighbridge receipts, and transit discrepancy logging."
      kpis={STO_KPIS}
      actions={[
        { label: "Create Stock Transfer Order", icon: "add", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Active Stock Transfer Orders</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEFEA] text-[10px] font-mono uppercase text-[#718575]">
                <th className="pb-3 font-bold">STO Number</th>
                <th className="pb-3 font-bold">Dispatch Warehouse</th>
                <th className="pb-3 font-bold">Destination Warehouse</th>
                <th className="pb-3 font-bold">Commodity</th>
                <th className="pb-3 font-bold">Dispatched Weight</th>
                <th className="pb-3 font-bold">Received Weight</th>
                <th className="pb-3 font-bold">Discrepancy</th>
                <th className="pb-3 font-bold">STO Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFEA]">
              {[
                { sto: "STO-2026-081", from: "Jimma Hub", to: "Adama Central Silo", crop: "Grade 1 Soybean", dWeight: "32,000 kg", rWeight: "31,960 kg", delta: "-40 kg (0.12%)", status: "GRN Confirmed" },
                { sto: "STO-2026-082", from: "Bahir Dar Station", to: "Adama Central Silo", crop: "Grade 1 Soybean", dWeight: "28,000 kg", rWeight: "In Transit", delta: "Pending Receipt", status: "En-Route" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#146B45]">{row.sto}</td>
                  <td className="py-3.5 font-medium text-[#00261B]">{row.from}</td>
                  <td className="py-3.5 font-medium text-[#00261B]">{row.to}</td>
                  <td className="py-3.5 text-[#00261B]">{row.crop}</td>
                  <td className="py-3.5 font-mono font-bold text-[#00261B]">{row.dWeight}</td>
                  <td className="py-3.5 font-mono text-[#00261B]">{row.rWeight}</td>
                  <td className="py-3.5 font-mono text-[#0F5132]">{row.delta}</td>
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
