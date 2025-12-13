"use client";

import { Globe, AlertCircle } from "lucide-react";
import Link from "next/link";

interface CourseHeroProps {
    title: string;
    description: string; // Subtitle in HTML context
    instructorName: string;
    lastUpdated: string;
    language: string;
}

export default function CourseHero({
    title,
    description,
    instructorName,
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
                <span>
                    Created by <Link href="#" className="text-blue-600 underline">{instructorName}</Link>
                </span>
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
