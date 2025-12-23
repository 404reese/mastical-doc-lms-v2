import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyTrustUs from "@/components/WhyTrustUs";
import Features from "@/components/Features";
import CourseFilters from "@/components/CourseFilters";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

import { getSession } from "@/lib/session";

export default async function Home() {
  const session = await getSession();

  return (
    <main className="min-h-screen font-sans">
      <Navbar isLoggedIn={!!session} />
      <Hero />
      <WhyTrustUs />
      <Features />
      <CourseFilters />
      <Testimonials />
      <Footer />
    </main>
  );
}
