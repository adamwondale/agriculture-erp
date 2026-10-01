"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const PARTNER_KPIS: KpiMetric[] = [
  {
    title: "Partner Organizations",
    value: "42 Partners",
    change: "Coops & Private",
    changeType: "positive",
    subtext: "Cooperative unions & commercial nucleus farms",
    icon: "handshake",
  },
  {
    title: "Contracted Farmer Base",
    value: "38,240 Farmers",
    change: "100% Aggregated",
    changeType: "positive",
    subtext: "Managed under partner cooperative umbrellas",
    icon: "groups",
  },
  {
    title: "Delivery Compliance Rate",
    value: "94.8%",
    change: "Exceeds Target",
    changeType: "positive",
    subtext: "Actual harvest delivered vs contracted target",
    icon: "verified",
  },
  {
    title: "Pending Due Diligence",
    value: "3 Organizations",
    change: "Action Required",
    changeType: "warning",
    subtext: "Awaiting audited financials & tax clearance",
    icon: "policy",
  },
];

export default function PartnershipsDashboardPage() {
  return (
    <DomainPageShell
      badge="Partnership & Brand Management"
      badgeColor="#3F2E56"
      title="Commercial Partnerships & Cooperative Networks"
      subtitle="Management of cooperative unions, outgrower commercial agreements, due diligence checklists, proposals, and monthly partner scorecards."
      kpis={PARTNER_KPIS}
      actions={[
        { label: "Due Diligence Desk", icon: "policy", href: "/partnerships/onboarding", variant: "outline" },
        { label: "Proposals & Agreements", icon: "description", href: "/partnerships/proposals", variant: "outline" },
        { label: "Partner Scorecards", icon: "analytics", href: "/partnerships/scorecards", variant: "primary" },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cooperative Union Overview */}
        <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
            <h2 className="text-base font-bold text-[#00261B]">Key Partner Cooperatives</h2>
            <span className="text-xs font-mono font-bold text-[#146B45]">Active Contracts</span>
          </div>

          <div className="space-y-3">
            {[
              { name: "Oromia Coffee & Grain Farmers Cooperative Union", farmers: "12,400 Farmers", area: "14,500 ha", score: "98% Compliance", status: "Premier Tier 1" },
              { name: "Arsi Robe Smallholder Union", farmers: "8,900 Farmers", area: "10,200 ha", score: "94% Compliance", status: "Active Partner" },
              { name: "West Gojjam Agricultural Union", farmers: "9,800 Farmers", area: "11,800 ha", score: "91% Compliance", status: "Active Partner" },
            ].map((p, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#00261B]">{p.name}</h4>
                  <span className="text-[10px] font-mono text-[#0F5132] font-semibold">{p.score}</span>
                </div>
                <p className="text-[#718575]">{p.farmers} • {p.area} • Status: {p.status}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Due Diligence Warnings */}
        <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
            <h2 className="text-base font-bold text-[#00261B]">Pending Due Diligence & Renewals</h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FFEAC2] text-[#804A00]">
              Action Required
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-2 text-xs">
              <h4 className="font-bold text-[#00261B]">Bale Zone Grain Aggregators Union</h4>
              <p className="text-[#718575]">
                Missing 2-year audited financial statements and warehouse inspection certificate. Partner activation paused.
              </p>
              <span className="text-[11px] font-bold text-[#3F2E56] block">Review Due Diligence &rarr;</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-2 text-xs">
              <h4 className="font-bold text-[#00261B]">Seasonal Contract Expiration Alert</h4>
              <p className="text-[#718575]">
                4 cooperative partner agreements expire in 60 days. System renewal recommendations calculated based on scorecards.
              </p>
              <span className="text-[11px] font-bold text-[#3F2E56] block">Review Scorecards &rarr;</span>
            </div>
          </div>
        </div>
      </div>
    </DomainPageShell>
  );
}
