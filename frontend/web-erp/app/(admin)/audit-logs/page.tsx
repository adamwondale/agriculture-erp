"use client";

import React, { useState, useMemo } from "react";

type EventType = "auth" | "user" | "role" | "delegation" | "approval" | "override" | "system";

interface AuditLog {
  id: string;
  eventType: EventType;
  action: string;
  actor: string;
  actorRole: string;
  actorIp: string;
  target: string;
  targetType: string;
  outcome: "success" | "failure" | "warning";
  timestamp: string;
  sessionId: string;
  geoLocation: string;
  details: Record<string, string>;
}

const AUDIT_LOGS: AuditLog[] = [
  {
    id: "AL-8821",
    eventType: "auth",
    action: "User Login",
    actor: "Abebe Tesfaye",
    actorRole: "System Administrator",
    actorIp: "196.188.4.10",
    target: "Admin Console",
    targetType: "System",
    outcome: "success",
    timestamp: "2026-09-19T10:02:11Z",
    sessionId: "sess_9x2mK7",
    geoLocation: "Addis Ababa, ET",
    details: { "MFA Method": "TOTP", "Device": "MacBook Pro", "Browser": "Chrome 126" },
  },
  {
    id: "AL-8820",
    eventType: "user",
    action: "User Provisioned",
    actor: "Abebe Tesfaye",
    actorRole: "System Administrator",
    actorIp: "196.188.4.10",
    target: "Selamawit Bekele",
    targetType: "User Account",
    outcome: "success",
    timestamp: "2026-09-19T10:06:48Z",
    sessionId: "sess_9x2mK7",
    geoLocation: "Addis Ababa, ET",
    details: { "Assigned Role": "Field Agronomist", "Department": "Oromia Regional Hub", "Branch": "Ada'a Cluster" },
  },
  {
    id: "AL-8819",
    eventType: "override",
    action: "Permission Override Granted",
    actor: "Abebe Tesfaye",
    actorRole: "System Administrator",
    actorIp: "196.188.4.10",
    target: "Kinde Gudeta → farm.inspection.write",
    targetType: "Permission Override",
    outcome: "success",
    timestamp: "2026-09-19T10:28:37Z",
    sessionId: "sess_9x2mK7",
    geoLocation: "Addis Ababa, ET",
    details: { "Permission Scope": "farm.inspection.write", "Granted To": "Kinde Gudeta", "Expires": "2026-12-31", "Reason": "Seasonal inspection mandate" },
  },
  {
    id: "AL-8818",
    eventType: "approval",
    action: "Workflow Stage Advanced",
    actor: "Tigist Worku",
    actorRole: "Finance Manager",
    actorIp: "41.66.12.88",
    target: "WF-001 Seed Procurement Advance",
    targetType: "Approval Workflow",
    outcome: "success",
    timestamp: "2026-09-19T09:45:02Z",
    sessionId: "sess_7aVz92",
    geoLocation: "Addis Ababa, ET",
    details: { "Stage": "Finance Authorization", "Comment": "Budget verified under Q3 allocation", "Amount": "$38,500" },
  },
  {
    id: "AL-8817",
    eventType: "role",
    action: "Role Assignment Modified",
    actor: "Abebe Tesfaye",
    actorRole: "System Administrator",
    actorIp: "196.188.4.10",
    target: "Mahlet Hale → Payment Approver",
    targetType: "RBAC Assignment",
    outcome: "success",
    timestamp: "2026-09-19T09:14:55Z",
    sessionId: "sess_9x2mK7",
    geoLocation: "Addis Ababa, ET",
    details: { "Previous Role": "Field Agronomist", "New Role": "Payment Approver", "Effective Date": "2026-09-19" },
  },
  {
    id: "AL-8816",
    eventType: "auth",
    action: "Login Failed — Invalid TOTP",
    actor: "Unknown",
    actorRole: "—",
    actorIp: "185.220.101.47",
    target: "Admin Console",
    targetType: "System",
    outcome: "failure",
    timestamp: "2026-09-19T08:58:14Z",
    sessionId: "—",
    geoLocation: "Kyiv, UA",
    details: { "Attempted User": "admin@zorisis.com", "Failure Reason": "TOTP mismatch (3rd attempt)", "Account Locked": "Yes — 15 minutes" },
  },
  {
    id: "AL-8815",
    eventType: "delegation",
    action: "Delegation Created",
    actor: "Dawit Alemu",
    actorRole: "CEO",
    actorIp: "196.188.4.22",
    target: "Daniel Kebede (Payment Approver, 14d)",
    targetType: "Delegation Record",
    outcome: "success",
    timestamp: "2026-09-19T08:30:00Z",
    sessionId: "sess_3cBq11",
    geoLocation: "Addis Ababa, ET",
    details: { "Delegated Role": "Payment Approver", "Duration": "14 days", "Scope": "Oromia Regional Hub", "Reason": "CEO travel" },
  },
  {
    id: "AL-8814",
    eventType: "system",
    action: "Scheduled Permission Sweep",
    actor: "System Automator",
    actorRole: "Automated Agent",
    actorIp: "127.0.0.1",
    target: "All Active Sessions",
    targetType: "System",
    outcome: "success",
    timestamp: "2026-09-19T06:00:00Z",
    sessionId: "sys_cron",
    geoLocation: "Internal",
    details: { "Sessions Audited": "312", "Anomalies Detected": "0", "Expired Delegations Revoked": "2" },
  },
  {
    id: "AL-8813",
    eventType: "override",
    action: "Override Expiry Warning",
    actor: "System Automator",
    actorRole: "Automated Agent",
    actorIp: "127.0.0.1",
    target: "Yonas Teka → payment.write",
    targetType: "Permission Override",
    outcome: "warning",
    timestamp: "2026-09-19T06:00:01Z",
    sessionId: "sys_cron",
    geoLocation: "Internal",
    details: { "Expires In": "2 days", "Permission": "payment.write", "Action Required": "Review or extend" },
  },
];

const EVENT_META: Record<EventType, { label: string; icon: string; color: string; bg: string }> = {
  auth: { label: "Auth", icon: "lock_person", color: "text-[#8B5CF6]", bg: "bg-purple-50" },
  user: { label: "User", icon: "person", color: "text-[#146B45]", bg: "bg-[#E8F1EA]" },
  role: { label: "Role", icon: "policy", color: "text-[#0B3D2E]", bg: "bg-[#E8F1EA]" },
  delegation: { label: "Delegation", icon: "swap_horiz", color: "text-[#D79A19]", bg: "bg-[#FFF3D6]" },
  approval: { label: "Approval", icon: "verified", color: "text-[#146B45]", bg: "bg-[#E8F1EA]" },
  override: { label: "Override", icon: "security", color: "text-[#D79A19]", bg: "bg-[#FFF3D6]" },
  system: { label: "System", icon: "dns", color: "text-[#66736C]", bg: "bg-[#F0F0F0]" },
};

const OUTCOME_STYLE = {
  success: "bg-[#A3F4C3]/30 text-[#146B45]",
  failure: "bg-[#FDE8E8] text-[#C94B4B]",
  warning: "bg-[#FFF3D6] text-[#D79A19]",
};

export default function AuditLogsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterOutcome, setFilterOutcome] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [expandedDetails, setExpandedDetails] = useState(false);

  const filtered = useMemo(() => {
    return AUDIT_LOGS.filter((log) => {
      const matchesType = filterType === "all" || log.eventType === filterType;
      const matchesOutcome = filterOutcome === "all" || log.outcome === filterOutcome;
      const matchesSearch =
        !search ||
        log.actor.toLowerCase().includes(search.toLowerCase()) ||
        log.action.toLowerCase().includes(search.toLowerCase()) ||
        log.target.toLowerCase().includes(search.toLowerCase()) ||
        log.id.toLowerCase().includes(search.toLowerCase());
      return matchesType && matchesOutcome && matchesSearch;
    });
  }, [filterType, filterOutcome, search]);

  const selected = AUDIT_LOGS.find((l) => l.id === selectedId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#DDE4DE]/60">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#00261B]" style={{ letterSpacing: "-0.02em" }}>
            Immutable Audit Trail
          </h1>
          <p className="text-sm text-[#66736C] mt-1">
            Tamper-proof, cryptographically signed record of every administrative state mutation.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="px-3.5 py-2 rounded-xl bg-white border border-[#DDE4DE] text-xs font-semibold flex items-center gap-2 shadow-xs transition-all active:scale-[0.97] hover:bg-[#F7F4EC]">
            <span className="material-symbols-outlined text-[18px] text-[#66736C]">download</span>
            Export CSV
          </button>
          <button className="px-3.5 py-2 rounded-xl bg-white border border-[#DDE4DE] text-xs font-semibold flex items-center gap-2 shadow-xs transition-all active:scale-[0.97] hover:bg-[#F7F4EC]">
            <span className="material-symbols-outlined text-[18px] text-[#66736C]">verified_user</span>
            Verify Chain
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Events (24h)", value: "1,248", icon: "receipt_long", color: "text-[#0B3D2E]", bg: "bg-[#E8F1EA]" },
          { label: "Auth Events", value: "486", icon: "lock_person", color: "text-[#8B5CF6]", bg: "bg-purple-50" },
          { label: "Security Failures", value: "3", icon: "gpp_bad", color: "text-[#C94B4B]", bg: "bg-[#FDE8E8]" },
          { label: "Chain Integrity", value: "100%", icon: "link", color: "text-[#146B45]", bg: "bg-[#E8F1EA]" },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-2xl bg-white border border-[#DDE4DE] shadow-subtle flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
              <span className={`material-symbols-outlined text-[20px] ${s.color}`}>{s.icon}</span>
            </div>
            <div>
              <div className="text-lg font-bold text-[#00261B]">{s.value}</div>
              <div className="text-[11px] text-[#66736C] font-medium">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <span className="material-symbols-outlined text-[18px] text-[#66736C] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search actor, action, target, ID…"
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#DDE4DE] rounded-xl text-[#17231D] placeholder-[#B0BDB5] focus:outline-none focus:ring-2 focus:ring-[#146B45]/30 focus:border-[#146B45] transition-all"
          />
        </div>

        {/* Event type filter */}
        <div className="flex items-center gap-0.5 bg-white border border-[#DDE4DE] p-0.5 rounded-xl text-[11px] shadow-xs overflow-x-auto max-w-full pb-0.5">
          <button
            onClick={() => setFilterType("all")}
            className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all shrink-0 ${filterType === "all" ? "bg-[#0B3D2E] text-white" : "text-[#66736C] hover:bg-[#F7F4EC]"}`}
          >
            All
          </button>
          {(["auth", "user", "role", "delegation", "approval", "override", "system"] as EventType[]).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all capitalize shrink-0 ${filterType === t ? "bg-[#0B3D2E] text-white" : "text-[#66736C] hover:bg-[#F7F4EC]"}`}
            >
              {EVENT_META[t].label}
            </button>
          ))}
        </div>

        {/* Outcome filter */}
        <div className="flex items-center gap-0.5 bg-white border border-[#DDE4DE] p-0.5 rounded-xl text-[11px] shadow-xs overflow-x-auto max-w-full pb-0.5">
          {["all", "success", "failure", "warning"].map((o) => (
            <button
              key={o}
              onClick={() => setFilterOutcome(o)}
              className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all capitalize shrink-0 ${filterOutcome === o ? "bg-[#0B3D2E] text-white" : "text-[#66736C] hover:bg-[#F7F4EC]"}`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      {/* Main Log Table + Inspector */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Log Table */}
        <div className={`${selected ? "xl:col-span-7" : "xl:col-span-12"} rounded-2xl bg-white border border-[#DDE4DE] shadow-subtle overflow-hidden transition-all`}>
          <div className="overflow-x-auto">
            <div className="min-w-[500px]">
              {/* Table header */}
              <div className="grid grid-cols-[2rem_1fr_auto_auto_auto] gap-3 px-4 py-3 border-b border-[#DDE4DE] bg-[#F7F4EC]/60">
                <div />
                <div className="text-[11px] font-bold text-[#66736C] uppercase tracking-wider">Event / Actor</div>
                <div className="text-[11px] font-bold text-[#66736C] uppercase tracking-wider">Type</div>
                <div className="text-[11px] font-bold text-[#66736C] uppercase tracking-wider">Outcome</div>
                <div className="text-[11px] font-bold text-[#66736C] uppercase tracking-wider">Time</div>
              </div>

              <div className="divide-y divide-[#DDE4DE]/50">
                {filtered.map((log) => {
                  const meta = EVENT_META[log.eventType];
                  const isSelected = selectedId === log.id;
                  return (
                    <button
                      key={log.id}
                      onClick={() => { setSelectedId(isSelected ? null : log.id); setExpandedDetails(false); }}
                      className={`w-full grid grid-cols-[2rem_1fr_auto_auto_auto] gap-3 items-center px-4 py-3 text-left transition-all ${isSelected ? "bg-[#E8F1EA]" : "hover:bg-[#F7F4EC]"}`}
                    >
                      {/* Icon */}
                      <div className={`w-7 h-7 rounded-lg ${meta.bg} flex items-center justify-center`}>
                        <span className={`material-symbols-outlined text-[15px] ${meta.color}`}>{meta.icon}</span>
                      </div>

                      {/* Event + Actor */}
                      <div className="min-w-0">
                        <div className="font-semibold text-xs text-[#17231D] truncate">{log.action}</div>
                        <div className="text-[11px] text-[#66736C] truncate mt-0.5">{log.actor} · {log.target}</div>
                      </div>

                      {/* Type badge */}
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${meta.bg} ${meta.color}`}>
                        {meta.label}
                      </span>

                      {/* Outcome badge */}
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize ${
                        log.outcome === "success" ? "bg-[#E8F1EA] text-[#146B45]"
                          : log.outcome === "failure" ? "bg-[#FDE8E8] text-[#C94B4B]"
                          : "bg-[#FFF3D6] text-[#D79A19]"
                      }`}>
                        {log.outcome}
                      </span>

                      {/* Time */}
                      <span className="text-[11px] font-mono text-[#66736C] text-right">
                        {new Date(log.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-[#DDE4DE] flex items-center justify-between bg-[#F7F4EC]/40">
            <span className="text-[11px] text-[#66736C]">
              Showing <span className="font-semibold text-[#00261B]">{filtered.length}</span> of {AUDIT_LOGS.length} events
            </span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-lg bg-white border border-[#DDE4DE] text-xs font-medium text-[#66736C] hover:bg-[#F7F4EC] active:scale-[0.97] transition-all">
                ← Prev
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-white border border-[#DDE4DE] text-xs font-medium text-[#66736C] hover:bg-[#F7F4EC] active:scale-[0.97] transition-all">
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* Detail Inspector Panel */}
        {selected && (
          <div className="xl:col-span-5 rounded-2xl bg-white border border-[#DDE4DE] shadow-subtle overflow-hidden">
            {/* Inspector header */}
            <div className="px-5 py-4 border-b border-[#DDE4DE] bg-[#F7F4EC]/50 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold text-[#66736C] uppercase tracking-wider">Event Details</div>
                <div className="font-mono text-xs font-bold text-[#00261B] mt-0.5">{selected.id}</div>
              </div>
              <button
                onClick={() => setSelectedId(null)}
                className="w-7 h-7 rounded-lg bg-white border border-[#DDE4DE] text-[#66736C] flex items-center justify-center hover:bg-[#F7F4EC] active:scale-[0.97] transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Action + outcome */}
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl ${EVENT_META[selected.eventType].bg} flex items-center justify-center shrink-0`}>
                  <span className={`material-symbols-outlined text-[20px] ${EVENT_META[selected.eventType].color}`}>
                    {EVENT_META[selected.eventType].icon}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm text-[#17231D]">{selected.action}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold capitalize ${OUTCOME_STYLE[selected.outcome]}`}>
                      {selected.outcome}
                    </span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${EVENT_META[selected.eventType].bg} ${EVENT_META[selected.eventType].color}`}>
                      {EVENT_META[selected.eventType].label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Metadata grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { label: "Actor", value: selected.actor },
                  { label: "Role", value: selected.actorRole },
                  { label: "IP Address", value: selected.actorIp },
                  { label: "Geo", value: selected.geoLocation },
                  { label: "Target", value: selected.target },
                  { label: "Target Type", value: selected.targetType },
                  { label: "Session ID", value: selected.sessionId },
                  { label: "Timestamp", value: new Date(selected.timestamp).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" }) },
                ].map((item) => (
                  <div key={item.label} className="p-2.5 rounded-xl bg-[#F7F4EC] border border-[#DDE4DE]">
                    <div className="text-[10px] text-[#66736C] font-semibold uppercase tracking-wide">{item.label}</div>
                    <div className="font-semibold text-[#17231D] mt-0.5 break-all leading-tight">{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Extra details */}
              <div>
                <button
                  onClick={() => setExpandedDetails(!expandedDetails)}
                  className="w-full flex items-center justify-between py-2 text-xs font-bold text-[#00261B] uppercase tracking-wider hover:text-[#146B45] transition-colors"
                >
                  <span>Event Payload</span>
                  <span className={`material-symbols-outlined text-[18px] transition-transform ${expandedDetails ? "rotate-180" : ""}`}>
                    expand_more
                  </span>
                </button>
                {expandedDetails && (
                  <div className="space-y-2">
                    {Object.entries(selected.details).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between py-2 border-b border-[#DDE4DE]/60 last:border-0">
                        <span className="text-[11px] text-[#66736C]">{key}</span>
                        <span className="text-[11px] font-semibold text-[#17231D] font-mono">{val}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Hash integrity */}
              <div className="p-3 rounded-xl bg-[#0B3D2E]/5 border border-[#0B3D2E]/10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-[16px] text-[#146B45]">verified_user</span>
                  <span className="text-[11px] font-bold text-[#0B3D2E]">Chain Integrity Verified</span>
                </div>
                <div className="font-mono text-[10px] text-[#66736C] break-all">
                  SHA-256: a3f9e1c2…b8d47f0e
                </div>
                <div className="text-[10px] text-[#66736C] mt-1">Linked to previous: {selected.id.replace("AL-", "AL-"[0] + (parseInt(selected.id.split("-")[1]) - 1))}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
