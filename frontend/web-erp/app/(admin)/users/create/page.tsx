"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const STEPS = [
  { id: 1, label: "Employee", desc: "Identity & profile" },
  { id: 2, label: "Organization", desc: "Hierarchy & node" },
  { id: 3, label: "Role & Scope", desc: "RBAC authority" },
  { id: 4, label: "Security", desc: "MFA & credentials" },
  { id: 5, label: "Review", desc: "Audit summary" },
];

export default function CreateUserPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "Selamawit Bekele",
    employeeId: "EMP-99201",
    email: "selamawit.bekele@zorisis.com",
    username: "s.bekele",
    phone: "+251 91 123 4567",
    language: "English / አማርኛ",
    organization: "Z•ORISIS Holding",
    region: "East Africa Region",
    branch: "Oromia HQ",
    department: "Agritech Operations",
    position: "Senior Field Agronomist",
    manager: "Abebe Tesfaye (System Admin)",
    role: "Farm Manager",
    scope: "Oromia Hub + Ada'a Cluster",
    validFrom: "2026-09-20",
    validTo: "2027-09-20",
    mfaRequired: true,
    authMethod: "Hardware TOTP Authenticator",
  });

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    alert(`User ${formData.fullName} (${formData.employeeId}) provisioned successfully!`);
    router.push("/users");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#DDE4DE]/60">
        <div>
          <div className="flex items-center gap-3">
            <Link
              href="/users"
              className="w-8 h-8 rounded-lg bg-white border border-[#DDE4DE] flex items-center justify-center text-[#66736C] hover:text-[#0B3D2E] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-[#00261B]" style={{ letterSpacing: "-0.02em" }}>
              Provision New User
            </h1>
          </div>
          <p className="text-xs text-[#66736C] mt-1 ml-11">
            Execute enterprise onboarding, node assignment, and cryptographic privilege provisioning.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-[#E8F1EA] text-[#146B45] text-xs font-semibold">
          Step {currentStep} of 5
        </span>
      </div>

      {/* Horizontal 5-Step Stepper */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white border border-[#DDE4DE] shadow-subtle overflow-x-auto">
        <div className="flex sm:grid sm:grid-cols-5 gap-2 min-w-[460px] sm:min-w-0">
          {STEPS.map((step) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            return (
              <div
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className="flex-1 sm:flex-initial flex flex-col items-center text-center cursor-pointer group transition-all"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs mb-1.5 transition-all ${
                    isCurrent
                      ? "bg-[#0B3D2E] text-white shadow-xs scale-105"
                      : isCompleted
                      ? "bg-[#146B45] text-white"
                      : "bg-[#F7F4EC] text-[#66736C] border border-[#DDE4DE]"
                  }`}
                >
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  ) : (
                    step.id
                  )}
                </div>
                <span
                  className={`text-xs font-bold leading-tight ${
                    isCurrent ? "text-[#00261B]" : "text-[#66736C]"
                  }`}
                >
                  {step.label}
                </span>
                <span className="text-[10px] text-[#66736C] hidden sm:inline-block">{step.desc}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Form Card */}
      <div className="p-6 rounded-2xl bg-white border border-[#DDE4DE] shadow-subtle min-h-[380px] flex flex-col justify-between">
        {/* Step 1: Employee Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-[#00261B] pb-2 border-b border-[#DDE4DE]">
              1. Employee Identification
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#17231D] mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full h-10 px-3 bg-[#F7F4EC] border border-[#DDE4DE] rounded-xl text-xs text-[#17231D] focus:border-[#146B45] focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#17231D] mb-1">Employee ID</label>
                <input
                  type="text"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  className="w-full h-10 px-3 bg-[#F7F4EC] border border-[#DDE4DE] rounded-xl text-xs text-[#17231D] font-mono focus:border-[#146B45] focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#17231D] mb-1">Work Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-10 px-3 bg-[#F7F4EC] border border-[#DDE4DE] rounded-xl text-xs text-[#17231D] focus:border-[#146B45] focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#17231D] mb-1">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full h-10 px-3 bg-[#F7F4EC] border border-[#DDE4DE] rounded-xl text-xs text-[#17231D] focus:border-[#146B45] focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Organization Hierarchy */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-[#00261B] pb-2 border-b border-[#DDE4DE]">
              2. Organizational Node &amp; Reporting Scope
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#17231D] mb-1">Organization</label>
                <select
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full h-10 px-3 bg-[#F7F4EC] border border-[#DDE4DE] rounded-xl text-xs text-[#17231D] focus:border-[#146B45] focus:bg-white focus:outline-none"
                >
                  <option>Z•ORISIS Holding</option>
                  <option>East Africa Agritech Corp</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#17231D] mb-1">Branch / Hub</label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full h-10 px-3 bg-[#F7F4EC] border border-[#DDE4DE] rounded-xl text-xs text-[#17231D] focus:border-[#146B45] focus:bg-white focus:outline-none"
                >
                  <option>Oromia HQ</option>
                  <option>Ada'a Woreda Cluster</option>
                  <option>Amhara Regional Hub</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#17231D] mb-1">Position Title</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full h-10 px-3 bg-[#F7F4EC] border border-[#DDE4DE] rounded-xl text-xs text-[#17231D] focus:border-[#146B45] focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#17231D] mb-1">Reporting Manager</label>
                <input
                  type="text"
                  value={formData.manager}
                  onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                  className="w-full h-10 px-3 bg-[#F7F4EC] border border-[#DDE4DE] rounded-xl text-xs text-[#17231D] focus:border-[#146B45] focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Role & Scope */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-[#00261B] pb-2 border-b border-[#DDE4DE]">
              3. Assigned RBAC Role &amp; Permission Scope
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#17231D] mb-1">Primary Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full h-10 px-3 bg-[#F7F4EC] border border-[#DDE4DE] rounded-xl text-xs text-[#17231D] focus:border-[#146B45] focus:bg-white focus:outline-none"
                >
                  <option>Farm Manager</option>
                  <option>Finance Officer</option>
                  <option>Field Agronomist</option>
                  <option>HR Officer</option>
                  <option>System Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#17231D] mb-1">Operational Scope</label>
                <input
                  type="text"
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  className="w-full h-10 px-3 bg-[#F7F4EC] border border-[#DDE4DE] rounded-xl text-xs text-[#17231D] focus:border-[#146B45] focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#17231D] mb-1">Validity Start Date</label>
                <input
                  type="date"
                  value={formData.validFrom}
                  onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                  className="w-full h-10 px-3 bg-[#F7F4EC] border border-[#DDE4DE] rounded-xl text-xs text-[#17231D] focus:border-[#146B45] focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#17231D] mb-1">Validity Expiration Date</label>
                <input
                  type="date"
                  value={formData.validTo}
                  onChange={(e) => setFormData({ ...formData, validTo: e.target.value })}
                  className="w-full h-10 px-3 bg-[#F7F4EC] border border-[#DDE4DE] rounded-xl text-xs text-[#17231D] focus:border-[#146B45] focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Security & Authentication */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-[#00261B] pb-2 border-b border-[#DDE4DE]">
              4. Security Credentials &amp; MFA Enforcement
            </h2>
            <div className="space-y-3">
              <label className="p-3.5 rounded-xl border border-[#DDE4DE] flex items-center justify-between cursor-pointer hover:bg-[#F7F4EC]">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#146B45] text-[22px]">verified_user</span>
                  <div>
                    <span className="font-semibold text-xs text-[#00261B] block">Enforce Multi-Factor Authentication (MFA)</span>
                    <span className="text-[11px] text-[#66736C]">Requires 6-digit TOTP token on every login</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.mfaRequired}
                  onChange={(e) => setFormData({ ...formData, mfaRequired: e.target.checked })}
                  className="w-4 h-4 rounded text-[#146B45] accent-[#146B45]"
                />
              </label>

              <div className="p-3.5 rounded-xl border border-[#DDE4DE] bg-[#F7F4EC]">
                <span className="text-xs font-semibold text-[#00261B] block mb-1">Primary Authentication Method</span>
                <span className="text-xs text-[#146B45] font-mono font-bold">{formData.authMethod}</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Final Review */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-[#00261B] pb-2 border-b border-[#DDE4DE]">
              5. Final Audit &amp; Provisioning Review
            </h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#F7F4EC]">
                <span className="text-[10px] text-[#66736C] block">Employee</span>
                <span className="font-bold text-[#00261B]">{formData.fullName} ({formData.employeeId})</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F7F4EC]">
                <span className="text-[10px] text-[#66736C] block">Work Email</span>
                <span className="font-bold text-[#00261B]">{formData.email}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F7F4EC]">
                <span className="text-[10px] text-[#66736C] block">Assigned Node</span>
                <span className="font-bold text-[#00261B]">{formData.organization} • {formData.branch}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F7F4EC]">
                <span className="text-[10px] text-[#66736C] block">Assigned Role &amp; Scope</span>
                <span className="font-bold text-[#146B45]">{formData.role} ({formData.scope})</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#FFF3D6] text-[#D79A19] text-xs flex items-center gap-2 border border-[#D79A19]/20">
              <span className="material-symbols-outlined text-[18px]">gavel</span>
              <span>This provisioning action is cryptographically signed and logged in the immutable audit trail.</span>
            </div>
          </div>
        )}

        {/* Navigation Action Buttons */}
        <div className="pt-6 border-t border-[#DDE4DE] flex items-center justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-4 py-2 rounded-xl bg-white border border-[#DDE4DE] text-[#66736C] hover:text-[#00261B] text-xs font-semibold disabled:opacity-40 transition-all active:scale-[0.97]"
          >
            &larr; Back
          </button>

          <div className="flex items-center gap-2">
            <Link
              href="/users"
              className="px-3.5 py-2 rounded-xl text-xs text-[#66736C] hover:text-[#00261B] font-medium"
            >
              Cancel
            </Link>

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-5 py-2 rounded-xl bg-[#0B3D2E] hover:bg-[#062A20] text-white text-xs font-semibold active:scale-[0.97] transition-all shadow-xs flex items-center gap-1.5"
              >
                <span>Continue</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-5 py-2 rounded-xl bg-[#146B45] hover:bg-[#0B3D2E] text-white text-xs font-semibold active:scale-[0.97] transition-all shadow-md flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Authorize &amp; Provision</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
