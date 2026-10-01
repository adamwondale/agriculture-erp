"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const GL_KPIS: KpiMetric[] = [
  {
    title: "Trial Balance",
    value: "Balanced",
    change: "Debit = Credit",
    changeType: "positive",
    subtext: "IFRS / Ethiopian GAAP compliance",
    icon: "account_balance",
  },
  {
    title: "Automated Journals",
    value: "14,850 Posts",
    change: "Auto-Integrated",
    changeType: "positive",
    subtext: "Auto-posted from harvest GRNs and sales invoices",
    icon: "auto_mode",
  },
];

export default function GeneralLedgerPage() {
  return (
    <DomainPageShell
      badge="Financial Accounting & IFRS"
      badgeColor="#0F5132"
      title="Multi-Dimensional General Ledger & Chart of Accounts"
      subtitle="Segmented Ethiopian GAAP / IFRS accounting structure: Account Code - Department - Regional Hub - Crop Commodity Project."
      kpis={GL_KPIS}
      actions={[
        { label: "Export Trial Balance", icon: "download", variant: "outline" },
        { label: "New Manual Journal Voucher", icon: "add", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Automated Journal Entry Stream</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEFEA] text-[10px] font-mono uppercase text-[#718575]">
                <th className="pb-3 font-bold">Journal #</th>
                <th className="pb-3 font-bold">Transaction Source</th>
                <th className="pb-3 font-bold">Debit Account</th>
                <th className="pb-3 font-bold">Credit Account</th>
                <th className="pb-3 font-bold">Amount (ETB)</th>
                <th className="pb-3 font-bold">Posting State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFEA]">
              {[
                { jnl: "JNL-2026-9482", src: "Harvest GRN Intake (12.45 MT)", dr: "1310 - Inventory: Grain at Silo", cr: "2110 - Accounts Payable: Farmers", amt: "56,025.00 ETB", status: "Auto-Posted" },
                { jnl: "JNL-2026-9483", src: "Settlement Payout Netting", dr: "2110 - Accounts Payable: Farmers", cr: "1120 - Telebirr Corporate Payout", amt: "42,500.00 ETB", status: "Auto-Posted" },
                { jnl: "JNL-2026-9484", src: "Withholding Tax MOR Remittance", dr: "2110 - Accounts Payable: Farmers", cr: "2130 - MOR Withholding Tax Payable", amt: "1,120.50 ETB", status: "Auto-Posted" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#146B45]">{row.jnl}</td>
                  <td className="py-3.5 font-medium text-[#00261B]">{row.src}</td>
                  <td className="py-3.5 text-[#00261B]">{row.dr}</td>
                  <td className="py-3.5 text-[#4A5D4E]">{row.cr}</td>
                  <td className="py-3.5 font-mono font-bold text-[#00261B]">{row.amt}</td>
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
