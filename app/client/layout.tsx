"use client";

import PageTrasition from "@/components/layout-pages";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-linear-to-bl from-primary-300 to-primary-200">
      <PageTrasition
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {children}
      </PageTrasition>
    </div>
  );
}
