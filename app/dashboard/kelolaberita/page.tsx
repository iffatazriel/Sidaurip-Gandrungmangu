import Header from '@/components/Dashboard/Header'
import NewsManager from '@/components/Dashboard/KelolaBerita/NewsManager'
import Sidebar from '@/components/Dashboard/Sidebar'

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
          <NewsManager />
        </main>
      </div>
    </div>
  )
}

export default KelolaBerita
