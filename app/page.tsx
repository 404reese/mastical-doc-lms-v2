import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CourseFilters from "@/components/CourseFilters";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

import { getSession } from "@/lib/session";
import connectToDatabase from "@/lib/db";
import Course from "@/lib/models/Course";
import Instructor from "@/lib/models/Instructor";

// Register models
const _models = { Course, Instructor };

async function getCourses() {
  try {
    await connectToDatabase();
    const courses = await Course.find({})
      .select('title description priceINR priceUSD level category language duration enrollments previewImageLink rating slug')
      .populate("instructor", "name avatar")
      .lean();
    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

export default async function Home() {
  const session = await getSession();
  const courses = await getCourses();

  return (
    <main className="min-h-screen font-sans">
      <Navbar isLoggedIn={!!session} />
      <Hero />
      <Features />
      <CourseFilters courses={courses} />
      <Testimonials />
      <Footer />
    </main>
  );
}
