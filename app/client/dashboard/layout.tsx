"use client";

import DashboardClientLayout from "@/components/layouts/dashboard-client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row">
      <DashboardClientLayout>
        <div className="min-h-screen bg-white">{children}</div>
      </DashboardClientLayout>
    </div>
  );
}
