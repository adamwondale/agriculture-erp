import React from "react";
import AdminShell from "@/components/layout/AdminShell";

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
