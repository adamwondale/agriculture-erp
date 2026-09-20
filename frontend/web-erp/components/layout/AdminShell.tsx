"use client";

import React, { createContext, useContext, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

import RouteGuard from "@/components/auth/RouteGuard";

interface SidebarContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextType>({
  sidebarOpen: false,
  setSidebarOpen: () => {},
  toggleSidebar: () => {},
  closeSidebar: () => {},
});

export function useSidebar() {
  return useContext(SidebarContext);
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <SidebarContext.Provider
      value={{ sidebarOpen, setSidebarOpen, toggleSidebar, closeSidebar }}
    >
      <div className="min-h-screen bg-[#F7F4EC] text-[#17231D] flex">
        {/* Responsive Sidebar (Persistent on lg+, slide-in drawer on mobile) */}
        <Sidebar />

        {/* Main Administrative Canvas */}
        <div className="pl-0 lg:pl-72 flex-1 min-h-screen flex flex-col w-full min-w-0 transition-all duration-300">
          <Header />
          <main className="px-4 sm:px-6 lg:px-8 pt-5 sm:pt-7 lg:pt-8 pb-16 flex-1 w-full max-w-[1720px] mx-auto min-w-0">
            <RouteGuard>{children}</RouteGuard>
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
