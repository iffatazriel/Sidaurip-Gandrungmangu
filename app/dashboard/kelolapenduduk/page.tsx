import Header from "@/components/Dashboard/Header";
import ContextualInfo from "@/components/Dashboard/KelolaPenduduk/ContextualInfo";
import FiltersArea from "@/components/Dashboard/KelolaPenduduk/FiltersArea";
import ManagementTools from "@/components/Dashboard/KelolaPenduduk/ManagementTools";
import StatisticsHeader from "@/components/Dashboard/KelolaPenduduk/StatisticsHeader";
import ResidentTable from "@/components/Dashboard/KelolaPenduduk/ResidentTable";
import Sidebar from "@/components/Dashboard/Sidebar";

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
            <StatisticsHeader />
            <ManagementTools />
            <FiltersArea />
            <ResidentTable />
            <ContextualInfo />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
