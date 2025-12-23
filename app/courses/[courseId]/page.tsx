import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import connectToDatabase from "@/lib/db";
import Course from "@/lib/models/Course";
import Module from "@/lib/models/Module";
import Video from "@/lib/models/Video";
import Instructor from "@/lib/models/Instructor";
import { getSession } from "@/lib/session";
import User from "@/lib/models/User";

// Components
import Breadcrumbs from "@/components/courses/Breadcrumbs";
import CourseHero from "@/components/courses/CourseHero";
import CourseSidebar from "@/components/courses/CourseSidebar";
import Requirements from "@/components/courses/Requirements";
import CourseContent from "@/components/courses/CourseContent";
import InstructorsPopup from "@/components/courses/InstructorsPopup";

const _models = { Course, Module, Video, Instructor };

async function getCourse(id: string) {
    try {
        await connectToDatabase();
        const course = await Course.findById(id)
            .populate("instructor")
            .populate({
                path: "modules",
                populate: {
                    path: "videos",
                    model: "Video",
                    populate: { path: "instructor", model: "Instructor" }
                }
            })
            .lean();
        if (!course) return null;
        return JSON.parse(JSON.stringify(course));
    } catch (error) {
        return null;
    }
}

async function checkIsPurchased(courseId: string) {
    await connectToDatabase();
    const session = await getSession();
    if (!session?.userId) return false;

    const user = await User.findById(session.userId).select("purchasedCourses").lean();
    return user?.purchasedCourses?.some((id: any) => id.toString() === courseId) || false;
}

// Extract all unique instructors from course videos
function extractInstructorsFromCourse(course: any) {
    const instructorsMap = new Map();

    if (course.modules && Array.isArray(course.modules)) {
        for (const module of course.modules) {
            if (module.videos && Array.isArray(module.videos)) {
                for (const video of module.videos) {
                    if (video.instructor && video.instructor._id) {
                        instructorsMap.set(video.instructor._id, video.instructor);
                    }
                }
            }
        }
    }

    return Array.from(instructorsMap.values());
}

export default async function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
    const { courseId } = await params;
    const course = await getCourse(courseId);
    const isPurchased = await checkIsPurchased(courseId);

    if (!course) {
        notFound();
    }

    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Courses", href: "/courses" },
        { label: course.category || "Surgery", href: "/courses" },
    ];

    const originalPriceINR = Math.round((course.priceINR || 0) * 1.5); // 33% discount approx
    const session = await getSession();

    // Extract all unique instructors from course videos
    const instructors = extractInstructorsFromCourse(course);

    return (
        <div className="font-sans text-gray-600 bg-white">
            <Navbar isLoggedIn={!!session} />

            <div className="max-w-[1240px] mx-auto px-6">
                <Breadcrumbs items={breadcrumbs} />

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 mb-20 relative">
                    {/* Left Column: Main Content */}
                    <main>
                        <CourseHero
                            title={course.title}
                            description={course.shortDescription || course.description.substring(0, 150) + "..."}
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

                        {instructors.length > 0 && (
                            <InstructorsPopup instructors={instructors} />
                        )}
                    </main>

                    {/* Right Column: Sidebar */}
                    <aside className="relative">
                        <CourseSidebar
                            courseId={courseId}
                            priceINR={course.priceINR || 0}
                            priceUSD={course.priceUSD || 0}
                            originalPriceINR={originalPriceINR}
                            previewImage={course.previewImageLink}
                            previewVideoLink={course.previewVideoLink}
                            isPurchased={isPurchased}
                        />
                    </aside>
                </div>
            </div>

            <Footer />
        </div>
    );
}

