"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const WAREHOUSE_KPIS: KpiMetric[] = [
  {
    title: "Total Capacity",
    value: "15,000 MT",
    change: "74.8% Filled",
    changeType: "positive",
    subtext: "11,200 MT stock across 4 central facilities",
    icon: "warehouse",
  },
  {
    title: "Weighbridge Inflow",
    value: "1,240 MT Today",
    change: "148 Trucks",
    changeType: "positive",
    subtext: "Real-time GRN generation at weigh scale",
    icon: "scale",
  },
  {
    title: "Export Grade 1 Ratio",
    value: "91.8%",
    change: "Export Ready",
    changeType: "positive",
    subtext: "Moisture < 11.5% • Purity > 99%",
    icon: "grade",
  },
  {
    title: "Active Stock Transfers",
    value: "8 STOs",
    change: "In Transit",
    changeType: "neutral",
    subtext: "Regional hubs to Adama central export silo",
    icon: "swap_horiz",
  },
  {
    title: "Normal Shrinkage",
    value: "0.24%",
    change: "Within Tolerance",
    changeType: "positive",
    subtext: "Standard allowable moisture loss",
    icon: "opacity",
  },
];

export default function WarehouseDashboardPage() {
  return (
    <DomainPageShell
      badge="Warehouse & Silo Operations"
      badgeColor="#7F4F24"
      title="Silo Storage & Grain Intake Command Center"
      subtitle="Monitoring storage bin occupancy, automated weighbridge GRN desk, QC grading (Grades 1-3), GS1 QR barcodes, and stock transfers."
      kpis={WAREHOUSE_KPIS}
      actions={[
        { label: "Weighbridge GRN Desk", icon: "scale", href: "/warehouse/weighbridge-intake", variant: "outline" },
        { label: "QC Digital Grading", icon: "biotech", href: "/warehouse/qc-inspection", variant: "outline" },
        { label: "Lot QR Barcodes", icon: "qr_code", href: "/warehouse/lot-traceability", variant: "primary" },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Silo Occupancy & Aeration Live Gauges */}
        <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
            <h2 className="text-base font-bold text-[#00261B]">Central Silo Storage Occupancy</h2>
            <span className="text-xs font-mono text-[#146B45] font-semibold">Live Aeration Active</span>
          </div>

          <div className="space-y-4">
            {[
              { silo: "Silo Bin A1 (Adama)", crop: "Grade 1 Soybean", current: "3,200 MT", cap: "4,000 MT", pct: "80%", temp: "21.4°C" },
              { silo: "Silo Bin A2 (Adama)", crop: "Grade 1 Sesame", current: "2,850 MT", cap: "3,500 MT", pct: "81%", temp: "22.1°C" },
              { silo: "Silo Bin B1 (Hawassa)", crop: "Specialty Coffee", current: "2,100 MT", cap: "3,500 MT", pct: "60%", temp: "19.8°C" },
              { silo: "Silo Bin C1 (Jimma)", crop: "Grade 2 Soybean", current: "3,050 MT", cap: "4,000 MT", pct: "76%", temp: "22.5°C" },
            ].map((bin, idx) => (
              <div key={idx} className="space-y-1.5 p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#00261B]">{bin.silo} • {bin.crop}</span>
                  <span className="font-mono font-bold text-[#00261B]">{bin.current} / {bin.cap} ({bin.pct})</span>
                </div>
                <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-[#EAEFEA]">
                  <div className="bg-[#7F4F24] h-full rounded-full" style={{ width: bin.pct }} />
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#718575] pt-1">
                  <span>Grain Aeration: Optimal</span>
                  <span className="font-mono">Temp: {bin.temp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Receiving & Dispatch Log */}
        <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
            <h2 className="text-base font-bold text-[#00261B]">Today's Silo Intake Stream</h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#D1E7DD] text-[#0F5132]">
              148 GRNs Issued
            </span>
          </div>

          <div className="space-y-3">
            {[
              { id: "GRN-2026-9482", source: "Limmu Kosa Outgrowers", crop: "Soybean", weight: "124.5 Qt", grade: "Grade 1 Export" },
              { id: "GRN-2026-9481", source: "Arsi Grain Union", crop: "Sesame", weight: "185.0 Qt", grade: "Grade 1 Export" },
              { id: "GRN-2026-9480", source: "West Gojjam Cluster", crop: "Soybean", weight: "98.2 Qt", grade: "Grade 2 Domestic" },
              { id: "GRN-2026-9479", source: "Sidama Organic Union", crop: "Coffee", weight: "64.0 Qt", grade: "Specialty Grade 1" },
            ].map((grn, i) => (
              <div key={i} className="p-3 rounded-xl bg-[#FAF8F3] border border-[#EBE7DD] flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono font-bold text-[#7F4F24]">{grn.id}</span>
                  <p className="text-[#00261B] font-medium">{grn.source} • {grn.crop}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-[#00261B] block">{grn.weight}</span>
                  <span className="text-[10px] font-mono text-[#0F5132] font-semibold">{grn.grade}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DomainPageShell>
  );
}
