"use client";

import React, { useState } from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";
import DualDatePicker from "@/components/common/DualDatePicker";
import { EthiopianDate } from "@/lib/calendar/ethiopian";

const SETTLE_KPIS: KpiMetric[] = [
  {
    title: "Pending Netting",
    value: "148 Vouchers",
    change: "GRN Verified",
    changeType: "warning",
    subtext: "Ready for audit deduction calculations",
    icon: "calculate",
  },
  {
    title: "Net Settlement Total",
    value: "14.2M ETB",
    change: "This Batch",
    changeType: "positive",
    subtext: "Gross value less input loans and statutory tax",
    icon: "payments",
  },
  {
    title: "Name Matching Check",
    value: "100% Passed",
    change: "Telebirr Verified",
    changeType: "positive",
    subtext: "Fayda National ID matches phone wallet account",
    icon: "verified_user",
  },
];

export default function SettlementsPage() {
  const [selectedVoucher, setSelectedVoucher] = useState("SET-9482");
  const [settlementDate, setSettlementDate] = useState("2026-09-30");
  const [selectedEthDate, setSelectedEthDate] = useState<EthiopianDate | null>(null);

  return (
    <DomainPageShell
      badge="Harvest Settlement Engine"
      badgeColor="#0F5132"
      title="Farmer Harvest Settlement Netting Desk"
      subtitle="Automated deduction engine calculating net farmer payables from weighbridge intake GRNs, seed/fertilizer loan repayments, and 2% withholding tax."
      kpis={SETTLE_KPIS}
      actions={[
        { label: "Compile Payout Batch", icon: "playlist_add_check", href: "/finance/payout-batches", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EAEFEA]">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#146B45] uppercase tracking-wider block">
              Settlement Voucher: SET-9482 • Farmer: Bekele Tadesse
            </span>
            <h2 className="text-xl font-bold text-[#00261B]">Harvest Delivery Netting Breakdown</h2>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-[#D1E7DD] text-[#0F5132]">
            Net Payable: 42,500.00 ETB
          </span>
        </div>

        {/* Dual Calendar Settlement Date Selector */}
        <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#00261B] block">Settlement Effective Date:</span>
            <span className="text-[11px] text-[#718575]">
              Select date using either Ethiopian (ዓ.ም) or Gregorian (G.C.) calendar.
            </span>
          </div>
          <div className="md:col-span-2 max-w-md">
            <DualDatePicker
              value={settlementDate}
              onChange={(iso, eth) => {
                setSettlementDate(iso);
                setSelectedEthDate(eth);
              }}
              displayFormat="dual"
              defaultMode="ethiopian"
              label="Effective Valuation Date"
            />
          </div>
        </div>

        {/* Calculation Table */}
        <div className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-3">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-[#EAEFEA]">
            <span className="font-semibold text-[#4A5D4E]">1. Gross Delivered Harvest (12.45 MT @ 4,500 ETB/Qt)</span>
            <span className="font-mono font-bold text-[#00261B]">56,025.00 ETB</span>
          </div>
          <div className="flex items-center justify-between text-xs pb-2 border-b border-[#EAEFEA]">
            <span className="font-semibold text-[#C94B4B]">2. Quality Deduction (Moisture 11.2% - Standard Base)</span>
            <span className="font-mono text-[#C94B4B]">0.00 ETB (Full Grade 1 Premium)</span>
          </div>
          <div className="flex items-center justify-between text-xs pb-2 border-b border-[#EAEFEA]">
            <span className="font-semibold text-[#C94B4B]">3. Input Loan Deduction (Seed & NPSB Fertilizer Advance)</span>
            <span className="font-mono font-bold text-[#C94B4B]">- 8,400.00 ETB</span>
          </div>
          <div className="flex items-center justify-between text-xs pb-2 border-b border-[#EAEFEA]">
            <span className="font-semibold text-[#C94B4B]">4. Cooperative Management Commission (10% of input base)</span>
            <span className="font-mono font-bold text-[#C94B4B]">- 4,004.50 ETB</span>
          </div>
          <div className="flex items-center justify-between text-xs pb-2 border-b border-[#EAEFEA]">
            <span className="font-semibold text-[#C94B4B]">5. Statutory Withholding Tax (2% Ethiopian MOR standard)</span>
            <span className="font-mono font-bold text-[#C94B4B]">- 1,120.50 ETB</span>
          </div>
          <div className="flex items-center justify-between text-sm pt-2 font-bold text-[#0B3D2E]">
            <span>Net Payable to Farmer Telebirr Wallet (0911-849201)</span>
            <span className="font-mono text-base">42,500.00 ETB</span>
          </div>
        </div>

        {/* Verification Check & Action */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs text-[#0F5132]">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Name Match Confirmed: Fayda Name matches Telebirr Subscriber Account</span>
          </div>

          <button className="px-6 py-2.5 rounded-2xl text-xs font-semibold text-white bg-[#0B3D2E] hover:bg-[#146B45] transition-all shadow-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>Audit & Approve Settlement Voucher</span>
          </button>
        </div>
      </div>
    </DomainPageShell>
  );
}
