import React from "react";
import AdminShell from "@/components/layout/AdminShell";

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
