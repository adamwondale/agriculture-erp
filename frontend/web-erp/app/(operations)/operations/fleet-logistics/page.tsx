"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const FLEET_KPIS: KpiMetric[] = [
  {
    title: "Trucks En-Route",
    value: "64 Active",
    change: "100% Contracted",
    changeType: "positive",
    subtext: "Third-party union freight carriers",
    icon: "local_shipping",
  },
  {
    title: "In-Transit Volume",
    value: "1,840 MT",
    change: "Cargo Manifest",
    changeType: "neutral",
    subtext: "Soybean & Sesame in transit to central silos",
    icon: "inventory",
  },
  {
    title: "Average Transit Loss",
    value: "0.18%",
    change: "Within 0.5% Limit",
    changeType: "positive",
    subtext: "Dispatch scale vs arrival weighbridge delta",
    icon: "trending_down",
  },
  {
    title: "Seal Tampering Alerts",
    value: "Zero Alerts",
    change: "100% Intact",
    changeType: "positive",
    subtext: "Digital container seal serial checks",
    icon: "security",
  },
];

export default function FleetLogisticsPage() {
  return (
    <DomainPageShell
      badge="Logistics & Transporter Coordination"
      badgeColor="#003F5C"
      title="Third-Party Freight Fleet & Waybill Corridor Tracking"
      subtitle="Oversight of contracted transport associations, waybill manifests, real-time GPS transit tracking, and transit loss reconciliation."
      kpis={FLEET_KPIS}
      actions={[
        { label: "Dispatch New Waybill", icon: "add", variant: "primary" },
        { label: "Transit Loss Claims Log", icon: "assignment_late", variant: "outline" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
          <h2 className="text-base font-bold text-[#00261B]">Active Waybill Convoys in Transit</h2>
          <span className="text-xs font-mono text-[#146B45] font-semibold">Live Corridor Telematics</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEFEA] text-[10px] font-mono uppercase text-[#718575]">
                <th className="pb-3 font-bold">Waybill #</th>
                <th className="pb-3 font-bold">Transporter Union</th>
                <th className="pb-3 font-bold">Plate / Driver</th>
                <th className="pb-3 font-bold">Route Corridor</th>
                <th className="pb-3 font-bold">Manifest</th>
                <th className="pb-3 font-bold">Seal Serials</th>
                <th className="pb-3 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFEA]">
              {[
                { waybill: "WB-2026-881", union: "Oromia Freight Owners Assoc", driver: "Plate 3-84912 ET • Kebede T.", route: "Jimma Hub -> Adama Silo (340 km)", cargo: "32 MT Soybean (640 Bags)", seals: "SL-9941, SL-9942", status: "In Transit • 74 km left" },
                { waybill: "WB-2026-880", union: "Central Horn Transport Union", driver: "Plate 3-19402 ET • Haile G.", route: "Adama Silo -> Djibouti Port (850 km)", cargo: "40 MT Sesame (Grade 1)", seals: "SL-9820, SL-9821", status: "Customs Cleared • Galafi" },
                { waybill: "WB-2026-879", union: "Amhara Freight Association", driver: "Plate 3-55910 ET • Teshome B.", route: "Bahir Dar -> Adama Silo (560 km)", cargo: "28 MT Soybean", seals: "SL-9711, SL-9712", status: "Arrived at Destination" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#146B45]">{row.waybill}</td>
                  <td className="py-3.5 font-medium text-[#00261B]">{row.union}</td>
                  <td className="py-3.5 text-[#4A5D4E]">{row.driver}</td>
                  <td className="py-3.5 font-medium text-[#00261B]">{row.route}</td>
                  <td className="py-3.5 font-mono font-bold text-[#00261B]">{row.cargo}</td>
                  <td className="py-3.5 font-mono text-[10px] text-[#718575]">{row.seals}</td>
                  <td className="py-3.5">
                    <span className="text-[11px] font-mono font-bold text-[#0B3D2E] bg-[#D1E7DD] px-2 py-0.5 rounded-md">
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
