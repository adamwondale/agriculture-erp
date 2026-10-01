"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const BUYER_MARKET_KPIS: KpiMetric[] = [
  {
    title: "Available Export Inventory",
    value: "11,200 MT",
    change: "Grade 1 Export",
    changeType: "positive",
    subtext: "Soybean, sesame & specialty coffee in central silos",
    icon: "storefront",
  },
  {
    title: "Reference Market Price",
    value: "$507.14 / MT",
    change: "FOB Djibouti",
    changeType: "neutral",
    subtext: "Non-GMO Ethiopian Soybeans Grade 1",
    icon: "sell",
  },
  {
    title: "Export Certifications",
    value: "EU Organic + EUDR",
    change: "100% Certified",
    changeType: "positive",
    subtext: "Deforestation-free geolocation compliant",
    icon: "verified",
  },
];

export default function BuyerMarketplacePage() {
  return (
    <DomainPageShell
      badge="Commercial Off-taker Portal"
      badgeColor="#1D3557"
      title="Commercial Crop Marketplace & Available Inventory"
      subtitle="Browse available certified commodities, indicative export market prices, harvest readiness calendars, and submit direct purchase inquiries."
      kpis={BUYER_MARKET_KPIS}
      actions={[
        { label: "My Purchase Orders", icon: "shopping_cart", href: "/buyer/orders", variant: "outline" },
        { label: "Live Shipment Tracking", icon: "local_shipping", href: "/buyer/shipments", variant: "outline" },
        { label: "Quality Certificates", icon: "biotech", href: "/buyer/quality-certificates", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Available Export Commodities Catalog</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: "Grade 1 Non-GMO Soybeans",
              variety: "TGX-1335 (Korme)",
              avail: "4,800 MT Ready for Loading",
              specs: "Moisture: < 11.5% • Protein: > 38% • Foreign: < 1.0%",
              price: "$507.14 USD / MT (FOB Djibouti)",
              origin: "Western Oromia Outgrower Network",
            },
            {
              name: "Grade 1 Whitish Humera Sesame",
              variety: "Humera-1 Pure Line",
              avail: "2,400 MT Ready for Loading",
              specs: "Moisture: < 7.0% • Purity: > 99.0% • Oil: > 52%",
              price: "$1,450.00 USD / MT (FOB Djibouti)",
              origin: "Arsi Robe Outgrower Network",
            },
            {
              name: "Specialty Grade 1 Organic Coffee",
              variety: "Yirgacheffe / Sidama Heirloom",
              avail: "1,200 MT (Washed & Natural)",
              specs: "Cup Score: 86+ • Moisture: 11.0% • Screen 14+",
              price: "$4,800.00 USD / MT (FOB Djibouti)",
              origin: "Sidama Organic Union Network",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] hover:border-[#D0C7B2] transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#146B45] uppercase tracking-wider block">
                  {item.origin}
                </span>
                <h3 className="text-sm font-bold text-[#00261B]">{item.name}</h3>
                <p className="text-xs font-mono text-[#0B3D2E] font-semibold">{item.variety}</p>
                <div className="p-3 bg-white rounded-xl border border-[#DDE4DE] space-y-1 text-xs">
                  <span className="text-[11px] font-mono font-bold text-[#00261B] block">{item.avail}</span>
                  <p className="text-[11px] text-[#718575]">{item.specs}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#EBE7DD] flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#00261B]">{item.price}</span>
                <button className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#0B3D2E] hover:bg-[#146B45] transition-all">
                  Inquire
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DomainPageShell>
  );
}
