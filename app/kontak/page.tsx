import CallToAction from '@/components/Kontak/CallToAction'
import Contact from '@/components/Kontak/Contact'
import Hero from '@/components/Kontak/Hero'
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
            <Contact />
            <CallToAction />
          </main>
          <SiteFooter />
          <FloatingWhatsApp />
        </>
  )
}

export default LayananPage
