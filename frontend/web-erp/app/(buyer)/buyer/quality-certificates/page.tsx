"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const QC_CERT_KPIS: KpiMetric[] = [
  {
    title: "Available Certificates",
    value: "100% Certified",
    change: "Digital PDF",
    changeType: "positive",
    subtext: "Moisture, purity, phytosanitary, non-GMO, EUDR",
    icon: "biotech",
  },
  {
    title: "Cryptographic Seals",
    value: "SHA-256 Verifiable",
    change: "Tamper-Proof",
    changeType: "positive",
    subtext: "Instant QR code verification for customs agents",
    icon: "qr_code",
  },
];

export default function BuyerQualityCertificatesPage() {
  return (
    <DomainPageShell
      badge="Quality Assurance & Provenance Dossiers"
      badgeColor="#1D3557"
      title="Digital Quality Certificates & Batch Provenance Dossiers"
      subtitle="Access and download certified laboratory test reports, phytosanitary clearance documents, Non-GMO certificates, and EUDR geolocation provenance dossiers."
      kpis={QC_CERT_KPIS}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Certified Export Quality Certificates</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEFEA] text-[10px] font-mono uppercase text-[#718575]">
                <th className="pb-3 font-bold">Doc ID</th>
                <th className="pb-3 font-bold">Consignment / Batch</th>
                <th className="pb-3 font-bold">Certificate Type</th>
                <th className="pb-3 font-bold">Issuing Authority</th>
                <th className="pb-3 font-bold">Test Finding</th>
                <th className="pb-3 font-bold">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFEA]">
              {[
                { id: "CERT-2026-9482", batch: "LOT-2026-ETH-01 (Soybean)", type: "Certificate of Analysis (CoA)", auth: "National Quality Testing Lab", res: "Moisture: 11.2% • Protein: 38.4% (Pass)" },
                { id: "CERT-2026-9483", batch: "LOT-2026-ETH-01 (Soybean)", type: "Phytosanitary Export Permit", auth: "Ministry of Agriculture Plant Health", res: "Pest & Weed Free (Certified Clean)" },
                { id: "CERT-2026-9484", batch: "LOT-2026-ETH-01 (Soybean)", type: "EUDR Deforestation Statement", auth: "Zorisis Geospatial Traceability Engine", res: "100% Deforestation-Free GeoJSON" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#146B45]">{row.id}</td>
                  <td className="py-3.5 font-bold text-[#00261B]">{row.batch}</td>
                  <td className="py-3.5 text-[#00261B] font-medium">{row.type}</td>
                  <td className="py-3.5 text-[#4A5D4E]">{row.auth}</td>
                  <td className="py-3.5 font-mono text-[#0F5132]">{row.res}</td>
                  <td className="py-3.5">
                    <button className="text-xs font-bold text-[#146B45] hover:text-[#0B3D2E] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                      <span>PDF</span>
                    </button>
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
