"use client";

import React from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const SCORE_KPIS: KpiMetric[] = [
  {
    title: "Eligible for Auto-Renewal",
    value: "38 Partners",
    change: "Score >= 80%",
    changeType: "positive",
    subtext: "Delivery compliance >= 80% & recovery >= 95%",
    icon: "autorenew",
  },
  {
    title: "Termination Warning",
    value: "1 Partner",
    change: "Deficit > 25%",
    changeType: "danger",
    subtext: "Unverified delivery deficit triggers review",
    icon: "warning",
  },
];

export default function PartnerScorecardsPage() {
  return (
    <DomainPageShell
      badge="Performance Evaluation & Renewals"
      badgeColor="#3F2E56"
      title="Monthly Partner Scorecards & Renewal Recommendations"
      subtitle="Automated evaluation across 5 operational KPIs: volume delivery rate, quality compliance, input loan recovery rate, agronomy protocol adherence, and farmer retention."
      kpis={SCORE_KPIS}
      actions={[
        { label: "Publish Seasonal Scorecards", icon: "publish", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">Seasonal Partner Performance Scorecards</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAEFEA] text-[10px] font-mono uppercase text-[#718575]">
                <th className="pb-3 font-bold">Partner Organization</th>
                <th className="pb-3 font-bold">Delivery Rate %</th>
                <th className="pb-3 font-bold">Grade 1 Compliance</th>
                <th className="pb-3 font-bold">Loan Recovery %</th>
                <th className="pb-3 font-bold">Farmer Retention</th>
                <th className="pb-3 font-bold">Overall Score</th>
                <th className="pb-3 font-bold">System Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEFEA]">
              {[
                { name: "Oromia Coffee Cooperative Union", del: "98.2%", q: "96.4%", rec: "99.1%", ret: "98.0%", score: "98 / 100", recmd: "Auto-Recommend Renewal" },
                { name: "Arsi Robe Grain Farmers Union", del: "94.0%", q: "91.2%", rec: "96.4%", ret: "92.0%", score: "93 / 100", recmd: "Auto-Recommend Renewal" },
                { name: "West Gojjam Agricultural Union", del: "88.5%", q: "89.0%", rec: "95.2%", ret: "89.0%", score: "90 / 100", recmd: "Auto-Recommend Renewal" },
                { name: "Bale Zone Grain Aggregators Union", del: "68.2%", q: "74.0%", rec: "82.4%", ret: "71.0%", score: "71 / 100", recmd: "Performance Warning (Deficit > 25%)" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-3.5 font-bold text-[#00261B]">{row.name}</td>
                  <td className="py-3.5 font-mono font-bold text-[#00261B]">{row.del}</td>
                  <td className="py-3.5 font-mono text-[#00261B]">{row.q}</td>
                  <td className="py-3.5 font-mono text-[#00261B]">{row.rec}</td>
                  <td className="py-3.5 font-mono text-[#00261B]">{row.ret}</td>
                  <td className="py-3.5 font-mono font-bold text-[#0F5132]">{row.score}</td>
                  <td className="py-3.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        row.recmd.includes("Renewal")
                          ? "bg-[#D1E7DD] text-[#0F5132]"
                          : "bg-[#FCE4E4] text-[#C94B4B]"
                      }`}
                    >
                      {row.recmd}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DomainPageShell>
  );
}
