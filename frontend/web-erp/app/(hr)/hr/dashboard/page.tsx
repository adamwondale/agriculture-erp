"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const HR_KPIS: KpiMetric[] = [
  {
    title: "Total Workforce",
    value: "284 Staff",
    change: "+18 Seasonal",
    changeType: "positive",
    subtext: "Permanent, fixed-term & extension agents",
    icon: "badge",
  },
  {
    title: "Seasonal Casual Labor",
    value: "420 Workers",
    change: "Harvest Peak",
    changeType: "neutral",
    subtext: "Weighbridge loaders & warehouse stackers",
    icon: "engineering",
  },
  {
    title: "Pending Leave Requests",
    value: "6 Requests",
    change: "Stage 2 HR Review",
    changeType: "warning",
    subtext: "Approved by manager; awaiting HR record",
    icon: "event_busy",
  },
  {
    title: "Active Clearances",
    value: "2 Exits",
    change: "Asset Handover",
    changeType: "neutral",
    subtext: "5-department exit clearance workflow",
    icon: "assignment_turned_in",
  },
];

export default function HrDashboardPage() {
  return (
    <DomainPageShell
      badge="People Operations & HR Management"
      badgeColor="#804A00"
      title="People Operations & Workforce Governance"
      subtitle="Employee directory, biometric & GPS check-in attendance audits, Ethiopian labor law statutory leaves, confidential payroll, and clearance checklists."
      kpis={HR_KPIS}
      actions={[
        { label: "Employee Directory", icon: "group", href: "/hr/employees", variant: "outline" },
        { label: "Attendance Audit", icon: "fingerprint", href: "/hr/attendance", variant: "outline" },
        { label: "Leave Administration", icon: "event_available", href: "/hr/leave", variant: "outline" },
        { label: "Confidential Payroll", icon: "lock", href: "/hr/payroll", variant: "primary" },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Breakdown */}
        <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
            <h2 className="text-base font-bold text-[#00261B]">Today's Workforce Attendance</h2>
            <span className="text-xs font-mono font-bold text-[#146B45]">98.2% Present</span>
          </div>

          <div className="space-y-3">
            {[
              { type: "HQ & Processing Plant Staff", count: "118 Staff", method: "Biometric Fingerprint", status: "100% Verified" },
              { type: "Field Agronomists & Extension Agents", count: "112 Staff", method: "Geo-Fenced Mobile GPS Check-In", status: "100% Within Boundaries" },
              { type: "Warehouse & Silo Storekeepers", count: "54 Staff", method: "Biometric + Daily Log", status: "100% Present" },
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-[#00261B]">{item.type}</h4>
                  <span className="text-[10px] text-[#718575]">{item.method}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-[#00261B] block">{item.count}</span>
                  <span className="text-[10px] font-mono text-[#0F5132] font-semibold">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending HR Tasks */}
        <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
            <h2 className="text-base font-bold text-[#00261B]">Actionable HR Workflows</h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FFEAC2] text-[#804A00]">
              4 Action Items
            </span>
          </div>

          <div className="space-y-3">
            {[
              { title: "Monthly Payroll Run (Sept 2026)", desc: "Statutory pension (7%/11%) & income tax calculation ready", action: "Review Computation" },
              { title: "Annual Leave: Dagnachew K. (14 Days)", desc: "Direct manager approved; pending statutory balance audit", action: "Record Leave" },
              { title: "Asset Return: Motorbike #ET-2940", desc: "Store custody verified; clearance step 2 of 5", action: "Sign Clearance" },
            ].map((task, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-1.5 text-xs">
                <h4 className="font-bold text-[#00261B]">{task.title}</h4>
                <p className="text-[11px] text-[#718575]">{task.desc}</p>
                <span className="text-[11px] font-bold text-[#804A00] block">{task.action} &rarr;</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DomainPageShell>
  );
}
