"use client";

import React, { useState } from "react";

interface TreeNode {
  id: string;
  name: string;
  type: "Holding" | "Region" | "Country" | "Branch" | "Station";
  code: string;
  users: number;
  stations?: number;
  country: string;
  manager: string;
  status: "Active" | "Pending" | "Operational";
  children?: TreeNode[];
}

const TREE_DATA: TreeNode = {
  id: "node-root",
  name: "Z•ORISIS Holding Enterprise",
  type: "Holding",
  code: "HOLD-001",
  users: 4820,
  country: "Pan-African Operations",
  manager: "Abebe Tesfaye (System Admin)",
  status: "Active",
  children: [
    {
      id: "node-ea",
      name: "East Africa Region",
      type: "Region",
      code: "REG-EA-01",
      users: 3410,
      country: "East Africa",
      manager: "Kinde Gudeta",
      status: "Active",
      children: [
        {
          id: "node-eth",
          name: "Ethiopia Operations",
          type: "Country",
          code: "CTRY-ET",
          users: 3120,
          country: "Ethiopia",
          manager: "Selamawit Bekele",
          status: "Active",
          children: [
            {
              id: "node-oro",
              name: "Oromia Regional Hub",
              type: "Branch",
              code: "BR-ORO-HQ",
              users: 1840,
              stations: 42,
              country: "Ethiopia",
              manager: "Abebe Tesfaye",
              status: "Operational",
              children: [
                {
                  id: "node-ada",
                  name: "Ada'a Woreda Cluster",
                  type: "Branch",
                  code: "CL-ADA-09",
                  users: 420,
                  stations: 12,
                  country: "Ethiopia",
                  manager: "Daniel Kebede",
                  status: "Operational",
                  children: [
                    {
                      id: "node-st14",
                      name: "Field Station #14 (Bishoftu Hub)",
                      type: "Station",
                      code: "STN-BIS-14",
                      users: 64,
                      country: "Ethiopia",
                      manager: "Mahlet Hale",
                      status: "Operational",
                    },
                    {
                      id: "node-st15",
                      name: "Field Station #15 (Mojo South)",
                      type: "Station",
                      code: "STN-MOJ-15",
                      users: 48,
                      country: "Ethiopia",
                      manager: "Yonas Teka",
                      status: "Operational",
                    },
                  ],
                },
              ],
            },
            {
              id: "node-amh",
              name: "Amhara Regional Hub",
              type: "Branch",
              code: "BR-AMH-HQ",
              users: 1280,
              stations: 32,
              country: "Ethiopia",
              manager: "Mekonnen Desta",
              status: "Operational",
            },
          ],
        },
        {
          id: "node-ken",
          name: "Kenya Operations",
          type: "Country",
          code: "CTRY-KE",
          users: 290,
          country: "Kenya",
          manager: "James Mwangi",
          status: "Pending",
        },
      ],
    },
    {
      id: "node-wa",
      name: "West Africa Region",
      type: "Region",
      code: "REG-WA-02",
      users: 1410,
      country: "West Africa",
      manager: "Kofi Mensah",
      status: "Active",
    },
  ],
};

export default function OrganizationPage() {
  const [selectedNode, setSelectedNode] = useState<TreeNode>(TREE_DATA.children![0].children![0].children![0]); // Oromia Hub default
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    "node-root": true,
    "node-ea": true,
    "node-eth": true,
    "node-oro": true,
    "node-ada": true,
  });

  const toggleExpand = (id: string) => {
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderTree = (node: TreeNode, depth = 0) => {
    const isExpanded = expandedNodes[node.id];
    const isSelected = selectedNode.id === node.id;
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="select-none">
        <div
          onClick={() => setSelectedNode(node)}
          style={{ paddingLeft: `${depth * 20 + 8}px` }}
          className={`py-2 pr-3 rounded-xl flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] ${
            isSelected
              ? "bg-[#E8F1EA] text-[#0B3D2E] font-semibold border border-[#146B45]/20 shadow-xs"
              : "hover:bg-[#F7F4EC] text-[#17231D]"
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            {hasChildren ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(node.id);
                }}
                className="w-5 h-5 flex items-center justify-center text-[#66736C] hover:text-[#0B3D2E]"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {isExpanded ? "arrow_drop_down" : "arrow_right"}
                </span>
              </button>
            ) : (
              <span className="w-5 h-5 flex items-center justify-center text-[#DDE4DE]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A8C3A0]"></span>
              </span>
            )}

            <span className="material-symbols-outlined text-[18px] text-[#146B45]">
              {node.type === "Holding"
                ? "domain"
                : node.type === "Region"
                ? "public"
                : node.type === "Branch"
                ? "corporate_fare"
                : "yard"}
            </span>

            <span className="text-xs truncate">{node.name}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-mono text-[#66736C] bg-white px-2 py-0.5 rounded border border-[#DDE4DE]">
              {node.code}
            </span>
            <span className="text-[11px] font-medium text-[#146B45]">
              {node.users.toLocaleString()} users
            </span>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="border-l border-[#DDE4DE] ml-4 mt-0.5 space-y-0.5">
            {node.children!.map((child) => renderTree(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header & Command Bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-2 border-b border-[#DDE4DE]/60">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-[#00261B]" style={{ letterSpacing: "-0.02em" }}>
              Organization Hierarchy
            </h1>
            <span className="px-3 py-0.5 rounded-full bg-[#E8F1EA] text-[#146B45] text-xs font-semibold">
              Holding Matrix
            </span>
          </div>
          <p className="text-sm text-[#66736C] mt-1">
            Manage enterprise holding entities, regional operations, branch nodes, and agricultural field clusters.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => alert("Add Branch modal triggered")}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#DDE4DE] text-[#0B3D2E] hover:bg-[#E8F1EA] text-xs font-semibold flex items-center gap-2 shadow-xs active:scale-[0.97] transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-[#146B45]">add_circle</span>
            <span>+ Add Branch</span>
          </button>
          <button
            onClick={() => alert("Add Organization modal triggered")}
            className="px-4 py-2 rounded-xl bg-[#0B3D2E] text-white hover:bg-[#062A20] text-xs font-semibold flex items-center gap-2 shadow-sm active:scale-[0.97] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">domain_add</span>
            <span>+ Add Organization</span>
          </button>
        </div>
      </div>

      {/* Operational Stats Pill Bar */}
      <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-[#DDE4DE] shadow-subtle flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 text-xs text-[#66736C]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#146B45]"></span>
          <span className="font-bold text-[#17231D]">5</span>
          <span>African Regions</span>
        </div>
        <span className="hidden sm:inline text-[#DDE4DE]">•</span>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#17231D]">38</span>
          <span>Branches</span>
        </div>
        <span className="hidden sm:inline text-[#DDE4DE]">•</span>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#17231D]">142</span>
          <span>Field Stations</span>
        </div>
        <span className="hidden sm:inline text-[#DDE4DE]">•</span>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#17231D]">620</span>
          <span>Cooperatives</span>
        </div>
        <span className="hidden sm:inline text-[#DDE4DE]">•</span>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#146B45]">6,480</span>
          <span>Active Users in Network</span>
        </div>
      </div>

      {/* Split Master / Detail Inspector View */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left: Organization Tree Canvas (7 Cols) */}
        <section className="xl:col-span-7 rounded-2xl bg-white border border-[#DDE4DE] shadow-subtle p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDE4DE]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#146B45]">account_tree</span>
              <h2 className="text-sm font-bold text-[#00261B]">Enterprise Entity Tree</h2>
            </div>
            <span className="text-[11px] text-[#66736C]">Click any node to inspect details</span>
          </div>

          <div className="space-y-1">
            {renderTree(TREE_DATA)}
          </div>
        </section>

        {/* Right: Selected Node Detail Inspector Panel (5 Cols) */}
        <aside className="xl:col-span-5 rounded-2xl bg-white border border-[#DDE4DE] shadow-subtle p-5 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDE4DE]">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#66736C] block">Node Inspector</span>
              <h3 className="text-base font-bold text-[#00261B]">{selectedNode.name}</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#E8F1EA] text-[#146B45] text-xs font-semibold">
              {selectedNode.status}
            </span>
          </div>

          {/* Node Metadata Grid */}
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-[#F7F4EC] flex items-center justify-between">
              <span className="text-[#66736C]">Unique Code</span>
              <span className="font-mono font-bold text-[#00261B]">{selectedNode.code}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#F7F4EC] flex items-center justify-between">
              <span className="text-[#66736C]">Entity Level</span>
              <span className="font-bold text-[#00261B]">{selectedNode.type}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#F7F4EC] flex items-center justify-between">
              <span className="text-[#66736C]">Country / Jurisdiction</span>
              <span className="font-semibold text-[#17231D]">{selectedNode.country}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#F7F4EC] flex items-center justify-between">
              <span className="text-[#66736C]">Assigned Manager</span>
              <span className="font-semibold text-[#146B45]">{selectedNode.manager}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#F7F4EC] flex items-center justify-between">
              <span className="text-[#66736C]">Active Provisioned Users</span>
              <span className="font-mono font-bold text-[#00261B]">{selectedNode.users.toLocaleString()}</span>
            </div>

            {selectedNode.stations && (
              <div className="p-3 rounded-xl bg-[#F7F4EC] flex items-center justify-between">
                <span className="text-[#66736C]">Connected Field Stations</span>
                <span className="font-bold text-[#00261B]">{selectedNode.stations} Units</span>
              </div>
            )}
          </div>

          {/* Inspector Action Buttons */}
          <div className="pt-2 space-y-2">
            <button
              onClick={() => alert(`Editing configuration for ${selectedNode.name}`)}
              className="w-full py-2.5 rounded-xl bg-[#0B3D2E] hover:bg-[#062A20] text-white text-xs font-semibold active:scale-[0.98] transition-all shadow-xs"
            >
              Edit Node Properties
            </button>
            <button
              onClick={() => alert(`Creating child branch under ${selectedNode.name}`)}
              className="w-full py-2 rounded-xl bg-white border border-[#DDE4DE] text-[#00261B] hover:bg-[#F7F4EC] text-xs font-semibold active:scale-[0.98] transition-all"
            >
              + Add Sub-Branch / Station
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
