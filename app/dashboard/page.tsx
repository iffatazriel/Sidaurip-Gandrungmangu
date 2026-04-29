import Header from "@/components/Dashboard/Header";
import Sidebar from "@/components/Dashboard/Sidebar";
import SummaryCards from "@/components/Dashboard/SummaryCards";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar kiri */}
      <Sidebar />

      {/* Area kanan */}
      <div className="flex flex-col flex-1">
        <Header />

        <main className="flex-1 p-6 bg-gray-50">
          {/* isi dashboard */}
          <SummaryCards />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
