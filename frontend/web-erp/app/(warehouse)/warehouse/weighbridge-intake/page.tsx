"use client";

import React, { useState } from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const WEIGH_KPIS: KpiMetric[] = [
  {
    title: "Today's GRN Count",
    value: "148 GRNs",
    change: "Instant Issue",
    changeType: "positive",
    subtext: "Issued at gross - tare weigh scale",
    icon: "receipt_long",
  },
  {
    title: "Net Intake",
    value: "1,240 MT",
    change: "+12.4%",
    changeType: "positive",
    subtext: "Net commodity weight added to inventory",
    icon: "scale",
  },
  {
    title: "SMS Receipts Dispatched",
    value: "100%",
    change: "Direct to Farmer",
    changeType: "positive",
    subtext: "Instant Amharic/Oromoo weigh-in confirmation",
    icon: "sms",
  },
];

export default function WeighbridgeIntakePage() {
  const [issued, setIssued] = useState(false);

  return (
    <DomainPageShell
      badge="Weighbridge & GRN Desk"
      badgeColor="#7F4F24"
      title="Weighbridge Intake & Real-Time GRN Issuance"
      subtitle="Capture gross weight, tare weight, net quintals, moisture %, and instantly issue digital Goods Received Notes (GRN) with QR code."
      kpis={WEIGH_KPIS}
      actions={[
        { label: "Scale Calibration Test", icon: "tune", variant: "outline" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EAEFEA]">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#7F4F24] uppercase tracking-wider block">
              Weighbridge Terminal • Scale #02
            </span>
            <h2 className="text-xl font-bold text-[#00261B]">New Vehicle Intake Weigh-In</h2>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-[#FAF8F3] border border-[#DDE4DE] text-[#00261B]">
            Sensor Status: Digital Scale Connected (COM3)
          </span>
        </div>

        {/* Live Weight Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-1">
            <span className="text-[10px] font-mono font-bold text-[#718575] uppercase">Gross Weight</span>
            <div className="text-2xl font-bold font-mono text-[#00261B]">18,450 kg</div>
            <span className="text-[10px] text-[#718575]">Truck + Full Cargo</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-1">
            <span className="text-[10px] font-mono font-bold text-[#718575] uppercase">Tare Weight</span>
            <div className="text-2xl font-bold font-mono text-[#718575]">6,000 kg</div>
            <span className="text-[10px] text-[#718575]">Empty Truck (Post-Dump)</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#EAF5EE] border border-[#C2E3CD] space-y-1">
            <span className="text-[10px] font-mono font-bold text-[#0F5132] uppercase">Net Cargo Weight</span>
            <div className="text-2xl font-bold font-mono text-[#0B3D2E]">12,450 kg (124.5 Qt)</div>
            <span className="text-[10px] text-[#0F5132] font-semibold">249 Bags (50kg PP Bags)</span>
          </div>
        </div>

        {/* Origin & Quality Check */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-[#00261B] block">Source Origin</label>
            <input
              type="text"
              readOnly
              value="Bekele Tadesse • Limmu Kosa Hub (PRC-ETH-0941)"
              className="w-full p-3 rounded-xl bg-[#FAF8F3] border border-[#EBE7DD] text-[#00261B] font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-[#00261B] block">Commodity & Quality Result</label>
            <input
              type="text"
              readOnly
              value="Soybean (TGX-1335) • Moisture: 11.2% • Grade 1 Export"
              className="w-full p-3 rounded-xl bg-[#FAF8F3] border border-[#EBE7DD] text-[#00261B] font-medium"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#EAEFEA]">
          <span className="text-xs text-[#718575]">
            Issuing this GRN will automatically increment Silo A1 stock and dispatch an automated SMS receipt to the farmer.
          </span>

          <button
            onClick={() => setIssued(true)}
            className={`px-6 py-2.5 rounded-2xl text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center gap-2 ${
              issued
                ? "bg-[#146B45] text-white"
                : "bg-[#0B3D2E] text-white hover:bg-[#146B45]"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {issued ? "verified" : "print"}
            </span>
            <span>{issued ? "GRN-2026-9483 Issued & SMS Dispatched" : "Generate GRN & Print Ticket"}</span>
          </button>
        </div>
      </div>
    </DomainPageShell>
  );
}
