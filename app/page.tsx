import ContactSection from "@/components/Layout/ContactSection";
import FloatingWhatsApp from "@/components/Layout/FloatingWhatsApp";
import Header from "@/components/Layout/Header";
import Hero from "@/components/Layout/Hero";
import NewsEvents from "@/components/Layout/NewsEvents";
import Services from "@/components/Layout/Services";
import SiteFooter from "@/components/Layout/SiteFooter";
import StatsDashboard from "@/components/Layout/StatsDashboard";

const HomePage = () => {
  return (
    <>
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
