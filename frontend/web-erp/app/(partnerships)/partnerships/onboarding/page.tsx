"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const ONBOARD_KPIS: KpiMetric[] = [
  {
    title: "Mandatory Checklist",
    value: "5 Requirements",
    change: "100% Strict",
    changeType: "positive",
    subtext: "Trade license, tax cert, bank reference, warehouse, background",
    icon: "fact_check",
  },
  {
    title: "Active Vetting",
    value: "3 Organizations",
    change: "Under Review",
    changeType: "warning",
    subtext: "Legal & Partnership Lead review in progress",
    icon: "policy",
  },
];

export default function PartnerOnboardingPage() {
  return (
    <DomainPageShell
      badge="Partner Due Diligence & Vetting"
      badgeColor="#3F2E56"
      title="Commercial Partner Due Diligence Checklist"
      subtitle="Strict vetting checklist for onboarding new cooperative unions: trade license, tax clearance, 2-year audited financials, warehouse inspection, and legal background check."
      kpis={ONBOARD_KPIS}
      actions={[
        { label: "New Partner Application", icon: "add", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Due Diligence Verification Checklist</h2>

        <div className="space-y-4">
          {[
            {
              org: "Bale Zone Grain Aggregators Union",
              type: "Cooperative Union • 4,200 Outgrowers",
              items: [
                { name: "Valid Trade License & Tax Clearance Certificate", verified: true },
                { name: "Bank Reference Letter & 2-year Audited Financials", verified: false },
                { name: "Previous Commodity Track Record & References", verified: true },
                { name: "Physical Warehouse & Collection Center Inspection", verified: false },
                { name: "Legal Background & Conflict of Interest Declaration", verified: true },
              ],
            },
          ].map((org, i) => (
            <div key={i} className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#00261B]">{org.org}</h3>
                  <span className="text-xs text-[#718575]">{org.type}</span>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#FFEAC2] text-[#804A00]">
                  3 of 5 Requirements Verified
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2">
                {org.items.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                      item.verified
                        ? "bg-[#D1E7DD]/40 border-[#A3CFBB] text-[#0F5132]"
                        : "bg-[#FCE4E4]/40 border-[#F8D7DA] text-[#C94B4B]"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {item.verified ? "verified" : "cancel"}
                    </span>
                    <span className="font-semibold">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DomainPageShell>
  );
}
