"use client";

import React, { useState } from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const CONTRACT_KPIS: KpiMetric[] = [
  {
    title: "Pending Signatures",
    value: "2 Contracts",
    change: "Executive Action",
    changeType: "warning",
    subtext: "Bilingual export & tripartite master agreements",
    icon: "draw",
  },
  {
    title: "Contracted Value",
    value: "$4.8M USD",
    change: "100% Export",
    changeType: "positive",
    subtext: "FOB Djibouti & CIF Rotterdam terms",
    icon: "attach_money",
  },
  {
    title: "Bilingual Enforceability",
    value: "Amharic + English",
    change: "Certified",
    changeType: "positive",
    subtext: "Compliant with Ethiopian electronic transaction proclamation",
    icon: "translate",
  },
];

export default function ContractsSigningPage() {
  const [signed, setSigned] = useState(false);

  return (
    <DomainPageShell
      badge="Commercial Contracts & Digital Execution"
      badgeColor="#146B45"
      title="Strategic Commercial Agreements & Bilingual Digital Signing"
      subtitle="Executive legal review and cryptographic digital execution of international export off-taker contracts and cooperative union master agreements."
      kpis={CONTRACT_KPIS}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EAEFEA]">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#146B45] uppercase tracking-wider block">
              Contract Ref: EXPORT-2026-SOY-04
            </span>
            <h2 className="text-xl font-bold text-[#00261B]">
              International Commodity Sales Agreement — Non-GMO Soybeans
            </h2>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-[#FAF8F3] border border-[#DDE4DE] text-[#00261B]">
            Value: $1,420,000 USD (Incoterms: FOB Djibouti Port)
          </span>
        </div>

        {/* Side-by-Side Bilingual Document Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-3">
            <span className="text-[10px] font-mono font-bold text-[#718575] uppercase tracking-wider block">
              English Master Column (Governing Export Version)
            </span>
            <div className="space-y-2 text-xs text-[#00261B] font-serif leading-relaxed">
              <p>
                <strong>1. Contracting Parties:</strong> Zorisis Agriculture Enterprise (Seller) and Global Grain Commodities B.V. (Buyer).
              </p>
              <p>
                <strong>2. Commodity & Grade:</strong> Grade 1 Non-GMO Ethiopian Soybeans, maximum moisture 11.5%, minimum protein 38.0%, foreign matter &lt; 1.0%.
              </p>
              <p>
                <strong>3. Quantity & Pricing:</strong> 2,800 Metric Tons at $507.14 USD per MT FOB Djibouti port.
              </p>
              <p>
                <strong>4. Settlement & Letters of Credit:</strong> Irrevocable Confirmed Letter of Credit (LC) payable at sight upon presentation of shipping waybill, phytosanitary certificate, and EUDR geolocation dossier.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-3">
            <span className="text-[10px] font-mono font-bold text-[#718575] uppercase tracking-wider block">
              የአማርኛ ሕጋዊ ቅጂ (Amharic Legal Counterpart)
            </span>
            <div className="space-y-2 text-xs text-[#00261B] font-serif leading-relaxed">
              <p>
                <strong>1. ውል ተቀባይና ሰጪ፡</strong> ዞሪሲስ የግብርና ድርጅት (ሻጭ) እና ግሎባል ግሬይን ኮሞዲቲስ ቢ.ቪ (ገዢ)።
              </p>
              <p>
                <strong>2. የሰብል ዓይነትና ደረጃ፡</strong> አንደኛ ደረጃ አኩሪ አተር፤ ከፍተኛ እርጥበት 11.5%፤ አነስተኛ ፕሮቲን 38.0%፤ ባዕድ ነገር ከ 1.0% በታች።
              </p>
              <p>
                <strong>3. መጠንና ዋጋ፡</strong> 2,800 ሜትሪክ ቶን፤ በሜትሪክ ቶን $507.14 ዶላር በጅቡቲ ወደብ (FOB)።
              </p>
              <p>
                <strong>4. የክፍያ ሁኔታ፡</strong> የማይሻር የባንክ ሌተር ኦፍ ክሬዲት (LC) የጭነት ሰነዶችና የጥራት ማረጋገጫ ሲቀርቡ የሚከፈል ይሆናል።
              </p>
            </div>
          </div>
        </div>

        {/* Cryptographic Hash & Digital Signature Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#EAEFEA]">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-[#718575] block">
              Document SHA-256 Digest:
            </span>
            <code className="text-[11px] font-mono font-bold text-[#0B3D2E] bg-[#FAF8F3] px-2 py-1 rounded-md border border-[#EBE7DD]">
              e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
            </code>
          </div>

          <button
            onClick={() => setSigned(true)}
            className={`px-6 py-2.5 rounded-2xl text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center gap-2 ${
              signed
                ? "bg-[#146B45] text-white"
                : "bg-[#0B3D2E] text-white hover:bg-[#146B45]"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {signed ? "verified" : "draw"}
            </span>
            <span>{signed ? "Cryptographically Signed & Registered" : "Sign Bilingual Contract as CEO"}</span>
          </button>
        </div>
      </div>
    </DomainPageShell>
  );
}
