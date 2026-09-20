"use client";

import React, { useState } from "react";

type ApprovalStatus = "pending" | "approved" | "declined" | "escalated";
type Urgency = "Critical" | "High" | "Normal" | "Low";

interface ApprovalStage {
  id: string;
  name: string;
  approver: string;
  role: string;
  status: "waiting" | "current" | "completed" | "rejected";
  completedAt?: string;
  comment?: string;
}

interface ApprovalWorkflow {
  id: string;
  title: string;
  category: string;
  amount: string;
  requester: string;
  requesterRole: string;
  department: string;
  requestedAt: string;
  urgency: Urgency;
  status: ApprovalStatus;
  stages: ApprovalStage[];
  currentStageIndex: number;
  description: string;
}

const WORKFLOWS: ApprovalWorkflow[] = [
  {
    id: "wf-001",
    title: "Seed Procurement Advance",
    category: "Procurement",
    amount: "$38,500",
    requester: "Daniel Kebede",
    requesterRole: "Regional Operations Lead",
    department: "Oromia Regional Hub",
    requestedAt: "2026-09-19T09:12:00Z",
    urgency: "High",
    status: "pending",
    currentStageIndex: 1,
    description: "Advance payment for 420 quintals of certified maize seed from Ethio Seed Enterprise for the Bishoftu cluster planting season.",
    stages: [
      { id: "s1", name: "Operations Review", approver: "Abebe Tesfaye", role: "Ops Manager", status: "completed", completedAt: "2h ago", comment: "Verified procurement plan aligns with seasonal schedule." },
      { id: "s2", name: "Finance Authorization", approver: "Tigist Worku", role: "Finance Manager", status: "current" },
      { id: "s3", name: "Executive Sign-off", approver: "CEO Office", role: "Executive", status: "waiting" },
    ],
  },
  {
    id: "wf-002",
    title: "Fertilizer Tender Delegation",
    category: "Procurement",
    amount: "$84,000",
    requester: "Kinde Gudeta",
    requesterRole: "Procurement Director",
    department: "National Sourcing",
    requestedAt: "2026-09-19T07:30:00Z",
    urgency: "Critical",
    status: "escalated",
    currentStageIndex: 2,
    description: "Annual bulk tender for DAP and Urea fertilizers covering 12 regional distribution hubs. Requires executive authorization per procurement policy §4.2.",
    stages: [
      { id: "s1", name: "Procurement Review", approver: "Kinde Gudeta", role: "Proc. Director", status: "completed", completedAt: "5h ago", comment: "Compliance-verified, lowest bid accepted." },
      { id: "s2", name: "Finance Authorization", approver: "Tigist Worku", role: "Finance Manager", status: "completed", completedAt: "3h ago", comment: "Budget line confirmed under Q4 allocation." },
      { id: "s3", name: "Executive Sign-off", approver: "Dawit Alemu", role: "CEO", status: "current" },
    ],
  },
  {
    id: "wf-003",
    title: "Cold-Chain Logistics Lease",
    category: "Infrastructure",
    amount: "$12,400",
    requester: "Yonas Teka",
    requesterRole: "Logistics Coordinator",
    department: "Amhara Regional Hub",
    requestedAt: "2026-09-19T11:05:00Z",
    urgency: "Normal",
    status: "pending",
    currentStageIndex: 0,
    description: "3-month lease extension for refrigerated transport containers serving the Gondar produce aggregation center.",
    stages: [
      { id: "s1", name: "Operations Review", approver: "Sara Haile", role: "Ops Manager", status: "current" },
      { id: "s2", name: "Finance Authorization", approver: "Tigist Worku", role: "Finance Manager", status: "waiting" },
    ],
  },
  {
    id: "wf-004",
    title: "Field Technology Subscription",
    category: "Technology",
    amount: "$6,200",
    requester: "Mahlet Hale",
    requesterRole: "IT Systems Lead",
    department: "Digital Operations",
    requestedAt: "2026-09-18T14:40:00Z",
    urgency: "Low",
    status: "approved",
    currentStageIndex: 1,
    description: "Annual renewal for drone-assisted crop monitoring software licenses covering the Rift Valley clusters.",
    stages: [
      { id: "s1", name: "IT Review", approver: "Mahlet Hale", role: "IT Lead", status: "completed", completedAt: "Yesterday", comment: "Security audit passed, SOC2 compliant." },
      { id: "s2", name: "Finance Authorization", approver: "Tigist Worku", role: "Finance Manager", status: "completed", completedAt: "Yesterday", comment: "Approved, budget within IT capex." },
    ],
  },
];

const URGENCY_STYLES: Record<Urgency, { bg: string; text: string; dot: string }> = {
  Critical: { bg: "bg-[#FDE8E8]", text: "text-[#C94B4B]", dot: "bg-[#C94B4B]" },
  High: { bg: "bg-[#FFF3D6]", text: "text-[#D79A19]", dot: "bg-[#D79A19]" },
  Normal: { bg: "bg-[#E8F1EA]", text: "text-[#146B45]", dot: "bg-[#146B45]" },
  Low: { bg: "bg-[#F0F0F0]", text: "text-[#66736C]", dot: "bg-[#66736C]" },
};

const STATUS_META: Record<ApprovalStatus, { label: string; icon: string; color: string }> = {
  pending: { label: "Pending Review", icon: "pending_actions", color: "text-[#D79A19]" },
  approved: { label: "Fully Approved", icon: "task_alt", color: "text-[#146B45]" },
  declined: { label: "Declined", icon: "cancel", color: "text-[#C94B4B]" },
  escalated: { label: "Escalated", icon: "priority_high", color: "text-[#8B5CF6]" },
};

export default function ApprovalsPage() {
  const [selectedId, setSelectedId] = useState<string>(WORKFLOWS[0].id);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [comment, setComment] = useState("");

  const selected = WORKFLOWS.find((w) => w.id === selectedId)!;
  const filtered = filterStatus === "all" ? WORKFLOWS : WORKFLOWS.filter((w) => w.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#DDE4DE]/60">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#00261B]" style={{ letterSpacing: "-0.02em" }}>
            Approval Workflows
          </h1>
          <p className="text-sm text-[#66736C] mt-1">Multi-stage authorization chains for high-value enterprise operations.</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="px-3.5 py-2 rounded-xl bg-white border border-[#DDE4DE] text-[#17231D] hover:bg-[#F7F4EC] text-xs font-semibold flex items-center gap-2 shadow-xs transition-all active:scale-[0.97]">
            <span className="material-symbols-outlined text-[18px] text-[#66736C]">tune</span>
            Configure Chains
          </button>
          <button className="px-4 py-2 rounded-xl bg-[#0B3D2E] text-white hover:bg-[#062A20] text-xs font-semibold flex items-center gap-2 shadow-sm transition-all active:scale-[0.97]">
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Workflow
          </button>
        </div>
      </div>

      {/* Summary Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Pending Review", count: 2, icon: "pending_actions", color: "text-[#D79A19]", bg: "bg-[#FFF3D6]" },
          { label: "Escalated", count: 1, icon: "priority_high", color: "text-[#8B5CF6]", bg: "bg-purple-50" },
          { label: "Approved (7d)", count: 11, icon: "task_alt", color: "text-[#146B45]", bg: "bg-[#E8F1EA]" },
          { label: "Avg. Cycle Time", count: "18h", icon: "schedule", color: "text-[#0B3D2E]", bg: "bg-[#E8F1EA]" },
        ].map((chip) => (
          <div key={chip.label} className="p-4 rounded-2xl bg-white border border-[#DDE4DE] shadow-subtle flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${chip.bg} flex items-center justify-center shrink-0`}>
              <span className={`material-symbols-outlined text-[20px] ${chip.color}`}>{chip.icon}</span>
            </div>
            <div>
              <div className="text-lg font-bold text-[#00261B]">{chip.count}</div>
              <div className="text-[11px] text-[#66736C] font-medium">{chip.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Split View */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left: Workflow List */}
        <div className="xl:col-span-4 rounded-2xl bg-white border border-[#DDE4DE] shadow-subtle overflow-hidden">
          {/* Filter tabs */}
          <div className="px-4 pt-4 pb-3 border-b border-[#DDE4DE] flex items-center justify-between">
            <span className="text-xs font-bold text-[#00261B]">Workflows</span>
            <div className="flex items-center gap-0.5 bg-[#F7F4EC] p-0.5 rounded-lg border border-[#DDE4DE] text-[10px]">
              {["all", "pending", "escalated", "approved"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterStatus(f)}
                  className={`px-2 py-1 rounded capitalize font-medium transition-all ${
                    filterStatus === f ? "bg-white font-bold text-[#00261B] shadow-xs" : "text-[#66736C]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-[#DDE4DE]/60">
            {filtered.map((wf) => {
              const urgency = URGENCY_STYLES[wf.urgency];
              const meta = STATUS_META[wf.status];
              const isSelected = selectedId === wf.id;
              return (
                <button
                  key={wf.id}
                  onClick={() => setSelectedId(wf.id)}
                  className={`w-full text-left px-4 py-3.5 transition-all flex flex-col gap-1.5 ${
                    isSelected ? "bg-[#E8F1EA]" : "hover:bg-[#F7F4EC]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-[13px] text-[#17231D] leading-tight">{wf.title}</span>
                    <span className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${urgency.bg} ${urgency.text}`}>
                      {wf.urgency}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[#66736C]">
                    <span className={`material-symbols-outlined text-[14px] ${meta.color}`}>{meta.icon}</span>
                    <span className={`font-semibold ${meta.color}`}>{meta.label}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#66736C]">{wf.requester} · {wf.category}</span>
                    <span className="font-mono font-bold text-[#0B3D2E]">{wf.amount}</span>
                  </div>
                  {/* Stage progress dots */}
                  <div className="flex items-center gap-1 mt-0.5">
                    {wf.stages.map((s, i) => (
                      <div
                        key={s.id}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          s.status === "completed" ? "bg-[#146B45]"
                            : s.status === "current" ? "bg-[#D79A19]"
                            : s.status === "rejected" ? "bg-[#C94B4B]"
                            : "bg-[#DDE4DE]"
                        }`}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Workflow Detail Inspector */}
        {selected && (
          <div className="xl:col-span-8 rounded-2xl bg-white border border-[#DDE4DE] shadow-subtle overflow-hidden">
            {/* Detail header */}
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-[#DDE4DE] bg-[#F7F4EC]/50">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${URGENCY_STYLES[selected.urgency].bg} ${URGENCY_STYLES[selected.urgency].text}`}>
                      {selected.urgency}
                    </span>
                    <span className="text-[10px] text-[#66736C] font-mono">{selected.id.toUpperCase()} · {selected.category}</span>
                  </div>
                  <h2 className="text-lg font-bold text-[#00261B]" style={{ letterSpacing: "-0.015em" }}>
                    {selected.title}
                  </h2>
                  <p className="text-xs text-[#66736C] mt-1 leading-relaxed max-w-xl">{selected.description}</p>
                </div>
                <div className="sm:text-right shrink-0">
                  <div className="text-2xl font-bold text-[#0B3D2E] font-mono" style={{ letterSpacing: "-0.02em" }}>{selected.amount}</div>
                  <div className="text-[11px] text-[#66736C] mt-0.5">Requested value</div>
                </div>
              </div>

              {/* Requester meta */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 pt-4 border-t border-[#DDE4DE]">
                <div className="w-9 h-9 rounded-xl bg-[#0B3D2E] flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {selected.requester.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold text-xs text-[#17231D]">{selected.requester}</div>
                  <div className="text-[11px] text-[#66736C]">{selected.requesterRole} · {selected.department}</div>
                </div>
                <div className="sm:ml-auto text-left sm:text-right">
                  <div className="text-[11px] text-[#66736C]">Submitted</div>
                  <div className="text-xs font-semibold text-[#17231D]">
                    {new Date(selected.requestedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            </div>

            {/* Approval Chain Timeline */}
            <div className="px-4 sm:px-6 py-4 sm:py-5">
              <div className="text-xs font-bold text-[#00261B] mb-4 uppercase tracking-wider">Approval Chain</div>
              <div className="space-y-3">
                {selected.stages.map((stage, idx) => (
                  <div key={stage.id} className="relative">
                    {/* Connector line */}
                    {idx < selected.stages.length - 1 && (
                      <div className="absolute left-[18px] top-[36px] w-px h-[calc(100%+0.75rem)] bg-[#DDE4DE]" />
                    )}
                    <div className={`relative flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                      stage.status === "current"
                        ? "border-[#D79A19] bg-[#FFF3D6]/40"
                        : stage.status === "completed"
                        ? "border-[#DDE4DE] bg-[#F7F4EC]/50"
                        : stage.status === "rejected"
                        ? "border-[#FDE8E8] bg-[#FDE8E8]/40"
                        : "border-[#DDE4DE]/40 bg-white"
                    }`}>
                      {/* Status icon */}
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        stage.status === "completed" ? "bg-[#0B3D2E] text-white"
                          : stage.status === "current" ? "bg-[#D79A19] text-white"
                          : stage.status === "rejected" ? "bg-[#C94B4B] text-white"
                          : "bg-[#DDE4DE] text-[#66736C]"
                      }`}>
                        <span className="material-symbols-outlined text-[18px]">
                          {stage.status === "completed" ? "check" : stage.status === "current" ? "hourglass_top" : stage.status === "rejected" ? "close" : "lock"}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-xs text-[#17231D]">Stage {idx + 1}: {stage.name}</div>
                            <div className="text-[11px] text-[#66736C]">{stage.approver} · {stage.role}</div>
                          </div>
                          <div className="text-right">
                            {stage.status === "completed" && (
                              <span className="text-[11px] text-[#146B45] font-semibold">{stage.completedAt}</span>
                            )}
                            {stage.status === "current" && (
                              <span className="text-[11px] text-[#D79A19] font-semibold">Awaiting</span>
                            )}
                            {stage.status === "waiting" && (
                              <span className="text-[11px] text-[#66736C]">Not yet reached</span>
                            )}
                          </div>
                        </div>
                        {stage.comment && (
                          <div className="mt-2 text-[11px] text-[#66736C] italic border-l-2 border-[#146B45] pl-2">
                            "{stage.comment}"
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Area */}
            {selected.status === "pending" || selected.status === "escalated" ? (
              <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                <div className="p-4 rounded-2xl border border-[#DDE4DE] bg-[#F7F4EC]/50 space-y-3">
                  <div className="text-xs font-bold text-[#00261B] uppercase tracking-wider">Administrator Action</div>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment or rationale (optional)..."
                    rows={2}
                    className="w-full text-xs bg-white border border-[#DDE4DE] rounded-xl px-3.5 py-2.5 text-[#17231D] placeholder-[#B0BDB5] focus:outline-none focus:ring-2 focus:ring-[#146B45]/30 focus:border-[#146B45] transition-all resize-none"
                  />
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                    <button className="flex-1 py-2.5 rounded-xl bg-[#0B3D2E] text-white text-xs font-bold hover:bg-[#062A20] active:scale-[0.97] transition-all flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-[17px]">verified</span>
                      Authorize & Advance Stage
                    </button>
                    <div className="flex items-center gap-2.5">
                      <button className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl bg-white border border-[#FDE8E8] text-[#C94B4B] text-xs font-bold hover:bg-[#FDE8E8] active:scale-[0.97] transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[17px]">cancel</span>
                        Decline
                      </button>
                      <button className="flex-1 sm:flex-initial py-2.5 px-3 rounded-xl bg-white border border-[#DDE4DE] text-[#66736C] text-xs font-medium hover:bg-[#F7F4EC] active:scale-[0.97] transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[17px]">escalator_warning</span>
                        Escalate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                <div className="p-4 rounded-2xl border border-[#A3F4C3]/60 bg-[#A3F4C3]/15 flex items-center gap-3">
                  <span className="material-symbols-outlined text-[24px] text-[#146B45]">task_alt</span>
                  <div>
                    <div className="text-xs font-bold text-[#0B3D2E]">Workflow Fully Authorized</div>
                    <div className="text-[11px] text-[#66736C]">All approval stages have been signed off. No further action required.</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
