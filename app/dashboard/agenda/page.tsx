import Header from "@/components/Dashboard/Header";
import AgendaManager from "@/components/Dashboard/KelolaAgenda/AgendaManager";
import Sidebar from "@/components/Dashboard/Sidebar";

export default function KelolaAgenda() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 bg-gray-50 p-6">
          <AgendaManager />
        </main>
      </div>
    </div>
  );
}
