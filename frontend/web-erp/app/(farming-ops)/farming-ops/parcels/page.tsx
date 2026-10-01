"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const PARCELS_KPIS: KpiMetric[] = [
  {
    title: "Registered Parcels",
    value: "14,820",
    change: "100% Polygon Mapped",
    changeType: "positive",
    subtext: "GPS walked perimeter coordinates",
    icon: "polyline",
  },
  {
    title: "Seasonal Area Lock",
    value: "Active Lock",
    change: "Mid-Season Lock",
    changeType: "positive",
    subtext: "Prevents accidental boundary shifts during season",
    icon: "lock",
  },
  {
    title: "Versioned Revisions",
    value: "Zero Historical Loss",
    change: "Audit Preserved",
    changeType: "positive",
    subtext: "Changes create revisions; past season data intact",
    icon: "history",
  },
  {
    title: "Average Parcel Size",
    value: "2.86 ha",
    change: "11.4 Timad",
    changeType: "neutral",
    subtext: "Dual units supported: Hectares & Timad (ቃዳ)",
    icon: "aspect_ratio",
  },
];

export default function ParcelsPage() {
  return (
    <DomainPageShell
      badge="Land Tenure & Boundary Versioning"
      badgeColor="#2C5E1A"
      title="Farm Parcel Registry & Authoritative GIS Boundaries"
      subtitle="Management of agricultural land parcels, GPS boundary walks, satellite GIS refinements, and versioned revisions."
      kpis={PARCELS_KPIS}
      actions={[
        { label: "Export GeoJSON Layer", icon: "download", variant: "outline" },
        { label: "Register New Parcel", icon: "add_location_alt", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Authoritative Farm Parcel Directory</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEFEA] text-[10px] font-mono uppercase text-[#718575]">
                <th className="pb-3 font-bold">Parcel Code</th>
                <th className="pb-3 font-bold">Farmer Name</th>
                <th className="pb-3 font-bold">Kebele / Woreda</th>
                <th className="pb-3 font-bold">Area (ha / Timad)</th>
                <th className="pb-3 font-bold">Soil Classification</th>
                <th className="pb-3 font-bold">Water Source</th>
                <th className="pb-3 font-bold">Boundary Verification</th>
                <th className="pb-3 font-bold">Active Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFEA]">
              {[
                { code: "PRC-ETH-0941", farmer: "Bekele Tadesse", kebele: "Babu Kebele, Limmu Kosa", area: "3.2 ha (12.8 Timad)", soil: "Vertisol (pH 6.4)", water: "Rainfed + Stream", verified: "Field Walk + Satellite", status: "Active (Season 2026)" },
                { code: "PRC-ETH-0942", farmer: "Almaz Haile", kebele: "Dedo Kebele, Jimma", area: "2.5 ha (10.0 Timad)", soil: "Loam (pH 6.8)", water: "Drip Irrigation", verified: "Field Walk + Satellite", status: "Active (Season 2026)" },
                { code: "PRC-ETH-0943", farmer: "Worku Desta", kebele: "Robe Kebele, Arsi", area: "4.8 ha (19.2 Timad)", soil: "Clay Loam (pH 7.1)", water: "Rainfed", verified: "Field Walk Verified", status: "Active (Season 2026)" },
                { code: "PRC-ETH-0944", farmer: "Chaltu Tolosa", kebele: "Babu Kebele, Limmu Kosa", area: "1.8 ha (7.2 Timad)", soil: "Vertisol (pH 6.2)", water: "Rainfed", verified: "Field Walk + Satellite", status: "Active (Season 2026)" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#146B45]">{row.code}</td>
                  <td className="py-3.5 font-bold text-[#00261B]">{row.farmer}</td>
                  <td className="py-3.5 text-[#4A5D4E]">{row.kebele}</td>
                  <td className="py-3.5 font-mono font-bold text-[#00261B]">{row.area}</td>
                  <td className="py-3.5 text-[#00261B]">{row.soil}</td>
                  <td className="py-3.5 text-[#4A5D4E]">{row.water}</td>
                  <td className="py-3.5 text-[11px] font-mono text-[#0F5132] font-semibold">{row.verified}</td>
                  <td className="py-3.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#D1E7DD] text-[#0F5132]">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DomainPageShell>
  );
}
