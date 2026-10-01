"use client";

import React, { useState } from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const TIER2_KPIS: KpiMetric[] = [
  {
    title: "Pending Tier 2",
    value: "4 Requests",
    change: "50k - 500k ETB",
    changeType: "warning",
    subtext: "COO + Finance Director dual authorization",
    icon: "verified",
  },
  {
    title: "Total Requisition",
    value: "840,000 ETB",
    change: "Operational",
    changeType: "neutral",
    subtext: "Seasonal field labor & emergency fleet rentals",
    icon: "payments",
  },
  {
    title: "Average SLA Time",
    value: "4.2 Hours",
    change: "Under 12h SLA",
    changeType: "positive",
    subtext: "Fast-track regional operational disbursements",
    icon: "schedule",
  },
];

export default function ApprovalsTier2Page() {
  const [approvedCount, setApprovedCount] = useState(0);

  return (
    <DomainPageShell
      badge="Tier 2 Approvals Desk (50,000 – 500,000 ETB)"
      badgeColor="#003F5C"
      title="Mid-Tier Operational & Logistics Authorization"
      subtitle="Joint sign-off executed by COO / Operations Director and Finance Director for regional operations and casual labor batches."
      kpis={TIER2_KPIS}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Pending Requisitions Queue</h2>

        <div className="space-y-3">
          {[
            {
              id: "REQ-2026-081",
              title: "Limmu Kosa Seasonal Weighbridge Casual Laborers (40 Workers)",
              dept: "Field Operations",
              amount: "240,000 ETB",
              budgetLine: "Seasonal Casual Labor Budget (18% remaining)",
              requester: "Solomon Girma (Farm Ops Mgr)",
            },
            {
              id: "REQ-2026-082",
              title: "Emergency 10-Tonne Flatbed Rental for Arsi Sesame Transit",
              dept: "Logistics & Fleet",
              amount: "185,000 ETB",
              budgetLine: "Third-Party Freight Allocation",
              requester: "Logistics Fleet Coordinator",
            },
            {
              id: "REQ-2026-083",
              title: "Adama Silo Digital Grain Aeration Probe Replacement",
              dept: "Warehouse & Silos",
              amount: "95,000 ETB",
              budgetLine: "Facility Maintenance CapEx",
              requester: "Kassahun Bekele (Warehouse Mgr)",
            },
          ].map((req, i) => (
            <div
              key={req.id}
              className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-[#146B45]">{req.id}</span>
                  <span className="text-xs font-mono font-bold text-[#00261B] bg-white px-2 py-0.5 rounded-md border border-[#DDE4DE]">
                    {req.amount}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#00261B]">{req.title}</h3>
                <p className="text-xs text-[#718575]">
                  Requester: {req.requester} • {req.budgetLine}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#C94B4B] bg-[#FCE4E4] hover:bg-[#F8D7DA]">
                  Reject
                </button>
                <button
                  onClick={() => setApprovedCount((prev) => prev + 1)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#0B3D2E] hover:bg-[#146B45] transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>Dual Authorize as COO</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DomainPageShell>
  );
}
