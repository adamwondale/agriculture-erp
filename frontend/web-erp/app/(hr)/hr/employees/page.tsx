"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const EMP_KPIS: KpiMetric[] = [
  {
    title: "Permanent Staff",
    value: "148 Staff",
    change: "Core Enterprise",
    changeType: "positive",
    subtext: "HQ, agronomists & warehouse managers",
    icon: "badge",
  },
  {
    title: "Fixed-Term Staff",
    value: "96 Staff",
    change: "Seasonal Contracts",
    changeType: "neutral",
    subtext: "Extension workers & collection clerks",
    icon: "contract",
  },
  {
    title: "Automated User Provisioning",
    value: "5-Step Pipeline",
    change: "Active Flow",
    changeType: "positive",
    subtext: "HR Creation -> System Account -> Admin Approval",
    icon: "person_add",
  },
];

export default function EmployeesPage() {
  return (
    <DomainPageShell
      badge="Employee Directory & Provisioning"
      badgeColor="#804A00"
      title="Employee Master Directory & 5-Step Provisioning Pipeline"
      subtitle="Complete personnel profiles, Fayda National ID verification, employment contracts, and automated system user account provisioning."
      kpis={EMP_KPIS}
      actions={[
        { label: "Provision New Employee (5-Step)", icon: "person_add", href: "/users/create", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Company Employee Directory</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEFEA] text-[10px] font-mono uppercase text-[#718575]">
                <th className="pb-3 font-bold">Emp ID</th>
                <th className="pb-3 font-bold">Full Name</th>
                <th className="pb-3 font-bold">Department</th>
                <th className="pb-3 font-bold">Position & Grade</th>
                <th className="pb-3 font-bold">Work Location</th>
                <th className="pb-3 font-bold">Employment Type</th>
                <th className="pb-3 font-bold">Account State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFEA]">
              {[
                { id: "EMP-001", name: "Abebe Tesfaye", dept: "Executive Leadership", pos: "Super Administrator • Gr 10", loc: "Holding HQ • Addis Ababa", type: "Permanent", status: "Active • MFA Active" },
                { id: "EMP-002", name: "Kinde Gudeta", dept: "Finance & Treasury", pos: "Finance Manager • Gr 8", loc: "East Africa Hub • Jimma", type: "Permanent", status: "Active • MFA Active" },
                { id: "EMP-003", name: "Dagnachew Kebede", dept: "Agronomy Advisory", pos: "Lead Zone Agronomist • Gr 6", loc: "Limmu Kosa Field Station", type: "Permanent", status: "Active (Mobile)" },
                { id: "EMP-004", name: "Tigist Alemu", dept: "Human Resources", pos: "HR & Payroll Lead • Gr 7", loc: "Holding HQ • Addis Ababa", type: "Permanent", status: "Active • MFA Active" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#146B45]">{row.id}</td>
                  <td className="py-3.5 font-bold text-[#00261B]">{row.name}</td>
                  <td className="py-3.5 text-[#4A5D4E]">{row.dept}</td>
                  <td className="py-3.5 text-[#00261B] font-medium">{row.pos}</td>
                  <td className="py-3.5 text-[#4A5D4E]">{row.loc}</td>
                  <td className="py-3.5 font-mono text-[#00261B]">{row.type}</td>
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
