"use client";

import React, { useState } from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const EUDR_KPIS: KpiMetric[] = [
  {
    title: "EUDR Deforestation Compliance",
    value: "100% Pass",
    change: "Zero Disturbance",
    changeType: "positive",
    subtext: "Validated against Dec 31, 2020 forest cutoff",
    icon: "park",
  },
  {
    title: "Geolocation Accuracy",
    value: "6-Decimal GPS",
    change: "EU Standard",
    changeType: "positive",
    subtext: "High-precision parcel polygons packaged in XML/JSON",
    icon: "pin_drop",
  },
  {
    title: "Export Consignments",
    value: "12 Consignments",
    change: "Customs Cleared",
    changeType: "positive",
    subtext: "EU Deforestation Statement (DDS) dossiers",
    icon: "fact_check",
  },
];

export default function EudrExportPage() {
  const [generated, setGenerated] = useState(false);

  return (
    <DomainPageShell
      badge="European Union Customs Compliance"
      badgeColor="#432874"
      title="EUDR Geolocation & Deforestation Customs Packager"
      subtitle="Generating verified EU Deforestation Regulation (EUDR) XML/JSON geolocation dossiers and PDF provenance statements for European buyers."
      kpis={EUDR_KPIS}
      actions={[
        { label: "Validate Deforestation Satellites", icon: "satellite_alt", variant: "outline" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EAEFEA]">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#146B45] uppercase tracking-wider block">
              Customs Package: EUDR-2026-ETH-ROTTERDAM-04
            </span>
            <h2 className="text-xl font-bold text-[#00261B]">
              2,800 MT Non-GMO Soybeans Bound for Rotterdam Port
            </h2>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-[#D1E7DD] text-[#0F5132]">
            1,240 Farm Parcels Verified Deforestation-Free
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-3 text-xs">
          <h4 className="font-bold text-[#00261B]">EUDR Verification Summary Checklist</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-white rounded-xl border border-[#DDE4DE] flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
              <span>All contributing parcels mapped with &gt; 6-decimal GPS polygons</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#DDE4DE] flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
              <span>Sentinel-2 satellite baseline confirms zero post-2020 forest clearance</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#DDE4DE] flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
              <span>Compliant with Ethiopian rural land tenure laws</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#DDE4DE] flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
              <span>Child labor and forced labor prohibition declarations verified</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#EAEFEA]">
          <span className="text-xs text-[#718575]">
            Generates EU Information System (EU TRACES) compliant XML payload and certified PDF Provenance Dossier.
          </span>

          <button
            onClick={() => setGenerated(true)}
            className={`px-6 py-2.5 rounded-2xl text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center gap-2 ${
              generated
                ? "bg-[#146B45] text-white"
                : "bg-[#0B3D2E] text-white hover:bg-[#146B45]"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {generated ? "done_all" : "download"}
            </span>
            <span>{generated ? "EUDR XML & Provenance PDF Generated" : "Generate EUDR XML & Provenance Statement"}</span>
          </button>
        </div>
      </div>
    </DomainPageShell>
  );
}
