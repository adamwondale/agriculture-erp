"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const CROP_STATUS_KPIS: KpiMetric[] = [
  {
    title: "Vegetative Health",
    value: "0.81 NDVI",
    change: "Above Average",
    changeType: "positive",
    subtext: "Sentinel satellite multispectral canopy score",
    icon: "psychiatry",
  },
  {
    title: "Completed Inspections",
    value: "484 Visits",
    change: "Zorisis Agronomists",
    changeType: "positive",
    subtext: "Field visits logged by extension agents",
    icon: "fact_check",
  },
];

export default function PartnerCropStatusPage() {
  return (
    <DomainPageShell
      badge="Agronomic Monitoring & Crop Health"
      badgeColor="#2E5B70"
      title="Cooperative Member Crop Status & Agronomy Reports"
      subtitle="Review crop growth stages, pest scouting summaries, and field inspection findings submitted by Zorisis field agronomists."
      kpis={CROP_STATUS_KPIS}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Recent Field Agronomy Inspection Reports</h2>

        <div className="space-y-4">
          {[
            {
              parcel: "PRC-ETH-0941 • Bekele Tadesse",
              crop: "Soybean (TGX-1335) • Pod Filling Stage",
              date: "28 Sept 2026 by Dagnachew Kebede (Agronomist)",
              vigor: "Excellent Vigour (Rating 5/5) • Zero Pest Pressure",
              advice: "Soil moisture adequate. Keep field free of late weeds before pre-harvest crop sampling.",
            },
            {
              parcel: "PRC-ETH-0942 • Almaz Haile",
              crop: "Soybean (TGX-1335) • Pod Filling Stage",
              date: "27 Sept 2026 by Dagnachew Kebede (Agronomist)",
              vigor: "Good Vigour (Rating 4/5) • Low Weed Presence",
              advice: "Farmer completed second weeding. Inoculant nodulation active.",
            },
          ].map((rep, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#00261B] text-sm">{rep.parcel}</span>
                <span className="text-[10px] font-mono text-[#718575]">{rep.date}</span>
              </div>
              <p className="text-[#0B3D2E] font-medium">{rep.crop}</p>
              <div className="p-3 bg-white rounded-xl border border-[#DDE4DE] space-y-1">
                <span className="font-mono text-[#0F5132] font-semibold block">{rep.vigor}</span>
                <p className="text-[#718575]">{rep.advice}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DomainPageShell>
  );
}
