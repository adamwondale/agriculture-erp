"use client";

import React, { useState } from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const ROSTER_KPIS: KpiMetric[] = [
  {
    title: "Registered Farmers",
    value: "38,240",
    change: "+4,120",
    changeType: "positive",
    subtext: "100% Fayda / Kebele verified outgrowers",
    icon: "groups",
  },
  {
    title: "Active Contracted",
    value: "36,810",
    change: "96.3% Rate",
    changeType: "positive",
    subtext: "Signed seasonal supply agreements",
    icon: "verified",
  },
  {
    title: "Under Suspension",
    value: "142 Farmers",
    change: "Risk Review",
    changeType: "danger",
    subtext: "Side-selling flag or unverified loan default",
    icon: "person_off",
  },
  {
    title: "Average Reliability",
    value: "92 / 100",
    change: "A-Grade",
    changeType: "positive",
    subtext: "Weighted score on delivery & loan repayment",
    icon: "star",
  },
];

export default function FarmerRosterPage() {
  const [selectedFarmer, setSelectedFarmer] = useState<string | null>(null);

  return (
    <DomainPageShell
      badge="Outgrower Farmer Registry"
      badgeColor="#2C5E1A"
      title="Farmer Master Directory & Lifecycle Governance"
      subtitle="Complete outgrower profiles, Fayda e-KYC documents, historical yield performance, and suspension review workflows."
      kpis={ROSTER_KPIS}
      actions={[
        { label: "Batch Import (CSV)", icon: "upload_file", variant: "outline" },
        { label: "Register Farmer (Fayda)", icon: "person_add", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Active Outgrower Farmer Directory</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEFEA] text-[10px] font-mono uppercase text-[#718575]">
                <th className="pb-3 font-bold">Farmer ID</th>
                <th className="pb-3 font-bold">Full Name</th>
                <th className="pb-3 font-bold">Fayda National ID</th>
                <th className="pb-3 font-bold">Cluster / Kebele</th>
                <th className="pb-3 font-bold">Cultivated Area</th>
                <th className="pb-3 font-bold">Reliability Score</th>
                <th className="pb-3 font-bold">Credit State</th>
                <th className="pb-3 font-bold">Lifecycle State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFEA]">
              {[
                { id: "FAR-ETH-10821", name: "Bekele Tadesse", fayda: "FAN-9481-2849", cluster: "Limmu Kosa • Babu Kebele", area: "3.2 ha", score: "96 / 100", credit: "Current (No Default)", status: "Active" },
                { id: "FAR-ETH-10822", name: "Almaz Haile", fayda: "FAN-8172-9910", cluster: "Jimma Hub • Dedo Kebele", area: "2.5 ha", score: "94 / 100", credit: "Current (No Default)", status: "Active" },
                { id: "FAR-ETH-10823", name: "Worku Desta", fayda: "FAN-6632-1049", cluster: "Arsi Robe • Robe Kebele", area: "4.8 ha", score: "88 / 100", credit: "Current (No Default)", status: "Active" },
                { id: "FAR-ETH-10824", name: "Chaltu Tolosa", fayda: "FAN-4991-8842", cluster: "Limmu Kosa • Babu Kebele", area: "1.8 ha", score: "64 / 100", credit: "Side-Selling Flagged", status: "Suspension Review" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#146B45]">{row.id}</td>
                  <td className="py-3.5 font-bold text-[#00261B]">{row.name}</td>
                  <td className="py-3.5 font-mono text-[#4A5D4E]">{row.fayda}</td>
                  <td className="py-3.5 text-[#00261B]">{row.cluster}</td>
                  <td className="py-3.5 font-mono font-bold text-[#00261B]">{row.area}</td>
                  <td className="py-3.5 font-mono font-bold text-[#0F5132]">{row.score}</td>
                  <td className="py-3.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        row.credit.includes("Current")
                          ? "bg-[#D1E7DD] text-[#0F5132]"
                          : "bg-[#FCE4E4] text-[#C94B4B]"
                      }`}
                    >
                      {row.credit}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        row.status === "Active"
                          ? "bg-[#D1E7DD] text-[#0F5132]"
                          : "bg-[#FFEAC2] text-[#804A00]"
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
