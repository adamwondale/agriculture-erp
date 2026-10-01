"use client";

import React, { useState } from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const LEAVE_KPIS: KpiMetric[] = [
  {
    title: "Pending HR Audit",
    value: "6 Requests",
    change: "2-Step Flow",
    changeType: "warning",
    subtext: "Manager approved; awaiting HR balance recording",
    icon: "event_available",
  },
  {
    title: "Statutory Accrual",
    value: "16 + 1 Days",
    change: "Ethiopian Law",
    changeType: "positive",
    subtext: "Labor law monthly statutory accrual engine",
    icon: "gavel",
  },
];

export default function LeavePage() {
  const [approvedCount, setApprovedCount] = useState(0);

  return (
    <DomainPageShell
      badge="Leave & Absence Management"
      badgeColor="#804A00"
      title="Ethiopian Labor Law Leave Administration"
      subtitle="2-Step approval workflow: Direct Line Manager approves -> HR reviews and records. Statutory leave tracking: Annual (16+1), Sick, Maternity (120d), Paternity."
      kpis={LEAVE_KPIS}
      actions={[
        { label: "Submit Leave Request", icon: "add", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Pending Leave Approvals Queue</h2>

        <div className="space-y-3">
          {[
            {
              id: "LV-2026-041",
              name: "Dagnachew Kebede (Lead Zone Agronomist)",
              type: "Annual Statutory Leave",
              duration: "10 Working Days (12 Oct - 23 Oct 2026)",
              balance: "22 Days Accrued Available",
              managerSign: "Solomon Girma (Approved on 28/09/2026)",
            },
            {
              id: "LV-2026-042",
              name: "Selamawit Bekele (Junior Accountant)",
              type: "Maternity Leave",
              duration: "120 Calendar Days (Statutory Proclamation)",
              balance: "Certified Medical Certificate Attached",
              managerSign: "Kinde Gudeta (Approved on 29/09/2026)",
            },
          ].map((item, idx) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-[#804A00]">{item.id}</span>
                  <span className="text-xs font-bold text-[#00261B] bg-white px-2 py-0.5 rounded-md border border-[#DDE4DE]">
                    {item.type}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#00261B]">{item.name}</h3>
                <p className="text-xs text-[#0B3D2E] font-medium">{item.duration}</p>
                <p className="text-[11px] text-[#718575]">{item.balance} • {item.managerSign}</p>
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
                  <span>HR Review & Record</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DomainPageShell>
  );
}
