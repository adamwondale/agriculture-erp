"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { useCurrentUser } from "@/lib/rbac";

export interface KpiMetric {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "neutral" | "warning" | "danger";
  subtext?: string;
  icon: string;
}

export interface DomainPageAction {
  label: string;
  icon?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "outline";
}

export interface DomainPageShellProps {
  badge: string;
  badgeColor?: string;
  title: string;
  subtitle: string;
  kpis?: KpiMetric[];
  actions?: DomainPageAction[];
  children?: ReactNode;
}

export default function DomainPageShell({
  badge,
  badgeColor = "#146B45",
  title,
  subtitle,
  kpis,
  actions,
  children,
}: DomainPageShellProps) {
  const { user, roleConfig } = useCurrentUser();

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Hero Header Card */}
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Subtle decorative gradient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#A3F4C3]/15 via-transparent to-transparent pointer-events-none rounded-full blur-3xl -mr-20 -mt-20" />

        <div className="relative z-10 space-y-4">
          {/* Top Metadata & Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#EAEFEA]/70">
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
              <span
                className="text-[11px] font-mono font-bold px-3 py-1 rounded-full border tracking-wide uppercase inline-flex items-center gap-1.5 shadow-2xs"
                style={{
                  color: badgeColor,
                  borderColor: `${badgeColor}33`,
                  backgroundColor: `${badgeColor}12`,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: badgeColor }} />
                {badge}
              </span>
              <span className="text-xs text-[#4A5D4E] font-medium flex items-center gap-1.5 bg-[#FAF8F3] px-2.5 py-1 rounded-full border border-[#EBE7DD]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Node: {user.region}
              </span>
              <span className="text-xs text-[#718575] font-mono bg-[#FAF8F3] px-2.5 py-1 rounded-full border border-[#EBE7DD]">
                ዓ.ም መስከረም 2019 • Sept 2026
              </span>
            </div>

            {/* Action Buttons Toolbar on the Right */}
            {actions && actions.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                {actions.map((act, i) => {
                  const btnClasses = `inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-xs active:scale-[0.98] ${
                    act.variant === "primary"
                      ? "bg-[#0B3D2E] text-white hover:bg-[#146B45]"
                      : act.variant === "danger"
                      ? "bg-[#C94B4B] text-white hover:bg-[#A83232]"
                      : act.variant === "outline"
                      ? "border border-[#DDE4DE] text-[#00261B] bg-white hover:bg-[#F7F4EC]"
                      : "bg-[#EAE5D9] text-[#00261B] hover:bg-[#DDE4DE]"
                  }`;

                  if (act.href) {
                    return (
                      <Link key={i} href={act.href} className={btnClasses}>
                        {act.icon && (
                          <span className="material-symbols-outlined text-[17px]">
                            {act.icon}
                          </span>
                        )}
                        <span>{act.label}</span>
                      </Link>
                    );
                  }

                  return (
                    <button key={i} onClick={act.onClick} className={btnClasses}>
                      {act.icon && (
                        <span className="material-symbols-outlined text-[17px]">
                          {act.icon}
                        </span>
                      )}
                      <span>{act.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Full-width Title & Subtitle with generous line length */}
          <div className="space-y-1.5 max-w-4xl">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#00261B] tracking-tight leading-snug">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-[#4A5D4E] leading-relaxed max-w-3xl">
              {subtitle}
            </p>
          </div>
        </div>


        {/* Dynamic KPI Metric Cards */}
        {kpis && kpis.length > 0 && (
          <div
            className={`grid gap-4 sm:gap-5 pt-6 mt-6 border-t border-[#EAEFEA] ${
              kpis.length <= 2
                ? "grid-cols-1 sm:grid-cols-2"
                : kpis.length === 3
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {kpis.map((kpi, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-[#F7F4EC] border border-[#E8E3D5] hover:bg-[#FAF8F3] hover:border-[#146B45]/40 hover:shadow-card transition-all duration-200 group flex flex-col justify-between shadow-2xs"
              >
                <div>
                  {/* Top: Category Title & Icon */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-[11px] font-bold text-[#55685B] uppercase tracking-wider font-heading leading-tight">
                      {kpi.title}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-white border border-[#DDE4DE] flex items-center justify-center text-[#146B45] shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-[18px]">
                        {kpi.icon}
                      </span>
                    </div>
                  </div>

                  {/* Middle: Metric Value (Full Width - Never Collides) */}
                  <div className="my-1.5">
                    <div className="text-2xl sm:text-[28px] font-extrabold text-[#00261B] tracking-tight font-heading leading-tight break-words">
                      {kpi.value}
                    </div>
                  </div>
                </div>

                {/* Bottom: Status Pill Badge & Descriptive Subtext */}
                <div className="pt-2.5 border-t border-[#E8E3D5] mt-2 space-y-1.5">
                  {kpi.change && (
                    <div className="flex items-center">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wide inline-flex items-center gap-1.5 ${
                          kpi.changeType === "positive"
                            ? "bg-[#D1E7DD] text-[#0F5132] border border-[#BADBCC]"
                            : kpi.changeType === "warning"
                            ? "bg-[#FFEAC2] text-[#804A00] border border-[#F5D599]"
                            : kpi.changeType === "danger"
                            ? "bg-[#FCE4E4] text-[#C94B4B] border border-[#F5C2C2]"
                            : "bg-[#E8F1EA] text-[#146B45] border border-[#C5DDCB]"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                        {kpi.change}
                      </span>
                    </div>
                  )}

                  {kpi.subtext && (
                    <p className="text-xs text-[#66736C] leading-relaxed">
                      {kpi.subtext}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {children && <div className="space-y-6">{children}</div>}
    </div>
  );
}
