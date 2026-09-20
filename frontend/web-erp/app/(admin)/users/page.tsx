"use client";

import React, { useState } from "react";
import Link from "next/link";

interface UserItem {
  id: string;
  name: string;
  email: string;
  organization: string;
  branch: string;
  role: string;
  status: "Active" | "Pending" | "Suspended" | "Inactive";
  lastLogin: string;
}

const INITIAL_USERS: UserItem[] = [
  {
    id: "usr-01",
    name: "Abebe Tesfaye",
    email: "abebe.tesfaye@zorisis.com",
    organization: "Z•ORISIS Holding",
    branch: "Oromia HQ",
    role: "System Admin",
    status: "Active",
    lastLogin: "Just now",
  },
  {
    id: "usr-02",
    name: "Selamawit Bekele",
    email: "selamawit.bekele@zorisis.com",
    organization: "East Africa Region",
    branch: "Ada'a Cluster",
    role: "Farm Manager",
    status: "Active",
    lastLogin: "12m ago",
  },
  {
    id: "usr-03",
    name: "Kinde Gudeta",
    email: "kinde.gudeta@zorisis.com",
    organization: "Ethiopia Operations",
    branch: "Bishoftu Hub",
    role: "Finance Officer",
    status: "Active",
    lastLogin: "2h ago",
  },
  {
    id: "usr-04",
    name: "Yonas Teka",
    email: "yonas.teka@zorisis.com",
    organization: "Z•ORISIS Holding",
    branch: "Addis Ababa Central",
    role: "Logistics Officer",
    status: "Pending",
    lastLogin: "Never",
  },
  {
    id: "usr-05",
    name: "Mahlet Hale",
    email: "mahlet.hale@zorisis.com",
    organization: "East Africa Region",
    branch: "Oromia HQ",
    role: "HR Officer",
    status: "Active",
    lastLogin: "Yesterday",
  },
  {
    id: "usr-06",
    name: "Daniel Kebede",
    email: "daniel.kebede@zorisis.com",
    organization: "East Africa Region",
    branch: "Field Station #14",
    role: "Field Officer",
    status: "Suspended",
    lastLogin: "3 days ago",
  },
  {
    id: "usr-07",
    name: "Tigist Assefa",
    email: "tigist.assefa@zorisis.com",
    organization: "Ethiopia Operations",
    branch: "Amhara Hub",
    role: "Agronomist",
    status: "Active",
    lastLogin: "4h ago",
  },
];

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserItem[]>(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "All" || u.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: UserItem["status"]) => {
    switch (status) {
      case "Active":
        return "bg-[#E8F1EA] text-[#146B45]";
      case "Pending":
        return "bg-[#FFF3D6] text-[#D79A19]";
      case "Suspended":
        return "bg-[#FDE8E8] text-[#C94B4B]";
      default:
        return "bg-[#DDE4DE] text-[#66736C]";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header Bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-2 border-b border-[#DDE4DE]/60">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-[#00261B]" style={{ letterSpacing: "-0.02em" }}>
              User Management
            </h1>
            <span className="px-3 py-0.5 rounded-full bg-[#E8F1EA] text-[#146B45] text-xs font-semibold">
              4,820 Total Users
            </span>
          </div>
          <p className="text-sm text-[#66736C] mt-1">
            Manage enterprise administrative credentials, assigned roles, security status, and account authorizations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => alert("Exporting user directory CSV...")}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#DDE4DE] text-[#17231D] hover:bg-[#F7F4EC] text-xs font-semibold flex items-center gap-2 shadow-xs active:scale-[0.97] transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-[#66736C]">file_download</span>
            <span>Export CSV</span>
          </button>
          <Link
            href="/users/create"
            className="px-4 py-2 rounded-xl bg-[#0B3D2E] text-white hover:bg-[#062A20] text-xs font-semibold flex items-center gap-2 shadow-sm active:scale-[0.97] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>+ Add User</span>
          </Link>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="p-4 rounded-2xl bg-white border border-[#DDE4DE] shadow-subtle flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#66736C] text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or role..."
            className="w-full h-10 pl-10 pr-4 bg-[#F7F4EC] rounded-xl text-xs text-[#17231D] placeholder:text-[#66736C] border border-transparent focus:border-[#146B45] focus:bg-white focus:outline-none transition-all"
          />
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {["All", "Active", "Pending", "Suspended"].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-[0.97] ${
                selectedStatus === status
                  ? "bg-[#0B3D2E] text-white shadow-xs"
                  : "bg-[#F7F4EC] text-[#66736C] hover:bg-[#E8F1EA] hover:text-[#00261B]"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Dense Enterprise Data Table */}
      <div className="rounded-2xl bg-white border border-[#DDE4DE] shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F7F4EC] border-b border-[#DDE4DE] text-[#66736C] uppercase font-bold text-[10px] tracking-wider">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Organization</th>
                <th className="py-3 px-4">Branch Node</th>
                <th className="py-3 px-4">Assigned Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Login</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE4DE]/60">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-xs text-[#66736C]">
                    No users matching criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#F7F4EC]/60 transition-colors">
                    {/* User Profile Cell */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#E8F1EA] text-[#0B3D2E] font-bold text-xs flex items-center justify-center shrink-0">
                          {user.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <span className="font-semibold text-[#17231D] block">{user.name}</span>
                          <span className="text-[11px] text-[#66736C] font-mono">{user.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Organization Cell */}
                    <td className="py-3 px-4 text-[#17231D] font-medium">{user.organization}</td>

                    {/* Branch Cell */}
                    <td className="py-3 px-4 text-[#66736C]">{user.branch}</td>

                    {/* Role Cell */}
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-[#F7F4EC] text-[#0B3D2E] border border-[#DDE4DE] font-semibold text-[11px]">
                        {user.role}
                      </span>
                    </td>

                    {/* Status Pill */}
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${getStatusBadge(user.status)}`}>
                        {user.status}
                      </span>
                    </td>

                    {/* Last Login Cell */}
                    <td className="py-3 px-4 text-[#66736C] font-mono text-[11px]">{user.lastLogin}</td>

                    {/* Action Controls */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <Link
                          href={`/permissions/overrides?user=${encodeURIComponent(user.name)}`}
                          title="Manage Permission Overrides"
                          className="p-1 rounded-lg hover:bg-white text-[#66736C] hover:text-[#0B3D2E] transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">policy</span>
                        </Link>
                        <button
                          onClick={() => alert(`Viewing details for ${user.name}`)}
                          className="px-2 py-1 rounded-lg bg-[#F7F4EC] hover:bg-[#E8F1EA] text-[#0B3D2E] font-semibold text-[11px] transition-colors active:scale-95"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer Bar */}
        <div className="p-3 bg-[#F7F4EC] border-t border-[#DDE4DE] flex items-center justify-between text-xs text-[#66736C]">
          <span>Showing 1 to {filteredUsers.length} of 4,820 users</span>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 rounded-lg bg-white border border-[#DDE4DE] disabled:opacity-50 text-xs">
              Previous
            </button>
            <button className="px-2.5 py-1 rounded-lg bg-[#0B3D2E] text-white text-xs font-bold">1</button>
            <button className="px-2.5 py-1 rounded-lg bg-white border border-[#DDE4DE] text-xs">2</button>
            <button className="px-2.5 py-1 rounded-lg bg-white border border-[#DDE4DE] text-xs">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
