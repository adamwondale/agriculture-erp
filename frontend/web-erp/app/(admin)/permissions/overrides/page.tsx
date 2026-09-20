"use client";

import React, { useState } from "react";
import Link from "next/link";

interface OverrideItem {
  id: string;
  permission: string;
  inheritedFrom: string;
  effect: "Grant" | "Deny";
  reason: string;
  expiration: string;
}

const INITIAL_OVERRIDES: OverrideItem[] = [
  {
    id: "ov-1",
    permission: "payment.emergency.approve",
    inheritedFrom: "System Admin (Base: Denied)",
    effect: "Grant",
    reason: "Disaster recovery contingency for Oromia drought relief seed subsidies",
    expiration: "2026-10-15",
  },
  {
    id: "ov-2",
    permission: "employee.salary.export",
    inheritedFrom: "System Admin (Base: Granted)",
    effect: "Deny",
    reason: "Internal privacy audit compliance lockdown",
    expiration: "Indefinite",
  },
  {
    id: "ov-3",
    permission: "inventory.emergency.dispatch",
    inheritedFrom: "Farm Manager (Base: Denied)",
    effect: "Grant",
    reason: "Inter-regional fertilizer rebalancing protocol",
    expiration: "2026-11-01",
  },
];

export default function PermissionOverridesPage() {
  const [overrides, setOverrides] = useState<OverrideItem[]>(INITIAL_OVERRIDES);
  const [fieldPerms, setFieldPerms] = useState([
    { field: "Employee.salary", current: "Hidden", options: ["Hidden", "Read Only", "Read / Write"] },
    { field: "PaymentRequest.amount", current: "Read Only", options: ["Hidden", "Read Only", "Read / Write"] },
    { field: "FarmerProfile.phoneNumber", current: "Read / Write", options: ["Hidden", "Read Only", "Read / Write"] },
    { field: "Warehouse.stockValuation", current: "Read Only", options: ["Hidden", "Read Only", "Read / Write"] },
  ]);

  const handleFieldChange = (index: number, val: string) => {
    const updated = [...fieldPerms];
    updated[index].current = val;
    setFieldPerms(updated);
  };

  const handleRevoke = (id: string) => {
    setOverrides(overrides.filter((o) => o.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-2 border-b border-[#DDE4DE]/60">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-[#00261B]" style={{ letterSpacing: "-0.02em" }}>
              User Permission Overrides
            </h1>
            <span className="px-3 py-0.5 rounded-full bg-[#E8F1EA] text-[#146B45] text-xs font-semibold">
              Exception Control
            </span>
          </div>
          <p className="text-sm text-[#66736C] mt-1">
            Grant or restrict specific functional permissions and field-level masking rules for individual user identities.
          </p>
        </div>

        <button
          onClick={() => alert("Add Override Exception modal triggered")}
          className="px-4 py-2 rounded-xl bg-[#0B3D2E] text-white hover:bg-[#062A20] text-xs font-semibold flex items-center gap-2 shadow-sm transition-all active:scale-[0.97]"
        >
          <span className="material-symbols-outlined text-[18px]">add_moderator</span>
          <span>+ Add Exception Rule</span>
        </button>
      </div>

      {/* Target User Summary Card */}
      <div className="p-5 rounded-2xl bg-white border border-[#DDE4DE] shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#0B3D2E] text-white font-bold text-sm flex items-center justify-center shadow-xs">
            AT
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#00261B]">Abebe Tesfaye</h2>
              <span className="px-2 py-0.5 rounded-md bg-[#F7F4EC] text-[#0B3D2E] border border-[#DDE4DE] font-semibold text-xs">
                System Admin
              </span>
            </div>
            <p className="text-xs text-[#66736C]">
              Z•ORISIS Holding • Oromia HQ • Employee ID: <span className="font-mono text-[#00261B]">EMP-88204</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#66736C]">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#66736C] block">Base Permissions</span>
            <span className="font-bold text-[#00261B] text-sm">142 Active</span>
          </div>
          <div className="w-px h-8 bg-[#DDE4DE] hidden sm:block"></div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#66736C] block">Active Overrides</span>
            <span className="font-bold text-[#146B45] text-sm">{overrides.length} Exceptions</span>
          </div>
          <div className="w-px h-8 bg-[#DDE4DE] hidden sm:block"></div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#66736C] block">Audit Integrity</span>
            <span className="font-bold text-[#146B45] text-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">verified</span> Verified
            </span>
          </div>
        </div>
      </div>

      {/* Overrides Table */}
      <section className="rounded-2xl bg-white border border-[#DDE4DE] shadow-subtle p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#DDE4DE]">
          <div>
            <h3 className="text-sm font-bold text-[#00261B]">Active Permission Overrides</h3>
            <p className="text-xs text-[#66736C]">Overrides strictly supersede base role RBAC inheritance</p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#DDE4DE]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F7F4EC] border-b border-[#DDE4DE] text-[#66736C] text-[10px] font-bold uppercase tracking-wider">
                <th className="py-2.5 px-4">Permission Key</th>
                <th className="py-2.5 px-4">Inherited From</th>
                <th className="py-2.5 px-3">Effect</th>
                <th className="py-2.5 px-4">Business Justification</th>
                <th className="py-2.5 px-4">Expiration</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE4DE]/60">
              {overrides.map((item) => (
                <tr key={item.id} className="hover:bg-[#F7F4EC]/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#00261B]">{item.permission}</td>
                  <td className="py-3 px-4 text-[#66736C]">{item.inheritedFrom}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                        item.effect === "Grant"
                          ? "bg-[#E8F1EA] text-[#146B45]"
                          : "bg-[#FDE8E8] text-[#C94B4B]"
                      }`}
                    >
                      {item.effect}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#17231D] max-w-xs">{item.reason}</td>
                  <td className="py-3 px-4 text-[#66736C] font-mono">{item.expiration}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleRevoke(item.id)}
                      className="px-2.5 py-1 rounded-lg bg-white border border-[#DDE4DE] text-[#C94B4B] hover:bg-[#FDE8E8] font-semibold text-[11px] transition-colors active:scale-95"
                    >
                      Revoke
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Field-Level Permissions Section */}
      <section className="rounded-2xl bg-white border border-[#DDE4DE] shadow-subtle p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#DDE4DE]">
          <div>
            <h3 className="text-sm font-bold text-[#00261B]">Field-Level Attribute Masking</h3>
            <p className="text-xs text-[#66736C]">Enforce column-level data security and confidential field redaction</p>
          </div>
          <span className="text-[11px] text-[#146B45] font-semibold">Active NDPR Rule</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fieldPerms.map((field, idx) => (
            <div key={field.field} className="p-3.5 rounded-xl bg-[#F7F4EC] border border-[#DDE4DE] flex items-center justify-between">
              <div>
                <span className="font-mono font-bold text-xs text-[#00261B] block">{field.field}</span>
                <span className="text-[11px] text-[#66736C]">Data visibility mask</span>
              </div>
              <select
                value={field.current}
                onChange={(e) => handleFieldChange(idx, e.target.value)}
                className="h-8 px-2.5 bg-white border border-[#DDE4DE] rounded-lg text-xs font-semibold text-[#00261B] focus:border-[#146B45] focus:outline-none"
              >
                {field.options.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </section>

      {/* Security Disclaimer Banner */}
      <div className="p-3.5 rounded-xl bg-[#FFF3D6] text-[#D79A19] border border-[#D79A19]/20 text-xs flex items-center gap-3">
        <span className="material-symbols-outlined text-[20px] shrink-0">gavel</span>
        <span>
          <strong>Audit Compliance Notice:</strong> All permission override grants and field masking updates trigger an immutable cryptographic event signed by your current identity token.
        </span>
      </div>
    </div>
  );
}
