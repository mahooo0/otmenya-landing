import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeatureScroll from "@/components/FeatureScroll";
import FeatureHighlight from "@/components/FeatureHighlight";
import BentoGrid from "@/components/BentoGrid";
import Benefits from "@/components/Benefits";
import FeaturesGrid from "@/components/FeaturesGrid";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { MockupThemeProvider, MockupThemeToggle } from "@/components/MockupThemeContext";
import { LaunchProvider } from "@/components/LaunchState";
import GlobalBookingDialog from "@/components/GlobalBookingDialog";

export default function Home() {
  return (
    <LaunchProvider>
      <MockupThemeProvider>
        <StructuredData />
        <main className="relative min-h-screen">
          <Header />
          <article>
            <Hero />
            <FeatureScroll />
            <FeatureHighlight />
            <BentoGrid />
            <Benefits />
            <FeaturesGrid />
            <Testimonials />
            <Pricing />
            <FAQ />
            <CTA />
          </article>
          <Footer />
          <MockupThemeToggle />
          <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-20 z-40" style={{ background: "linear-gradient(to top, white, transparent)" }} />
        </main>
        <GlobalBookingDialog />
      </MockupThemeProvider>
    </LaunchProvider>
  );
}
