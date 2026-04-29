import FloatingWhatsApp from "@/components/Layout/FloatingWhatsApp";
import Header from "@/components/Layout/Header";
import SiteFooter from "@/components/Layout/SiteFooter";
import ProfilHero from "@/components/Profil/Hero";
import History from "@/components/Profil/History";
import StrukturOrganisasi from "@/components/Profil/StrukturOrganisasi";
import VIsiMisi from "@/components/Profil/VIsiMisi";
import React from "react";

const ProfilPage = () => {
  return (
    <>
      <Header />
      <main>
        <ProfilHero />
        <History />
        <VIsiMisi />
        <StrukturOrganisasi />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
};

export default ProfilPage;
