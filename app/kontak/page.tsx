import CallToAction from '@/components/Kontak/CallToAction'
import Contact from '@/components/Kontak/Contact'
import Hero from '@/components/Kontak/Hero'
import FloatingWhatsApp from '@/components/Layout/FloatingWhatsApp'
import Header from '@/components/Layout/Header'
import SiteFooter from '@/components/Layout/SiteFooter'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Kontak Desa Sidaurip',
  description: 'Kontak resmi Pemerintah Desa Sidaurip untuk informasi dan layanan warga.',
}

const LayananPage = () => {
  return (
        <>
          <Header />
          <main>
            <Hero />
            <Contact />
            <CallToAction />
          </main>
          <SiteFooter />
          <FloatingWhatsApp />
        </>
  )
}

export default LayananPage
