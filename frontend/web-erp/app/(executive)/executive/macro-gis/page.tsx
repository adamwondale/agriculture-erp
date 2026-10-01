"use client";

import React, { useState } from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const GIS_KPIS: KpiMetric[] = [
  {
    title: "Mapped Parcels",
    value: "14,820",
    change: "100% GeoJSON",
    changeType: "positive",
    subtext: "Authoritative walked perimeter coordinates",
    icon: "polyline",
  },
  {
    title: "Regional Clusters",
    value: "6 Clusters",
    change: "Pan-Ethiopian",
    changeType: "neutral",
    subtext: "Oromia, Amhara, Sidama, Tigray, South West",
    icon: "hub",
  },
  {
    title: "Satellite Scans",
    value: "Sentinel-2",
    change: "Updated 48h ago",
    changeType: "positive",
    subtext: "10m multi-spectral NDVI resolution",
    icon: "satellite_alt",
  },
  {
    title: "Deforestation-Free",
    value: "99.8%",
    change: "EUDR Certified",
    changeType: "positive",
    subtext: "Zero pre-2020 forest disturbance",
    icon: "verified",
  },
];

export default function MacroGisPage() {
  const [selectedCrop, setSelectedCrop] = useState("all");
  const [selectedLayer, setSelectedLayer] = useState("ndvi");

  return (
    <DomainPageShell
      badge="Geospatial Intelligence • Macro GIS"
      badgeColor="#146B45"
      title="National Agricultural GIS Intelligence Map"
      subtitle="Interactive geospatial monitoring across Ethiopian agro-ecological zones, outgrower clusters, and satellite NDVI canopy health."
      kpis={GIS_KPIS}
      actions={[
        { label: "Trigger Satellite Refresh", icon: "refresh", variant: "outline" },
        { label: "Download Geospatial KML", icon: "download", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        {/* Layer & Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EAEFEA]">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-[#4A5D4E]">Crop Filter:</span>
            {["all", "soybean", "sesame", "coffee", "maize"].map((crop) => (
              <button
                key={crop}
                onClick={() => setSelectedCrop(crop)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedCrop === crop
                    ? "bg-[#0B3D2E] text-white"
                    : "bg-[#FAF8F3] text-[#718575] hover:bg-[#EAE5D9]"
                }`}
              >
                {crop}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#4A5D4E]">Overlay:</span>
            {[
              { id: "ndvi", label: "NDVI Vegetation" },
              { id: "moisture", label: "Soil Moisture" },
              { id: "security", label: "Security Corridors" },
            ].map((layer) => (
              <button
                key={layer.id}
                onClick={() => setSelectedLayer(layer.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedLayer === layer.id
                    ? "bg-[#146B45] text-white shadow-2xs"
                    : "bg-[#FAF8F3] text-[#718575] hover:bg-[#EAE5D9]"
                }`}
              >
                {layer.label}
              </button>
            ))}
          </div>
        </div>

        {/* GIS Canvas Visualizer */}
        <div className="relative h-[500px] w-full rounded-2xl bg-[#081C15] overflow-hidden border border-[#DDE4DE] flex items-center justify-center text-center p-8">
          {/* Decorative Map Grid & Polygons */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#A3F4C3_1px,transparent_1px)] [background-size:24px_24px]" />
          
          <div className="relative z-10 max-w-lg space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-[#146B45]/30 border border-[#A3F4C3]/40 flex items-center justify-center mx-auto text-[#A3F4C3] shadow-lg backdrop-blur-md">
              <span className="material-symbols-outlined text-[36px]">public</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Ethiopian Agricultural GIS Active Mesh
              </h3>
              <p className="text-xs text-[#A8C3A0] leading-relaxed mt-1">
                Displaying 14,820 GeoJSON parcels with active {selectedLayer.toUpperCase()} index overlay for {selectedCrop.toUpperCase()} commodity clusters.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-white/10 text-emerald-300 border border-white/10">
                Lat: 9.145° N, Long: 40.489° E
              </span>
              <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-white/10 text-emerald-300 border border-white/10">
                100% Boundary Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </DomainPageShell>
  );
}
