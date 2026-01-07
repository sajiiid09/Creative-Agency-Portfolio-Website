import Hero from "@/components/home/Hero";
import HeroTextReveal from "@/components/home/HeroTextReveal";
import ImageMarquee from "@/components/home/ImageMarquee";
import FeaturedWorks from "@/components/home/FeaturedWorks";
import Navbar from "@/components/home/Navbar";
import ServicesList from "@/components/home/ServicesList";
import Metrics from "@/components/home/Metrics";
import BrandLogos from "@/components/home/BrandLogos";
import ImageGridCTA from "@/components/home/ImageGridCTA";
import Footer from "@/components/home/Footer";
import ServicesList2 from "@/components/home/ServicesList2";
import HeroCTA from "@/components/home/HeroCTA";
import PulseOverview from "@/components/home/PulseOverview";

export default function Home() {
  return (
    <main className="relative w-full bg-white"> 
      <Navbar />
      <Hero />
      <HeroTextReveal />
      <ImageMarquee />
      <HeroCTA />
      <BrandLogos />
      {/* <FeaturedWorks /> */}
      <ServicesList2 />
      <PulseOverview />
      <ServicesList />
      <Metrics />
      
      <ImageGridCTA />
      <Footer />
    </main>
  );
}
