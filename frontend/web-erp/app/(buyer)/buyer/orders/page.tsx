"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const ORDER_KPIS: KpiMetric[] = [
  {
    title: "Active Sales Orders",
    value: "2 Orders",
    change: "In Execution",
    changeType: "positive",
    subtext: "Confirmed Letter of Credit (LC) and CAD terms",
    icon: "shopping_cart",
  },
  {
    title: "Total Order Value",
    value: "$2,870,000 USD",
    change: "Export Sales",
    changeType: "positive",
    subtext: "FOB Djibouti export commercial contracts",
    icon: "payments",
  },
];

export default function BuyerOrdersPage() {
  return (
    <DomainPageShell
      badge="Commercial Sales Contracts"
      badgeColor="#1D3557"
      title="Purchase Orders & Commercial Sales Agreements"
      subtitle="Track your commercial purchase orders, review proforma invoices, download certified bilingual sales contracts, and upload payment slips."
      kpis={ORDER_KPIS}
      actions={[
        { label: "Browse Marketplace", icon: "storefront", href: "/buyer/marketplace", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Your Active Purchase Orders</h2>

        <div className="space-y-4">
          {[
            {
              order: "SO-2026-ETH-04",
              crop: "Grade 1 Non-GMO Soybeans",
              qty: "2,800 Metric Tons",
              terms: "FOB Djibouti • Confirmed Irrevocable LC at sight",
              val: "$1,420,000.00 USD",
              status: "LC Confirmed • Silo Packaging Complete",
              docs: "Signed Sales Contract, Proforma Invoice, Bank LC Advice",
            },
            {
              order: "SO-2026-ETH-05",
              crop: "Grade 1 Whitish Humera Sesame",
              qty: "1,000 Metric Tons",
              terms: "FOB Djibouti • Cash Against Documents (CAD)",
              val: "$1,450,000.00 USD",
              status: "Truck Convoy in Transit to Djibouti Port",
              docs: "Proforma Invoice, Phytosanitary Permit",
            },
          ].map((ord, i) => (
            <div key={i} className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-[#146B45]">{ord.order}</span>
                  <h3 className="text-sm font-bold text-[#00261B] mt-0.5">{ord.crop}</h3>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-sm text-[#00261B] block">{ord.val}</span>
                  <span className="text-[10px] font-mono text-[#0F5132] font-semibold">{ord.status}</span>
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-[#DDE4DE] space-y-1">
                <span className="text-[#4A5D4E] block">Ordered Volume: <strong>{ord.qty}</strong> • {ord.terms}</span>
                <span className="text-[11px] text-[#718575] block">Attached Documents: {ord.docs}</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <a href="/buyer/shipments" className="text-xs font-bold text-[#1D3557] hover:underline flex items-center gap-1">
                  <span>Track Live Shipment Convoy</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>

                <button className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#0B3D2E] hover:bg-[#146B45]">
                  Download Contract PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DomainPageShell>
  );
}
