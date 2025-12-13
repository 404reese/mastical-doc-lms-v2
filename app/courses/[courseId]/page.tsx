import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import connectToDatabase from "@/lib/db";
import Course from "@/lib/models/Course";
import Module from "@/lib/models/Module";
import Video from "@/lib/models/Video";
import Instructor from "@/lib/models/Instructor";

// Components
import Breadcrumbs from "@/components/courses/Breadcrumbs";
import CourseHero from "@/components/courses/CourseHero";
import CourseSidebar from "@/components/courses/CourseSidebar";
import Requirements from "@/components/courses/Requirements";
import CourseContent from "@/components/courses/CourseContent";
import InstructorSection from "@/components/courses/InstructorSection";

const _models = { Course, Module, Video, Instructor };

async function getCourse(id: string) {
    try {
        await connectToDatabase();
        const course = await Course.findById(id)
            .populate("instructor")
            .populate({
                path: "modules",
                populate: { path: "videos", model: "Video" }
            })
            .lean();
        if (!course) return null;
        return JSON.parse(JSON.stringify(course));
    } catch (error) {
        return null;
    }
}

export default async function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
    const { courseId } = await params;
    const course = await getCourse(courseId);

    if (!course) {
        notFound();
    }

    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Courses", href: "/courses" },
        { label: course.category || "Surgery", href: "/courses" },
    ];

    const originalPrice = Math.round(course.price * 1.5); // 33% discount approx

    return (
        <div className="font-sans text-gray-600 bg-white">
            <Navbar />

            <div className="max-w-[1240px] mx-auto px-6">
                <Breadcrumbs items={breadcrumbs} />

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 mb-20 relative">
                    {/* Left Column: Main Content */}
                    <main>
                        <CourseHero
                            title={course.title}
                            description={course.shortDescription || course.description.substring(0, 150) + "..."}
                            instructorName={course.instructor?.name || "Dr. Sarah Johnson"}
                            lastUpdated={course.updatedAt}
                            language={course.language || "English"}
                        />

                        {/* Description Section */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                            <div className="prose prose-slate max-w-none text-gray-700 leading-relaxed space-y-4">
                                {course.description.split('\n').map((paragraph: string, idx: number) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>
                        </section>

                        <Requirements requirements={course.requirements || ["No prior experience required", "A willingness to learn", "Access to a computer"]} />

                        <CourseContent modules={course.modules || []} />

                        {course.instructor && (
                            <InstructorSection instructor={course.instructor} />
                        )}
                    </main>

                    {/* Right Column: Sidebar */}
                    <aside className="relative">
                        <CourseSidebar
                            courseId={courseId}
                            price={course.price || 49}
                            originalPrice={course.originalPrice || 99}
                            previewImage={course.thumbnail}
                        />
                    </aside>
                </div>
            </div>

            <Footer />
        </div>
    );
}
