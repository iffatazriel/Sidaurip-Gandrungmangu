import Header from '@/components/Dashboard/Header'
import ServiceRequestsManager from '@/components/Dashboard/LayananPublik/ServiceRequestsManager'
import Sidebar from '@/components/Dashboard/Sidebar'

function LayananPublik() {
  return (
        <div className="flex min-h-screen">
          {/* Sidebar kiri */}
          <Sidebar />
    
          {/* Area kanan */}
          <div className="flex flex-col flex-1">
            <Header />
    
            <main className="flex-1 p-6 bg-gray-50">
              {/* isi dashboard */}
            <ServiceRequestsManager />
            </main>
          </div>
        </div>
  )
}

export default LayananPublik
