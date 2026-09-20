"use client";

import React, { useState } from "react";
import Link from "next/link";

const INSPECTION_FIELDS = [
  { id: "crop_type", label: "Crop Type", type: "select", options: ["Teff", "Wheat", "Maize", "Barley", "Sorghum"] },
  { id: "plot_id", label: "Plot / Block ID", type: "text", placeholder: "e.g. ADA-14B" },
  { id: "growth_stage", label: "Growth Stage", type: "select", options: ["Germination", "Tillering", "Booting", "Heading", "Grain Fill", "Harvest Ready"] },
  { id: "pest_flag", label: "Pest / Disease Flag", type: "select", options: ["None", "Minor", "Moderate", "Severe"] },
  { id: "irrigation", label: "Irrigation Status", type: "select", options: ["Rainfed", "Irrigated — Good", "Irrigated — Deficit", "Waterlogged"] },
];

const STEPS = ["Location & Assignment", "Crop Condition", "Notes & Evidence"];

export default function MobileInspectionPage() {
  const [step, setStep] = useState(0);
  const [gpsLocked, setGpsLocked] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [canopyValue, setCanopyValue] = useState(70);
  const [submitted, setSubmitted] = useState(false);

  const handleGPS = () => {
    setGpsLoading(true);
    setTimeout(() => { setGpsLoading(false); setGpsLocked(true); }, 1400);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F7F4EC] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-24 rounded-full bg-[#E8F1EA] flex items-center justify-center mb-6 shadow-card">
          <span className="material-symbols-outlined text-[48px] text-[#146B45]">task_alt</span>
        </div>
        <h1 className="text-2xl font-bold text-[#00261B] mb-2" style={{ letterSpacing: "-0.02em" }}>Inspection Logged</h1>
        <p className="text-sm text-[#66736C] max-w-sm leading-relaxed mb-8">
          Your field inspection has been recorded and cryptographically signed in the immutable audit trail.
        </p>
        <div className="w-full max-w-md p-5 rounded-2xl bg-white border border-[#DDE4DE] shadow-subtle text-left space-y-3 mb-8">
          {[
            { label: "Report ID", value: "INSP-20260919-0042" },
            { label: "Logged by", value: "Kinde Gudeta" },
            { label: "Timestamp", value: "09:52 AM · Sep 19, 2026" },
            { label: "GPS", value: "8.9806° N, 38.7578° E · ±3m" },
            { label: "Plot", value: formData.plot_id || "ADA-14B" },
            { label: "Crop", value: formData.crop_type || "Wheat" },
          ].map((r) => (
            <div key={r.label} className="flex justify-between text-sm">
              <span className="text-[#66736C]">{r.label}</span>
              <span className="font-semibold text-[#17231D] font-mono">{r.value}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3 w-full max-w-md">
          <button
            onClick={() => { setSubmitted(false); setStep(0); setFormData({}); setGpsLocked(false); }}
            className="flex-1 py-3.5 rounded-2xl border border-[#DDE4DE] bg-white text-sm font-bold text-[#66736C] hover:bg-[#F7F4EC] active:scale-[0.97] transition-all"
          >
            Log Another
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
            <h1 className="font-bold text-sm text-[#00261B] truncate">Log Field Inspection</h1>
            <p className="text-xs text-[#66736C] truncate">{STEPS[step]}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/dashboard"
              className="hidden sm:flex px-2.5 py-1 text-[11px] font-semibold text-[#66736C] hover:text-[#00261B] rounded-lg border border-[#DDE4DE] bg-[#F7F4EC] shadow-xs"
            >
              Admin Console
            </Link>
            <span className="text-xs text-[#66736C] font-mono font-bold">{step + 1} / {STEPS.length}</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-[#DDE4DE]">
          <div
            className="h-full bg-[#0B3D2E] transition-all duration-500"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step breadcrumbs */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex gap-2 mb-6 sm:mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1 flex flex-col gap-1.5">
              <div className={`h-1.5 rounded-full transition-all ${i < step ? "bg-[#A3F4C3]" : i === step ? "bg-[#0B3D2E]" : "bg-[#DDE4DE]"}`} />
              <span className={`text-[10px] font-semibold truncate ${i === step ? "text-[#0B3D2E]" : "text-[#B0BDB5]"}`}>{s}</span>
            </div>
          ))}
        </div>

        {/* Step 0: Location */}
        {step === 0 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-[#00261B]" style={{ letterSpacing: "-0.015em" }}>Location & Assignment</h2>

            {/* GPS card */}
            <div className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${gpsLocked ? "border-[#146B45] bg-[#E8F1EA]/30" : "border-dashed border-[#DDE4DE] bg-white"}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all ${gpsLocked ? "bg-[#0B3D2E]" : gpsLoading ? "bg-[#FFF3D6]" : "bg-[#F7F4EC]"}`}>
                    <span className={`material-symbols-outlined text-[24px] sm:text-[28px] transition-colors ${gpsLocked ? "text-white" : gpsLoading ? "text-[#D79A19]" : "text-[#B0BDB5]"}`}>
                      {gpsLocked ? "my_location" : gpsLoading ? "location_searching" : "location_off"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-[#17231D]">
                      {gpsLocked ? "GPS Locked" : gpsLoading ? "Acquiring signal…" : "GPS Not Captured"}
                    </div>
                    <div className="text-xs text-[#66736C] mt-0.5">
                      {gpsLocked ? "8.9806° N, 38.7578° E · Accuracy ±3m" : "Tap to capture your current coordinates"}
                    </div>
                  </div>
                </div>
                {!gpsLocked && (
                  <button
                    onClick={handleGPS}
                    disabled={gpsLoading}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#0B3D2E] text-white text-xs font-bold active:scale-[0.95] transition-all disabled:opacity-50 text-center"
                  >
                    {gpsLoading ? "…" : "Capture"}
                  </button>
                )}
              </div>
            </div>

            {/* Plot ID */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#17231D]">Plot / Block ID</label>
              <input
                type="text"
                placeholder="e.g. ADA-14B"
                value={formData.plot_id || ""}
                onChange={(e) => setFormData({ ...formData, plot_id: e.target.value })}
                className="w-full px-4 py-3.5 bg-white border border-[#DDE4DE] rounded-2xl text-sm text-[#17231D] placeholder-[#B0BDB5] focus:outline-none focus:ring-2 focus:ring-[#146B45]/30 focus:border-[#146B45] transition-all"
              />
            </div>

            {/* Cluster */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#17231D]">Cluster / Station</label>
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                {["Ada'a Cluster", "Bishoftu Station", "Modjo Hub", "Dukem Field"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setFormData({ ...formData, cluster: c })}
                    className={`py-3 sm:py-3.5 px-2 rounded-2xl text-xs sm:text-sm font-semibold border-2 transition-all active:scale-[0.96] ${
                      formData.cluster === c ? "bg-[#0B3D2E] text-white border-[#0B3D2E]" : "bg-white text-[#17231D] border-[#DDE4DE] hover:border-[#146B45]"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Crop condition */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-[#00261B]" style={{ letterSpacing: "-0.015em" }}>Crop Condition</h2>
            {["crop_type", "growth_stage", "pest_flag", "irrigation"].map((fieldId) => {
              const f = INSPECTION_FIELDS.find((fi) => fi.id === fieldId)!;
              return (
                <div key={f.id} className="space-y-2">
                  <label className="text-sm font-semibold text-[#17231D]">{f.label}</label>
                  <div className="relative">
                    <select
                      value={formData[f.id] || ""}
                      onChange={(e) => setFormData({ ...formData, [f.id]: e.target.value })}
                      className="w-full px-4 py-3.5 bg-white border border-[#DDE4DE] rounded-2xl text-sm text-[#17231D] focus:outline-none focus:ring-2 focus:ring-[#146B45]/30 focus:border-[#146B45] transition-all appearance-none pr-10"
                    >
                      <option value="">Select…</option>
                      {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <span className="material-symbols-outlined text-[18px] text-[#B0BDB5] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">expand_more</span>
                  </div>
                </div>
              );
            })}

            <div className="space-y-3">
              <label className="text-sm font-semibold text-[#17231D]">Canopy Cover</label>
              <div className="bg-white border border-[#DDE4DE] rounded-2xl p-5 space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold text-[#0B3D2E]" style={{ letterSpacing: "-0.02em" }}>{canopyValue}%</span>
                  <span className="text-xs text-[#66736C]">{canopyValue < 40 ? "Sparse" : canopyValue < 70 ? "Moderate" : "Dense"} cover</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={canopyValue}
                  onChange={(e) => setCanopyValue(Number(e.target.value))}
                  className="w-full h-2 rounded-full accent-[#0B3D2E]"
                />
                <div className="flex justify-between text-xs text-[#B0BDB5]">
                  <span>0% Bare</span>
                  <span>100% Full</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Notes & evidence */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-[#00261B]" style={{ letterSpacing: "-0.015em" }}>Notes & Photo Evidence</h2>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#17231D]">Field Notes</label>
              <textarea
                rows={5}
                placeholder="Describe crop condition, observations, anomalies, follow-up actions…"
                value={formData.notes || ""}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3.5 bg-white border border-[#DDE4DE] rounded-2xl text-sm text-[#17231D] placeholder-[#B0BDB5] focus:outline-none focus:ring-2 focus:ring-[#146B45]/30 focus:border-[#146B45] transition-all resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#17231D]">Photo Evidence</label>
              <div className="grid grid-cols-3 gap-3">
                <button className="aspect-square rounded-2xl bg-white border-2 border-dashed border-[#DDE4DE] flex flex-col items-center justify-center gap-2 active:scale-[0.95] transition-all hover:border-[#146B45]">
                  <span className="material-symbols-outlined text-[28px] text-[#B0BDB5]">add_a_photo</span>
                  <span className="text-[11px] text-[#B0BDB5] font-medium">Add Photo</span>
                </button>
                {["from-[#A3F4C3] to-[#146B45]", "from-[#D4EDDA] to-[#A3F4C3]"].map((g, i) => (
                  <div key={i} className={`aspect-square rounded-2xl bg-gradient-to-br ${g} relative shadow-subtle`}>
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px] text-[#17231D]">check</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="p-5 rounded-2xl bg-[#0B3D2E] text-white space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-white/60 mb-3">Submission Summary</div>
              {[
                ["Plot", formData.plot_id || "—"],
                ["Cluster", formData.cluster || "—"],
                ["Crop", formData.crop_type || "—"],
                ["Stage", formData.growth_stage || "—"],
                ["Pest Flag", formData.pest_flag || "—"],
                ["Canopy", `${canopyValue}%`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-white/60">{k}</span>
                  <span className="font-semibold text-white">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-10 pb-10">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="py-4 px-6 rounded-2xl border border-[#DDE4DE] bg-white text-sm font-bold text-[#66736C] hover:bg-[#F7F4EC] active:scale-[0.97] transition-all"
            >
              ← Back
            </button>
          )}
          <button
            onClick={() => step < 2 ? setStep(step + 1) : setSubmitted(true)}
            className="flex-1 py-4 rounded-2xl bg-[#0B3D2E] text-white text-sm font-bold hover:bg-[#062A20] active:scale-[0.97] transition-all flex items-center justify-center gap-2.5 shadow-sm"
          >
            {step < 2 ? (
              <>Continue <span className="material-symbols-outlined text-[18px]">arrow_forward</span></>
            ) : (
              <><span className="material-symbols-outlined text-[18px]">send</span> Submit Inspection</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
