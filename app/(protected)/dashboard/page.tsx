import { redirect } from "next/navigation";
import { getSession, deleteSession } from "@/lib/session";
import connectToDatabase from "@/lib/db";
import User from "@/lib/models/User";
import Course from "@/lib/models/Course";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/courses/CourseCard";
import Link from "next/link";
import { BookOpen, LogOut } from "lucide-react";

// Ensure models are registered to prevent populate errors
const _models = { Course };

async function getEnrolledCourses(userId: string) {
    await connectToDatabase();
    const user = await User.findById(userId).populate({
        path: "purchasedCourses",
        populate: { path: "instructor", select: "name avatar" }
    }).lean();

    if (!user || !user.purchasedCourses) return [];

    return JSON.parse(JSON.stringify(user.purchasedCourses));
}

export default async function DashboardPage() {
    const session = await getSession();

    if (!session || !session.userId) {
        redirect("/login");
    }

    const enrolledCourses = await getEnrolledCourses(session.userId);

    async function logout() {
        "use server";
        await deleteSession();
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Navbar isLoggedIn={true} />

            <main className="max-w-[1240px] mx-auto px-6 py-12">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">My Dashboard</h1>
                        <p className="text-slate-600 mt-1">Welcome back! Continue your learning journey.</p>
                    </div>

                    <form action={logout}>
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium text-sm"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </form>
                </div>

                {/* Enrolled Courses Section */}
                <section>
                    <div className="flex items-center gap-2 mb-6">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                        <h2 className="text-2xl font-bold text-slate-800">Enrolled Courses</h2>
                    </div>

                    {enrolledCourses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {enrolledCourses.map((course: any) => (
                                <CourseCard
                                    key={course._id}
                                    course={course}
                                    isPurchased={true}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl p-12 text-center border border-dashed border-slate-200 shadow-sm">
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No courses yet</h3>
                            <p className="text-slate-500 mb-6 max-w-md mx-auto">
                                You haven't enrolled in any courses yet. Explore our catalog to start learning.
                            </p>
                            <Link
                                href="/courses"
                                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Browse Courses
                            </Link>
                        </div>
                    )}
                </section>

                {/* Admin Link (Conditional) */}
                {(session as any).role === 'admin' || (session as any).role === 'superadmin' ? (
                    <div className="mt-12 pt-8 border-t border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Admin Controls</h3>
                        <Link href="/admin/dashboard">
                            <button className="px-5 py-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors font-medium text-sm">
                                Go to Admin Dashboard
                            </button>
                        </Link>
                    </div>
                ) : null}

            </main>

            <Footer />
        </div>
    );
}
