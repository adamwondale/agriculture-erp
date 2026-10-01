"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const TELEMETRY_KPIS: KpiMetric[] = [
  {
    title: "Microservices Mesh",
    value: "17 Services",
    change: "100% Healthy",
    changeType: "positive",
    subtext: "Docker containers & .NET 8 services active",
    icon: "dns",
  },
  {
    title: "RabbitMQ Message Depth",
    value: "Zero Lag",
    change: "5,400 msg/s",
    changeType: "positive",
    subtext: "Topic exchanges & idempotent event consumers",
    icon: "swap_calls",
  },
  {
    title: "Redis Cache Hit Rate",
    value: "96.4%",
    change: "p95 < 8ms",
    changeType: "positive",
    subtext: "Distributed tokens, RBAC claims & GIS tiles",
    icon: "memory",
  },
  {
    title: "Database Latency",
    value: "14ms p99",
    change: "17 Databases",
    changeType: "positive",
    subtext: "Database-per-service PostgreSQL isolation",
    icon: "storage",
  },
];

export default function TelemetryPage() {
  return (
    <DomainPageShell
      badge="IT Infrastructure & Telemetry"
      badgeColor="#1B3B6F"
      title="API Gateway & Microservices Telemetry Dashboard"
      subtitle="Real-time operational health across all 17 C# .NET 8 microservices, RabbitMQ message brokers, PostgreSQL 16 databases, and Redis clusters."
      kpis={TELEMETRY_KPIS}
      actions={[
        { label: "Trigger Global Health Probe", icon: "troubleshoot", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">17 Microservices Health Grid</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: "Core & Admin Service", port: ":5001", db: "agri_core_admin", status: "Healthy (Live Auth)" },
            { name: "API Gateway (Ocelot)", port: ":5000", db: "Reverse Proxy", status: "Healthy" },
            { name: "Master Data Service", port: ":5002", db: "agri_master_data", status: "Healthy" },
            { name: "Automation Workflow Service", port: ":5003", db: "agri_workflow", status: "Healthy" },
            { name: "Integration Gateway Service", port: ":5004", db: "agri_integrations", status: "Healthy" },
            { name: "Farmer Service", port: ":5005", db: "agri_farmer", status: "Healthy" },
            { name: "Farm & Land Service", port: ":5006", db: "agri_farm", status: "Healthy" },
            { name: "Crop Production Service", port: ":5007", db: "agri_crop_production", status: "Healthy" },
            { name: "Warehouse & Inventory Service", port: ":5008", db: "agri_warehouse", status: "Healthy" },
            { name: "Finance & Accounting Service", port: ":5009", db: "agri_finance", status: "Healthy" },
            { name: "HR & Payroll Service", port: ":5010", db: "agri_hr", status: "Healthy" },
            { name: "Mobile Sync Gateway", port: ":5011", db: "agri_mobile_sync", status: "Healthy" },
          ].map((svc, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] flex items-center justify-between text-xs">
              <div>
                <h4 className="font-bold text-[#00261B]">{svc.name}</h4>
                <span className="text-[10px] font-mono text-[#718575]">{svc.port} • {svc.db}</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#0F5132] bg-[#D1E7DD] px-2 py-0.5 rounded-md">
                {svc.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DomainPageShell>
  );
}
