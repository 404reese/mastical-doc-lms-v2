"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import CourseCard from "./courses/CourseCard";
import { Button } from "./ui/button";

interface CourseFiltersProps {
    courses: any[];
}

const LEVELS = ["All Levels", "Beginner", "Intermediate", "Advanced"];
// Standardizing language options based on CourseBrowser
const LANGUAGES = ["All Languages", "English", "Bulgarian", "French", "German", "Hindi", "Hungarian", "Portuguese", "Romanian", "Russian", "Spanish"];

export default function CourseFilters({ courses = [] }: CourseFiltersProps) {
    const [activeTab, setActiveTab] = useState<"Level" | "Category" | "Language">("Level");

    // Filter states
    const [selectedLevel, setSelectedLevel] = useState("All Levels");
    const [selectedLanguage, setSelectedLanguage] = useState("All Languages");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");

    // Extract unique categories from actual courses
    const categories = useMemo(() => {
        const unique = new Set(courses.map(c => c.category || "General"));
        return ["All Categories", ...Array.from(unique)];
    }, [courses]);

    // Derived filtered courses
    const filteredCourses = useMemo(() => {
        return courses.filter(course => {
            const matchesLevel = selectedLevel === "All Levels" || course.level === selectedLevel;
            const matchesLanguage = selectedLanguage === "All Languages" || course.language === selectedLanguage;
            const matchesCategory = selectedCategory === "All Categories" || course.category === selectedCategory;

            return matchesLevel && matchesLanguage && matchesCategory;
        });
    }, [courses, selectedLevel, selectedLanguage, selectedCategory]);

    // Limit to 4 courses
    const displayedCourses = filteredCourses.slice(0, 4);

    return (
        <section className="py-20 bg-[#F8FAFC]">
            <div className="max-w-[1240px] mx-auto px-6">
                <div className="text-center max-w-[700px] mx-auto mb-16">
                    <h2 className="text-[2.5rem] font-bold text-[#1e3a8a] mb-4">
                        Explore Courses
                    </h2>
                    <p className="text-[1.05rem] text-[#64748b]">
                        Find the perfect course tailored to your specialty, level, and
                        language preference.
                    </p>
                </div>

                {/* Main Filter Tabs */}
                <div className="flex justify-center gap-4 mb-6 flex-wrap">
                    <button
                        onClick={() => setActiveTab("Level")}
                        className={`px-6 py-3 rounded-md font-semibold text-sm flex items-center gap-2 transition-colors ${activeTab === "Level" ? "bg-[#2563EB] text-white" : "bg-[#E2E8F0] text-[#475569] hover:bg-[#CBD5E1]"}`}
                    >
                        <i className="fa-regular fa-clock"></i> By Level
                    </button>
                    <button
                        onClick={() => setActiveTab("Category")}
                        className={`px-6 py-3 rounded-md font-semibold text-sm flex items-center gap-2 transition-colors ${activeTab === "Category" ? "bg-[#2563EB] text-white" : "bg-[#E2E8F0] text-[#475569] hover:bg-[#CBD5E1]"}`}
                    >
                        <i className="fa-solid fa-book-open"></i> By Category
                    </button>
                    <button
                        onClick={() => setActiveTab("Language")}
                        className={`px-6 py-3 rounded-md font-semibold text-sm flex items-center gap-2 transition-colors ${activeTab === "Language" ? "bg-[#2563EB] text-white" : "bg-[#E2E8F0] text-[#475569] hover:bg-[#CBD5E1]"}`}
                    >
                        <i className="fa-solid fa-globe"></i> By Language
                    </button>
                </div>

                {/* Sub Filters (Pills) */}
                <div className="flex justify-center gap-2 mb-14 flex-wrap">
                    {activeTab === "Level" && LEVELS.map(level => (
                        <button
                            key={level}
                            onClick={() => setSelectedLevel(level)}
                            className={`px-5 py-2 rounded-full font-medium text-sm transition-colors border ${selectedLevel === level ? "bg-[#EFF6FF] text-[#2563EB] border-[#2563EB]" : "bg-white text-[#64748b] border-[#E2E8F0] hover:bg-gray-50"}`}
                        >
                            {level}
                        </button>
                    ))}

                    {activeTab === "Category" && categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-5 py-2 rounded-full font-medium text-sm transition-colors border ${selectedCategory === cat ? "bg-[#EFF6FF] text-[#2563EB] border-[#2563EB]" : "bg-white text-[#64748b] border-[#E2E8F0] hover:bg-gray-50"}`}
                        >
                            {cat}
                        </button>
                    ))}

                    {activeTab === "Language" && LANGUAGES.map(lang => (
                        <button
                            key={lang}
                            onClick={() => setSelectedLanguage(lang)}
                            className={`px-5 py-2 rounded-full font-medium text-sm transition-colors border ${selectedLanguage === lang ? "bg-[#EFF6FF] text-[#2563EB] border-[#2563EB]" : "bg-white text-[#64748b] border-[#E2E8F0] hover:bg-gray-50"}`}
                        >
                            {lang}
                        </button>
                    ))}
                </div>

                {/* Course Grid */}
                {displayedCourses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {displayedCourses.map((course) => (
                            <div key={course._id} className="h-full">
                                <CourseCard course={course} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200 mb-8">
                        <h3 className="text-xl font-medium text-slate-900 mb-2">No matching courses found</h3>
                        <p className="text-slate-500 mb-4">Try adjusting your search or filters to find what you're looking for.</p>
                        <Button
                            variant="ghost"
                            className="text-blue-600 hover:text-blue-700"
                            onClick={() => {
                                setSelectedLevel("All Levels");
                                setSelectedLanguage("All Languages");
                                setSelectedCategory("All Categories");
                            }}
                        >
                            Clear all filters
                        </Button>
                    </div>
                )}


                <div className="text-center mt-14">
                    <Link href="/courses">
                        <button className="bg-white text-[#2563EB] border border-[#2563EB] px-10 py-3 rounded-md font-semibold text-base hover:bg-[#DBEAFE] transition-all flex items-center gap-2 mx-auto">
                            See All Courses <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
