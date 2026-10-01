"use client";

import React, { useState } from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const INPUT_KPIS: KpiMetric[] = [
  {
    title: "Pending Vouchers",
    value: "14 Vouchers",
    change: "Stage 2 Sign-off",
    changeType: "warning",
    subtext: "Verified by Agronomist; awaiting Farm Ops Mgr",
    icon: "assignment",
  },
  {
    title: "Voucher Credit Total",
    value: "1.24M ETB",
    change: "In-Kind Credit",
    changeType: "neutral",
    subtext: "Deducted automatically at harvest settlement",
    icon: "payments",
  },
  {
    title: "Eligibility Check",
    value: "100% Passed",
    change: "Zero Default",
    changeType: "positive",
    subtext: "Valid land tenure and no unpaid past input debt",
    icon: "verified",
  },
];

export default function InputAllocationsPage() {
  const [approvedCount, setApprovedCount] = useState(0);

  return (
    <DomainPageShell
      badge="Input Distribution Vouchers"
      badgeColor="#2C5E1A"
      title="Input Allocation Approval & Credit Release"
      subtitle="2-Step approval workflow: Field Agronomist verifies farmer eligibility and land size -> Farming Operations Manager authorizes physical release voucher."
      kpis={INPUT_KPIS}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Input Allocation Requisition Vouchers</h2>

        <div className="space-y-3">
          {[
            {
              id: "VCH-INP-2026-001",
              farmer: "Bekele Tadesse (Limmu Kosa)",
              parcel: "PRC-ETH-0941 (3.2 ha)",
              items: "96 kg Certified Soybean Seed (TGX-1335) + 320 kg NPSB Fertilizer",
              value: "18,400 ETB",
              agronomist: "Dagnachew Kebede (Field Verified)",
            },
            {
              id: "VCH-INP-2026-002",
              farmer: "Almaz Haile (Jimma Hub)",
              parcel: "PRC-ETH-0942 (2.5 ha)",
              items: "75 kg Certified Soybean Seed + 250 kg NPSB Fertilizer + Inoculant",
              value: "15,200 ETB",
              agronomist: "Dagnachew Kebede (Field Verified)",
            },
            {
              id: "VCH-INP-2026-003",
              farmer: "Worku Desta (Arsi Robe)",
              parcel: "PRC-ETH-0943 (4.8 ha)",
              items: "24 kg Certified Sesame Seed (Humera-1) + 480 kg NPSB Fertilizer",
              value: "22,800 ETB",
              agronomist: "Fatuma Hassen (Field Verified)",
            },
          ].map((v, i) => (
            <div
              key={v.id}
              className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-[#146B45]">{v.id}</span>
                  <span className="text-xs font-mono font-bold text-[#00261B] bg-white px-2 py-0.5 rounded-md border border-[#DDE4DE]">
                    {v.value}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#00261B]">{v.farmer} • {v.parcel}</h3>
                <p className="text-xs text-[#0B3D2E] font-medium">{v.items}</p>
                <p className="text-[11px] text-[#718575]">{v.agronomist}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#C94B4B] bg-[#FCE4E4] hover:bg-[#F8D7DA]">
                  Reject
                </button>
                <button
                  onClick={() => setApprovedCount((p) => p + 1)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#0B3D2E] hover:bg-[#146B45] transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>Approve Distribution Voucher</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DomainPageShell>
  );
}
