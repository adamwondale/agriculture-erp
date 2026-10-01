"use client";

import React, { useState } from "react";
import DomainPageShell, { KpiMetric } from "@/components/domain/DomainPageShell";

const TEMPLATE_KPIS: KpiMetric[] = [
  {
    title: "Multilingual Templates",
    value: "4 Languages",
    change: "Amharic Default",
    changeType: "positive",
    subtext: "Amharic, Afaan Oromoo, Tigrinya, English",
    icon: "translate",
  },
  {
    title: "Dynamic Merge Tags",
    value: "18 System Tags",
    change: "No Code Changes",
    changeType: "positive",
    subtext: "Admins can edit SMS and email text dynamically",
    icon: "code",
  },
];

export default function TemplatesPage() {
  const [selectedLang, setSelectedLang] = useState("am");

  return (
    <DomainPageShell
      badge="Notification Templates & Dynamic Merge Tags"
      badgeColor="#1B3B6F"
      title="Multilingual SMS & Email Notification Template Manager"
      subtitle="Admin-editable SMS and email notification templates with dynamic merge tags (e.g. {{farmer_name}}, {{net_weight}}, {{payout_amount}})."
      kpis={TEMPLATE_KPIS}
      actions={[
        { label: "New Notification Template", icon: "add", variant: "primary" },
      ]}
    >
      <div className="bg-white rounded-3xl border border-[#DDE4DE] p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#00261B]">System Notification Templates</h2>

        <div className="space-y-4">
          {[
            {
              id: "TMP-SMS-01",
              name: "Weighbridge Harvest Intake Confirmation",
              trigger: "Weighbridge GRN Issuance",
              tags: "{{farmer_name}}, {{net_weight}}, {{crop_commodity}}, {{moisture}}, {{grn_number}}",
              preview: "ውድ {{farmer_name}}፣ ዛሬ በማዕከላችን {{net_weight}} {{crop_commodity}} ተረክበናል። እርጥበት፡ {{moisture}}። የደረሰኝ ቁጥር፡ {{grn_number}}። ዞሪሲስ ግብርና።",
            },
            {
              id: "TMP-SMS-02",
              name: "Farmer Settlement Payout Notification",
              trigger: "Telebirr Payout Execution",
              tags: "{{farmer_name}}, {{net_payout}}, {{phone_number}}, {{season}}",
              preview: "ውድ {{farmer_name}}፣ የ{{season}} መኸር ሂሳብ {{net_payout}} ብር በቴሌብር ({{phone_number}}) ገቢ ተደርጓል። የተጣራ ክፍያ ነው። ዝርዝሩን በ *888# ይመልከቱ።",
            },
          ].map((tmp, i) => (
            <div key={i} className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DD] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-[#1B3B6F]">{tmp.id} • {tmp.trigger}</span>
                <span className="text-[10px] font-mono text-[#0F5132] font-semibold bg-[#D1E7DD] px-2 py-0.5 rounded-md">
                  Active
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#00261B]">{tmp.name}</h3>
              <p className="text-[#0B3D2E] font-serif p-3 bg-white rounded-xl border border-[#DDE4DE]">
                {tmp.preview}
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-mono text-[#718575]">Available Tags: {tmp.tags}</span>
                <button className="text-xs font-bold text-[#146B45] hover:text-[#0B3D2E]">
                  Edit Template &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DomainPageShell>
  );
}
