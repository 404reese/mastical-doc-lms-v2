"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Video {
    _id: string;
    title: string;
    duration?: number;
}

interface Module {
    _id: string;
    title: string;
    videos: Video[];
}

interface CourseContentProps {
    modules: Module[];
}

export default function CourseContent({ modules }: CourseContentProps) {
    // Expand first module by default
    const [expandedModules, setExpandedModules] = useState<string[]>(modules.length > 0 ? [modules[0]._id] : []);

    const toggleModule = (id: string) => {
        setExpandedModules(prev =>
            prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
        );
    };

    const totalLectures = modules.reduce((acc, curr) => acc + curr.videos.length, 0);
    // Mock total length for now
    const totalDuration = "12 weeks total length";

    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Course content</h2>

            <div className="flex items-end justify-between mb-4 text-sm text-gray-600">
                <span>{modules.length} sections • {totalLectures} lectures • {totalDuration}</span>
                <button className="text-blue-600 font-semibold cursor-pointer">
                    Expand all sections
                </button>
            </div>

            <div className="border border-gray-200 divide-y divide-gray-200 rounded-lg overflow-hidden">
                {modules.map((module) => {
                    const isExpanded = expandedModules.includes(module._id);
                    return (
                        <div key={module._id} className="group">
                            {/* Accordion Trigger */}
                            <div
                                onClick={() => toggleModule(module._id)}
                                className={`
                            flex items-center justify-between p-4 px-6 cursor-pointer bg-gray-50
                            ${isExpanded ? "bg-gray-50" : "bg-gray-50"}
                        `}
                            >
                                <span className="font-semibold text-gray-800">{module.title}</span>
                                <div className="flex items-center gap-2 text-sm text-gray-500 font-normal">
                                    <span>{module.videos.length} lectures • 45min</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                                </div>
                            </div>

                            {/* Accordion Content */}
                            {isExpanded && (
                                <div className="bg-white px-6 py-4 space-y-3">
                                    {module.videos.map((video) => (
                                        <div key={video._id} className="flex items-center justify-between text-sm text-gray-700">
                                            <div className="flex items-center gap-3">
                                                <i className="fa-regular fa-circle-play text-gray-400 w-4"></i> {/* Using fontawesome if available, else standard layout */}
                                                <div className="w-full flex items-center gap-3">
                                                    {/* Fallback to simple circle text if FA not loaded yet, or assume global CSS loads it */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 w-4 h-4"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>
                                                    <span>{video.title}</span>
                                                </div>
                                            </div>
                                            <span className="text-gray-500">
                                                {video.duration ? `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, '0')}` : "05:00"}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
