"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const LOT_KPIS: KpiMetric[] = [
  {
    title: "Tracked Batches",
    value: "420 Lots",
    change: "GS1 Compliant",
    changeType: "positive",
    subtext: "Full farmer-to-fork origin traceability",
    icon: "qr_code",
  },
  {
    title: "Pallet QR Codes",
    value: "8,400 Bags",
    change: "Individual QR",
    changeType: "positive",
    subtext: "Digital passport attached to each 50kg bag",
    icon: "barcode",
  },
  {
    title: "Quarantined Batches",
    value: "Zero Lots",
    change: "Clean Roster",
    changeType: "positive",
    subtext: "No aflatoxin or chemical residue flags",
    icon: "gpp_good",
  },
];

export default function LotTraceabilityPage() {
  return (
    <DomainPageShell
      badge="Lot Traceability & QR Passport"
      badgeColor="#7F4F24"
      title="Batch / Lot Management & GS1 QR Barcode Engine"
      subtitle="Generating and inspecting batch identifiers with complete traceability linking grain lots back to individual farmer contributions, farm GPS parcels, and harvest dates."
      kpis={LOT_KPIS}
      actions={[
        { label: "Batch Print QR Labels", icon: "print", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Authoritative Warehouse Grain Lots</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEFEA] text-[10px] font-mono uppercase text-[#718575]">
                <th className="pb-3 font-bold">Lot Number</th>
                <th className="pb-3 font-bold">Commodity & Grade</th>
                <th className="pb-3 font-bold">Net Quantity</th>
                <th className="pb-3 font-bold">Source Origin</th>
                <th className="pb-3 font-bold">Storage Silo / Bin</th>
                <th className="pb-3 font-bold">Intake Date</th>
                <th className="pb-3 font-bold">GS1 QR Passport</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFEA]">
              {[
                { lot: "LOT-2026-ETH-01", crop: "Soybean • Grade 1 Export", qty: "124.5 Qt (249 Bags)", origin: "Limmu Kosa (PRC-ETH-0941)", bin: "Silo Bin A1 (Adama)", date: "29/09/2026", qr: "GS1-EPCIS Active" },
                { lot: "LOT-2026-ETH-02", crop: "Sesame • Grade 1 Export", qty: "185.0 Qt (370 Bags)", origin: "Arsi Robe (PRC-ETH-0943)", bin: "Silo Bin A2 (Adama)", date: "29/09/2026", qr: "GS1-EPCIS Active" },
                { lot: "LOT-2026-ETH-03", crop: "Coffee • Specialty Grade 1", qty: "64.0 Qt (128 Bags)", origin: "Sidama Organic Union", bin: "Silo Bin B1 (Hawassa)", date: "28/09/2026", qr: "GS1-EPCIS Active" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#146B45]">{row.lot}</td>
                  <td className="py-3.5 font-bold text-[#00261B]">{row.crop}</td>
                  <td className="py-3.5 font-mono font-bold text-[#00261B]">{row.qty}</td>
                  <td className="py-3.5 text-[#4A5D4E]">{row.origin}</td>
                  <td className="py-3.5 text-[#00261B] font-medium">{row.bin}</td>
                  <td className="py-3.5 font-mono text-[#718575]">{row.date}</td>
                  <td className="py-3.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#D1E7DD] text-[#0F5132] flex items-center gap-1 w-fit">
                      <span className="material-symbols-outlined text-[14px]">qr_code_2</span>
                      <span>{row.qr}</span>
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
