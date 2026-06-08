import CallToAction from "@/components/LayananMandiri/CallToAction";
import Hero from "@/components/LayananMandiri/Hero";
import ServicePortal from "@/components/LayananMandiri/ServicePortal";
import Services from "@/components/LayananMandiri/Services";
import Stats from "@/components/LayananMandiri/Stats";
import FloatingWhatsApp from "@/components/Layout/FloatingWhatsApp";
import Header from "@/components/Layout/Header";
import SiteFooter from "@/components/Layout/SiteFooter";
import { getCurrentUser } from "@/lib/auth/session";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layanan Mandiri",
  description: "Portal layanan mandiri untuk pengajuan administrasi warga Desa Sidaurip.",
};

const LayananPage = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <Header />
      <main>
        <Hero user={user} />
        {user ? <ServicePortal user={user} /> : null}
        <Services />
        <Stats />
        <CallToAction />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
};

export default LayananPage;
