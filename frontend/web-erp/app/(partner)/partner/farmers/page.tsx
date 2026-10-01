"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const PARTNER_FARMERS_KPIS: KpiMetric[] = [
  {
    title: "Member Farmers",
    value: "12,400 Outgrowers",
    change: "Registered",
    changeType: "positive",
    subtext: "Oromia Coffee & Grain Farmers Cooperative Union",
    icon: "groups",
  },
  {
    title: "Aggregated Land Base",
    value: "14,500 ha",
    change: "100% Contracted",
    changeType: "positive",
    subtext: "GPS parcel boundaries verified",
    icon: "square_foot",
  },
];

export default function PartnerFarmersPage() {
  return (
    <DomainPageShell
      badge="Cooperative Member Roster"
      badgeColor="#2E5B70"
      title="Contracted Member Farmers Directory"
      subtitle="Directory of contracted smallholder farmers registered under this cooperative union, cultivated hectares, and historical delivery track records."
      kpis={PARTNER_FARMERS_KPIS}
      actions={[
        { label: "Request Member Registration", icon: "person_add", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Union Member Farmers</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEFEA] text-[10px] font-mono uppercase text-[#718575]">
                <th className="pb-3 font-bold">Member Code</th>
                <th className="pb-3 font-bold">Farmer Name</th>
                <th className="pb-3 font-bold">Kebele / Cluster</th>
                <th className="pb-3 font-bold">Commodity</th>
                <th className="pb-3 font-bold">Area (ha)</th>
                <th className="pb-3 font-bold">Delivered (Qt)</th>
                <th className="pb-3 font-bold">Credit State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFEA]">
              {[
                { code: "MBR-ORM-0124", name: "Bekele Tadesse", kebele: "Babu Kebele, Limmu Kosa", crop: "Soybean", area: "3.2 ha", del: "124.5 Qt", credit: "Settled (No Debt)" },
                { code: "MBR-ORM-0125", name: "Almaz Haile", kebele: "Dedo Kebele, Jimma", crop: "Soybean", area: "2.5 ha", del: "98.0 Qt", credit: "Settled (No Debt)" },
                { code: "MBR-ORM-0126", name: "Chaltu Tolosa", kebele: "Babu Kebele, Limmu Kosa", crop: "Soybean", area: "1.8 ha", del: "8.5 Qt", credit: "Under Review" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#146B45]">{row.code}</td>
                  <td className="py-3.5 font-bold text-[#00261B]">{row.name}</td>
                  <td className="py-3.5 text-[#4A5D4E]">{row.kebele}</td>
                  <td className="py-3.5 text-[#00261B] font-medium">{row.crop}</td>
                  <td className="py-3.5 font-mono font-bold text-[#00261B]">{row.area}</td>
                  <td className="py-3.5 font-mono text-[#0B3D2E] font-semibold">{row.del}</td>
                  <td className="py-3.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        row.credit.includes("Settled")
                          ? "bg-[#D1E7DD] text-[#0F5132]"
                          : "bg-[#FFEAC2] text-[#804A00]"
                      }`}
                    >
                      {row.credit}
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
