"use client";

import DashboardAdminLayout from "@/components/layouts/dashboard-admin";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row p-6">
      <DashboardAdminLayout>{children}</DashboardAdminLayout>
    </div>
  );
}
