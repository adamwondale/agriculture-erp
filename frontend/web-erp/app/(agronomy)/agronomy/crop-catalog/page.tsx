"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const CATALOG_KPIS: KpiMetric[] = [
  {
    title: "Registered Cultivars",
    value: "28 Varieties",
    change: "Certified",
    changeType: "positive",
    subtext: "Released by Ethiopian Institute of Agri Research (EIAR)",
    icon: "psychiatry",
  },
  {
    title: "Maturity Windows",
    value: "90 - 150 Days",
    change: "Early to Late",
    changeType: "neutral",
    subtext: "Tailored to Belgian & Meher rainfall patterns",
    icon: "timelapse",
  },
  {
    title: "Moisture Standard",
    value: "11.5% Max",
    change: "Export Tolerance",
    changeType: "positive",
    subtext: "Strict quality tolerance for silo safe storage",
    icon: "water_drop",
  },
];

export default function CropCatalogPage() {
  return (
    <DomainPageShell
      badge="Agronomic Master Data Catalog"
      badgeColor="#1B4332"
      title="Crop & Variety Scientific Catalog"
      subtitle="Authoritative agronomic master data: scientific names, commercial variety codes, maturity periods, climate requirements, and benchmark yield potential."
      kpis={CATALOG_KPIS}
      actions={[
        { label: "Export Variety Catalog", icon: "download", variant: "outline" },
        { label: "Register New Variety", icon: "add", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Commercial Crop Varieties Catalog</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEFEA] text-[10px] font-mono uppercase text-[#718575]">
                <th className="pb-3 font-bold">Variety Code</th>
                <th className="pb-3 font-bold">Commercial Name</th>
                <th className="pb-3 font-bold">Scientific Name</th>
                <th className="pb-3 font-bold">Seed Type</th>
                <th className="pb-3 font-bold">Maturity Days</th>
                <th className="pb-3 font-bold">Optimal Altitude</th>
                <th className="pb-3 font-bold">Benchmark Yield</th>
                <th className="pb-3 font-bold">Target Moisture</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFEA]">
              {[
                { code: "VAR-SOY-001", name: "TGX-1335 (Korme)", sci: "Glycine max", type: "Improved OPV", days: "115 - 125 Days", alt: "1,300 - 1,800m", yield: "20.0 - 24.0 Qt/ha", moist: "11.5%" },
                { code: "VAR-SOY-002", name: "Clark-63K", sci: "Glycine max", type: "Improved OPV", days: "105 - 115 Days", alt: "1,400 - 1,900m", yield: "18.0 - 22.0 Qt/ha", moist: "11.5%" },
                { code: "VAR-SES-001", name: "Humera-1", sci: "Sesamum indicum", type: "Pure Line Selection", days: "95 - 105 Days", alt: "600 - 1,300m", yield: "8.0 - 10.5 Qt/ha", moist: "7.0%" },
                { code: "VAR-MAI-001", name: "BH-661 Hybrid", sci: "Zea mays", type: "Three-way Cross Hybrid", days: "145 - 160 Days", alt: "1,600 - 2,200m", yield: "55.0 - 75.0 Qt/ha", moist: "12.5%" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#146B45]">{row.code}</td>
                  <td className="py-3.5 font-bold text-[#00261B]">{row.name}</td>
                  <td className="py-3.5 italic text-[#4A5D4E]">{row.sci}</td>
                  <td className="py-3.5 text-[#00261B]">{row.type}</td>
                  <td className="py-3.5 font-mono text-[#00261B]">{row.days}</td>
                  <td className="py-3.5 text-[#4A5D4E]">{row.alt}</td>
                  <td className="py-3.5 font-mono font-bold text-[#0F5132]">{row.yield}</td>
                  <td className="py-3.5 font-mono text-[#00261B]">{row.moist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DomainPageShell>
  );
}
