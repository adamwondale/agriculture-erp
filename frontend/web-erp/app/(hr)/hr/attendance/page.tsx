"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const ATTEND_KPIS: KpiMetric[] = [
  {
    title: "Present Today",
    value: "278 / 284",
    change: "97.8% Rate",
    changeType: "positive",
    subtext: "Biometric & geo-fenced mobile pings",
    icon: "fingerprint",
  },
  {
    title: "Field GPS Accuracy",
    value: "Within 15m",
    change: "Geo-Fenced",
    changeType: "positive",
    subtext: "Extension workers verified at assigned hubs",
    icon: "my_location",
  },
  {
    title: "Casual Labor Logs",
    value: "420 Casuals",
    change: "Batch Signed",
    changeType: "neutral",
    subtext: "Manager verified daily rate timesheets",
    icon: "checklist",
  },
];

export default function AttendancePage() {
  return (
    <DomainPageShell
      badge="Workforce Attendance & Audit"
      badgeColor="#804A00"
      title="Biometric Fingerprint & Geo-Fenced Mobile Check-In Audit"
      subtitle="Unified attendance tracking across HQ biometric scanners, field agronomist GPS mobile check-ins, and casual labor batch timesheets."
      kpis={ATTEND_KPIS}
      actions={[
        { label: "Export Monthly Timesheet", icon: "download", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Today's Field & HQ Attendance Audit Log</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEFEA] text-[10px] font-mono uppercase text-[#718575]">
                <th className="pb-3 font-bold">Employee</th>
                <th className="pb-3 font-bold">Department</th>
                <th className="pb-3 font-bold">Method</th>
                <th className="pb-3 font-bold">Time In</th>
                <th className="pb-3 font-bold">Time Out</th>
                <th className="pb-3 font-bold">GPS Geofence Match</th>
                <th className="pb-3 font-bold">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFEA]">
              {[
                { name: "Abebe Tesfaye", dept: "Executive Leadership", method: "HQ Biometric Scanner", in: "08:14 AM", out: "--", geo: "HQ Office Pin Verified", status: "Verified" },
                { name: "Dagnachew Kebede", dept: "Field Agronomy", method: "Mobile App GPS", in: "07:55 AM", out: "--", geo: "Babu Kebele Hub (Within 12m)", status: "Geo-Verified" },
                { name: "Kassahun Bekele", dept: "Warehouse & Silos", method: "Biometric Scanner", in: "07:30 AM", out: "--", geo: "Adama Silo Gate Verified", status: "Verified" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3.5 font-bold text-[#00261B]">{row.name}</td>
                  <td className="py-3.5 text-[#4A5D4E]">{row.dept}</td>
                  <td className="py-3.5 text-[#00261B]">{row.method}</td>
                  <td className="py-3.5 font-mono text-[#0B3D2E] font-semibold">{row.in}</td>
                  <td className="py-3.5 font-mono text-[#718575]">{row.out}</td>
                  <td className="py-3.5 text-[#4A5D4E] font-mono text-[11px]">{row.geo}</td>
                  <td className="py-3.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#D1E7DD] text-[#0F5132]">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DomainPageShell>
  );
}
