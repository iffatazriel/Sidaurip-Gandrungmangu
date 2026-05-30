import Categories from '@/components/Layanan/Categories'
import Hero from '@/components/Layanan/Hero'
import Tracking from '@/components/Layanan/Tracking'
import FloatingWhatsApp from '@/components/Layout/FloatingWhatsApp'
import Header from '@/components/Layout/Header'
import SiteFooter from '@/components/Layout/SiteFooter'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Layanan Desa Sidaurip',
  description: 'Informasi layanan administrasi dan alur pengajuan untuk warga Desa Sidaurip.',
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'GovernmentService',
  name: 'Layanan Desa Sidaurip',
  serviceType: 'Layanan administrasi desa',
  provider: {
    '@type': 'GovernmentOrganization',
    name: 'Pemerintah Desa Sidaurip',
    url: 'https://sidaurip.desa.id',
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Desa Sidaurip, Cilacap',
  },
  url: 'https://sidaurip.desa.id/layanan',
}

const LayananPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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


