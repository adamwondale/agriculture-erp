"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const PARTNER_PORTAL_KPIS: KpiMetric[] = [
  {
    title: "Contracted Farmers",
    value: "12,400 Members",
    change: "14,500 ha",
    changeType: "positive",
    subtext: "Oromia Coffee & Grain Farmers Cooperative Union",
    icon: "groups",
  },
  {
    title: "Delivered Harvest",
    value: "4,820 MT",
    change: "Grade 1 Export",
    changeType: "positive",
    subtext: "Delivered to Jimma & Adama central silos",
    icon: "inventory_2",
  },
  {
    title: "Input Advance Repaid",
    value: "98.2%",
    change: "14.2M ETB",
    changeType: "positive",
    subtext: "Deducted at harvest weighbridge settlement",
    icon: "verified",
  },
  {
    title: "Earned Commission",
    value: "1.42M ETB",
    change: "10% Management Fee",
    changeType: "positive",
    subtext: "Management fee credited to Union bank account",
    icon: "payments",
  },
];

export default function PartnerDashboardPage() {
  return (
    <DomainPageShell
      badge="Commercial Partner Dedicated Portal"
      badgeColor="#2E5B70"
      title="Cooperative Union Private Operational Cockpit"
      subtitle="Private monitoring portal for cooperative unions and outgrower aggregators: crop growth stages, input allotments, harvest weigh-ins, and commission fee statements."
      kpis={PARTNER_PORTAL_KPIS}
      actions={[
        { label: "Member Farmers Roster", icon: "groups", href: "/partner/farmers", variant: "outline" },
        { label: "Crop Status Reports", icon: "psychiatry", href: "/partner/crop-status", variant: "outline" },
        { label: "Submit Operational Request", icon: "help_outline", href: "/partner/requests-desk", variant: "primary" },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contracted Farm Performance */}
        <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
            <h2 className="text-base font-bold text-[#00261B]">Member Crop Production Status</h2>
            <span className="text-xs font-mono font-bold text-[#146B45]">Mid-Season Active</span>
          </div>

          <div className="space-y-3">
            {[
              { crop: "Soybean (TGX-1335)", area: "8,500 ha", stage: "Pod Filling Stage", health: "Healthy Vigor (0.81 NDVI)" },
              { crop: "Specialty Organic Coffee", area: "4,000 ha", stage: "Berry Ripening Window", health: "Organic GAP Certified" },
              { crop: "Sesame (Humera-1)", area: "2,000 ha", stage: "Flowering Phase", health: "Good Condition" },
            ].map((c, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-[#00261B]">{c.crop}</h4>
                  <span className="text-[10px] text-[#718575]">{c.area} • {c.stage}</span>
                </div>
                <span className="text-[10px] font-mono text-[#0F5132] font-semibold">{c.health}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Governance & Access Notice */}
        <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
            <h2 className="text-base font-bold text-[#00261B]">Operational Governance Notice</h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#EAE5D9] text-[#00261B]">
              Z-Orisis Managed
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-2 text-xs text-[#4A5D4E] leading-relaxed">
            <p>
              As an authorized Commercial Partner, you have private visibility into your member farmers, crop progress, harvest deliveries, and commission statements.
            </p>
            <p>
              Since overall farm and field management is conducted under Zorisis Agronomy & Operations, day-to-day operations, agronomist assignments, and input distributions remain centrally governed.
            </p>
            <div className="pt-2">
              <a href="/partner/requests-desk" className="font-bold text-[#2E5B70] hover:underline flex items-center gap-1">
                <span>Submit Feedback or Operational Ticket</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </DomainPageShell>
  );
}
