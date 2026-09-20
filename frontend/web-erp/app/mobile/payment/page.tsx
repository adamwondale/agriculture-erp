"use client";

import React, { useState } from "react";
import Link from "next/link";

type PaymentStatus = "draft" | "submitted" | "approved" | "rejected";

const RECENT_PAYMENTS = [
  { id: "PAY-041", title: "Fuel Reimbursement", amount: "$140", status: "approved" as PaymentStatus, date: "Sep 17" },
  { id: "PAY-040", title: "Field Equipment Hire", amount: "$320", status: "submitted" as PaymentStatus, date: "Sep 15" },
  { id: "PAY-039", title: "Transport to Bishoftu", amount: "$85", status: "rejected" as PaymentStatus, date: "Sep 12" },
];

const STATUS_STYLE: Record<PaymentStatus, { bg: string; text: string; icon: string }> = {
  draft: { bg: "bg-[#F0F0F0]", text: "text-[#66736C]", icon: "edit" },
  submitted: { bg: "bg-[#FFF3D6]", text: "text-[#D79A19]", icon: "pending_actions" },
  approved: { bg: "bg-[#E8F1EA]", text: "text-[#146B45]", icon: "task_alt" },
  rejected: { bg: "bg-[#FDE8E8]", text: "text-[#C94B4B]", icon: "cancel" },
};

const CATEGORIES = ["Transport", "Equipment", "Consumables", "Contractor"];

export default function MobilePaymentPage() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F7F4EC] flex flex-col items-center justify-center p-8 text-center font-[Inter,system-ui,sans-serif]">
        <div className="w-24 h-24 rounded-full bg-[#E8F1EA] flex items-center justify-center mb-6 shadow-card">
          <span className="material-symbols-outlined text-[48px] text-[#146B45]">send</span>
        </div>
        <h1 className="text-2xl font-bold text-[#00261B] mb-2" style={{ letterSpacing: "-0.02em" }}>Request Submitted</h1>
        <p className="text-sm text-[#66736C] max-w-sm leading-relaxed mb-8">
          Your payment request has been forwarded to the Finance Manager and entered into the approval workflow.
        </p>
        <div className="w-full max-w-md p-5 rounded-2xl bg-white border border-[#DDE4DE] shadow-subtle text-left space-y-3 mb-8">
          {[
            { label: "Request ID", value: "PAY-042" },
            { label: "Title", value: title },
            { label: "Amount", value: `$${amount}` },
            { label: "Category", value: category },
            { label: "Submitted", value: "Just now" },
            { label: "Approver", value: "Tigist Worku · Finance" },
          ].map((r) => (
            <div key={r.label} className="flex justify-between text-sm">
              <span className="text-[#66736C]">{r.label}</span>
              <span className="font-semibold text-[#17231D] font-mono">{r.value}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3 w-full max-w-md">
          <button
            onClick={() => { setSubmitted(false); setTitle(""); setAmount(""); setCategory(""); setDescription(""); }}
            className="flex-1 py-3.5 rounded-2xl border border-[#DDE4DE] bg-white text-sm font-bold text-[#66736C] hover:bg-[#F7F4EC] active:scale-[0.97] transition-all"
          >
            New Request
          </button>
          <Link
            href="/mobile"
            className="flex-1 py-3.5 rounded-2xl bg-[#0B3D2E] text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#062A20] active:scale-[0.97] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">home</span>
            Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F4EC] font-[Inter,system-ui,sans-serif]">
      {/* Header */}
      <div className="bg-white border-b border-[#DDE4DE] sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex items-center gap-3 sm:gap-4">
          <Link
            href="/mobile"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F7F4EC] border border-[#DDE4DE] flex items-center justify-center active:scale-[0.93] transition-all shrink-0"
          >
            <span className="material-symbols-outlined text-[20px] text-[#66736C]">arrow_back</span>
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-sm text-[#00261B] truncate">Payment Request</h1>
            <p className="text-xs text-[#66736C] truncate">Submit for workflow approval</p>
          </div>
          <Link
            href="/approvals"
            className="hidden sm:flex px-2.5 py-1 text-[11px] font-semibold text-[#66736C] hover:text-[#00261B] rounded-lg border border-[#DDE4DE] bg-[#F7F4EC] shadow-xs items-center gap-1.5 shrink-0"
          >
            <span className="material-symbols-outlined text-[15px]">verified</span>
            <span>Approval Chains</span>
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-5 sm:py-8 space-y-6 sm:space-y-8 pb-16">
        {/* Budget context */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#062A20] via-[#0B3D2E] to-[#146B45] p-4 sm:p-6 text-white shadow-floating">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(ellipse at 80% 0%, white 0%, transparent 60%)" }} />
          <div className="relative z-10">
            <div className="text-[10px] sm:text-[11px] text-white/60 font-bold uppercase tracking-wider mb-1">Your Approval Limit</div>
            <div className="text-3xl sm:text-4xl font-bold mb-1" style={{ letterSpacing: "-0.025em" }}>$50,000</div>
            <div className="text-xs sm:text-sm text-white/70 mb-4 sm:mb-5">Via Payment Approver delegation · Oromia Regional Hub</div>
            <div className="flex justify-between text-xs sm:text-sm mb-2">
              <span className="text-white/60">$9,200 utilized</span>
              <span className="font-bold text-[#A3F4C3]">$40,800 remaining</span>
            </div>
            <div className="h-2 rounded-full bg-white/20">
              <div className="h-full rounded-full bg-[#A3F4C3]" style={{ width: "18%" }} />
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#17231D]">Request Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Fuel Reimbursement — Bishoftu Trip"
              className="w-full px-4 py-3.5 bg-white border border-[#DDE4DE] rounded-2xl text-sm text-[#17231D] placeholder-[#B0BDB5] focus:outline-none focus:ring-2 focus:ring-[#146B45]/30 focus:border-[#146B45] transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#17231D]">Amount (USD)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-sm text-[#66736C]">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3.5 bg-white border border-[#DDE4DE] rounded-2xl text-sm text-[#17231D] placeholder-[#B0BDB5] focus:outline-none focus:ring-2 focus:ring-[#146B45]/30 focus:border-[#146B45] transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#17231D]">Category</label>
            <div className="grid grid-cols-2 gap-2.5">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`py-3.5 rounded-2xl text-sm font-semibold border-2 transition-all active:scale-[0.96] ${
                    category === c ? "bg-[#0B3D2E] text-white border-[#0B3D2E]" : "bg-white text-[#17231D] border-[#DDE4DE] hover:border-[#146B45]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#17231D]">Description & Justification</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the purpose and business justification…"
              className="w-full px-4 py-3.5 bg-white border border-[#DDE4DE] rounded-2xl text-sm text-[#17231D] placeholder-[#B0BDB5] focus:outline-none focus:ring-2 focus:ring-[#146B45]/30 focus:border-[#146B45] transition-all resize-none"
            />
          </div>

          {/* Receipt upload */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#17231D]">Receipt / Attachment</label>
            <button className="w-full py-6 rounded-2xl border-2 border-dashed border-[#DDE4DE] bg-white flex items-center justify-center gap-3 active:scale-[0.98] transition-all hover:border-[#146B45] hover:bg-[#F7F4EC]">
              <span className="material-symbols-outlined text-[28px] text-[#B0BDB5]">upload_file</span>
              <span className="text-sm text-[#B0BDB5] font-medium">Upload or capture receipt</span>
            </button>
          </div>
        </div>

        {/* Recent history */}
        <section>
          <div className="text-[11px] font-bold text-[#66736C] uppercase tracking-wider mb-4">Recent Requests</div>
          <div className="rounded-2xl bg-white border border-[#DDE4DE] overflow-hidden divide-y divide-[#DDE4DE]/60">
            {RECENT_PAYMENTS.map((p) => {
              const style = STATUS_STYLE[p.status];
              return (
                <div key={p.id} className="flex items-center justify-between px-5 py-4">
                  <div>
                    <div className="font-semibold text-sm text-[#17231D]">{p.title}</div>
                    <div className="text-xs text-[#66736C] font-mono mt-0.5">{p.id} · {p.date}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-base text-[#0B3D2E]">{p.amount}</span>
                    <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold capitalize ${style.bg} ${style.text}`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Submit */}
        <button
          onClick={() => setSubmitted(true)}
          disabled={!title || !amount || !category}
          className="w-full py-4 rounded-2xl bg-[#0B3D2E] text-white text-sm font-bold hover:bg-[#062A20] active:scale-[0.97] transition-all disabled:opacity-40 flex items-center justify-center gap-2.5 shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">send</span>
          Submit for Approval
        </button>
      </div>
    </div>
  );
}
