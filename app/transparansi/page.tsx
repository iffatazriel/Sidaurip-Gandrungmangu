import Hero from "@/components/Transparansi/Hero";
import FloatingWhatsApp from "@/components/Layout/FloatingWhatsApp";
import Header from "@/components/Layout/Header";
import SiteFooter from "@/components/Layout/SiteFooter";
import Allocation from "@/components/Transparansi/Allocation";
import CallToAction from "@/components/Transparansi/CallToAction";
import Summary from "@/components/Transparansi/Summary";
import TransparencyTable from "@/components/Transparansi/TransparencyTable";
import React from "react";

const TransparansiPage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Summary />
        <Allocation />
        <TransparencyTable />
        <CallToAction />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
};

export default TransparansiPage;
