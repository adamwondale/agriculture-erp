"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const FINANCE_KPIS: KpiMetric[] = [
  {
    title: "Cash & Bank Liquidity",
    value: "84.2M ETB",
    change: "Telebirr + CBE",
    changeType: "positive",
    subtext: "Liquid reserves for farmer settlement payouts",
    icon: "account_balance",
  },
  {
    title: "Farmer Settlement Payouts",
    value: "184.2M ETB",
    change: "100% Mobile",
    changeType: "positive",
    subtext: "Net harvest payout after loan deductions",
    icon: "payments",
  },
  {
    title: "Input Debt Recovered",
    value: "38.2M ETB",
    change: "96.4% Rate",
    changeType: "positive",
    subtext: "Seed, fertilizer & chemical credit deducted",
    icon: "verified",
  },
  {
    title: "Accounts Receivable",
    value: "42.8M ETB",
    change: "Export Buyers",
    changeType: "neutral",
    subtext: "CAD & Letters of Credit maturing in 15 days",
    icon: "receipt",
  },
  {
    title: "Withholding Tax (MOR)",
    value: "3.68M ETB",
    change: "2% Remitted",
    changeType: "positive",
    subtext: "Ethiopian Ministry of Revenues standard slip",
    icon: "account_balance_wallet",
  },
];

export default function FinanceDashboardPage() {
  return (
    <DomainPageShell
      badge="Finance, Treasury & Cost Accounting"
      badgeColor="#0F5132"
      title="Financial Operations & Cash Flow Cockpit"
      subtitle="Oversight of daily disbursements, farmer harvest settlement netting, dual-authorization payment batches, and statutory tax withholding."
      kpis={FINANCE_KPIS}
      actions={[
        { label: "Settlement Netting Engine", icon: "calculate", href: "/finance/settlements", variant: "outline" },
        { label: "Payout Batches", icon: "send", href: "/finance/payout-batches", variant: "primary" },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Settlement Netting Overview */}
        <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
            <h2 className="text-base font-bold text-[#00261B]">Automated Settlement Netting Formula</h2>
            <span className="text-xs font-mono font-bold text-[#146B45]">Active Formula</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-2 text-xs">
            <div className="font-mono text-[#0B3D2E] font-bold">
              Net Payable = Gross Harvest - Quality Penalty - Input Debt - Coop Fee (10%) - Withholding (2%)
            </div>
            <p className="text-[#718575] leading-relaxed">
              Every weighbridge GRN automatically populates gross delivered weight. The netting engine recovers certified seed, fertilizer loans, and deducts statutory withholding tax before compiling the final Telebirr disbursement batch.
            </p>
          </div>
        </div>

        {/* Bank & Payment Gateways Telemetry */}
        <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
            <h2 className="text-base font-bold text-[#00261B]">Payment Gateway Balances</h2>
            <span className="text-xs font-mono text-[#146B45] font-semibold">Live Balances</span>
          </div>

          <div className="space-y-3">
            {[
              { name: "Telebirr Corporate Payout API", bal: "48,500,000 ETB", status: "Connected • Bulk Ready" },
              { name: "Commercial Bank of Ethiopia (CBE Birr)", bal: "26,200,000 ETB", status: "Connected • RTGS Ready" },
              { name: "Awash Bank Foreign Currency (USD)", bal: "$1,850,000 USD", status: "Export Inflow Account" },
            ].map((gate, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#00261B]">{gate.name}</h4>
                  <span className="text-[10px] font-mono text-[#146B45] font-semibold">{gate.status}</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#00261B]">{gate.bal}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DomainPageShell>
  );
}
