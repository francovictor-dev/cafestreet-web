"use client";

import PageTrasition from "@/components/layout-pages";
import SideBar from "./side-bar";
import TopBar from "./top-bar";

const DashboardAdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full">
      <TopBar />

      <div className="flex w-full gap-6 max-sm:gap-0">
        <div className="flex-none">
          <SideBar />
        </div>
        <PageTrasition
          style={{ width: "100%" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <div className="w-full">{children}</div>
        </PageTrasition>
      </div>
    </div>
  );
};

export default DashboardAdminLayout;
