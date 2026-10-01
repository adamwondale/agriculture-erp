"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const SHIPMENT_KPIS: KpiMetric[] = [
  {
    title: "Active Consignments",
    value: "2 Convoys",
    change: "In Transit",
    changeType: "positive",
    subtext: "Addis Ababa to Port of Djibouti corridor",
    icon: "local_shipping",
  },
  {
    title: "Container Seals",
    value: "100% Intact",
    change: "High Security",
    changeType: "positive",
    subtext: "ISO container serial seals verified en-route",
    icon: "security",
  },
  {
    title: "Estimated Port Arrival",
    value: "Tomorrow 14:00",
    change: "On Schedule",
    changeType: "positive",
    subtext: "Port of Djibouti Container Terminal (DCT)",
    icon: "directions_boat",
  },
];

export default function BuyerShipmentsPage() {
  return (
    <DomainPageShell
      badge="Export Logistics & Freight Tracking"
      badgeColor="#1D3557"
      title="Real-Time Shipment Tracking & Container Logistics"
      subtitle="Live telematics tracking for your commodity shipments in transit from central Ethiopian silos along the Addis Ababa — Djibouti transport corridor."
      kpis={SHIPMENT_KPIS}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Live Export Shipment Convoys</h2>

        <div className="space-y-4">
          {[
            {
              shipment: "SHIP-2026-ETH-DJI-01",
              order: "SO-2026-ETH-05 (1,000 MT Whitish Sesame)",
              trucks: "12 Container Flatbeds (240 MT Convoy 1)",
              corridor: "Adama Silo -> Galafi Border Post -> Port Djibouti",
              current: "Galafi Customs Clearance Point (Ethiopian / Djibouti Border)",
              eta: "Port Djibouti: 01 Oct 2026 14:00",
              status: "Customs Inspection Cleared • In Transit",
            },
          ].map((s, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-[#146B45]">{s.shipment}</span>
                  <h3 className="text-sm font-bold text-[#00261B]">{s.order}</h3>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#D1E7DD] text-[#0F5132]">
                  {s.status}
                </span>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-[#DDE4DE] space-y-1">
                <span className="text-[#00261B] font-bold block">{s.trucks}</span>
                <span className="text-[#4A5D4E] block">Route: {s.corridor}</span>
                <span className="text-[11px] font-mono text-[#0B3D2E] block">Current Location: {s.current}</span>
                <span className="text-[11px] font-mono text-[#718575] block">ETA: {s.eta}</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-[#718575]">Seals: SL-9820, SL-9821, SL-9822 (Intact)</span>
                <button className="text-xs font-bold text-[#146B45] hover:text-[#0B3D2E]">
                  Download Stamped Waybill PDF &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DomainPageShell>
  );
}
