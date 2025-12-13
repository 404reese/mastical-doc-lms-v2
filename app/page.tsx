import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { HeroSection } from "@/components/home/HeroSection"
import { TrustSection } from "@/components/home/TrustSection"
import { FeaturesSection } from "@/components/home/FeaturesSection"
import { ExploreCoursesSection } from "@/components/home/ExploreCoursesSection"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <TrustSection />
        <FeaturesSection />
        <ExploreCoursesSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
