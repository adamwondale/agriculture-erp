"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getStoredUser, ROLES, hasPermission, AuthUser } from "@/lib/rbac";

interface KpiData {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "neutral" | "warning";
  subtext: string;
  icon: string;
}

const KPIS: KpiData[] = [
  {
    title: "Total Users",
    value: "4,820",
    change: "+3.2%",
    changeType: "positive",
    subtext: "+148 this month across 6 regions",
    icon: "group",
  },
  {
    title: "Active Users (30d)",
    value: "4,295",
    change: "89.1% Rate",
    changeType: "positive",
    subtext: "312 active online now",
    icon: "verified_user",
  },
  {
    title: "Pending Approvals",
    value: "14",
    change: "Action Required",
    changeType: "warning",
    subtext: "3 high-value payment workflows",
    icon: "pending_actions",
  },
  {
    title: "Active RBAC Roles",
    value: "8",
    change: "1 Custom Role",
    changeType: "neutral",
    subtext: "142 permission flags assigned",
    icon: "policy",
  },
  {
    title: "Security Audits (24h)",
    value: "1,248",
    change: "100% Immutable",
    changeType: "positive",
    subtext: "Zero security anomalies detected",
    icon: "receipt_long",
  },
];

interface ActivityItem {
  id: string;
  type: "create" | "update" | "grant" | "approval";
  actor: string;
  action: string;
  target: string;
  time: string;
  icon: string;
}

const RECENT_ACTIVITIES: ActivityItem[] = [
  {
    id: "act-1",
    type: "create",
    actor: "Abebe Tesfaye",
    action: "Provisioned employee",
    target: "Selamawit Bekele (Field Agronomist)",
    time: "4 mins ago",
    icon: "person_add",
  },
  {
    id: "act-2",
    type: "grant",
    actor: "System Administrator",
    action: "Granted override",
    target: "farm.inspection.write for Kinde Gudeta",
    time: "28 mins ago",
    icon: "security",
  },
  {
    id: "act-3",
    type: "approval",
    actor: "Finance Manager",
    action: "Approved delegation",
    target: "Payment Approver role to Mahlet Hale",
    time: "1 hour ago",
    icon: "verified",
  },
  {
    id: "act-4",
    type: "update",
    actor: "IT Ops Automator",
    action: "Updated branch node",
    target: "Amhara Hub • Bahir Dar Cluster",
    time: "3 hours ago",
    icon: "corporate_fare",
  },
];

export default function AdminDashboardPage() {
  const [user, setUser] = useState<AuthUser>(() => getStoredUser());
  const [activityFilter, setActivityFilter] = useState<string>("all");
  const [approvals, setApprovals] = useState([
    { id: "app-1", workflow: "Seed Procurement Advance", amount: "$38,500", requester: "Daniel Kebede", stage: "Stage 2 / Finance", urgency: "High" },
    { id: "app-2", workflow: "Cold-Chain Logistics Lease", amount: "$12,400", requester: "Yonas Teka", stage: "Stage 1 / Operations", urgency: "Normal" },
    { id: "app-3", workflow: "Fertilizer Tender Delegation", amount: "$84,000", requester: "Kinde Gudeta", stage: "Stage 3 / Executive", urgency: "Critical" },
  ]);

  useEffect(() => {
    const sync = () => setUser(getStoredUser());
    window.addEventListener("zorisis_auth_change", sync);
    return () => {
      window.removeEventListener("zorisis_auth_change", sync);
    };
  }, []);

  const roleConfig = ROLES[user.role] || ROLES.super_admin;

  const handleApprove = (id: string) => {
    setApprovals(approvals.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6 pt-2 sm:pt-3">
      {/* Top Greeting & Operational Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-4 border-b border-[#DDE4DE]/80">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#00261B] whitespace-nowrap" style={{ letterSpacing: "-0.02em" }}>
              Good morning, {user.name.split(" ")[0]}
            </h1>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-xs"
              style={{ backgroundColor: roleConfig.badgeColor, color: "#FFFFFF" }}
            >
              <span className="material-symbols-outlined text-[15px]">{roleConfig.icon}</span>
              <span>{roleConfig.title} Context</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#66736C] mt-1.5">
            Logged into <strong className="text-[#00261B]">{user.department}</strong> ({user.region}). Overview of operational nodes and live authorization metrics.
          </p>
        </div>

        {/* Action Controls Filtered by Role Permissions */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          {hasPermission(user.role, "/audit-logs") && (
            <Link
              href="/audit-logs"
              className="px-3.5 py-2 rounded-xl bg-white border border-[#DDE4DE] text-[#17231D] hover:bg-[#F7F4EC] text-xs font-semibold flex items-center gap-2 shadow-xs transition-all active:scale-[0.97]"
            >
              <span className="material-symbols-outlined text-[18px] text-[#66736C]">receipt_long</span>
              <span>Audit Trail</span>
            </Link>
          )}
          {hasPermission(user.role, "/delegation") && (
            <Link
              href="/delegation"
              className="px-3.5 py-2 rounded-xl bg-white border border-[#DDE4DE] text-[#0B3D2E] hover:bg-[#E8F1EA] text-xs font-semibold flex items-center gap-2 shadow-xs transition-all active:scale-[0.97]"
            >
              <span className="material-symbols-outlined text-[18px] text-[#146B45]">swap_horiz</span>
              <span>Create Delegation</span>
            </Link>
          )}
          {hasPermission(user.role, "/approvals") && (
            <Link
              href="/approvals"
              className="px-3.5 py-2 rounded-xl bg-white border border-[#DDE4DE] text-[#0B3D2E] hover:bg-[#E8F1EA] text-xs font-semibold flex items-center gap-2 shadow-xs transition-all active:scale-[0.97]"
            >
              <span className="material-symbols-outlined text-[18px] text-[#146B45]">verified</span>
              <span>Approvals</span>
            </Link>
          )}
          {hasPermission(user.role, "/users") && (
            <Link
              href="/users"
              className="px-3.5 py-2 rounded-xl bg-white border border-[#DDE4DE] text-[#17231D] hover:bg-[#F7F4EC] text-xs font-semibold flex items-center gap-2 shadow-xs transition-all active:scale-[0.97]"
            >
              <span className="material-symbols-outlined text-[18px] text-[#66736C]">group</span>
              <span>User Directory</span>
            </Link>
          )}
          {hasPermission(user.role, "/users/create") && (
            <Link
              href="/users/create"
              className="px-4 py-2 rounded-xl bg-[#0B3D2E] text-white hover:bg-[#062A20] text-xs font-semibold flex items-center gap-2 shadow-sm transition-all active:scale-[0.97]"
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              <span>Provision User</span>
            </Link>
          )}
        </div>
      </div>

      {/* Row of 5 Enterprise KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {KPIS.map((kpi) => (
          <div
            key={kpi.title}
            className="p-4 rounded-2xl bg-white border border-[#DDE4DE] shadow-subtle flex flex-col justify-between hover:shadow-card transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#66736C] uppercase tracking-wider">{kpi.title}</span>
              <span className="w-8 h-8 rounded-xl bg-[#E8F1EA] text-[#0B3D2E] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">{kpi.icon}</span>
              </span>
            </div>
            <div className="my-1 flex items-baseline justify-between">
              <span className="text-2xl font-bold tracking-tight text-[#00261B]">{kpi.value}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                  kpi.changeType === "warning"
                    ? "bg-[#FFF3D6] text-[#D79A19]"
                    : "bg-[#A3F4C3]/40 text-[#146B45]"
                }`}
              >
                {kpi.change}
              </span>
            </div>
            <span className="text-xs text-[#66736C] truncate mt-1">{kpi.subtext}</span>
          </div>
        ))}
      </div>

      {/* Main Grid: Pending Approvals & Activity Stream */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column: Pending High-Value Workflows (7 Cols) */}
        <section className="xl:col-span-7 rounded-2xl bg-white border border-[#DDE4DE] shadow-subtle p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDE4DE]">
            <div>
              <h2 className="text-sm font-bold text-[#00261B]">Pending Workflow Approvals</h2>
              <p className="text-xs text-[#66736C]">Multi-stage sign-offs requiring administrative review</p>
            </div>
            <Link href="/approvals" className="text-xs text-[#146B45] font-semibold hover:underline">
              Configure Chains &rarr;
            </Link>
          </div>

          {approvals.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#66736C]">
              <span className="material-symbols-outlined text-3xl text-[#146B45] mb-2 block">task_alt</span>
              All high-value approvals have been signed off.
            </div>
          ) : (
            <div className="divide-y divide-[#DDE4DE]/60">
              {approvals.map((item) => (
                <div key={item.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-[#17231D]">{item.workflow}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          item.urgency === "Critical"
                            ? "bg-[#FDE8E8] text-[#C94B4B]"
                            : "bg-[#FFF3D6] text-[#D79A19]"
                        }`}
                      >
                        {item.urgency}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#66736C] mt-0.5">
                      <span>Requester: {item.requester}</span>
                      <span>•</span>
                      <span className="font-mono font-bold text-[#00261B]">{item.amount}</span>
                      <span>•</span>
                      <span>{item.stage}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="flex-1 sm:flex-initial px-3 py-1.5 rounded-xl bg-[#0B3D2E] hover:bg-[#062A20] text-white text-xs font-semibold active:scale-[0.97] transition-all shadow-xs text-center"
                    >
                      Authorize
                    </button>
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="px-2.5 py-1.5 rounded-xl bg-white border border-[#DDE4DE] text-[#66736C] hover:text-[#C94B4B] text-xs font-medium active:scale-[0.97] transition-all"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Right Column: Recent Activity Feed (5 Cols) */}
        <section className="xl:col-span-5 rounded-2xl bg-white border border-[#DDE4DE] shadow-subtle p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDE4DE]">
            <div>
              <h2 className="text-sm font-bold text-[#00261B]">System Activity Stream</h2>
              <p className="text-xs text-[#66736C]">Real-time administrative state mutations</p>
            </div>
            <div className="flex items-center gap-1 bg-[#F7F4EC] p-0.5 rounded-lg border border-[#DDE4DE] text-[10px]">
              <button
                onClick={() => setActivityFilter("all")}
                className={`px-2 py-0.5 rounded font-medium ${
                  activityFilter === "all" ? "bg-white font-bold text-[#00261B] shadow-xs" : "text-[#66736C]"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActivityFilter("security")}
                className={`px-2 py-0.5 rounded font-medium ${
                  activityFilter === "security" ? "bg-white font-bold text-[#00261B] shadow-xs" : "text-[#66736C]"
                }`}
              >
                Security
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {RECENT_ACTIVITIES.map((act) => (
              <div key={act.id} className="p-3 rounded-xl bg-[#F7F4EC]/70 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#E8F1EA] text-[#146B45] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[18px]">{act.icon}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#17231D]">{act.actor}</span>
                    <span className="text-[10px] text-[#66736C] font-mono">{act.time}</span>
                  </div>
                  <p className="text-xs text-[#66736C] mt-0.5">
                    {act.action}: <span className="font-medium text-[#00261B]">{act.target}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/audit-logs"
            className="block text-center py-2 rounded-xl bg-[#F7F4EC] hover:bg-[#E8F1EA] text-xs font-semibold text-[#146B45] transition-colors"
          >
            Inspect Immutable Audit Trail &rarr;
          </Link>
        </section>
      </div>

      {/* Organizational Node Topology Snapshot */}
      <section className="p-5 rounded-2xl bg-white border border-[#DDE4DE] shadow-subtle">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#DDE4DE]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#146B45]">account_tree</span>
            <h2 className="text-sm font-bold text-[#00261B]">Enterprise Node Topology (East Africa Cluster)</h2>
          </div>
          <Link href="/organization" className="text-xs text-[#146B45] font-semibold hover:underline">
            Manage Tree Hierarchy &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-[#F7F4EC] border border-[#DDE4DE]">
            <span className="text-[10px] uppercase font-bold text-[#66736C] block">Holding Company</span>
            <span className="font-bold text-sm text-[#00261B]">Z•ORISIS Holding</span>
            <span className="text-[11px] text-[#66736C] block mt-1">Federal Jurisdiction • Addis Ababa</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7F4EC] border border-[#DDE4DE]">
            <span className="text-[10px] uppercase font-bold text-[#66736C] block">Primary Regional Hub</span>
            <span className="font-bold text-sm text-[#00261B]">Oromia Regional Hub</span>
            <span className="text-[11px] text-[#146B45] font-medium block mt-1">38 Sub-Branches • 142 Stations</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7F4EC] border border-[#DDE4DE]">
            <span className="text-[10px] uppercase font-bold text-[#66736C] block">Operational Clusters</span>
            <span className="font-bold text-sm text-[#00261B]">Ada'a &amp; Bishoftu</span>
            <span className="text-[11px] text-[#66736C] block mt-1">620 Cooperatives • Teff &amp; Wheat</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F7F4EC] border border-[#DDE4DE]">
            <span className="text-[10px] uppercase font-bold text-[#66736C] block">Total Registered Agronomists</span>
            <span className="font-bold text-sm text-[#146B45]">6,480 Active</span>
            <span className="text-[11px] text-[#66736C] block mt-1">100% Verified Credentials</span>
          </div>
        </div>
      </section>
    </div>
  );
}
