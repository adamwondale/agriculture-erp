"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const INVESTOR_KPIS: KpiMetric[] = [
  {
    title: "Smallholder Outreach",
    value: "38,240",
    change: "34% Women",
    changeType: "positive",
    subtext: "100% Ethiopian outgrower network",
    icon: "groups",
  },
  {
    title: "Household Income Uplift",
    value: "+31.2%",
    change: "Verified ESG",
    changeType: "positive",
    subtext: "Net harvest payout after input repayment",
    icon: "trending_up",
  },
  {
    title: "Audited ROI",
    value: "22.4%",
    change: "Season 2026",
    changeType: "positive",
    subtext: "Consolidated commercial agricultural margin",
    icon: "insights",
  },
  {
    title: "CO2 Sequestration",
    value: "14,200 MT",
    change: "Regenerative GAP",
    changeType: "positive",
    subtext: "Biochar & minimum tillage practices",
    icon: "eco",
  },
];

export default function InvestorReportsPage() {
  return (
    <DomainPageShell
      badge="Investor Relations & Board Reporting"
      badgeColor="#146B45"
      title="Executive Board Reporting Pack & ESG Impact Metrics"
      subtitle="Pixel-perfect printable PDF reports and raw financial exports for institutional lenders, development banks (ATI, World Bank), and equity investors."
      kpis={INVESTOR_KPIS}
      actions={[
        { label: "Export Excel Raw Data", icon: "table_view", variant: "outline" },
        { label: "Generate Board Pack (PDF)", icon: "picture_as_pdf", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-lg font-bold text-[#00261B]">Available Executive Reporting Packs</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Comprehensive Seasonal Crop Debrief",
              desc: "Complete yield reconciliation, input loan recovery rates, and gross margin analysis per woreda cluster.",
              format: "PDF • 24 Pages • High Res",
              icon: "menu_book",
            },
            {
              title: "ESG & Smallholder Socio-Economic Impact",
              desc: "Verified metrics on gender inclusivity, smallholder income uplift, child labor prohibition audits, and soil health.",
              format: "PDF • 18 Pages • Certified",
              icon: "diversity_3",
            },
            {
              title: "Audited Statutory Financial Statements (IFRS)",
              desc: "Consolidated P&L, multi-currency balance sheet, cash flows, and Ministry of Revenues tax withholding reconciliation.",
              format: "PDF + Excel Ledger",
              icon: "receipt_long",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] hover:border-[#D0C7B2] transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-white border border-[#EAEFEA] flex items-center justify-center text-[#0B3D2E] shadow-2xs">
                  <span className="material-symbols-outlined text-[22px]">{card.icon}</span>
                </div>
                <h3 className="text-sm font-bold text-[#00261B]">{card.title}</h3>
                <p className="text-xs text-[#718575] leading-relaxed">{card.desc}</p>
              </div>

              <div className="pt-3 border-t border-[#EBE7DD] flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-[#718575]">{card.format}</span>
                <button className="text-xs font-bold text-[#146B45] hover:text-[#0B3D2E] flex items-center gap-1">
                  <span>Download</span>
                  <span className="material-symbols-outlined text-[16px]">download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DomainPageShell>
  );
}
