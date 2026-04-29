import Categories from '@/components/Layanan/Categories'
import Hero from '@/components/Layanan/Hero'
import Tracking from '@/components/Layanan/Tracking'
import FloatingWhatsApp from '@/components/Layout/FloatingWhatsApp'
import Header from '@/components/Layout/Header'
import SiteFooter from '@/components/Layout/SiteFooter'
import React from 'react'

const LayananPage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Categories />
        <Tracking />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  )
}

export default LayananPage


