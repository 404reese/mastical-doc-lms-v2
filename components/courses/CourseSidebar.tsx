"use client";

import { Play, FileText, Smartphone, Medal } from "lucide-react";
import Link from "next/link";

interface CourseSidebarProps {
    courseId: string;
    price: number;
    originalPrice?: number;
    previewImage: string;
}

export default function CourseSidebar({
    courseId,
    price,
    originalPrice,
    previewImage
}: CourseSidebarProps) {

    // Simple calculation for display
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    return (
        <div className="sticky top-8 bg-white border border-gray-200 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] rounded-[2px] overflow-hidden max-w-[500px] mx-auto lg:mx-0">
            {/* Preview Container */}
            <div className="relative h-[220px] bg-black cursor-pointer group">
                <img
                    src={previewImage || "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                    alt="Course Preview"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-white">
                    <div className="w-[60px] h-[60px] bg-white text-slate-900 rounded-full flex items-center justify-center text-2xl shadow-lg mb-2.5 transition-transform group-hover:scale-110">
                        <Play className="fill-slate-900 w-6 h-6 ml-1" />
                    </div>
                    <span className="font-semibold text-base drop-shadow-md">Preview this course</span>
                </div>
            </div>

            <div className="p-8">
                <div className="flex items-baseline gap-2.5 mb-6">
                    <span className="text-[2rem] font-bold text-gray-900">${price}</span>
                    {originalPrice && (
                        <>
                            <span className="text-[1.1rem] text-gray-500 line-through">${originalPrice}</span>
                            <span className="text-[1rem] text-gray-500">{discount}% off</span>
                        </>
                    )}
                </div>

                <Link
                    href={`/courses/${courseId}/learn`}
                    className="block w-full text-center py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors mb-4"
                >
                    Go to Course
                </Link>

                <div className="text-center mb-4 text-sm">
                    <span className="text-gray-500">Have doubts? <Link href="#" className="underline">Talk to Our Team</Link></span>
                </div>

                <div className="mt-8">
                    <div className="font-bold text-gray-900 text-base mb-4">This course includes:</div>
                    <ul className="space-y-3 text-[0.9rem] text-gray-700">
                        <li className="flex items-center gap-3">
                            <Play className="w-5 h-5 text-gray-600" />
                            <span>12 weeks on-demand video</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-gray-600" />
                            <span>24 articles</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Smartphone className="w-5 h-5 text-gray-600" />
                            <span>Access on mobile and TV</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Medal className="w-5 h-5 text-gray-600" />
                            <span>Certificate of completion</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
