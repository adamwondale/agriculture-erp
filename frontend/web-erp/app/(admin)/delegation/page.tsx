"use client";

import React, { useState } from "react";

interface DelegationItem {
  id: string;
  delegator: string;
  delegate: string;
  role: string;
  scope: string;
  startDate: string;
  endDate: string;
  status: "Active" | "Scheduled" | "Expired" | "Revoked";
}

const INITIAL_DELEGATIONS: DelegationItem[] = [
  {
    id: "del-1",
    delegator: "Kinde Gudeta (Finance Mgr)",
    delegate: "Selamawit Bekele (Finance Off)",
    role: "Payment Approver",
    scope: "Oromia Region",
    startDate: "2026-09-15",
    endDate: "2026-09-30",
    status: "Active",
  },
  {
    id: "del-2",
    delegator: "Abebe Tesfaye (System Admin)",
    delegate: "Daniel Kebede (IT Lead)",
    role: "Node Provisioner",
    scope: "East Africa Region",
    startDate: "2026-10-01",
    endDate: "2026-10-14",
    status: "Scheduled",
  },
  {
    id: "del-3",
    delegator: "Yonas Teka (Logistics Mgr)",
    delegate: "Mahlet Hale (Silo Dispatcher)",
    role: "Warehouse Allocator",
    scope: "Ada'a Central Depot",
    startDate: "2026-08-01",
    endDate: "2026-08-31",
    status: "Expired",
  },
];

export default function DelegationManagementPage() {
  const [delegations, setDelegations] = useState<DelegationItem[]>(INITIAL_DELEGATIONS);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [newDelegation, setNewDelegation] = useState({
    delegator: "Abebe Tesfaye (System Admin)",
    delegate: "Kinde Gudeta (Finance Officer)",
    role: "Payment Approver",
    scope: "Oromia Regional Hub",
    startDate: "2026-09-21",
    endDate: "2026-10-05",
    reason: "Inter-regional farm subsidy emergency sign-off coverage",
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const created: DelegationItem = {
      id: `del-${Date.now()}`,
      delegator: newDelegation.delegator,
      delegate: newDelegation.delegate,
      role: newDelegation.role,
      scope: newDelegation.scope,
      startDate: newDelegation.startDate,
      endDate: newDelegation.endDate,
      status: "Active",
    };
    setDelegations([created, ...delegations]);
    setDrawerOpen(false);
  };

  const handleRevoke = (id: string) => {
    setDelegations(
      delegations.map((d) => (d.id === id ? { ...d, status: "Revoked" } : d))
    );
  };

  const getStatusBadge = (status: DelegationItem["status"]) => {
    switch (status) {
      case "Active":
        return "bg-[#E8F1EA] text-[#146B45]";
      case "Scheduled":
        return "bg-[#E8F2FA] text-[#3978A8]";
      case "Expired":
        return "bg-[#F7F4EC] text-[#66736C] border border-[#DDE4DE]";
      case "Revoked":
        return "bg-[#FDE8E8] text-[#C94B4B]";
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Header Bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-2 border-b border-[#DDE4DE]/60">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-[#00261B]" style={{ letterSpacing: "-0.02em" }}>
              Delegation Management
            </h1>
            <span className="px-3 py-0.5 rounded-full bg-[#E8F1EA] text-[#146B45] text-xs font-semibold">
              Time-Bound Authority
            </span>
          </div>
          <p className="text-sm text-[#66736C] mt-1">
            Temporarily transfer operational sign-off privileges and organizational scope with automated expiry.
          </p>
        </div>

        <button
          onClick={() => setDrawerOpen(true)}
          className="px-4 py-2 rounded-xl bg-[#0B3D2E] text-white hover:bg-[#062A20] text-xs font-semibold flex items-center gap-2 shadow-sm transition-all active:scale-[0.97]"
        >
          <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
          <span>+ Create Delegation</span>
        </button>
      </div>

      {/* Main Delegations Table */}
      <div className="rounded-2xl bg-white border border-[#DDE4DE] shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F7F4EC] border-b border-[#DDE4DE] text-[#66736C] uppercase font-bold text-[10px] tracking-wider">
                <th className="py-3 px-4">Delegator (Origin)</th>
                <th className="py-3 px-4">Delegate (Assignee)</th>
                <th className="py-3 px-4">Transferred Role</th>
                <th className="py-3 px-4">Scope</th>
                <th className="py-3 px-4">Effective Window</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE4DE]/60">
              {delegations.map((item) => (
                <tr key={item.id} className="hover:bg-[#F7F4EC]/60 transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#17231D]">{item.delegator}</td>
                  <td className="py-3 px-4 font-semibold text-[#146B45]">{item.delegate}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-[#F7F4EC] border border-[#DDE4DE] font-mono text-[11px]">
                      {item.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#66736C]">{item.scope}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-[#17231D]">
                    {item.startDate} &rarr; {item.endDate}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {item.status === "Active" ? (
                      <button
                        onClick={() => handleRevoke(item.id)}
                        className="px-2.5 py-1 rounded-lg bg-white border border-[#DDE4DE] text-[#C94B4B] hover:bg-[#FDE8E8] font-semibold text-[11px] transition-colors active:scale-95"
                      >
                        Revoke
                      </button>
                    ) : (
                      <span className="text-[#66736C] text-[11px]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance Note */}
      <div className="p-3.5 rounded-xl bg-[#E8F1EA] text-[#0B3D2E] text-xs flex items-center gap-3 border border-[#146B45]/20">
        <span className="material-symbols-outlined text-[20px] text-[#146B45] shrink-0">timer</span>
        <span>
          <strong>Automated De-provisioning:</strong> All delegated responsibilities are revoked automatically at 23:59:59 UTC on the specified end date. Delegations cannot be nested or recursively re-delegated.
        </span>
      </div>

      {/* Slide-In Creation Drawer (Using Emil Kowalski custom ease-drawer) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity duration-300">
          <div className="w-full max-w-full sm:max-w-md bg-white h-full shadow-drawer p-4 sm:p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#DDE4DE] mb-5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[22px] text-[#146B45]">swap_horiz</span>
                  <h3 className="text-base font-bold text-[#00261B]">Create Authority Delegation</h3>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1 rounded-lg hover:bg-[#F7F4EC] text-[#66736C]"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <form onSubmit={handleCreate} id="delegation-form" className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#17231D] mb-1">Delegator (Originator)</label>
                  <input
                    type="text"
                    value={newDelegation.delegator}
                    disabled
                    className="w-full h-10 px-3 bg-[#F7F4EC] border border-[#DDE4DE] rounded-xl text-[#66736C] font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#17231D] mb-1">Delegate (Assignee)</label>
                  <select
                    value={newDelegation.delegate}
                    onChange={(e) => setNewDelegation({ ...newDelegation, delegate: e.target.value })}
                    className="w-full h-10 px-3 bg-white border border-[#DDE4DE] rounded-xl text-[#17231D] focus:border-[#146B45] focus:outline-none"
                  >
                    <option>Kinde Gudeta (Finance Officer)</option>
                    <option>Selamawit Bekele (Farm Manager)</option>
                    <option>Daniel Kebede (Field Agronomist)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#17231D] mb-1">Role Delegated</label>
                  <select
                    value={newDelegation.role}
                    onChange={(e) => setNewDelegation({ ...newDelegation, role: e.target.value })}
                    className="w-full h-10 px-3 bg-white border border-[#DDE4DE] rounded-xl text-[#17231D] focus:border-[#146B45] focus:outline-none"
                  >
                    <option>Payment Approver</option>
                    <option>Farm Parcel Administrator</option>
                    <option>Warehouse Dispatcher</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#17231D] mb-1">Scope Bound</label>
                  <input
                    type="text"
                    value={newDelegation.scope}
                    onChange={(e) => setNewDelegation({ ...newDelegation, scope: e.target.value })}
                    className="w-full h-10 px-3 bg-white border border-[#DDE4DE] rounded-xl text-[#17231D] focus:border-[#146B45] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#17231D] mb-1">Start Date</label>
                    <input
                      type="date"
                      value={newDelegation.startDate}
                      onChange={(e) => setNewDelegation({ ...newDelegation, startDate: e.target.value })}
                      className="w-full h-10 px-3 bg-white border border-[#DDE4DE] rounded-xl text-[#17231D] focus:border-[#146B45] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#17231D] mb-1">End Date</label>
                    <input
                      type="date"
                      value={newDelegation.endDate}
                      onChange={(e) => setNewDelegation({ ...newDelegation, endDate: e.target.value })}
                      className="w-full h-10 px-3 bg-white border border-[#DDE4DE] rounded-xl text-[#17231D] focus:border-[#146B45] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#17231D] mb-1">Mandatory Business Justification</label>
                  <textarea
                    rows={3}
                    value={newDelegation.reason}
                    onChange={(e) => setNewDelegation({ ...newDelegation, reason: e.target.value })}
                    className="w-full p-3 bg-white border border-[#DDE4DE] rounded-xl text-[#17231D] focus:border-[#146B45] focus:outline-none"
                  />
                </div>
              </form>
            </div>

            <div className="pt-4 border-t border-[#DDE4DE] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#66736C] hover:text-[#00261B]"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="delegation-form"
                className="px-5 py-2.5 rounded-xl bg-[#0B3D2E] hover:bg-[#062A20] text-white text-xs font-semibold shadow-xs active:scale-[0.98] transition-all"
              >
                Authorize Delegation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
