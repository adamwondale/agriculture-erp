"use client";

import React, { useState } from "react";
import Link from "next/link";

const QUICK_ACTIONS = [
  { icon: "assignment_turned_in", label: "Log Inspection", href: "/mobile/inspection", bg: "#0B3D2E", fg: "#FFFFFF" },
  { icon: "payments", label: "Payment Request", href: "/mobile/payment", bg: "#146B45", fg: "#FFFFFF" },
  { icon: "swap_horiz", label: "My Delegation", href: "/mobile/delegation", bg: "#E8F1EA", fg: "#0B3D2E" },
  { icon: "receipt_long", label: "Audit Log", href: "/mobile/audit", bg: "#F7F4EC", fg: "#0B3D2E" },
];

const PENDING_TASKS = [
  { id: "t1", title: "Q3 Wheat Inspection", location: "Ada'a Cluster · Block 14", due: "Today, 3:00 PM", urgency: "high", icon: "grass" },
  { id: "t2", title: "Cooperative Seed Handoff", location: "Bishoftu Station · Gate 2", due: "Today, 5:00 PM", urgency: "normal", icon: "inventory_2" },
  { id: "t3", title: "Payment Authorization", location: "WF-001 · Stage 2 Finance", due: "Overdue — 2h", urgency: "critical", icon: "payments" },
];

const NOTIFICATIONS = [
  { id: "n1", type: "approval", text: "Your delegation to Mahlet has been approved", time: "14 mins ago" },
  { id: "n2", type: "alert", text: "Override: payment.write expires in 2 days", time: "1 hour ago" },
  { id: "n3", type: "info", text: "New RBAC policy applied to your account", time: "3 hours ago" },
];

export default function MobileDashboard() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-[#F7F4EC] font-[Inter,system-ui,sans-serif]">
      {/* Hero header */}
      <div className="relative bg-gradient-to-br from-[#062A20] via-[#0B3D2E] to-[#146B45] px-4 sm:px-6 pt-10 sm:pt-14 pb-6 sm:pb-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(ellipse at 80% 50%, rgba(163,244,195,0.4) 0%, transparent 60%)" }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px] text-white">hub</span>
              </div>
              <div>
                <div className="font-bold text-white text-base" style={{ letterSpacing: "-0.02em" }}>Z•ORISIS</div>
                <div className="text-[11px] text-white/50 font-medium">Field Agent Console</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-[16px] text-[#A3F4C3]">desktop_windows</span>
                <span className="hidden xs:inline sm:inline">Desktop ERP</span>
              </Link>

              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px] text-white">notifications</span>
                </div>
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#C94B4B] border-2 border-[#0B3D2E] flex items-center justify-center">
                  <span className="text-[10px] text-white font-bold">3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Greeting */}
          <div className="mb-1">
            <p className="text-white/60 text-xs sm:text-sm font-medium">Friday, September 19, 2026</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1" style={{ letterSpacing: "-0.025em" }}>
              Good morning, Kinde 👋
            </h1>
          </div>

          {/* Role pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 mt-3 mb-5 sm:mb-7">
            <span className="material-symbols-outlined text-[14px] text-[#A3F4C3]">verified_user</span>
            <span className="text-[11px] sm:text-[12px] text-white/80 font-semibold truncate max-w-[260px] sm:max-w-none">Field Agronomist · Oromia Regional Hub</span>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { label: "Pending Tasks", value: "3", icon: "pending_actions" },
              { label: "Completed Today", value: "7", icon: "task_alt" },
              { label: "Hours Logged", value: "4.5h", icon: "schedule" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/10 border border-white/10 p-2.5 sm:p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-white mb-0.5" style={{ letterSpacing: "-0.02em" }}>{s.value}</div>
                <div className="text-[10px] sm:text-[11px] text-white/60 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-32">
        {/* Quick actions */}
        <section>
          <div className="text-[11px] font-bold text-[#66736C] uppercase tracking-wider mb-4">Quick Actions</div>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_ACTIONS.map((a) => (
              <Link
                key={a.label}
                href={a.href}
                className="flex items-center gap-4 p-5 rounded-2xl border border-[#DDE4DE] active:scale-[0.97] transition-all hover:shadow-md"
                style={{ backgroundColor: a.bg }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: a.fg === "#FFFFFF" ? "rgba(255,255,255,0.15)" : "rgba(11,61,46,0.1)" }}>
                  <span className="material-symbols-outlined text-[24px]" style={{ color: a.fg }}>{a.icon}</span>
                </div>
                <span className="text-sm font-semibold leading-tight" style={{ color: a.fg }}>{a.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Today's tasks */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="text-[11px] font-bold text-[#66736C] uppercase tracking-wider">Today's Tasks</div>
            <span className="text-xs text-[#146B45] font-semibold">See all →</span>
          </div>
          <div className="space-y-3">
            {PENDING_TASKS.map((t) => (
              <div key={t.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#DDE4DE] hover:shadow-sm active:scale-[0.99] transition-all">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  t.urgency === "critical" ? "bg-[#FDE8E8]" : t.urgency === "high" ? "bg-[#FFF3D6]" : "bg-[#E8F1EA]"
                }`}>
                  <span className={`material-symbols-outlined text-[24px] ${
                    t.urgency === "critical" ? "text-[#C94B4B]" : t.urgency === "high" ? "text-[#D79A19]" : "text-[#146B45]"
                  }`}>{t.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-[#17231D] truncate">{t.title}</div>
                  <div className="text-xs text-[#66736C] truncate mt-0.5">{t.location}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className={`text-xs font-bold ${
                    t.urgency === "critical" ? "text-[#C94B4B]" : t.urgency === "high" ? "text-[#D79A19]" : "text-[#66736C]"
                  }`}>{t.due}</div>
                  <span className="material-symbols-outlined text-[18px] text-[#B0BDB5] mt-1 block">chevron_right</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Notifications */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="text-[11px] font-bold text-[#66736C] uppercase tracking-wider">Recent Notifications</div>
            <span className="text-xs text-[#146B45] font-semibold">Mark all read</span>
          </div>
          <div className="rounded-2xl bg-white border border-[#DDE4DE] overflow-hidden divide-y divide-[#DDE4DE]/60">
            {NOTIFICATIONS.map((n) => (
              <div key={n.id} className="flex items-start gap-4 px-5 py-4 hover:bg-[#F7F4EC] transition-colors">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mt-0.5 shrink-0 ${
                  n.type === "approval" ? "bg-[#E8F1EA]" : n.type === "alert" ? "bg-[#FFF3D6]" : "bg-[#F7F4EC]"
                }`}>
                  <span className={`material-symbols-outlined text-[18px] ${
                    n.type === "approval" ? "text-[#146B45]" : n.type === "alert" ? "text-[#D79A19]" : "text-[#66736C]"
                  }`}>
                    {n.type === "approval" ? "verified" : n.type === "alert" ? "warning" : "info"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#17231D] leading-snug">{n.text}</p>
                  <span className="text-xs text-[#B0BDB5] mt-0.5 block">{n.time}</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-[#146B45] mt-2 shrink-0" />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Floating bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-2xl mx-auto px-4 pb-6">
          <div className="bg-white/90 backdrop-blur-xl border border-[#DDE4DE] rounded-3xl shadow-floating px-2 py-2 flex items-center justify-around">
            {[
              { id: "home", icon: "home", label: "Home", href: "/mobile" },
              { id: "tasks", icon: "assignment", label: "Inspect", href: "/mobile/inspection" },
              { id: "scan", icon: "qr_code_scanner", label: "Scan", href: "/mobile/payment", primary: true },
              { id: "delegation", icon: "sync_alt", label: "Delegation", href: "/mobile/delegation" },
              { id: "profile", icon: "person", label: "Profile", href: "/mobile/profile" },
            ].map((tab) =>
              tab.primary ? (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className="w-14 h-14 rounded-2xl bg-[#0B3D2E] flex items-center justify-center shadow-md active:scale-[0.92] transition-all"
                >
                  <span className="material-symbols-outlined text-[26px] text-white">{tab.icon}</span>
                </Link>
              ) : (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className="flex flex-col items-center gap-1 px-1.5 sm:px-3 py-1.5 sm:py-2 active:scale-[0.92] transition-all"
                >
                  <span className={`material-symbols-outlined text-[22px] sm:text-[24px] transition-colors ${tab.id === "home" ? "text-[#0B3D2E]" : "text-[#66736C]"}`}>
                    {tab.icon}
                  </span>
                  <span className={`text-[9px] sm:text-[10px] font-semibold transition-colors ${tab.id === "home" ? "text-[#0B3D2E]" : "text-[#66736C]"}`}>
                    {tab.label}
                  </span>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
