import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StructuredData } from "@/components/structured-data";
// import { ContactSection } from "@/sections/contact-section";
// import { GallerySection } from "@/sections/gallery-section";
import { HeroSection } from "@/sections/hero-section";
import { ServicesSection } from "@/sections/services-section";
// import { StatisticsSection } from "@/sections/statistics-section";
import { ThematicMapSection } from "@/sections/thematic-map-section";
import { WelcomeSection } from "@/sections/welcome-section";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <StructuredData />
      <Navbar />
      <main>
        <HeroSection />
        <WelcomeSection />
        {/* <StatisticsSection /> */}
        <ThematicMapSection />
        <ServicesSection />
        {/* <GallerySection /> */}
        {/* <ContactSection /> */}
      </main>
      <Footer />
    </>
  );
}
