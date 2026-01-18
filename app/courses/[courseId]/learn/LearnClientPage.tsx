"use client";

import { useState } from "react";
import LearnHeader from "@/components/learn/LearnHeader";
import LearnSidebar from "@/components/learn/LearnSidebar";
import VideoPlayer from "@/components/learn/VideoPlayer";
import { FileText, Download } from "lucide-react";

interface LearnInstructor {
    _id: string;
    name: string;
    bio?: string;
    avatar?: string;
    expertise?: string;
}

interface LearnVideo {
    _id: string;
    title: string;
    link: string;
    duration?: number;
    notesUrl?: string;
    instructor?: LearnInstructor;
}

interface LearnModule {
    _id: string;
    title: string;
    videos: LearnVideo[];
}

interface LearnCourse {
    _id: string;
    title: string;
    modules?: LearnModule[];
    instructor?: LearnInstructor;
}

interface LearnClientPageProps {
    course: LearnCourse;
}

export default function LearnClientPage({ course }: LearnClientPageProps) {
    // Find first video to be active by default
    const defaultVideoId = course.modules?.[0]?.videos?.[0]?._id || "";
    const [activeVideoId, setActiveVideoId] = useState(defaultVideoId);

    // Derive active video details
    const activeVideo = (course.modules || [])
        .flatMap((module) => module.videos || [])
        .find((video) => video._id === activeVideoId);

    const activeInstructor = activeVideo?.instructor || course.instructor;
    const notesUrl = activeVideo?.notesUrl;

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-white text-gray-600 font-sans">
            <LearnHeader courseTitle={course.title} courseId={course._id} />

            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto bg-gray-50 pb-20">

                    {/* Video Section */}
                    <div className="w-full bg-black">
                        <VideoPlayer
                            title={activeVideo?.title || "Video Player"}
                            videoUrl={activeVideo?.link}
                        />
                    </div>

                    <div className="max-w-[1000px] mx-auto p-6 md:p-8 space-y-8">

                        {/* Resources Section */}
                        <div className="bg-white border border-gray-200 rounded-lg p-8">
                            <h2 className="text-[1.2rem] font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                                Course Resources
                            </h2>
                            <a
                                href={notesUrl || undefined}
                                target={notesUrl ? "_blank" : undefined}
                                rel={notesUrl ? "noopener noreferrer" : undefined}
                                aria-disabled={!notesUrl}
                                className={`flex items-center gap-4 p-4 border border-gray-200 rounded-md bg-gray-50 transition-all group ${
                                    notesUrl
                                        ? "hover:bg-white hover:border-blue-600 hover:shadow-sm"
                                        : "opacity-60 cursor-not-allowed"
                                }`}
                                onClick={(e) => {
                                    if (!notesUrl) e.preventDefault();
                                }}
                            >
                                <FileText className="w-6 h-6 text-red-500" />
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-900 text-sm">Lecture Notes: {activeVideo?.title || "Course Overview"}</span>
                                    <span className="text-xs text-gray-500">Open notes</span>
                                </div>
                                <Download className="w-5 h-5 text-gray-400 ml-auto group-hover:text-gray-600" />
                            </a>
                        </div>

                        {/* Instructor Section */}
                        {activeInstructor && (
                            <div className="bg-white border border-gray-200 rounded-lg p-8">
                                <h2 className="text-[1.2rem] font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                                    Your Instructor
                                </h2>
                                <div className="flex items-start gap-6">
                                    <img
                                        src={activeInstructor.avatar || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"}
                                        alt={activeInstructor.name}
                                        className="w-20 h-20 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="text-[1.1rem] font-bold text-gray-900 mb-1">
                                            {activeInstructor.name}
                                        </h3>
                                        <span className="text-[0.9rem] font-medium text-blue-600 mb-3 block">
                                            {activeInstructor.expertise || "Instructor"}
                                        </span>
                                        <p className="text-[0.9rem] leading-relaxed">
                                            {activeInstructor.bio || "No bio available."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <LearnSidebar
                    modules={course.modules || []}
                    activeVideoId={activeVideoId}
                    onVideoSelect={setActiveVideoId}
                    progressPercentage={15}
                />

            </div>
        </div>
    );
}
