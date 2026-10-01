"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const OPERATIONS_KPIS: KpiMetric[] = [
  {
    title: "Operational Stations",
    value: "28 Hubs",
    change: "100% Online",
    changeType: "positive",
    subtext: "Aggregation centers across Oromia & Amhara",
    icon: "store",
  },
  {
    title: "Weighbridge Inflow",
    value: "1,240 MT/day",
    change: "+14.2% Velocity",
    changeType: "positive",
    subtext: "Peak harvest intake across 14 weighbridges",
    icon: "scale",
  },
  {
    title: "Contracted Fleet",
    value: "64 Trucks",
    change: "Active in Transit",
    changeType: "positive",
    subtext: "Third-party union freight carriers",
    icon: "local_shipping",
  },
  {
    title: "Silo Capacity Utilization",
    value: "74.8%",
    change: "Optimal Buffer",
    changeType: "neutral",
    subtext: "11,200 MT filled / 15,000 MT total capacity",
    icon: "warehouse",
  },
  {
    title: "Tier 2 Pending Approvals",
    value: "4 Vouchers",
    change: "Action Required",
    changeType: "warning",
    subtext: "50,000 - 500,000 ETB operational requisitions",
    icon: "pending_actions",
  },
];

export default function OperationsCommandCenterPage() {
  return (
    <DomainPageShell
      badge="Operations Directorate & COO Cockpit"
      badgeColor="#003F5C"
      title="National Operational Performance & Supply Chain Cockpit"
      subtitle="Real-time oversight across field collection stations, silo intake queues, contracted transporter fleet movements, and Tier 2 operational approvals."
      kpis={OPERATIONS_KPIS}
      actions={[
        { label: "Harvest Intake Stream", icon: "scale", href: "/operations/harvest-intake", variant: "outline" },
        { label: "Fleet Logistics (64)", icon: "local_shipping", href: "/operations/fleet-logistics", variant: "outline" },
        { label: "Tier 2 Sign-Off", icon: "verified", href: "/operations/approvals-tier2", variant: "primary" },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Hub Activity Feed */}
        <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
            <h2 className="text-base font-bold text-[#00261B]">Regional Hub Intake Status</h2>
            <span className="text-xs font-mono text-[#146B45] font-semibold">Live Telemetry</span>
          </div>

          <div className="space-y-3">
            {[
              { hub: "Jimma Central Silo Hub", region: "Oromia", intake: "380 MT", cap: "88%", status: "Active Intake" },
              { hub: "Adama Export Aggregation Center", region: "Oromia", intake: "420 MT", cap: "72%", status: "Active Intake" },
              { hub: "Bahir Dar Collection Hub", region: "Amhara", intake: "240 MT", cap: "64%", status: "Active Intake" },
              { hub: "Hawassa Southern Station", region: "Sidama", intake: "200 MT", cap: "58%", status: "Normal" },
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#00261B]">{item.hub}</h4>
                  <span className="text-[10px] font-mono text-[#718575]">{item.region} • Today: {item.intake}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-[#00261B]">{item.cap} Cap</span>
                  <span className="text-[10px] text-emerald-700 font-semibold block">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Bottlenecks & Warnings */}
        <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
            <h2 className="text-base font-bold text-[#00261B]">Active Operational Bottlenecks</h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FFEAC2] text-[#804A00]">
              2 Alerts
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-[#FFF8E7] border border-[#F0D597] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#804A00]">
                <span className="material-symbols-outlined text-[18px]">warning</span>
                <span>Weighbridge Calibration Queue — Limmu Kosa</span>
              </div>
              <p className="text-xs text-[#804A00]/90 leading-relaxed">
                Weighbridge sensor drift detected (+0.8% variance). Mobile calibration team dispatched; incoming trucks rerouted to Seka hub.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00261B]">
                <span className="material-symbols-outlined text-[18px] text-[#146B45]">local_shipping</span>
                <span>Djibouti Corridor Transporter Dispatch</span>
              </div>
              <p className="text-xs text-[#718575] leading-relaxed">
                12 container flatbeds loaded with Grade 1 export sesame departed Adama; estimated arrival at Port Djibouti in 26 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DomainPageShell>
  );
}
