"use client";

import React, { useState } from "react";
import { formatDualDate, SupportedCalendarLang } from "@/lib/calendar/ethiopian";

export interface DualDateBadgeProps {
  date?: string | Date;
  lang?: SupportedCalendarLang;
  initialMode?: "ethiopian" | "gregorian" | "dual";
  className?: string;
}

export default function DualDateBadge({
  date = new Date(),
  lang = "am",
  initialMode = "dual",
  className = "",
}: DualDateBadgeProps) {
  const [mode, setMode] = useState<"ethiopian" | "gregorian" | "dual">(initialMode);
  const dual = formatDualDate(date, lang);

  const toggleMode = () => {
    if (mode === "dual") setMode("ethiopian");
    else if (mode === "ethiopian") setMode("gregorian");
    else setMode("dual");
  };

  return (
    <button
      type="button"
      onClick={toggleMode}
      title="Click to toggle between Ethiopian (ዓ.ም), Gregorian (G.C.), or Dual view"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono transition-all hover:scale-105 active:scale-95 border cursor-pointer ${
        mode === "ethiopian"
          ? "bg-[#D1E7DD] border-[#A3CFBB] text-[#0F5132]"
          : mode === "gregorian"
          ? "bg-[#FAF8F3] border-[#EBE7DD] text-[#00261B]"
          : "bg-[#EAE5D9]/70 border-[#DDE4DE] text-[#00261B]"
      } ${className}`}
    >
      <span className="material-symbols-outlined text-[14px]">
        {mode === "ethiopian" ? "calendar_today" : "calendar_month"}
      </span>
      <span className="font-semibold">
        {mode === "ethiopian"
          ? dual.ethiopian
          : mode === "gregorian"
          ? dual.gregorian
          : dual.dualString}
      </span>
    </button>
  );
}
