import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyTrustUs from "@/components/WhyTrustUs";
import Features from "@/components/Features";
import CourseFilters from "@/components/CourseFilters";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen font-sans">
      <Navbar />
      <Hero />
      <WhyTrustUs />
      <Features />
      <CourseFilters />
      <Testimonials />
      <Footer />
    </main>
  );
}
