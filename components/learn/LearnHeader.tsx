"use client";

import Link from "next/link";
import { X } from "lucide-react";

interface LearnHeaderProps {
    courseTitle: string;
    courseId: string;
}

export default function LearnHeader({ courseTitle, courseId }: LearnHeaderProps) {
    return (
        <header className="h-[70px] border-b border-gray-200 flex items-center justify-between px-6 bg-white z-10">
            <div className="flex items-center gap-6">
                <Link href="/" className="flex items-center gap-2 group hidden sm:flex">
                    <img src="/main-logo.webp" alt="Mastical Doc LMS" className="h-12" />
                </Link>
                <div className="hidden sm:block h-6 w-px bg-gray-200"></div>
                <h1 className="font-semibold text-gray-900 text-base overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px] md:max-w-md">
                    {courseTitle}
                </h1>
            </div>

            <Link
                href={`/courses/${courseId}`}
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md font-medium text-sm text-gray-600 bg-white hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
                Exit Course <X className="w-4 h-4" />
            </Link>
        </header>
    );
}
