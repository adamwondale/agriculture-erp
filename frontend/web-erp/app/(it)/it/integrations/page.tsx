"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const INTEGRATION_KPIS: KpiMetric[] = [
  {
    title: "Telebirr Bulk Payout",
    value: "Connected",
    change: "p95 240ms",
    changeType: "positive",
    subtext: "Ethio Telecom corporate payment gateway",
    icon: "account_balance_wallet",
  },
  {
    title: "SMS Gateway Credits",
    value: "184,200 Bal",
    change: "99.8% Delivery",
    changeType: "positive",
    subtext: "Ethio Telecom short-code bulk SMS bridge",
    icon: "sms",
  },
  {
    title: "Sentinel-2 Satellite Feed",
    value: "Connected",
    change: "Monthly Quota 62%",
    changeType: "neutral",
    subtext: "Copernicus Open Access Hub multispectral API",
    icon: "satellite_alt",
  },
  {
    title: "Fayda e-KYC API",
    value: "Connected",
    change: "National ID",
    changeType: "positive",
    subtext: "National ID Program biometric verification",
    icon: "fingerprint",
  },
];

export default function IntegrationsPage() {
  return (
    <DomainPageShell
      badge="Integration Gateway & Third-Party APIs"
      badgeColor="#1B3B6F"
      title="Third-Party Integration Health & Quota Monitor"
      subtitle="Monitoring payment gateways (Telebirr, CBE Birr), SMS providers, Copernicus satellite feeds, ERCA tax bridge, and Fayda e-KYC integration."
      kpis={INTEGRATION_KPIS}
      actions={[
        { label: "Test All Gateway Connections", icon: "sync", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Third-Party API Adapter Status</h2>

        <div className="space-y-3">
          {[
            { name: "Telebirr Bulk Payment API", endpoint: "https://api.ethiotelecom.et/b2c/v2", quota: "Corporate Balance: 48.5M ETB", status: "Healthy • Latency 142ms" },
            { name: "Commercial Bank of Ethiopia (CBE Birr)", endpoint: "https://cbebirr.cbe.com.et/api/v1", quota: "Corporate Account Linked", status: "Healthy • Latency 180ms" },
            { name: "Ethiopian Ministry of Revenues (ERCA Tax Bridge)", endpoint: "https://etax.mor.gov.et/api/v1", quota: "E-Invoicing Synchronized", status: "Healthy • Latency 210ms" },
            { name: "National ID Program (Fayda e-KYC API)", endpoint: "https://id.gov.et/ekyc/v1", quota: "14,820 Verified IDs", status: "Healthy • Latency 320ms" },
            { name: "Copernicus Sentinel-2 Satellite Engine", endpoint: "https://catalogue.dataspace.copernicus.eu", quota: "62% Monthly Tile Limit", status: "Healthy • Next Run in 4h" },
          ].map((api, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div>
                <h4 className="font-bold text-[#00261B]">{api.name}</h4>
                <span className="text-[10px] font-mono text-[#718575]">{api.endpoint}</span>
                <p className="text-[11px] text-[#4A5D4E] mt-0.5">{api.quota}</p>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#0F5132] bg-[#D1E7DD] px-2.5 py-1 rounded-md shrink-0">
                {api.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DomainPageShell>
  );
}
