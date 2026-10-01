"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const FARM_OPS_KPIS: KpiMetric[] = [
  {
    title: "Managed Parcels",
    value: "14,820",
    change: "42,500 ha",
    changeType: "positive",
    subtext: "Active crop production parcels this season",
    icon: "grid_view",
  },
  {
    title: "Field Agronomists",
    value: "112 Staff",
    change: "100% Deployed",
    changeType: "positive",
    subtext: "Average 132 parcels assigned per agronomist",
    icon: "person",
  },
  {
    title: "Crop Plan Adherence",
    value: "94.2%",
    change: "On Schedule",
    changeType: "positive",
    subtext: "Land preparation & planting milestones met",
    icon: "checklist",
  },
  {
    title: "Input Voucher Releases",
    value: "14,240",
    change: "38.2M ETB",
    changeType: "positive",
    subtext: "Seeds & NPSB fertilizer distributed on credit",
    icon: "shopping_bag",
  },
  {
    title: "Yield Variance Alerts",
    value: "18 Parcels",
    change: ">20% Variance",
    changeType: "warning",
    subtext: "Mandatory agronomy field loss investigation",
    icon: "query_stats",
  },
];

export default function FarmingOpsDashboardPage() {
  return (
    <DomainPageShell
      badge="Farming Operations Management"
      badgeColor="#2C5E1A"
      title="Regional Crop Production & Parcel Governance"
      subtitle="Consolidation of field-level crop plans, parcel boundary GIS approvals, farmer roster lifecycle, and input voucher authorizations."
      kpis={FARM_OPS_KPIS}
      actions={[
        { label: "Crop Plans", icon: "assignment", href: "/farming-ops/crop-plans", variant: "outline" },
        { label: "Parcels GIS", icon: "map", href: "/farming-ops/parcels", variant: "outline" },
        { label: "Farmer Roster", icon: "groups", href: "/farming-ops/farmer-roster", variant: "outline" },
        { label: "Approve Input Vouchers", icon: "verified", href: "/farming-ops/input-allocations", variant: "primary" },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seasonal Milestones Tracker */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
            <h2 className="text-base font-bold text-[#00261B]">
              Season 2026 / 2018 ዓ.ም Meher Milestone Progress
            </h2>
            <span className="text-xs font-mono font-bold text-[#146B45]">Mid-Season Vegetative</span>
          </div>

          <div className="space-y-4">
            {[
              { phase: "1. Land Preparation (Plowing & Harrowing)", pct: "100%", status: "Completed", color: "bg-emerald-600" },
              { phase: "2. Certified Seed & Basal Fertilizer Distribution", pct: "100%", status: "Completed", color: "bg-emerald-600" },
              { phase: "3. Planting & Seedling Emergence (Germination)", pct: "96.4%", status: "On Target", color: "bg-emerald-600" },
              { phase: "4. Mid-Vegetative & Weeding Operations", pct: "78.2%", status: "Active in Field", color: "bg-[#0B3D2E]" },
              { phase: "5. Pre-Harvest Crop Cut & Moisture Sampling", pct: "14.0%", status: "Starting in 3 Wks", color: "bg-[#718575]" },
            ].map((p, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#00261B]">{p.phase}</span>
                  <span className="font-mono font-bold text-[#146B45]">{p.pct} • {p.status}</span>
                </div>
                <div className="w-full bg-[#FAF8F3] h-2.5 rounded-full overflow-hidden border border-[#EBE7DD]">
                  <div className={`h-full rounded-full ${p.color}`} style={{ width: p.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agronomist Field Coverage & Load */}
        <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
            <h2 className="text-base font-bold text-[#00261B]">Zone Agronomist Teams</h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#EAE5D9] text-[#00261B]">
              4 Zones
            </span>
          </div>

          <div className="space-y-3">
            {[
              { zone: "Limmu Kosa Zone", lead: "Dagnachew K.", agronomists: 34, parcels: 4820, health: "98% On Time" },
              { zone: "Gera Highland Zone", lead: "Mekonnen A.", agronomists: 28, parcels: 3940, health: "94% On Time" },
              { zone: "Arsi Central Zone", lead: "Fatuma H.", agronomists: 30, parcels: 4120, health: "97% On Time" },
              { zone: "West Gojjam Zone", lead: "Tewodros M.", agronomists: 20, parcels: 1940, health: "91% On Time" },
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#00261B]">{item.zone}</h4>
                  <span className="text-[10px] font-mono text-[#146B45] font-semibold">{item.health}</span>
                </div>
                <p className="text-[11px] text-[#718575]">
                  Lead: {item.lead} • {item.agronomists} Agronomists • {item.parcels} Parcels
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DomainPageShell>
  );
}
