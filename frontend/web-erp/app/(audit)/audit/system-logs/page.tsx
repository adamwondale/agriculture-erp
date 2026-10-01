"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const LOGS_KPIS: KpiMetric[] = [
  {
    title: "Retention Period",
    value: "7 Years",
    change: "Statutory",
    changeType: "positive",
    subtext: "Ethiopian Ministry of Revenues standard",
    icon: "history",
  },
  {
    title: "Tamper-Evident Signatures",
    value: "100% Cryptographic",
    change: "SHA-256",
    changeType: "positive",
    subtext: "Immutable hash verification on each record",
    icon: "verified_user",
  },
  {
    title: "Field-Level Diffs",
    value: "Full Diffs",
    change: "Finance & Land",
    changeType: "positive",
    subtext: "Before and after value comparisons",
    icon: "difference",
  },
];

export default function SystemLogsPage() {
  return (
    <DomainPageShell
      badge="Regulatory Audit Vault"
      badgeColor="#432874"
      title="7-Year Immutable Audit Trail Explorer"
      subtitle="Comprehensive audit inspection with field-level before/after diffs for sensitive financial, contract, land tenure, and input allocation tables."
      kpis={LOGS_KPIS}
      actions={[
        { label: "Export Tamper-Evident Signed PDF", icon: "picture_as_pdf", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">System Mutation Audit Trail</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEFEA] text-[10px] font-mono uppercase text-[#718575]">
                <th className="pb-3 font-bold">Audit ID</th>
                <th className="pb-3 font-bold">Timestamp</th>
                <th className="pb-3 font-bold">User</th>
                <th className="pb-3 font-bold">Entity Type</th>
                <th className="pb-3 font-bold">Action</th>
                <th className="pb-3 font-bold">Field-Level Changes</th>
                <th className="pb-3 font-bold">IP & Device</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFEA]">
              {[
                { id: "AUD-9941", time: "30/09/2026 02:14 AM", user: "Kinde Gudeta (Finance)", entity: "FarmerSettlement (SET-9482)", action: "UPDATE", diff: "Status: 'Draft' -> 'Audited'", ip: "197.156.104.22 (Addis HQ)" },
                { id: "AUD-9940", time: "30/09/2026 02:08 AM", user: "Abebe Tesfaye (Admin)", entity: "UserPermission (DK-Agronomy)", action: "GRANT", diff: "Scope: Added Limmu Kosa Hub", ip: "197.156.104.14 (Addis HQ)" },
                { id: "AUD-9939", time: "30/09/2026 01:55 AM", user: "Kassahun Bekele (Warehouse)", entity: "GoodsReceivedNote (GRN-9482)", action: "INSERT", diff: "NetWeight: 124.5 Qt, Grade: 'Grade 1'", ip: "196.188.42.10 (Adama Silo)" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#146B45]">{row.id}</td>
                  <td className="py-3.5 font-mono text-[#718575]">{row.time}</td>
                  <td className="py-3.5 font-bold text-[#00261B]">{row.user}</td>
                  <td className="py-3.5 font-mono text-[#00261B]">{row.entity}</td>
                  <td className="py-3.5 font-mono font-bold text-[#0B3D2E]">{row.action}</td>
                  <td className="py-3.5 font-mono text-[#0F5132]">{row.diff}</td>
                  <td className="py-3.5 font-mono text-[10px] text-[#718575]">{row.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DomainPageShell>
  );
}
