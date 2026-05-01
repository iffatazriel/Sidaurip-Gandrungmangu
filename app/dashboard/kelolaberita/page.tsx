import Header from '@/components/Dashboard/Header'
import HeaderSection from '@/components/Dashboard/KelolaBerita/HeaderSection'
import TableControl from '@/components/Dashboard/KelolaBerita/TableControl'
import Sidebar from '@/components/Dashboard/Sidebar'
import React from 'react'

function KelolaBerita() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar kiri */}
      <Sidebar />

      {/* Area kanan */}
      <div className="flex flex-col flex-1">
        <Header />

        <main className="flex-1 p-6 bg-gray-50">
          {/* isi dashboard */}
          <HeaderSection />
          <TableControl />          
        </main>
      </div>
    </div>
  )
}

export default KelolaBerita
