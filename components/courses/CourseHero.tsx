"use client";

import { Globe, AlertCircle } from "lucide-react";

interface CourseHeroProps {
    title: string;
    description: string; // Subtitle in HTML context
    lastUpdated: string;
    language: string;
}

export default function CourseHero({
    title,
    description,
    lastUpdated,
    language,
}: CourseHeroProps) {
    return (
        <div className="mb-12">
            <h1 className="text-[2.5rem] font-bold text-slate-900 leading-tight mb-4">
                {title}
            </h1>
            <p className="text-[1.1rem] text-gray-600 mb-6">
                {description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <span className="flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-gray-500" />
                    Last updated {new Date(lastUpdated).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' })}
                </span>
                <span className="flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-gray-500" />
                    {language}
                </span>
            </div>
        </div>
    );
}
