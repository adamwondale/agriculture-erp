"use client";

import React, { useState } from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const PAYROLL_KPIS: KpiMetric[] = [
  {
    title: "Gross Payroll",
    value: "4,820,000 ETB",
    change: "Month: Sept 2026",
    changeType: "positive",
    subtext: "284 permanent & fixed-term employees",
    icon: "payments",
  },
  {
    title: "Statutory Pension (18%)",
    value: "867,600 ETB",
    change: "7% Emp + 11% Co",
    changeType: "neutral",
    subtext: "Ethiopian Pension Agency standard",
    icon: "account_balance",
  },
  {
    title: "Statutory Income Tax",
    value: "712,400 ETB",
    change: "MOR Brackets",
    changeType: "positive",
    subtext: "Progressive Ethiopian employment tax",
    icon: "receipt_long",
  },
  {
    title: "Net Bank Payout",
    value: "3,240,000 ETB",
    change: "Direct to Bank",
    changeType: "positive",
    subtext: "CBE & Telebirr direct bank files generated",
    icon: "credit_card",
  },
];

export default function PayrollPage() {
  const [disbursed, setDisbursed] = useState(false);

  return (
    <DomainPageShell
      badge="Confidential Payroll & Statutory Remittance"
      badgeColor="#804A00"
      title="Confidential Payroll & Automated Payslip Generation"
      subtitle="Strictly restricted to HR Director, Payroll Accountant, and CEO. Computes base salary, field hardship allowances, pension (7%/11%), and income tax."
      kpis={PAYROLL_KPIS}
      actions={[
        { label: "Export Bank Payout File", icon: "download", variant: "outline" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EAEFEA]">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#804A00] uppercase tracking-wider block">
              Confidential Payroll Run • Meskerem 2019 / Sept 2026
            </span>
            <h2 className="text-xl font-bold text-[#00261B]">Monthly Payroll Summary Ledger</h2>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-[#FAF8F3] border border-[#DDE4DE] text-[#00261B]">
            Net Disbursement: 3,240,000.00 ETB
          </span>
        </div>

        {/* Confidential Salary Security Notice */}
        <div className="p-4 rounded-2xl bg-[#FFF8E7] border border-[#F0D597] flex items-start gap-3 text-xs text-[#804A00]">
          <span className="material-symbols-outlined text-[20px] text-[#804A00] shrink-0 mt-0.5">lock</span>
          <p>
            <strong>Field-Level Confidentiality Notice:</strong> Line managers, field agronomists, and general staff are blocked from viewing this data. Individual digital payslips are password-protected and accessible exclusively by individual employees.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#EAEFEA]">
          <span className="text-xs text-[#718575]">
            Approved by HR Lead: Tigist Alemu • Verified by Finance: Kinde Gudeta
          </span>

          <button
            onClick={() => setDisbursed(true)}
            className={`px-6 py-2.5 rounded-2xl text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center gap-2 ${
              disbursed
                ? "bg-[#146B45] text-white"
                : "bg-[#0B3D2E] text-white hover:bg-[#146B45]"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {disbursed ? "done_all" : "send"}
            </span>
            <span>{disbursed ? "Payroll Disbursed & Payslips Published" : "Authorize Monthly Payroll & Generate Payslips"}</span>
          </button>
        </div>
      </div>
    </DomainPageShell>
  );
}
