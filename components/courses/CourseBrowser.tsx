"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import CourseCard from "./CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CourseBrowserProps {
    initialCourses: any[];
    purchasedCourseIds?: string[];
}

const LEVELS = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const LANGUAGES = ["All Languages", "English", "Bulgarian", "French", "German", "Hindi", "Hungarian", "Portuguese", "Romanian", "Russian", "Spanish"];

export default function CourseBrowser({ initialCourses, purchasedCourseIds = [] }: CourseBrowserProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("All Levels");
    const [selectedLanguage, setSelectedLanguage] = useState("All Languages");

    // Filter courses based on selections
    const { relevant, others } = useMemo(() => {
        const relevantDetails: any[] = [];
        const otherDetails: any[] = [];

        initialCourses.forEach((course) => {
            const matchesSearch =
                course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (course.instructor?.name && course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesLevel = selectedLevel === "All Levels" || course.level === selectedLevel;
            const matchesLanguage = selectedLanguage === "All Languages" || course.language === selectedLanguage;

            if (matchesSearch && matchesLevel && matchesLanguage) {
                relevantDetails.push(course);
            } else {
                otherDetails.push(course);
            }
        });

        return { relevant: relevantDetails, others: otherDetails };
    }, [initialCourses, searchQuery, selectedLevel, selectedLanguage]);

    const isFiltering = searchQuery !== "" || selectedLevel !== "All Levels" || selectedLanguage !== "All Languages";

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="text-center mb-12 space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                    Explore Our <span className="text-blue-600">Courses</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Browse through our comprehensive catalog of medical courses designed by experts for medical professionals.
                </p>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mt-8 relative">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <Input
                            type="text"
                            placeholder="Search courses, instructors..."
                            className="w-full pl-12 py-6 text-lg rounded-xl border-slate-200 shadow-sm focus-visible:ring-blue-600/20 focus-visible:border-blue-600"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-10 space-y-6">

                {/* Level Filter */}
                <div className="space-y-3">
                    <label className="text-sm font-bold text-blue-900 uppercase tracking-wide">Choose Level:</label>
                    <div className="flex flex-wrap gap-2">
                        {LEVELS.map((level) => (
                            <button
                                key={level}
                                onClick={() => setSelectedLevel(level)}
                                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${selectedLevel === level
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"}
                `}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>



                {/* Language Filter */}
                <div className="space-y-3">
                    <label className="text-sm font-bold text-blue-900 uppercase tracking-wide">Choose Language:</label>
                    <div className="flex flex-wrap gap-2">
                        {LANGUAGES.map((language) => (
                            <button
                                key={language}
                                onClick={() => setSelectedLanguage(language)}
                                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${selectedLanguage === language
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"}
                `}
                            >
                                {language}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-8 bg-blue-50/50 p-4 rounded-lg border border-blue-100 text-blue-800">
                <span className="font-semibold text-lg">
                    <span className="font-bold text-2xl mr-1">{relevant.length}</span> relevant courses found
                </span>
            </div>

            {/* Relevant Courses Grid */}
            {relevant.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {relevant.map((course) => (
                        <CourseCard
                            key={course._id}
                            course={course}
                            isPurchased={purchasedCourseIds.includes(course._id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200 mb-16">
                    <h3 className="text-xl font-medium text-slate-900 mb-2">No matching courses found</h3>
                    <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
                    <Button
                        variant="ghost"
                        className="mt-4 text-blue-600 hover:text-blue-700"
                        onClick={() => {
                            setSearchQuery("");
                            setSelectedLevel("All Levels");
                            setSelectedLanguage("All Languages");
                        }}
                    >
                        Clear all filters
                    </Button>
                </div>
            )}

            {/* Other Courses Section */}
            {isFiltering && others.length > 0 && (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                    <div className="flex items-center justify-between mb-8 bg-blue-50/50 p-4 rounded-lg border border-blue-100 text-blue-800">
                        <span className="font-semibold text-lg">
                            Other courses you might be interested in
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {others.map((course) => (
                            <CourseCard
                                key={course._id}
                                course={course}
                                isPurchased={purchasedCourseIds.includes(course._id)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
