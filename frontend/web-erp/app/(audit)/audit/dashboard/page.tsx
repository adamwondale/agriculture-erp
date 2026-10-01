"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const AUDIT_KPIS: KpiMetric[] = [
  {
    title: "Immutable Audit Vault",
    value: "7 Years",
    change: "Statutory Law",
    changeType: "positive",
    subtext: "Ethiopian National Bank & Tax compliant",
    icon: "history",
  },
  {
    title: "Active Certifications",
    value: "5 Standards",
    change: "100% Certified",
    changeType: "positive",
    subtext: "GlobalG.A.P., EU Organic, Fairtrade, Non-GMO",
    icon: "verified",
  },
  {
    title: "Open CAPA Non-Conformances",
    value: "1 Remediation",
    change: "Action Required",
    changeType: "warning",
    subtext: "Chemical store ventilation corrective action",
    icon: "assignment_late",
  },
  {
    title: "EUDR Deforestation Compliance",
    value: "100% Pass",
    change: "EU Customs Ready",
    changeType: "positive",
    subtext: "GeoJSON polygons verified against 2020 baseline",
    icon: "park",
  },
];

export default function AuditDashboardPage() {
  return (
    <DomainPageShell
      badge="Internal Audit & Statutory Compliance"
      badgeColor="#432874"
      title="Compliance Health & 7-Year Audit Vault"
      subtitle="Comprehensive internal audit inspection, agricultural certification calendars (GlobalG.A.P., EU Organic), CAPA remediation, and EUDR customs packages."
      kpis={AUDIT_KPIS}
      actions={[
        { label: "7-Year Audit Explorer", icon: "receipt_long", href: "/audit/system-logs", variant: "outline" },
        { label: "Certifications Calendar", icon: "verified", href: "/audit/certifications", variant: "outline" },
        { label: "EUDR Customs Package", icon: "public", href: "/audit/eudr-export", variant: "primary" },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Certification Expiry Reminders */}
        <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
            <h2 className="text-base font-bold text-[#00261B]">Certification Renewal Timeline</h2>
            <span className="text-xs font-mono font-bold text-[#146B45]">Automated 90/60/30 Alerts</span>
          </div>

          <div className="space-y-3">
            {[
              { cert: "EU Organic Certification (EOS / NOP)", expiry: "Expires in 84 Days (Dec 2026)", status: "Internal Audit Simulation Passed" },
              { cert: "GlobalG.A.P. & GRASP Social Standards", expiry: "Expires in 142 Days (Feb 2027)", status: "Farm Checklists Complete" },
              { cert: "Fairtrade International Smallholder Standard", expiry: "Expires in 210 Days", status: "Premium Committee Active" },
            ].map((c, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#00261B]">{c.cert}</h4>
                  <span className="text-[10px] font-mono text-[#432874] font-semibold">{c.expiry}</span>
                </div>
                <p className="text-[11px] text-[#718575]">{c.status}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rapid Product Recall Readiness */}
        <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
            <h2 className="text-base font-bold text-[#00261B]">Emergency Product Recall Capability</h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#D1E7DD] text-[#0F5132]">
              Mock Recall: 14 mins
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-3 text-xs">
            <p className="text-[#4A5D4E] leading-relaxed">
              Upon detection of aflatoxin or unauthorized chemical residues, the emergency recall command center instantly freezes affected inventory lots and traces both upstream (to farm GPS parcels) and downstream (to export buyer consignments).
            </p>
            <a
              href="/audit/product-recall"
              className="inline-flex items-center gap-1.5 font-bold text-[#C94B4B] hover:text-[#A83232]"
            >
              <span>Product Recall Command Center</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </DomainPageShell>
  );
}
