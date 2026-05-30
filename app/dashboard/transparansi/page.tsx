import Header from "@/components/Dashboard/Header";
import TransparencyManager from "@/components/Dashboard/KelolaTransparansi/TransparencyManager";
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
          <TransparencyManager />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
