"use client";

import React, { useState } from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const TIER3_KPIS: KpiMetric[] = [
  {
    title: "Pending Tier 3",
    value: "3 Vouchers",
    change: "Action Required",
    changeType: "danger",
    subtext: "Transactions exceeding 500,000 ETB ceiling",
    icon: "gavel",
  },
  {
    title: "Batch Value",
    value: "17.45M ETB",
    change: "3 Batches",
    changeType: "neutral",
    subtext: "Requires CEO / Board digital authorization",
    icon: "payments",
  },
  {
    title: "Strict No-Self-Approve",
    value: "Enforced",
    change: "Zero Tolerance",
    changeType: "positive",
    subtext: "Separation of duties cryptographic lock",
    icon: "verified_user",
  },
  {
    title: "SLA Deadline",
    value: "Today 17:00",
    change: "2 Warnings",
    changeType: "warning",
    subtext: "Urgent farmer settlement harvest batch",
    icon: "timer",
  },
];

export default function ApprovalsTier3Page() {
  const [selectedVoucher, setSelectedVoucher] = useState<string | null>("VOUCHER-001");
  const [authorized, setAuthorized] = useState(false);

  return (
    <DomainPageShell
      badge="Tier 3 Executive Authorization (> 500,000 ETB)"
      badgeColor="#C94B4B"
      title="High-Value Executive Approvals & Cryptographic Sign-Off"
      subtitle="Final CEO and Board executive sign-off for mega farmer settlement batches, capital equipment tenders, and strategic master agreements."
      kpis={TIER3_KPIS}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Queue of Tier 3 Vouchers */}
        <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
            <h2 className="text-base font-bold text-[#00261B]">Pending Tier 3 Queue</h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FCE4E4] text-[#C94B4B]">
              3 Vouchers
            </span>
          </div>

          <div className="space-y-3">
            {[
              {
                id: "VOUCHER-001",
                title: "Jimma & Limmu Kosa Mega Harvest Settlement",
                type: "Farmer Harvest Netting",
                amount: "14,200,000 ETB",
                recipients: "1,240 Outgrowers",
                status: "Finance Audited • Awaiting CEO",
              },
              {
                id: "VOUCHER-002",
                title: "Silo Aeration & Cold Chain Upgrade Tender",
                type: "CapEx Tender",
                amount: "1,850,000 ETB",
                recipients: "AgriTech Silos Ltd",
                status: "3 Bids Verified • COO Approved",
              },
              {
                id: "VOUCHER-003",
                title: "Certified Pioneer Hybrid Maize Seed Import",
                type: "Agricultural Inputs",
                amount: "1,400,000 ETB",
                recipients: "Ethiopian Seed Enterprise",
                status: "Agronomy Sign-Off Complete",
              },
            ].map((v) => (
              <div
                key={v.id}
                onClick={() => setSelectedVoucher(v.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedVoucher === v.id
                    ? "bg-[#FAF8F3] border-[#0B3D2E] shadow-xs"
                    : "border-[#EBE7DD] hover:border-[#D0C7B2]"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                  <span className="text-[#146B45]">{v.id}</span>
                  <span className="text-[#00261B] text-xs">{v.amount}</span>
                </div>
                <h3 className="text-xs font-bold text-[#00261B] mt-1">{v.title}</h3>
                <div className="flex items-center justify-between text-[11px] text-[#718575] mt-2">
                  <span>{v.recipients}</span>
                  <span className="text-[10px] text-[#C94B4B] font-semibold">{v.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Voucher Audit Dossier & Cryptographic Sign-Off */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#DDE4DE] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EAEFEA]">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#146B45] uppercase tracking-wider block">
                Executive Audit Dossier • VOUCHER-001
              </span>
              <h2 className="text-xl font-bold text-[#00261B]">
                Jimma & Limmu Kosa Mega Harvest Settlement Batch
              </h2>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-[#FAF8F3] border border-[#DDE4DE] text-[#00261B]">
              Total: 14,200,000 ETB
            </span>
          </div>

          {/* Audit Verification Checklist */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase font-bold text-[#718575]">
              Pre-Authorization Compliance Verification
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span>
                <div>
                  <span className="font-bold text-[#00261B] block">1,240 Weighbridge GRNs Verified</span>
                  <span className="text-[11px] text-[#718575]">All moisture tests within 11.2 - 12.0% tolerance</span>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span>
                <div>
                  <span className="font-bold text-[#00261B] block">Input Loan Netting Reconciled</span>
                  <span className="text-[11px] text-[#718575]">3.4M ETB seed/fertilizer credit recovered</span>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span>
                <div>
                  <span className="font-bold text-[#00261B] block">Statutory Withholding Tax Applied</span>
                  <span className="text-[11px] text-[#718575]">2% MOR withholding certificate generated</span>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span>
                <div>
                  <span className="font-bold text-[#00261B] block">Finance Director Dual Sign-off</span>
                  <span className="text-[11px] text-[#718575]">Audited by Kinde Gudeta on 29/09/2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Separation of Duties Notice */}
          <div className="p-4 rounded-2xl bg-[#F0F5F1] border border-[#C5DDCB] flex items-start gap-3 text-xs text-[#0B3D2E]">
            <span className="material-symbols-outlined text-[20px] text-[#146B45] shrink-0 mt-0.5">verified_user</span>
            <p>
              <strong>Separation of Duties Rule:</strong> The submitter (Finance Lead) is cryptographically locked from approving this batch. As CEO, your digital sign-off will initiate instantaneous bulk payout dispatch through the <strong>Telebirr Bulk Payout API</strong> and <strong>CBE Birr RTGS Gateway</strong>.
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#EAEFEA]">
            <button className="px-4 py-2.5 rounded-2xl text-xs font-semibold text-[#C94B4B] bg-[#FCE4E4] hover:bg-[#F8D7DA] transition-all">
              Reject / Return for Audit Revision
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAuthorized(true)}
                className={`px-6 py-2.5 rounded-2xl text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center gap-2 ${
                  authorized
                    ? "bg-[#146B45] text-white"
                    : "bg-[#0B3D2E] text-white hover:bg-[#146B45]"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {authorized ? "done_all" : "fingerprint"}
                </span>
                <span>{authorized ? "Digitally Authorized & Executed" : "Affix CEO Signature & Execute Payout"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DomainPageShell>
  );
}
