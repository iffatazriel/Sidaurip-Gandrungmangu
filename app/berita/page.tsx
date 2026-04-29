import Article from '@/components/Berita/Article'
import Hero from '@/components/Berita/Hero'
import FloatingWhatsApp from '@/components/Layout/FloatingWhatsApp'
import Header from '@/components/Layout/Header'
import SiteFooter from '@/components/Layout/SiteFooter'
import React from 'react'

const BeritaPage = () => {
  return (
        <>
          <Header />
          <main>
           <Hero />
           <Article />
          </main>
          <SiteFooter />
          <FloatingWhatsApp />
        </>
  )
}

export default BeritaPage
