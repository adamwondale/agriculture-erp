"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const PROPOSAL_KPIS: KpiMetric[] = [
  {
    title: "Proposals in Pipeline",
    value: "6 Proposals",
    change: "Next Season",
    changeType: "positive",
    subtext: "Soybean, sesame & organic coffee outgrowers",
    icon: "description",
  },
  {
    title: "Target Planned Acreage",
    value: "22,500 ha",
    change: "Expansion",
    changeType: "positive",
    subtext: "New woreda clusters proposed by partners",
    icon: "square_foot",
  },
];

export default function ProposalsPage() {
  return (
    <DomainPageShell
      badge="Partnership Proposals & Agreements"
      badgeColor="#3F2E56"
      title="Partnership Commercial Proposals & Master Agreements"
      subtitle="Multi-stage approval workflow: Partnership Officer initiates -> Partnership Manager reviews due diligence -> Legal reviews contract -> CEO executes master agreement."
      kpis={PROPOSAL_KPIS}
      actions={[
        { label: "New Commercial Proposal", icon: "add", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Commercial Partnership Proposals</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEFEA] text-[10px] font-mono uppercase text-[#718575]">
                <th className="pb-3 font-bold">Proposal Code</th>
                <th className="pb-3 font-bold">Partner Organization</th>
                <th className="pb-3 font-bold">Target Crop</th>
                <th className="pb-3 font-bold">Planned Area</th>
                <th className="pb-3 font-bold">Commission Rate</th>
                <th className="pb-3 font-bold">Workflow State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFEA]">
              {[
                { code: "PROP-2026-012", partner: "Oromia Coffee Cooperative Union", crop: "Specialty Organic Coffee", area: "6,000 ha", comm: "10% Management Fee", status: "Legal Review Complete • Ready for CEO" },
                { code: "PROP-2026-013", partner: "Arsi Robe Grain Association", crop: "Sesame (Humera-1)", area: "4,500 ha", comm: "10% Management Fee", status: "Partnership Manager Review" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#146B45]">{row.code}</td>
                  <td className="py-3.5 font-bold text-[#00261B]">{row.partner}</td>
                  <td className="py-3.5 text-[#00261B]">{row.crop}</td>
                  <td className="py-3.5 font-mono font-bold text-[#00261B]">{row.area}</td>
                  <td className="py-3.5 font-mono text-[#0B3D2E]">{row.comm}</td>
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
