"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const SETTLE_PORTAL_KPIS: KpiMetric[] = [
  {
    title: "Earned Commission",
    value: "1.42M ETB",
    change: "Management Fee",
    changeType: "positive",
    subtext: "10% commission on contracted farmer volumes",
    icon: "payments",
  },
  {
    title: "Member Payouts Settled",
    value: "42.8M ETB",
    change: "Telebirr & CBE",
    changeType: "positive",
    subtext: "Disbursed directly to individual member wallets",
    icon: "account_balance_wallet",
  },
];

export default function PartnerSettlementsPage() {
  return (
    <DomainPageShell
      badge="Partner Commission & Fee Statements"
      badgeColor="#2E5B70"
      title="Cooperative Commission & Member Settlement Statements"
      subtitle="Audited management fee statements calculated per contract terms: Management Fee = Price/ha × ha × agreed rate % (default 10%)."
      kpis={SETTLE_PORTAL_KPIS}
      actions={[
        { label: "Download Commission Voucher", icon: "download", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Cooperative Management Fee Statements</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEFEA] text-[10px] font-mono uppercase text-[#718575]">
                <th className="pb-3 font-bold">Statement #</th>
                <th className="pb-3 font-bold">Crop Season</th>
                <th className="pb-3 font-bold">Contracted Basis</th>
                <th className="pb-3 font-bold">Fee Rate %</th>
                <th className="pb-3 font-bold">Earned Fee (ETB)</th>
                <th className="pb-3 font-bold">Payment State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFEA]">
              {[
                { stm: "COMM-2026-081", season: "Meher 2026 (Batch 1)", basis: "8,500 ha Soybean Delivery", rate: "10.0%", fee: "1,420,000.00 ETB", status: "Transferred to Union Bank" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#146B45]">{row.stm}</td>
                  <td className="py-3.5 font-bold text-[#00261B]">{row.season}</td>
                  <td className="py-3.5 text-[#4A5D4E]">{row.basis}</td>
                  <td className="py-3.5 font-mono text-[#00261B]">{row.rate}</td>
                  <td className="py-3.5 font-mono font-bold text-[#0F5132]">{row.fee}</td>
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
