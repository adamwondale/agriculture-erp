"use client";

import React, { useState } from "react";
import { useCurrentUser, DEMO_ACCOUNTS, ROLES, RoleId } from "@/lib/rbac";

interface JwtClaimsInspectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JwtClaimsInspector({ isOpen, onClose }: JwtClaimsInspectorProps) {
  const { user, claims, token, roleConfig, permissions, switchRole, isSwitching } = useCurrentUser();
  const [activeTab, setActiveTab] = useState<"claims" | "permissions" | "raw" | "switch">("claims");
  const [copied, setCopied] = useState(false);
  const [permSearch, setPermSearch] = useState("");
  const [switchingRole, setSwitchingRole] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyToken = () => {
    if (!token) return;
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwitch = async (roleId: string) => {
    setSwitchingRole(roleId);
    await switchRole(roleId);
    setSwitchingRole(null);
  };

  const filteredPerms = (permissions || []).filter((p) =>
    p.toLowerCase().includes(permSearch.toLowerCase())
  );

  const expDate = claims?.exp ? new Date(claims.exp * 1000) : null;
  const isExpired = claims?.exp ? claims.exp * 1000 < Date.now() : false;
  const minutesLeft = claims?.exp ? Math.max(0, Math.round((claims.exp * 1000 - Date.now()) / 60000)) : 0;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#DDE4DE] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#0B3D2E] text-white p-5 flex items-center justify-between shrink-0 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <span className="material-symbols-outlined text-[22px] text-[#A3F4C3]">token</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base tracking-tight">Active JWT Claims &amp; RBAC Inspector</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#A3F4C3] text-[#062A20]">
                  .NET 8 Clean Architecture
                </span>
              </div>
              <p className="text-xs text-[#A8C3A0] mt-0.5">
                Cryptographically signed identity claims from <code className="font-mono text-white/90">core-admin-service</code>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Live Token Status Strip */}
        <div className="bg-[#F7F4EC] border-b border-[#DDE4DE] px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isExpired ? "bg-red-500" : "bg-[#146B45] animate-pulse"}`} />
              <span className="font-semibold text-[#17231D]">
                {isExpired ? "Token Expired" : "Active Verified Bearer Token"}
              </span>
            </div>
            <div className="text-[#66736C]">
              Expires in: <strong className="text-[#17231D]">{minutesLeft}m</strong> ({expDate?.toLocaleTimeString()})
            </div>
            <div className="text-[#66736C]">
              Issuer: <strong className="text-[#17231D] font-mono">{claims?.iss || "AgricultureERP"}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyToken}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#DDE4DE] text-[#0B3D2E] font-semibold text-xs hover:bg-[#E8F1EA] flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">{copied ? "check" : "content_copy"}</span>
              <span>{copied ? "Copied JWT" : "Copy Token"}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#DDE4DE] px-5 bg-white text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab("claims")}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === "claims"
                ? "border-[#146B45] text-[#0B3D2E]"
                : "border-transparent text-[#66736C] hover:text-[#17231D]"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">badge</span>
            <span>Claims Table ({Object.keys(claims?.raw || {}).length})</span>
          </button>

          <button
            onClick={() => setActiveTab("permissions")}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === "permissions"
                ? "border-[#146B45] text-[#0B3D2E]"
                : "border-transparent text-[#66736C] hover:text-[#17231D]"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span>Permission Codes ({permissions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("raw")}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === "raw"
                ? "border-[#146B45] text-[#0B3D2E]"
                : "border-transparent text-[#66736C] hover:text-[#17231D]"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">code</span>
            <span>Raw JWT &amp; Header</span>
          </button>

          <button
            onClick={() => setActiveTab("switch")}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === "switch"
                ? "border-[#146B45] text-[#0B3D2E]"
                : "border-transparent text-[#66736C] hover:text-[#17231D]"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">switch_account</span>
            <span>Live Role Switcher ({DEMO_ACCOUNTS.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* TAB 1: CLAIMS TABLE */}
          {activeTab === "claims" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#F7F4EC] border border-[#DDE4DE]">
                  <span className="text-[10px] uppercase font-bold text-[#66736C] block tracking-wider">Active Role</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="px-2 py-0.5 rounded-md text-xs font-mono font-bold"
                      style={{ backgroundColor: roleConfig.badgeBg, color: roleConfig.badgeColor }}
                    >
                      {roleConfig.shortLabel}
                    </span>
                    <span className="text-xs font-semibold text-[#17231D]">{roleConfig.title}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F7F4EC] border border-[#DDE4DE]">
                  <span className="text-[10px] uppercase font-bold text-[#66736C] block tracking-wider">Authenticated Identity</span>
                  <span className="text-xs font-semibold text-[#17231D] block mt-1">{user.name}</span>
                  <span className="text-[11px] text-[#66736C] font-mono">{user.email}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F7F4EC] border border-[#DDE4DE]">
                  <span className="text-[10px] uppercase font-bold text-[#66736C] block tracking-wider">Node &amp; Branch Scope</span>
                  <span className="text-xs font-semibold text-[#17231D] block mt-1">{user.region}</span>
                  <span className="text-[10px] text-[#66736C] font-mono truncate block">ID: {claims?.branchId || "HQ-ROOT"}</span>
                </div>
              </div>

              {/* Table of all extracted claims */}
              <div className="border border-[#DDE4DE] rounded-2xl overflow-hidden shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#E8F1EA] text-[#0B3D2E] font-bold border-b border-[#DDE4DE]">
                      <th className="py-2.5 px-4">Claim Type / URI</th>
                      <th className="py-2.5 px-4">Claim Value</th>
                      <th className="py-2.5 px-4 hidden md:table-cell">Standard Protocol</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DDE4DE]">
                    <tr className="hover:bg-[#F7F4EC]">
                      <td className="py-2 px-4 font-mono font-semibold text-[#0B3D2E]">sub (Subject)</td>
                      <td className="py-2 px-4 font-mono text-[#17231D]">{claims?.sub || "—"}</td>
                      <td className="py-2 px-4 text-[#66736C] hidden md:table-cell">RFC 7519 User ID GUID</td>
                    </tr>
                    <tr className="hover:bg-[#F7F4EC]">
                      <td className="py-2 px-4 font-mono font-semibold text-[#0B3D2E]">email</td>
                      <td className="py-2 px-4 font-mono text-[#17231D]">{claims?.email || "—"}</td>
                      <td className="py-2 px-4 text-[#66736C] hidden md:table-cell">Identity User Email</td>
                    </tr>
                    <tr className="hover:bg-[#F7F4EC]">
                      <td className="py-2 px-4 font-mono font-semibold text-[#0B3D2E]">role / ClaimTypes.Role</td>
                      <td className="py-2 px-4">
                        <div className="flex flex-wrap gap-1">
                          {claims?.roles.map((r) => (
                            <span key={r} className="px-2 py-0.5 rounded bg-[#A3F4C3] text-[#062A20] font-mono text-[10px] font-bold">
                              {r}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-2 px-4 text-[#66736C] hidden md:table-cell">WS-Federation Role Claim</td>
                    </tr>
                    <tr className="hover:bg-[#F7F4EC]">
                      <td className="py-2 px-4 font-mono font-semibold text-[#0B3D2E]">name / display_name</td>
                      <td className="py-2 px-4 text-[#17231D] font-medium">{claims?.name || "—"}</td>
                      <td className="py-2 px-4 text-[#66736C] hidden md:table-cell">Principal Display Name</td>
                    </tr>
                    <tr className="hover:bg-[#F7F4EC]">
                      <td className="py-2 px-4 font-mono font-semibold text-[#0B3D2E]">department</td>
                      <td className="py-2 px-4 text-[#17231D]">{claims?.department || user.department}</td>
                      <td className="py-2 px-4 text-[#66736C] hidden md:table-cell">Organizational Division</td>
                    </tr>
                    <tr className="hover:bg-[#F7F4EC]">
                      <td className="py-2 px-4 font-mono font-semibold text-[#0B3D2E]">branch_id</td>
                      <td className="py-2 px-4 font-mono text-[#17231D]">{claims?.branchId || "HQ (Default)"}</td>
                      <td className="py-2 px-4 text-[#66736C] hidden md:table-cell">Regional Hub / Woreda Scope</td>
                    </tr>
                    <tr className="hover:bg-[#F7F4EC]">
                      <td className="py-2 px-4 font-mono font-semibold text-[#0B3D2E]">permissions_version</td>
                      <td className="py-2 px-4 font-mono text-[#17231D]">{claims?.permissionsVersion ?? 1}</td>
                      <td className="py-2 px-4 text-[#66736C] hidden md:table-cell">RBAC Invalidation Epoch</td>
                    </tr>
                    <tr className="hover:bg-[#F7F4EC]">
                      <td className="py-2 px-4 font-mono font-semibold text-[#0B3D2E]">exp (Expiration)</td>
                      <td className="py-2 px-4 font-mono text-[#17231D]">{claims?.exp} ({expDate?.toLocaleString()})</td>
                      <td className="py-2 px-4 text-[#66736C] hidden md:table-cell">Unix Epoch Expiry</td>
                    </tr>
                    <tr className="hover:bg-[#F7F4EC]">
                      <td className="py-2 px-4 font-mono font-semibold text-[#0B3D2E]">iss (Issuer)</td>
                      <td className="py-2 px-4 font-mono text-[#17231D]">{claims?.iss || "AgricultureERP"}</td>
                      <td className="py-2 px-4 text-[#66736C] hidden md:table-cell">Authority Service</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: PERMISSION CODES */}
          {activeTab === "permissions" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <input
                  type="text"
                  placeholder="Filter permissions (e.g. CAN_APPROVE, INVENTORY, FINANCE)..."
                  value={permSearch}
                  onChange={(e) => setPermSearch(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#DDE4DE] bg-[#F7F4EC] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#146B45]"
                />
                <span className="text-[11px] text-[#66736C] font-mono shrink-0">
                  {filteredPerms.length} / {permissions.length} granted
                </span>
              </div>

              {filteredPerms.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#66736C]">
                  No permissions match &ldquo;{permSearch}&rdquo;.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {filteredPerms.map((perm) => (
                    <div
                      key={perm}
                      className="p-2.5 rounded-xl bg-[#F7F4EC] border border-[#DDE4DE] flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="material-symbols-outlined text-[16px] text-[#146B45]">check_circle</span>
                        <span className="font-mono text-[11px] font-semibold text-[#17231D] truncate">{perm}</span>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-white text-[#66736C] font-mono border border-[#DDE4DE]">
                        CLAIM
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: RAW JWT & PAYLOAD */}
          {activeTab === "raw" && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#66736C] block mb-1">Encoded Bearer Token</span>
                <div className="p-3 bg-[#062A20] text-[#A3F4C3] font-mono text-[11px] rounded-xl break-all select-all leading-relaxed max-h-32 overflow-y-auto">
                  {token || "No active token found in storage."}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#66736C] block mb-1">Decoded Payload JSON</span>
                <pre className="p-4 bg-[#17231D] text-white font-mono text-xs rounded-xl overflow-x-auto max-h-72 leading-relaxed">
                  {JSON.stringify(claims?.raw || {}, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: LIVE ROLE SWITCHER */}
          {activeTab === "switch" && (
            <div className="space-y-3">
              <p className="text-xs text-[#66736C]">
                Clicking any role below dispatches a cryptographic request to <code className="font-mono text-[#0B3D2E]">POST /api/auth/switch-role</code> on <code className="font-mono text-[#0B3D2E]">core-admin-service</code>, generating a new signed JWT with the appropriate claims and permissions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {DEMO_ACCOUNTS.map((acc) => {
                  const cfg = ROLES[acc.role];
                  const isCurrent = user.role === acc.role;
                  const isPending = switchingRole === acc.role;

                  return (
                    <button
                      key={acc.role}
                      type="button"
                      disabled={isSwitching || isCurrent}
                      onClick={() => handleSwitch(acc.role)}
                      className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all active:scale-[0.98] ${
                        isCurrent
                          ? "bg-[#E8F1EA] border-[#146B45] ring-1 ring-[#146B45]"
                          : "bg-white border-[#DDE4DE] hover:bg-[#F7F4EC]"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 text-white"
                          style={{ backgroundColor: cfg.badgeColor }}
                        >
                          <span className="material-symbols-outlined text-[18px]">{cfg.icon}</span>
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-[#17231D] truncate">{cfg.title}</span>
                            <span
                              className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold"
                              style={{ backgroundColor: cfg.badgeBg, color: cfg.badgeColor }}
                            >
                              {cfg.shortLabel}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#66736C] block truncate">{acc.name} ({acc.department})</span>
                        </div>
                      </div>

                      <div className="shrink-0 pl-2">
                        {isPending ? (
                          <span className="material-symbols-outlined text-[18px] animate-spin text-[#146B45]">progress_activity</span>
                        ) : isCurrent ? (
                          <span className="material-symbols-outlined text-[18px] text-[#146B45]">verified</span>
                        ) : (
                          <span className="material-symbols-outlined text-[18px] text-[#66736C]">arrow_forward</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#F7F4EC] border-t border-[#DDE4DE] px-5 py-3 flex items-center justify-between text-xs text-[#66736C] shrink-0">
          <span>Enterprise Claim Evaluation: <strong className="text-[#146B45]">Active &amp; Live</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#0B3D2E] text-white font-semibold text-xs hover:bg-[#146B45] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
