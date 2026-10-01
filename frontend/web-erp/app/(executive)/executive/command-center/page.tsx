"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const TOP_10_KPIS: KpiMetric[] = [
  {
    title: "Planted vs Target",
    value: "42,500 ha",
    change: "85% Target",
    changeType: "positive",
    subtext: "Target: 50,000 ha across 4 regional clusters",
    icon: "landscape",
  },
  {
    title: "Registered Farmers",
    value: "38,240",
    change: "34% Female",
    changeType: "positive",
    subtext: "+4,120 onboarded this season",
    icon: "groups",
  },
  {
    title: "Real-time Crop Health",
    value: "0.78 NDVI",
    change: "Healthy Vigor",
    changeType: "positive",
    subtext: "Only 2.4% area flagged for moisture stress",
    icon: "psychiatry",
  },
  {
    title: "Projected Harvest",
    value: "84,000 MT",
    change: "92% Buyer Match",
    changeType: "neutral",
    subtext: "Soybean: 48k MT | Sesame: 36k MT",
    icon: "agriculture",
  },
  {
    title: "Delivered to Date",
    value: "14,850 MT",
    change: "+1,240 MT Today",
    changeType: "positive",
    subtext: "Intake velocity at peak collection hubs",
    icon: "local_shipping",
  },
  {
    title: "Input Loan Recovery",
    value: "96.4%",
    change: "38.2M ETB",
    changeType: "positive",
    subtext: "Recovered via automated harvest netting",
    icon: "verified",
  },
  {
    title: "Consolidated Revenue",
    value: "412.5M ETB",
    change: "+18.2% YoY",
    changeType: "positive",
    subtext: "Gross Margin: 28.4% (117.1M ETB)",
    icon: "payments",
  },
  {
    title: "Export Ready Silo Stock",
    value: "11,200 MT",
    change: "Grade 1 Export",
    changeType: "positive",
    subtext: "Stored at Adama & Hawassa Central Silos",
    icon: "warehouse",
  },
  {
    title: "SLA Overdue Approvals",
    value: "3 Pending",
    change: "Action Required",
    changeType: "warning",
    subtext: "2 CapEx tenders > 500k ETB awaiting CEO",
    icon: "warning",
  },
  {
    title: "Disbursed to Farmers",
    value: "184.2M ETB",
    change: "100% Mobile",
    changeType: "positive",
    subtext: "Telebirr Bulk & CBE Birr direct payouts",
    icon: "account_balance_wallet",
  },
];

export default function ExecutiveCommandCenterPage() {
  return (
    <DomainPageShell
      badge="Executive Leadership & CEO Command"
      badgeColor="#C94B4B"
      title="Strategic Command Center & Top-10 KPI Cockpit"
      subtitle="Comprehensive nationwide operational posture, consolidated financials, harvest delivery velocity, and executive approvals."
      kpis={TOP_10_KPIS}
      actions={[
        {
          label: "Macro GIS Intelligence",
          icon: "map",
          href: "/executive/macro-gis",
          variant: "outline",
        },
        {
          label: "Tier 3 Approvals (3)",
          icon: "gavel",
          href: "/executive/approvals-tier3",
          variant: "danger",
        },
        {
          label: "Export Board Deck (PDF)",
          icon: "download",
          href: "/executive/investor-reports",
          variant: "primary",
        },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* National Inflow & Harvest Velocity Chart Container */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#146B45] uppercase tracking-wider block">
                Seasonal Inflow Pipeline
              </span>
              <h2 className="text-lg font-bold text-[#00261B]">
                Daily Harvest Weighbridge Intake Velocity (MT)
              </h2>
            </div>
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-[#EAE5D9] text-[#00261B]">
              Peak Season Active
            </span>
          </div>

          <div className="h-64 flex items-end gap-3 pt-8 pb-2 px-4 bg-[#FAF8F3] rounded-2xl border border-[#EBE7DD]">
            {[
              { day: "Mon", mt: 680, height: "45%" },
              { day: "Tue", mt: 820, height: "55%" },
              { day: "Wed", mt: 950, height: "65%" },
              { day: "Thu", mt: 1100, height: "75%" },
              { day: "Fri", mt: 1240, height: "85%" },
              { day: "Sat", mt: 1420, height: "95%" },
              { day: "Sun (Est)", mt: 1350, height: "90%" },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-mono font-bold text-[#00261B] opacity-0 group-hover:opacity-100 transition-opacity">
                  {col.mt} MT
                </span>
                <div
                  className="w-full bg-[#146B45] group-hover:bg-[#0B3D2E] rounded-t-lg transition-all"
                  style={{ height: col.height }}
                />
                <span className="text-[11px] font-mono text-[#718575]">{col.day}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
            <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#EBE7DD]">
              <span className="text-[10px] font-mono text-[#718575] block">7-Day Total</span>
              <span className="font-bold font-mono text-[#00261B] text-sm">7,560 MT</span>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#EBE7DD]">
              <span className="text-[10px] font-mono text-[#718575] block">Quality Grade 1 Ratio</span>
              <span className="font-bold font-mono text-[#0F5132] text-sm">91.8% Export</span>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#EBE7DD]">
              <span className="text-[10px] font-mono text-[#718575] block">Average Moisture</span>
              <span className="font-bold font-mono text-[#00261B] text-sm">11.4% (Optimal)</span>
            </div>
          </div>
        </div>

        {/* Executive Action Queue & Escalation Warnings */}
        <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
            <h2 className="text-lg font-bold text-[#00261B]">Executive Action Items</h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FCE4E4] text-[#C94B4B]">
              3 Overdue
            </span>
          </div>

          <div className="space-y-3">
            {[
              {
                title: "Oromia West Hararghe Mega Settlement",
                type: "Farmer Payout Batch",
                amount: "14.2M ETB",
                due: "SLA Warning: 3h left",
                urgency: "danger",
              },
              {
                title: "John Deere Harvester Fleet Tender",
                type: "CapEx Purchase Order",
                amount: "1.85M ETB",
                due: "SLA Exceeded by 14h",
                urgency: "danger",
              },
              {
                title: "EU Organic Tripartite Export Contract",
                type: "Offtaker Master Agreement",
                amount: "$1.4M USD",
                due: "Pending Dual Digital Sign-off",
                urgency: "warning",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl border border-[#EBE7DD] hover:border-[#D0C7B2] bg-[#FAF8F3] space-y-1.5 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#718575]">
                    {item.type}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#00261B]">{item.amount}</span>
                </div>
                <h3 className="text-xs font-bold text-[#00261B]">{item.title}</h3>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-mono text-[#C94B4B] font-semibold">{item.due}</span>
                  <span className="material-symbols-outlined text-[16px] text-[#0B3D2E]">arrow_forward</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DomainPageShell>
  );
}
