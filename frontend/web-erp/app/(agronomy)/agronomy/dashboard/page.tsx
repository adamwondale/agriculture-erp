"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const AGRONOMY_KPIS: KpiMetric[] = [
  {
    title: "National NDVI Health",
    value: "0.78 NDVI",
    change: "Healthy Canopy",
    changeType: "positive",
    subtext: "Sentinel-2 satellite multispectral indices",
    icon: "psychiatry",
  },
  {
    title: "Cataloged Varieties",
    value: "28 Varieties",
    change: "Certified",
    changeType: "positive",
    subtext: "Soybeans, Sesame, Maize, Coffee cultivars",
    icon: "grain",
  },
  {
    title: "Analyzed Soil Samples",
    value: "1,420 Labs",
    change: "100% Traceable",
    changeType: "positive",
    subtext: "pH, Nitrogen, Phosphorus & Micronutrient data",
    icon: "science",
  },
  {
    title: "Emergency Spray Approvals",
    value: "2 Requests",
    change: "Fall Armyworm",
    changeType: "warning",
    subtext: "Restricted chemical applications awaiting sign-off",
    icon: "pest_control",
  },
  {
    title: "Dispatched Advisories",
    value: "128,400 SMS",
    change: "Amharic & Oromoo",
    changeType: "positive",
    subtext: "Pre-approved growth-stage agronomic advice",
    icon: "sms",
  },
];

export default function AgronomyDashboardPage() {
  return (
    <DomainPageShell
      badge="Research & Agronomy Intelligence"
      badgeColor="#1B4332"
      title="Agronomic Decision Support & Crop Health Cockpit"
      subtitle="Scientific crop master data, soil nutrient fertility repositories, high-risk chemical approvals, and multi-stage satellite yield forecasting."
      kpis={AGRONOMY_KPIS}
      actions={[
        { label: "Crop Variety Catalog", icon: "menu_book", href: "/agronomy/crop-catalog", variant: "outline" },
        { label: "Soil Laboratory Tests", icon: "science", href: "/agronomy/soil-tests", variant: "outline" },
        { label: "Emergency Chemical Approvals (2)", icon: "pest_control", href: "/agronomy/advisory-packages", variant: "danger" },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pest & Disease Early Warning Bulletin */}
        <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
            <h2 className="text-base font-bold text-[#00261B]">Pest & Disease Threat Heatmap</h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FCE4E4] text-[#C94B4B]">
              Active Alert
            </span>
          </div>

          <div className="space-y-3">
            {[
              { pest: "Fall Armyworm (Spodoptera frugiperda)", crop: "Hybrid Maize", woreda: "West Gojjam Cluster", severity: "High (24% canopy infestation)", status: "Biopesticide Emergency Protocol Activated" },
              { pest: "Soybean Rust (Phakopsora pachyrhizi)", crop: "Soybean", woreda: "Limmu Kosa Hub", severity: "Moderate (8% leaf spotting)", status: "Fungicide Spray Recommended" },
              { pest: "Sesame Gall Midge (Asphondylia sesami)", crop: "Sesame", woreda: "Arsi Robe Cluster", severity: "Low (< 2% threshold)", status: "Normal Scouting Routine" },
            ].map((threat, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#00261B]">{threat.pest}</h4>
                  <span className="text-[10px] font-mono text-[#C94B4B] font-bold">{threat.severity}</span>
                </div>
                <p className="text-xs text-[#4A5D4E]">
                  Crop: {threat.crop} • Region: {threat.woreda}
                </p>
                <div className="pt-1 text-[11px] font-mono text-[#146B45] font-semibold">
                  {threat.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Soil Fertility Profile Summary */}
        <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
            <h2 className="text-base font-bold text-[#00261B]">Soil Fertility Profiles Across Target Woredas</h2>
            <span className="text-xs font-mono text-[#146B45] font-semibold">1,420 Lab Samples</span>
          </div>

          <div className="space-y-3">
            {[
              { metric: "Average Soil pH Level", val: "6.4 (Slightly Acidic to Neutral)", note: "Optimal for soybean nitrogen fixation nodules" },
              { metric: "Available Phosphorus (Olsen)", val: "14.2 ppm (Medium to Low)", note: "NPSB basal fertilizer application recommended" },
              { metric: "Soil Organic Matter (SOM)", val: "3.2% (Moderate Fertility)", note: "Crop residue retention promoted under GAP protocol" },
              { metric: "Cation Exchange Capacity (CEC)", val: "38.5 meq/100g (High Vertisol)", note: "Excellent nutrient and water holding capacity" },
            ].map((soil, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#4A5D4E]">{soil.metric}</span>
                  <span className="text-xs font-mono font-bold text-[#00261B]">{soil.val}</span>
                </div>
                <p className="text-[11px] text-[#718575]">{soil.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DomainPageShell>
  );
}
