import CallToAction from "@/components/LayananMandiri/CallToAction"
import Hero from "@/components/LayananMandiri/Hero"
import Services from "@/components/LayananMandiri/Services"
import Stats from "@/components/LayananMandiri/Stats"
import FloatingWhatsApp from "@/components/Layout/FloatingWhatsApp"
import Header from "@/components/Layout/Header"
import SiteFooter from "@/components/Layout/SiteFooter"

const LayananPage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Stats />
        <CallToAction />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  )
}

export default LayananPage