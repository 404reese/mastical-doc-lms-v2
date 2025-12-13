import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseBrowser from "@/components/courses/CourseBrowser";
import Course from "@/lib/models/Course";
import connectToDatabase from "@/lib/db";

export const metadata: Metadata = {
    title: "Courses | Dr Gaurang Gaikwad",
    description: "Browse our comprehensive catalog of medical courses.",
};

async function getCourses() {
    await connectToDatabase();
    // We need to populate instructor to display their name and avatar
    const courses = await Course.find({}).populate("instructor", "name avatar").lean();

    // Serialize complex objects (OIDs, Dates) to pass to client component
    return JSON.parse(JSON.stringify(courses));
}

export default async function CoursesPage() {
    const courses = await getCourses();

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <div className="bg-white">
                <Navbar />
            </div>

            <main className="max-w-[1240px] mx-auto px-6 py-12 md:py-20">
                <CourseBrowser initialCourses={courses} />
            </main>

            <Footer />
        </div>
    );
}
