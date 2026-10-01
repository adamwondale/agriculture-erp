"use client";

import React, { useState } from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const REQUEST_KPIS: KpiMetric[] = [
  {
    title: "Open Requests",
    value: "1 Inquiry",
    change: "Under Review",
    changeType: "neutral",
    subtext: "Ticket routed to Zorisis Partnership Lead",
    icon: "help_outline",
  },
  {
    title: "Resolved Tickets",
    value: "18 Requests",
    change: "100% Resolved",
    changeType: "positive",
    subtext: "Average response time: 3.4 hours",
    icon: "task_alt",
  },
];

export default function PartnerRequestsDeskPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <DomainPageShell
      badge="Partner Support & Communication Desk"
      badgeColor="#2E5B70"
      title="Partner Inquiries, Problem Reports & Approvals"
      subtitle="Dedicated communication channel to submit farm-related inquiries, report operational problems, provide feedback on management reports, and approve authorized matters."
      kpis={REQUEST_KPIS}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-xl font-bold text-[#00261B]">Submit Operational Inquiry or Feedback</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-[#00261B] block">Category</label>
            <select className="w-full p-3 rounded-xl bg-white border border-[#DDE4DE] text-[#00261B] font-medium">
              <option>Agronomy Advisory Inquiry</option>
              <option>Weighbridge Scale Discrepancy</option>
              <option>Input Allocation Replenishment</option>
              <option>Payment & Commission Query</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-[#00261B] block">Subject / Cluster</label>
            <input
              type="text"
              placeholder="e.g. Limmu Kosa weighing station schedule request"
              className="w-full p-3 rounded-xl bg-white border border-[#DDE4DE] text-[#00261B] font-medium"
            />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="font-bold text-[#00261B] block">Details & Description</label>
            <textarea
              rows={4}
              placeholder="Provide exact details, farmer codes, or collection center references..."
              className="w-full p-3 rounded-xl bg-white border border-[#DDE4DE] text-[#00261B] font-medium"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#EAEFEA]">
          <span className="text-xs text-[#718575]">
            Routed directly to Helen Mulugeta (Partnership Lead) with SLA tracking.
          </span>

          <button
            onClick={() => setSubmitted(true)}
            className={`px-6 py-2.5 rounded-2xl text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center gap-2 ${
              submitted
                ? "bg-[#146B45] text-white"
                : "bg-[#0B3D2E] text-white hover:bg-[#146B45]"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {submitted ? "done_all" : "send"}
            </span>
            <span>{submitted ? "Inquiry Dispatched to Zorisis Lead" : "Submit Operational Ticket"}</span>
          </button>
        </div>
      </div>
    </DomainPageShell>
  );
}
