"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const TAX_KPIS: KpiMetric[] = [
  {
    title: "Cumulative Withheld",
    value: "3.68M ETB",
    change: "2% Standard",
    changeType: "positive",
    subtext: "Remitted to Ethiopian Ministry of Revenues (MOR)",
    icon: "receipt_long",
  },
  {
    title: "Generated Tax Slips",
    value: "14,850 Slips",
    change: "100% Tax Compliant",
    changeType: "positive",
    subtext: "Official government-compliant withholding certs",
    icon: "verified",
  },
  {
    title: "Tax Exemption Status",
    value: "Coop Exemption",
    change: "Verified TIN",
    changeType: "neutral",
    subtext: "Agricultural cooperative statutory exemptions",
    icon: "account_balance",
  },
];

export default function WithholdingTaxPage() {
  return (
    <DomainPageShell
      badge="Ministry of Revenues Compliance"
      badgeColor="#0F5132"
      title="Statutory Withholding Tax & MOR Remittance Desk"
      subtitle="Automated calculation of 2% or 30% statutory withholding tax on agricultural transactions, TIN verification, and digital withholding certificate generation."
      kpis={TAX_KPIS}
      actions={[
        { label: "Export Monthly MOR Tax Return", icon: "download", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Recent Withholding Tax Certificates</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEFEA] text-[10px] font-mono uppercase text-[#718575]">
                <th className="pb-3 font-bold">Cert #</th>
                <th className="pb-3 font-bold">Payee Full Name</th>
                <th className="pb-3 font-bold">Payee TIN Number</th>
                <th className="pb-3 font-bold">Gross Settlement</th>
                <th className="pb-3 font-bold">Withholding Rate</th>
                <th className="pb-3 font-bold">Tax Withheld</th>
                <th className="pb-3 font-bold">MOR Filing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFEA]">
              {[
                { cert: "WT-2026-0941", name: "Bekele Tadesse", tin: "TIN-008492019", gross: "56,025.00 ETB", rate: "2.0%", withheld: "1,120.50 ETB", status: "Remitted (Ref #4820)" },
                { cert: "WT-2026-0942", name: "Almaz Haile", tin: "TIN-007182941", gross: "48,500.00 ETB", rate: "2.0%", withheld: "970.00 ETB", status: "Remitted (Ref #4820)" },
                { cert: "WT-2026-0943", name: "Oromia Coffee Cooperative Union", tin: "TIN-001928472", gross: "840,000.00 ETB", rate: "Exempt (0%)", withheld: "0.00 ETB", status: "Coop Exemption Verified" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#146B45]">{row.cert}</td>
                  <td className="py-3.5 font-bold text-[#00261B]">{row.name}</td>
                  <td className="py-3.5 font-mono text-[#4A5D4E]">{row.tin}</td>
                  <td className="py-3.5 font-mono font-bold text-[#00261B]">{row.gross}</td>
                  <td className="py-3.5 font-mono text-[#00261B]">{row.rate}</td>
                  <td className="py-3.5 font-mono font-bold text-[#C94B4B]">{row.withheld}</td>
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
