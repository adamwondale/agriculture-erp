"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const CERT_KPIS: KpiMetric[] = [
  {
    title: "Active Certifications",
    value: "5 Standards",
    change: "100% Certified",
    changeType: "positive",
    subtext: "GlobalG.A.P., EU Organic, Fairtrade, Non-GMO",
    icon: "verified",
  },
  {
    title: "Certified Land Parcels",
    value: "14,820 Parcels",
    change: "42,500 ha",
    changeType: "positive",
    subtext: "GPS mapped environmental buffer zones",
    icon: "eco",
  },
  {
    title: "Loss Impact Rule",
    value: "Auto-Lock",
    change: "Risk Control",
    changeType: "positive",
    subtext: "System locks dependent export sales if cert lapses",
    icon: "lock",
  },
];

export default function CertificationsPage() {
  return (
    <DomainPageShell
      badge="Agricultural Standards & Certifications"
      badgeColor="#432874"
      title="International Certification Standards & Evidence Vault"
      subtitle="Management of organic, fairtrade, and food safety certifications, audit checklists, farmer training logs, and automated 90/60/30-day renewal alerts."
      kpis={CERT_KPIS}
      actions={[
        { label: "Upload Certification Audit", icon: "upload_file", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Company Agricultural Certifications</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEFEA] text-[10px] font-mono uppercase text-[#718575]">
                <th className="pb-3 font-bold">Standard</th>
                <th className="pb-3 font-bold">Certifying Body</th>
                <th className="pb-3 font-bold">Certificate Number</th>
                <th className="pb-3 font-bold">Certified Area</th>
                <th className="pb-3 font-bold">Expiration Date</th>
                <th className="pb-3 font-bold">Renewal Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFEA]">
              {[
                { std: "EU Organic Certification (EOS)", body: "CERES Certification GmbH", cert: "EU-ORG-2026-881", area: "18,500 ha", exp: "22 Dec 2026", status: "Renewal Alert: 84 Days Left" },
                { std: "GlobalG.A.P. & GRASP Social", body: "Control Union Inspections", cert: "GGAP-ETH-99410", area: "24,000 ha", exp: "14 Feb 2027", status: "Active (142 Days Left)" },
                { std: "Fairtrade International", body: "FLOCERT Verification", cert: "FLO-ETH-2026-14", area: "12,400 ha", exp: "30 Apr 2027", status: "Active (210 Days Left)" },
                { std: "Non-GMO Project Verified", body: "FoodChain ID", cert: "NGMO-ETH-0921", area: "42,500 ha", exp: "31 Dec 2027", status: "Active" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3.5 font-bold text-[#00261B]">{row.std}</td>
                  <td className="py-3.5 text-[#4A5D4E]">{row.body}</td>
                  <td className="py-3.5 font-mono text-[#00261B]">{row.cert}</td>
                  <td className="py-3.5 font-mono font-bold text-[#00261B]">{row.area}</td>
                  <td className="py-3.5 font-mono text-[#718575]">{row.exp}</td>
                  <td className="py-3.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        row.status.includes("Alert")
                          ? "bg-[#FFEAC2] text-[#804A00]"
                          : "bg-[#D1E7DD] text-[#0F5132]"
                      }`}
                    >
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
