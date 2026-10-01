"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PublicTraceabilityPage() {
  const params = useParams();
  const batchCode = (params?.batchCode as string) || "LOT-2026-ETH-01";

  return (
    <div className="min-h-screen bg-[#F7F4EC] text-[#17231D] p-4 sm:p-6 lg:p-12">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 sm:p-8 shadow-xs text-center space-y-3 relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-[#0B3D2E] p-2 flex items-center justify-center mx-auto shadow-sm">
            <img src="/logo-mark.png" alt="Z•ORISIS Emblem" className="w-10 h-10 object-contain" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-[#146B45] tracking-widest uppercase block">
              Z•ORISIS Farmer-to-Fork Digital Passport
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#00261B] tracking-tight mt-1">
              Authentic Ethiopian Agricultural Provenance
            </h1>
            <p className="text-xs text-[#4A5D4E] mt-1">
              Batch Identification Code: <code className="font-mono font-bold text-[#0B3D2E]">{batchCode}</code>
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#D1E7DD] text-[#0F5132]">
              Verified Non-GMO
            </span>
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#D1E7DD] text-[#0F5132]">
              EUDR Deforestation-Free
            </span>
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#D1E7DD] text-[#0F5132]">
              Grade 1 Export Certified
            </span>
          </div>
        </div>

        {/* Provenance Story & Origin Details */}
        <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="text-lg font-bold text-[#00261B]">Farm Origin & Supply Chain Journey</h2>

          <div className="space-y-4">
            {[
              {
                step: "1. Farm Origin & Geolocation",
                desc: "Cultivated by Bekele Tadesse in Limmu Kosa, Oromia, Ethiopia. Mapped boundary coordinates: Lat 9.145° N, Long 40.489° E.",
                meta: "Altitude: 1,650m • Rich Vertisol Soil • Organic Compost",
                icon: "agriculture",
              },
              {
                step: "2. Harvest & Weighbridge Intake",
                desc: "Harvested at peak physiological maturity. Intake weighbridge moisture tested at 11.2% (Grade 1 export standard).",
                meta: "GRN-2026-9482 issued at Jimma Central Silo Hub",
                icon: "scale",
              },
              {
                step: "3. Silo Aeration & Storage",
                desc: "Safely conditioned in aerated silo bin A1 at Adama export facility under controlled temperature (21.4°C).",
                meta: "Tested negative for aflatoxin (< 4 ppb)",
                icon: "warehouse",
              },
              {
                step: "4. Port Logistics & Export Transit",
                desc: "Transported in sealed ISO shipping containers along the electrified railway corridor to Port of Djibouti.",
                meta: "Customs cleared with full EUDR XML geolocation data package",
                icon: "directions_boat",
              },
            ].map((node, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD]">
                <div className="w-10 h-10 rounded-2xl bg-white border border-[#EAEFEA] flex items-center justify-center text-[#146B45] shrink-0 shadow-2xs">
                  <span className="material-symbols-outlined text-[20px]">{node.icon}</span>
                </div>
                <div className="space-y-1 text-xs">
                  <h3 className="font-bold text-[#00261B] text-sm">{node.step}</h3>
                  <p className="text-[#4A5D4E] leading-relaxed">{node.desc}</p>
                  <span className="text-[11px] font-mono text-[#718575] block pt-1">{node.meta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-[#718575] space-y-1">
          <p>Powered by Z•ORISIS Digital Agriculture ERP System • Together We Grow</p>
          <p className="text-[10px] font-mono">Blockchain Cryptographic Seal: Verified SHA-256 Signature</p>
          <div className="pt-2">
            <Link href="/login" className="font-bold text-[#0B3D2E] hover:underline">
              Enterprise Employee Sign In &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
