"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const SYNC_KPIS: KpiMetric[] = [
  {
    title: "Connected Field Devices",
    value: "112 Handhelds",
    change: "100% Android 8+",
    changeType: "positive",
    subtext: "Budget Android smartphones & tablets",
    icon: "smartphone",
  },
  {
    title: "Sync Conflict Rule",
    value: "Server Wins",
    change: "Field Review",
    changeType: "positive",
    subtext: "Conflicting mutations flagged for manager review",
    icon: "rule",
  },
  {
    title: "Pending Offline Queues",
    value: "4 Devices",
    change: "Remote Out of Range",
    changeType: "neutral",
    subtext: "Operating disconnected; auto-syncs on network",
    icon: "cloud_off",
  },
];

export default function MobileSyncPage() {
  return (
    <DomainPageShell
      badge="Offline Synchronization Engine"
      badgeColor="#1B3B6F"
      title="Mobile Field App Sync Gateway & Conflict Resolver"
      subtitle="Monitoring background synchronization batches from offline field devices, tracking local SQLite database mutations, and managing conflict resolution."
      kpis={SYNC_KPIS}
      actions={[
        { label: "Purge Stale Sync Batches", icon: "delete_sweep", variant: "outline" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Recent Mobile Sync Batches</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEFEA] text-[10px] font-mono uppercase text-[#718575]">
                <th className="pb-3 font-bold">Sync Batch ID</th>
                <th className="pb-3 font-bold">Field Agronomist</th>
                <th className="pb-3 font-bold">Device Model & OS</th>
                <th className="pb-3 font-bold">Mutations Uploaded</th>
                <th className="pb-3 font-bold">Conflict State</th>
                <th className="pb-3 font-bold">Last Sync Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFEA]">
              {[
                { batch: "SYNC-2026-9941", user: "Dagnachew Kebede", dev: "Tecno Spark 10 • Android 13", mut: "18 Inspections + 4 GPS Polygons", conf: "Zero Conflicts (Pass)", time: "12 mins ago" },
                { batch: "SYNC-2026-9940", user: "Fatuma Hassen", dev: "Infinix Hot 30 • Android 12", mut: "12 Farmer Registrations", conf: "Zero Conflicts (Pass)", time: "24 mins ago" },
                { batch: "SYNC-2026-9939", user: "Tewodros Mengistu", dev: "Samsung Galaxy Tab A7", mut: "22 Weighbridge Records", conf: "1 Conflict Flagged (Review)", time: "42 mins ago" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#146B45]">{row.batch}</td>
                  <td className="py-3.5 font-bold text-[#00261B]">{row.user}</td>
                  <td className="py-3.5 text-[#4A5D4E]">{row.dev}</td>
                  <td className="py-3.5 font-mono text-[#00261B]">{row.mut}</td>
                  <td className="py-3.5 font-mono font-semibold text-[#0F5132]">{row.conf}</td>
                  <td className="py-3.5 font-mono text-[#718575]">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DomainPageShell>
  );
}
