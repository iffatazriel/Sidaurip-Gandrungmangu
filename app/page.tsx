import ContactSection from "@/components/Layout/ContactSection";
import FloatingWhatsApp from "@/components/Layout/FloatingWhatsApp";
import Header from "@/components/Layout/Header";
import Hero from "@/components/Layout/Hero";
import NewsEvents from "@/components/Layout/NewsEvents";
import Services from "@/components/Layout/Services";
import SiteFooter from "@/components/Layout/SiteFooter";
import StatsDashboard from "@/components/Layout/StatsDashboard";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    absolute: "Desa Sidaurip | Portal Resmi Desa",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://sidaurip.desa.id/#website",
      url: "https://sidaurip.desa.id",
      name: "Desa Sidaurip",
      inLanguage: "id-ID",
      publisher: { "@id": "https://sidaurip.desa.id/#organization" },
    },
    {
      "@type": "GovernmentOrganization",
      "@id": "https://sidaurip.desa.id/#organization",
      name: "Pemerintah Desa Sidaurip",
      url: "https://sidaurip.desa.id",
      logo: "https://sidaurip.desa.id/Logo-Cilacap.png",
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Desa Sidaurip, Cilacap",
      },
    },
  ],
};

const HomePage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <main>
        <Hero />
        <Services />
        <StatsDashboard />
        <NewsEvents />
        <ContactSection />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
};

export default HomePage;
