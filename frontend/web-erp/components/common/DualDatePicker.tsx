"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  EthiopianDate,
  GregorianDate,
  SupportedCalendarLang,
  ETHIOPIAN_MONTHS,
  GREGORIAN_MONTHS,
  ETHIOPIAN_DAYS,
  gregorianToEthiopian,
  ethiopianToGregorian,
  getEthiopianDaysInMonth,
  formatEthiopianDate,
  formatDualDate,
  gregorianToJdn,
  jdnToGregorian,
  jdnToEthiopian,
  ethiopianToJdn,
} from "@/lib/calendar/ethiopian";

export interface DualDatePickerProps {
  value?: string | Date; // ISO string 'YYYY-MM-DD' or Date
  onChange?: (isoDate: string, ethDate: EthiopianDate) => void;
  label?: string;
  placeholder?: string;
  defaultMode?: "ethiopian" | "gregorian";
  defaultLang?: SupportedCalendarLang;
  displayFormat?: "ethiopian" | "gregorian" | "dual";
  disabled?: boolean;
  className?: string;
}

export default function DualDatePicker({
  value,
  onChange,
  label,
  placeholder = "Select date...",
  defaultMode = "ethiopian",
  defaultLang = "am",
  displayFormat = "dual",
  disabled = false,
  className = "",
}: DualDatePickerProps) {
  // Calendar viewing mode (which grid is currently rendered)
  const [activeMode, setActiveMode] = useState<"ethiopian" | "gregorian">(defaultMode);
  const [lang, setLang] = useState<SupportedCalendarLang>(defaultLang);
  const [isOpen, setIsOpen] = useState(false);

  // Selected date anchor in Gregorian representation (YYYY-MM-DD)
  const [selectedGregorian, setSelectedGregorian] = useState<GregorianDate>(() => {
    if (value) {
      if (typeof value === "string") {
        const parts = value.split("-");
        if (parts.length >= 3) {
          return {
            year: parseInt(parts[0], 10),
            month: parseInt(parts[1], 10),
            day: parseInt(parts[2], 10),
          };
        }
        const d = new Date(value);
        return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
      }
      return {
        year: value.getFullYear(),
        month: value.getMonth() + 1,
        day: value.getDate(),
      };
    }
    // Default to Sept 30, 2026 (Meskerem 20, 2019 ዓ.ም)
    return { year: 2026, month: 9, day: 30 };
  });

  // Current browsing viewport month/year
  const [viewEthYear, setViewEthYear] = useState<number>(2019);
  const [viewEthMonth, setViewEthMonth] = useState<number>(1); // Meskerem

  const [viewGregYear, setViewGregYear] = useState<number>(2026);
  const [viewGregMonth, setViewGregMonth] = useState<number>(9); // September

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync state if external value changes
  useEffect(() => {
    if (value) {
      let gDate: GregorianDate;
      if (typeof value === "string") {
        const parts = value.split("-");
        if (parts.length >= 3) {
          gDate = {
            year: parseInt(parts[0], 10),
            month: parseInt(parts[1], 10),
            day: parseInt(parts[2], 10),
          };
        } else {
          const d = new Date(value);
          gDate = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
        }
      } else {
        gDate = {
          year: value.getFullYear(),
          month: value.getMonth() + 1,
          day: value.getDate(),
        };
      }
      setSelectedGregorian(gDate);
      const eth = gregorianToEthiopian(gDate);
      setViewEthYear(eth.year);
      setViewEthMonth(eth.month);
      setViewGregYear(gDate.year);
      setViewGregMonth(gDate.month);
    }
  }, [value]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Derive active Ethiopian selected date
  const selectedEthiopian = gregorianToEthiopian(selectedGregorian);

  // Formatted trigger label
  const dualFormatted = formatDualDate(selectedGregorian, lang);
  let triggerText = dualFormatted.dualString;
  if (displayFormat === "ethiopian") triggerText = dualFormatted.ethiopian;
  if (displayFormat === "gregorian") triggerText = dualFormatted.gregorian;

  // Handle day selection in Ethiopian Mode
  const handleSelectEthDay = (day: number) => {
    const eth: EthiopianDate = { year: viewEthYear, month: viewEthMonth, day };
    const greg = ethiopianToGregorian(eth);
    setSelectedGregorian(greg);
    setViewGregYear(greg.year);
    setViewGregMonth(greg.month);

    const isoDate = `${greg.year}-${String(greg.month).padStart(2, "0")}-${String(greg.day).padStart(2, "0")}`;
    onChange?.(isoDate, eth);
  };

  // Handle day selection in Gregorian Mode
  const handleSelectGregDay = (day: number) => {
    const greg: GregorianDate = { year: viewGregYear, month: viewGregMonth, day };
    setSelectedGregorian(greg);
    const eth = gregorianToEthiopian(greg);
    setViewEthYear(eth.year);
    setViewEthMonth(eth.month);

    const isoDate = `${greg.year}-${String(greg.month).padStart(2, "0")}-${String(greg.day).padStart(2, "0")}`;
    onChange?.(isoDate, eth);
  };

  // Quick Preset Handlers
  const handleSetToday = () => {
    const today = new Date();
    const gDate: GregorianDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    };
    setSelectedGregorian(gDate);
    const eth = gregorianToEthiopian(gDate);
    setViewEthYear(eth.year);
    setViewEthMonth(eth.month);
    setViewGregYear(gDate.year);
    setViewGregMonth(gDate.month);
    const isoDate = `${gDate.year}-${String(gDate.month).padStart(2, "0")}-${String(gDate.day).padStart(2, "0")}`;
    onChange?.(isoDate, eth);
  };

  const handleSetSeasonStart = () => {
    // Meskerem 1 of current viewing Ethiopian year
    const eth: EthiopianDate = { year: viewEthYear, month: 1, day: 1 };
    const greg = ethiopianToGregorian(eth);
    setSelectedGregorian(greg);
    setViewEthMonth(1);
    setViewGregYear(greg.year);
    setViewGregMonth(greg.month);
    const isoDate = `${greg.year}-${String(greg.month).padStart(2, "0")}-${String(greg.day).padStart(2, "0")}`;
    onChange?.(isoDate, eth);
  };

  // Ethiopian Month Navigation
  const prevEthMonth = () => {
    if (viewEthMonth === 1) {
      setViewEthYear((y) => y - 1);
      setViewEthMonth(13);
    } else {
      setViewEthMonth((m) => m - 1);
    }
  };

  const nextEthMonth = () => {
    if (viewEthMonth === 13) {
      setViewEthYear((y) => y + 1);
      setViewEthMonth(1);
    } else {
      setViewEthMonth((m) => m + 1);
    }
  };

  // Gregorian Month Navigation
  const prevGregMonth = () => {
    if (viewGregMonth === 1) {
      setViewGregYear((y) => y - 1);
      setViewGregMonth(12);
    } else {
      setViewGregMonth((m) => m - 1);
    }
  };

  const nextGregMonth = () => {
    if (viewGregMonth === 12) {
      setViewGregYear((y) => y + 1);
      setViewGregMonth(1);
    } else {
      setViewGregMonth((m) => m + 1);
    }
  };

  // Render Day Cells for Ethiopian Calendar
  const renderEthiopianGrid = () => {
    const totalDays = getEthiopianDaysInMonth(viewEthYear, viewEthMonth);

    // Calculate starting weekday for day 1 of this Ethiopian month
    const jdnFirstDay = ethiopianToJdn(viewEthYear, viewEthMonth, 1);
    // JDN % 7: 0 = Mon, 1 = Tue, 2 = Wed, 3 = Thu, 4 = Fri, 5 = Sat, 6 = Sun
    // In our ETHIOPIAN_DAYS array: index 0 is Sunday, 1 is Monday...
    const weekdayOfFirst = (jdnFirstDay + 1) % 7;

    const days = [];

    // Empty blank padding cells
    for (let p = 0; p < weekdayOfFirst; p++) {
      days.push(
        <div
          key={`pad-${p}`}
          className="h-10 sm:h-11 rounded-xl bg-transparent"
        />
      );
    }

    // Days 1..totalDays
    for (let d = 1; d <= totalDays; d++) {
      const isSelected =
        selectedEthiopian.year === viewEthYear &&
        selectedEthiopian.month === viewEthMonth &&
        selectedEthiopian.day === d;

      // Corresponding Gregorian date for subtext
      const gDate = ethiopianToGregorian({
        year: viewEthYear,
        month: viewEthMonth,
        day: d,
      });
      const gMonthShort = GREGORIAN_MONTHS[gDate.month - 1]?.shortEn || "";

      days.push(
        <button
          key={`eth-day-${d}`}
          type="button"
          onClick={() => handleSelectEthDay(d)}
          className={`h-10 sm:h-11 rounded-xl flex flex-col items-center justify-center transition-all relative group text-xs ${
            isSelected
              ? "bg-[#0B3D2E] text-white font-bold shadow-sm scale-105"
              : "bg-[#FAF8F3] hover:bg-[#EAE5D9] text-[#00261B] border border-transparent hover:border-[#DDE4DE]"
          }`}
        >
          <span className="font-mono text-xs sm:text-sm font-semibold leading-none">
            {d}
          </span>
          <span
            className={`text-[9px] font-mono leading-none mt-1 opacity-70 ${
              isSelected ? "text-[#A3F4C3]" : "text-[#718575]"
            }`}
          >
            {gDate.day} {gMonthShort}
          </span>
        </button>
      );
    }

    return days;
  };

  // Render Day Cells for Gregorian Calendar
  const renderGregorianGrid = () => {
    // Days in current Gregorian month
    const totalDays = new Date(viewGregYear, viewGregMonth, 0).getDate();
    // Starting weekday of month (0 = Sun, 1 = Mon...)
    const weekdayOfFirst = new Date(viewGregYear, viewGregMonth - 1, 1).getDay();

    const days = [];

    // Empty padding cells
    for (let p = 0; p < weekdayOfFirst; p++) {
      days.push(
        <div
          key={`greg-pad-${p}`}
          className="h-10 sm:h-11 rounded-xl bg-transparent"
        />
      );
    }

    // Days 1..totalDays
    for (let d = 1; d <= totalDays; d++) {
      const isSelected =
        selectedGregorian.year === viewGregYear &&
        selectedGregorian.month === viewGregMonth &&
        selectedGregorian.day === d;

      // Corresponding Ethiopian date for subtext
      const eth = gregorianToEthiopian({
        year: viewGregYear,
        month: viewGregMonth,
        day: d,
      });
      const ethMonthName = ETHIOPIAN_MONTHS[eth.month - 1]?.nameAm?.slice(0, 3) || "";

      days.push(
        <button
          key={`greg-day-${d}`}
          type="button"
          onClick={() => handleSelectGregDay(d)}
          className={`h-10 sm:h-11 rounded-xl flex flex-col items-center justify-center transition-all relative group text-xs ${
            isSelected
              ? "bg-[#0B3D2E] text-white font-bold shadow-sm scale-105"
              : "bg-[#FAF8F3] hover:bg-[#EAE5D9] text-[#00261B] border border-transparent hover:border-[#DDE4DE]"
          }`}
        >
          <span className="font-mono text-xs sm:text-sm font-semibold leading-none">
            {d}
          </span>
          <span
            className={`text-[9px] font-mono leading-none mt-1 opacity-70 ${
              isSelected ? "text-[#A3F4C3]" : "text-[#718575]"
            }`}
          >
            {eth.day} {ethMonthName}
          </span>
        </button>
      );
    }

    return days;
  };

  return (
    <div ref={containerRef} className={`relative inline-block w-full ${className}`}>
      {/* Input Label */}
      {label && (
        <label className="block text-xs font-semibold text-[#4A5D4E] uppercase tracking-wider mb-1.5">
          {label}
        </label>
      )}

      {/* Input Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-white border border-[#DDE4DE] hover:border-[#0B3D2E] transition-all text-xs shadow-2xs group ${
          disabled ? "opacity-50 cursor-not-allowed bg-[#F7F4EC]" : "cursor-pointer"
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-xl bg-[#FAF8F3] border border-[#EBE7DD] flex items-center justify-center text-[#146B45] shrink-0 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
          </div>
          <span className="font-medium text-[#00261B] truncate text-left">
            {triggerText || placeholder}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 text-[#718575]">
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-[#FAF8F3] border border-[#EBE7DD]">
            {activeMode === "ethiopian" ? "ዓ.ም" : "G.C."}
          </span>
          <span className="material-symbols-outlined text-[18px]">
            {isOpen ? "expand_less" : "expand_more"}
          </span>
        </div>
      </button>

      {/* Popover Calendar Modal */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 w-full sm:w-[380px] bg-white rounded-3xl border border-[#DDE4DE] shadow-2xl p-4 sm:p-5 animate-in fade-in zoom-in-95 duration-150">
          {/* Top Mode & Language Switcher Bar */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EAEFEA] gap-2">
            {/* Calendar Mode Switcher Pill */}
            <div className="flex items-center p-1 rounded-xl bg-[#FAF8F3] border border-[#EBE7DD]">
              <button
                type="button"
                onClick={() => setActiveMode("ethiopian")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeMode === "ethiopian"
                    ? "bg-[#0B3D2E] text-white shadow-2xs"
                    : "text-[#718575] hover:text-[#00261B]"
                }`}
              >
                ኢትዮጵያ (ዓ.ም)
              </button>
              <button
                type="button"
                onClick={() => setActiveMode("gregorian")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeMode === "gregorian"
                    ? "bg-[#0B3D2E] text-white shadow-2xs"
                    : "text-[#718575] hover:text-[#00261B]"
                }`}
              >
                Gregorian (G.C.)
              </button>
            </div>

            {/* Language Dropdown */}
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as SupportedCalendarLang)}
              className="text-[11px] font-semibold bg-[#FAF8F3] border border-[#EBE7DD] rounded-xl px-2 py-1 text-[#00261B] outline-none"
            >
              <option value="am">አማርኛ</option>
              <option value="om">Afaan Oromoo</option>
              <option value="ti">ትግርኛ</option>
              <option value="en">English</option>
            </select>
          </div>

          {/* Month / Year Header Navigation */}
          <div className="flex items-center justify-between pb-3 mb-2">
            <button
              type="button"
              onClick={activeMode === "ethiopian" ? prevEthMonth : prevGregMonth}
              className="w-8 h-8 rounded-xl bg-[#FAF8F3] border border-[#EBE7DD] flex items-center justify-center text-[#00261B] hover:bg-[#EAE5D9] transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>

            <div className="text-center">
              {activeMode === "ethiopian" ? (
                <div className="space-y-0.5">
                  <span className="text-sm font-bold text-[#00261B] block">
                    {ETHIOPIAN_MONTHS[viewEthMonth - 1]?.nameAm} ({ETHIOPIAN_MONTHS[viewEthMonth - 1]?.nameEn})
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#146B45]">
                    {viewEthYear} ዓ.ም
                  </span>
                </div>
              ) : (
                <div className="space-y-0.5">
                  <span className="text-sm font-bold text-[#00261B] block">
                    {GREGORIAN_MONTHS[viewGregMonth - 1]?.nameEn}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#146B45]">
                    {viewGregYear} G.C.
                  </span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={activeMode === "ethiopian" ? nextEthMonth : nextGregMonth}
              className="w-8 h-8 rounded-xl bg-[#FAF8F3] border border-[#EBE7DD] flex items-center justify-center text-[#00261B] hover:bg-[#EAE5D9] transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>

          {/* Weekday Column Headers */}
          <div className="grid grid-cols-7 gap-1 text-center pb-2 mb-1 border-b border-[#EAEFEA]">
            {ETHIOPIAN_DAYS.map((day, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono font-bold text-[#718575] uppercase"
              >
                {lang === "en" ? day.nameEn : day.nameAm}
              </span>
            ))}
          </div>

          {/* Calendar Days Matrix */}
          <div className="grid grid-cols-7 gap-1 min-h-[220px]">
            {activeMode === "ethiopian" ? renderEthiopianGrid() : renderGregorianGrid()}
          </div>

          {/* Presets Bar */}
          <div className="flex items-center justify-between gap-1 pt-3 mt-3 border-t border-[#EAEFEA]">
            <button
              type="button"
              onClick={handleSetToday}
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[#FAF8F3] hover:bg-[#EAE5D9] text-[#00261B] border border-[#EBE7DD]"
            >
              ዛሬ (Today)
            </button>
            <button
              type="button"
              onClick={handleSetSeasonStart}
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[#FAF8F3] hover:bg-[#EAE5D9] text-[#0B3D2E] border border-[#EBE7DD]"
            >
              የመኸር መጀመሪያ (Meskerem 1)
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 rounded-lg text-[11px] font-bold bg-[#0B3D2E] text-white hover:bg-[#146B45]"
            >
              እሺ (Done)
            </button>
          </div>

          {/* Bottom Dual Preview Summary */}
          <div className="mt-2.5 pt-2 border-t border-[#EAEFEA] text-[10px] font-mono text-center text-[#718575]">
            የተመረጠ ቀን፡ <strong className="text-[#0B3D2E]">{dualFormatted.dualString}</strong>
          </div>
        </div>
      )}
    </div>
  );
}
