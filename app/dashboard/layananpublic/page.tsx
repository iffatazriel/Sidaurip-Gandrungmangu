import Header from '@/components/Dashboard/Header'
import LogActivity from '@/components/Dashboard/LayananPublik/LogActivity'
import MainContent from '@/components/Dashboard/LayananPublik/MainContent'
import ServiceConfiguration from '@/components/Dashboard/LayananPublik/ServiceConfiguration'
import Sidebar from '@/components/Dashboard/Sidebar'
import React from 'react'

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
            <MainContent />
            <ServiceConfiguration />
            <LogActivity />    
            </main>
          </div>
        </div>
  )
}

export default LayananPublik
