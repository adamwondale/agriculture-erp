"use client";

import React, { useState } from "react";

interface RoleDef {
  id: string;
  name: string;
  type: "System" | "Custom";
  usersCount: number;
  description: string;
}

const ROLES: RoleDef[] = [
  { id: "super-admin", name: "Super Admin", type: "System", usersCount: 2, description: "Full unrestricted platform access across all enterprise nodes and cryptographic keys." },
  { id: "sys-admin", name: "System Admin", type: "System", usersCount: 8, description: "Administrative node configuration, employee provisioning, and security management." },
  { id: "farm-mgr", name: "Farm Manager", type: "Custom", usersCount: 142, description: "Full operational authority over field clusters, planting cycles, and harvest allocations." },
  { id: "finance-off", name: "Finance Officer", type: "System", usersCount: 34, description: "Budget allocation, payment authorization, and financial audit generation." },
  { id: "field-agron", name: "Field Agronomist", type: "Custom", usersCount: 480, description: "Soil health telemetry, crop inspection logging, and cooperative training." },
  { id: "logistics-off", name: "Logistics Officer", type: "Custom", usersCount: 68, description: "Cold-chain transport monitoring, warehouse dispatch, and silo inventory." },
  { id: "viewer", name: "Viewer", type: "System", usersCount: 890, description: "Read-only access to operational reports and non-confidential aggregated telemetry." },
];

type PermState = "granted" | "inherited" | "denied";

interface PermCategory {
  category: string;
  permissions: {
    name: string;
    key: string;
    view: PermState;
    create: PermState;
    update: PermState;
    delete: PermState;
    approve: PermState;
  }[];
}

const INITIAL_MATRIX: PermCategory[] = [
  {
    category: "Organization & Nodes",
    permissions: [
      { name: "Branches & Hubs", key: "org.branch", view: "granted", create: "denied", update: "denied", delete: "denied", approve: "denied" },
      { name: "Field Stations", key: "org.station", view: "granted", create: "granted", update: "granted", delete: "denied", approve: "denied" },
    ],
  },
  {
    category: "Farm Management",
    permissions: [
      { name: "Farm Parcels", key: "farm.parcel", view: "granted", create: "granted", update: "granted", delete: "denied", approve: "granted" },
      { name: "Agronomist Tasks", key: "farm.task", view: "granted", create: "granted", update: "granted", delete: "granted", approve: "granted" },
    ],
  },
  {
    category: "Crop Cycles & Harvest",
    permissions: [
      { name: "Planting Schedules", key: "crop.schedule", view: "granted", create: "granted", update: "granted", delete: "denied", approve: "granted" },
      { name: "Yield Estimates", key: "crop.yield", view: "granted", create: "granted", update: "granted", delete: "denied", approve: "granted" },
    ],
  },
  {
    category: "Finance & Payments",
    permissions: [
      { name: "Payment Requests", key: "fin.payment", view: "granted", create: "granted", update: "denied", delete: "denied", approve: "denied" },
      { name: "Subsidy Allocation", key: "fin.subsidy", view: "granted", create: "denied", update: "denied", delete: "denied", approve: "denied" },
    ],
  },
];

export default function RolesAndPermissionsPage() {
  const [selectedRoleId, setSelectedRoleId] = useState<string>("farm-mgr");
  const [matrix, setMatrix] = useState<PermCategory[]>(INITIAL_MATRIX);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  const selectedRole = ROLES.find((r) => r.id === selectedRoleId) || ROLES[0];

  const togglePermission = (catIndex: number, permIndex: number, action: "view" | "create" | "update" | "delete" | "approve") => {
    const updated = JSON.parse(JSON.stringify(matrix));
    const current = updated[catIndex].permissions[permIndex][action];
    const nextState: PermState = current === "granted" ? "denied" : current === "denied" ? "inherited" : "granted";
    updated[catIndex].permissions[permIndex][action] = nextState;
    setMatrix(updated);
    setHasChanges(true);
  };

  const handleSave = () => {
    alert(`Permissions saved for role: ${selectedRole.name}`);
    setHasChanges(false);
  };

  const handleReset = () => {
    setMatrix(INITIAL_MATRIX);
    setHasChanges(false);
  };

  const renderBadge = (state: PermState) => {
    switch (state) {
      case "granted":
        return (
          <span className="w-6 h-6 rounded-lg bg-[#E8F1EA] text-[#146B45] flex items-center justify-center font-bold text-xs shadow-2xs">
            <span className="material-symbols-outlined text-[15px]">check</span>
          </span>
        );
      case "denied":
        return (
          <span className="w-6 h-6 rounded-lg bg-[#FDE8E8] text-[#C94B4B] flex items-center justify-center font-bold text-xs shadow-2xs">
            <span className="material-symbols-outlined text-[15px]">close</span>
          </span>
        );
      case "inherited":
        return (
          <span className="w-6 h-6 rounded-lg bg-[#F7F4EC] text-[#66736C] border border-[#DDE4DE] flex items-center justify-center font-bold text-xs">
            <span className="material-symbols-outlined text-[14px]">link</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-2 border-b border-[#DDE4DE]/60">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-[#00261B]" style={{ letterSpacing: "-0.02em" }}>
              Roles &amp; Permissions
            </h1>
            <span className="px-3 py-0.5 rounded-full bg-[#E8F1EA] text-[#146B45] text-xs font-semibold">
              RBAC Matrix Engine
            </span>
          </div>
          <p className="text-sm text-[#66736C] mt-1">
            Configure enterprise security profiles, operational module access, and authority delegation rules.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {hasChanges && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="px-3.5 py-2 rounded-xl bg-white border border-[#DDE4DE] text-[#66736C] hover:text-[#00261B] text-xs font-semibold transition-all active:scale-[0.97]"
              >
                Reset
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-[#146B45] text-white hover:bg-[#0B3D2E] text-xs font-semibold transition-all active:scale-[0.97] shadow-sm flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">save</span>
                <span>Save Changes</span>
              </button>
            </div>
          )}
          <button
            onClick={() => alert("Create Role modal triggered")}
            className="px-4 py-2 rounded-xl bg-[#0B3D2E] text-white hover:bg-[#062A20] text-xs font-semibold flex items-center gap-2 shadow-sm transition-all active:scale-[0.97]"
          >
            <span className="material-symbols-outlined text-[18px]">add_moderator</span>
            <span>+ Create Role</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout: Left Role Selector (4 Cols) + Right Permissions Matrix (8 Cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column: Roles List */}
        <section className="xl:col-span-4 rounded-2xl bg-white border border-[#DDE4DE] shadow-subtle p-4 space-y-2">
          <div className="px-2 pb-2 border-b border-[#DDE4DE] flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#66736C]">Configured Roles</span>
            <span className="text-[11px] font-mono text-[#146B45] font-semibold">{ROLES.length} Active</span>
          </div>

          <div className="space-y-1">
            {ROLES.map((role) => {
              const isSelected = selectedRoleId === role.id;
              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRoleId(role.id)}
                  className={`p-3 rounded-xl cursor-pointer transition-all active:scale-[0.98] ${
                    isSelected
                      ? "bg-[#E8F1EA] text-[#00261B] border border-[#146B45]/20 shadow-xs"
                      : "hover:bg-[#F7F4EC] text-[#17231D]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs">{role.name}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-semibold ${
                        role.type === "System"
                          ? "bg-white border border-[#DDE4DE] text-[#66736C]"
                          : "bg-[#146B45] text-white"
                      }`}
                    >
                      {role.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#66736C]">
                    <span className="truncate max-w-[180px]">{role.description}</span>
                    <span className="font-mono text-[#146B45] font-medium shrink-0 ml-2">
                      {role.usersCount} users
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Right Column: Permission Matrix */}
        <section className="xl:col-span-8 rounded-2xl bg-white border border-[#DDE4DE] shadow-subtle p-5 space-y-5">
          {/* Active Role Meta Card */}
          <div className="p-4 rounded-xl bg-[#F7F4EC] border border-[#DDE4DE] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#00261B]">{selectedRole.name}</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-[#DDE4DE] text-[#146B45] font-semibold">
                  {selectedRole.type} Definition
                </span>
              </div>
              <p className="text-xs text-[#66736C] mt-1">{selectedRole.description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-semibold text-[#66736C]">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#146B45]"></span> Granted
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#C94B4B]"></span> Denied
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#DDE4DE]"></span> Inherited
              </span>
            </div>
          </div>

          {/* Interactive Matrix Table */}
          <div className="overflow-x-auto rounded-xl border border-[#DDE4DE]">
            <table className="w-full min-w-[680px] text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F7F4EC] border-b border-[#DDE4DE] text-[#66736C] text-[10px] font-bold uppercase tracking-wider">
                  <th className="py-2.5 px-4">Module / Entity Scope</th>
                  <th className="py-2.5 px-2 text-center w-16">View</th>
                  <th className="py-2.5 px-2 text-center w-16">Create</th>
                  <th className="py-2.5 px-2 text-center w-16">Update</th>
                  <th className="py-2.5 px-2 text-center w-16">Delete</th>
                  <th className="py-2.5 px-2 text-center w-16">Approve</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDE4DE]/60">
                {matrix.map((cat, catIdx) => (
                  <React.Fragment key={cat.category}>
                    <tr className="bg-[#F7F4EC]/50">
                      <td colSpan={6} className="py-2 px-4 font-bold text-[11px] text-[#00261B] uppercase tracking-wide">
                        {cat.category}
                      </td>
                    </tr>
                    {cat.permissions.map((perm, permIdx) => (
                      <tr key={perm.key} className="hover:bg-[#F7F4EC]/30 transition-colors">
                        <td className="py-2.5 px-4 font-medium text-[#17231D]">
                          <div>{perm.name}</div>
                          <div className="text-[10px] font-mono text-[#66736C]">{perm.key}</div>
                        </td>
                        <td
                          className="py-2.5 px-2 text-center cursor-pointer hover:bg-black/5"
                          onClick={() => togglePermission(catIdx, permIdx, "view")}
                        >
                          <div className="flex justify-center">{renderBadge(perm.view)}</div>
                        </td>
                        <td
                          className="py-2.5 px-2 text-center cursor-pointer hover:bg-black/5"
                          onClick={() => togglePermission(catIdx, permIdx, "create")}
                        >
                          <div className="flex justify-center">{renderBadge(perm.create)}</div>
                        </td>
                        <td
                          className="py-2.5 px-2 text-center cursor-pointer hover:bg-black/5"
                          onClick={() => togglePermission(catIdx, permIdx, "update")}
                        >
                          <div className="flex justify-center">{renderBadge(perm.update)}</div>
                        </td>
                        <td
                          className="py-2.5 px-2 text-center cursor-pointer hover:bg-black/5"
                          onClick={() => togglePermission(catIdx, permIdx, "delete")}
                        >
                          <div className="flex justify-center">{renderBadge(perm.delete)}</div>
                        </td>
                        <td
                          className="py-2.5 px-2 text-center cursor-pointer hover:bg-black/5"
                          onClick={() => togglePermission(catIdx, permIdx, "approve")}
                        >
                          <div className="flex justify-center">{renderBadge(perm.approve)}</div>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-[#66736C] text-center">
            Click any cell to cycle state: <span className="font-semibold text-[#146B45]">Granted</span> &rarr;{" "}
            <span className="font-semibold text-[#C94B4B]">Denied</span> &rarr;{" "}
            <span className="font-semibold text-[#66736C]">Inherited</span>
          </p>
        </section>
      </div>
    </div>
  );
}
