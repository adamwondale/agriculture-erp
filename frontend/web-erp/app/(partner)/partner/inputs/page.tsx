"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const INPUTS_KPIS: KpiMetric[] = [
  {
    title: "Distributed Value",
    value: "14.2M ETB",
    change: "100% Disbursed",
    changeType: "positive",
    subtext: "Certified seed and NPSB fertilizer to member farmers",
    icon: "shopping_bag",
  },
  {
    title: "Recovered at Settlement",
    value: "13.9M ETB",
    change: "98.2% Recovered",
    changeType: "positive",
    subtext: "Automatic harvest settlement deduction",
    icon: "verified",
  },
];

export default function PartnerInputsPage() {
  return (
    <DomainPageShell
      badge="Input Utilization & Debt"
      badgeColor="#2E5B70"
      title="Member Input Utilization & Loan Recovery"
      subtitle="Track certified seed, fertilizer, and agrochemical inputs distributed to member farmers on credit, and audit recovery status."
      kpis={INPUTS_KPIS}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Member Input Allocations Ledger</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEFEA] text-[10px] font-mono uppercase text-[#718575]">
                <th className="pb-3 font-bold">Voucher #</th>
                <th className="pb-3 font-bold">Member Name</th>
                <th className="pb-3 font-bold">Supplied Inputs</th>
                <th className="pb-3 font-bold">Total Credit Value</th>
                <th className="pb-3 font-bold">Recovery Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFEA]">
              {[
                { vch: "VCH-INP-0941", name: "Bekele Tadesse", items: "96 kg Seed (TGX-1335) + 320 kg NPSB", val: "18,400.00 ETB", status: "Fully Recovered at Harvest" },
                { vch: "VCH-INP-0942", name: "Almaz Haile", items: "75 kg Seed + 250 kg NPSB + Inoculant", val: "15,200.00 ETB", status: "Fully Recovered at Harvest" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#146B45]">{row.vch}</td>
                  <td className="py-3.5 font-bold text-[#00261B]">{row.name}</td>
                  <td className="py-3.5 text-[#4A5D4E]">{row.items}</td>
                  <td className="py-3.5 font-mono font-bold text-[#00261B]">{row.val}</td>
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
