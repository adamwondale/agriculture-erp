"use client";

import React, { useState } from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const PAYOUT_KPIS: KpiMetric[] = [
  {
    title: "Batches in Transit",
    value: "2 Batches",
    change: "Telebirr API",
    changeType: "positive",
    subtext: "Live bulk payout stream via Ethio Telecom API",
    icon: "send",
  },
  {
    title: "Total Disbursed Today",
    value: "18.4M ETB",
    change: "1,420 Farmers",
    changeType: "positive",
    subtext: "Instant mobile wallet crediting",
    icon: "account_balance_wallet",
  },
  {
    title: "Failed Transactions",
    value: "Zero Failures",
    change: "0% Error Rate",
    changeType: "positive",
    subtext: "Pre-validated phone number registry",
    icon: "check_circle",
  },
];

export default function PayoutBatchesPage() {
  const [executed, setExecuted] = useState(false);

  return (
    <DomainPageShell
      badge="Dual-Authorization Payouts"
      badgeColor="#0F5132"
      title="Telebirr Bulk Payout API & Bank RTGS Batches"
      subtitle="Dual-authorization disbursement batches: Stage 1 Finance Manager audit -> Stage 2 CEO / Signatory OTP release."
      kpis={PAYOUT_KPIS}
      actions={[
        { label: "Export Bank RTGS File", icon: "download", variant: "outline" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EAEFEA]">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#146B45] uppercase tracking-wider block">
              Active Disbursement Batch • BATCH-2026-092
            </span>
            <h2 className="text-xl font-bold text-[#00261B]">
              Limmu Kosa Soybean Harvest Settlement Payout Batch
            </h2>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-[#D1E7DD] text-[#0F5132]">
            Ready for Execution: 14,200,000.00 ETB
          </span>
        </div>

        {/* Batch Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD]">
            <span className="text-[10px] font-mono text-[#718575] block">Total Payees</span>
            <span className="text-xl font-bold font-mono text-[#00261B]">1,240 Outgrower Farmers</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD]">
            <span className="text-[10px] font-mono text-[#718575] block">Payout Channel</span>
            <span className="text-xl font-bold font-mono text-[#0B3D2E]">Telebirr Bulk API</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD]">
            <span className="text-[10px] font-mono text-[#718575] block">Dual Sign-Off State</span>
            <span className="text-xl font-bold font-mono text-[#146B45]">Finance Audited (Pass)</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#EAEFEA]">
          <span className="text-xs text-[#718575]">
            Executing this batch will trigger automated API payouts and send SMS confirmations to all 1,240 farmers.
          </span>

          <button
            onClick={() => setExecuted(true)}
            className={`px-6 py-2.5 rounded-2xl text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center gap-2 ${
              executed
                ? "bg-[#146B45] text-white"
                : "bg-[#0B3D2E] text-white hover:bg-[#146B45]"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {executed ? "done_all" : "send"}
            </span>
            <span>{executed ? "Disbursement Batch Successfully Executed" : "Execute Telebirr API Batch Payout"}</span>
          </button>
        </div>
      </div>
    </DomainPageShell>
  );
}
