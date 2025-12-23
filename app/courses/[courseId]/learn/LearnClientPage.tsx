"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import LearnHeader from "@/components/learn/LearnHeader";
import LearnSidebar from "@/components/learn/LearnSidebar";
import VideoPlayer from "@/components/learn/VideoPlayer";
import { FileText, Download } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

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
    isAuthenticated: boolean;
}

interface ProgressData {
    completedVideos: string[];
    lastWatchedVideoId: string | null;
}

export default function LearnClientPage({ course, isAuthenticated }: LearnClientPageProps) {
    const [activeVideoId, setActiveVideoId] = useState<string>("");
    const [completedVideos, setCompletedVideos] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Flatten all videos for easy lookup
    const allVideos = useMemo(() =>
        (course.modules || []).flatMap((module) => module.videos || []),
        [course.modules]
    );
    const defaultVideoId = allVideos[0]?._id || "";

    // Fetch progress on mount
    useEffect(() => {
        async function fetchProgress() {
            try {
                const response = await fetch(`/api/progress/${course._id}`);
                if (response.ok) {
                    const data: ProgressData = await response.json();
                    const completed = data.completedVideos || [];
                    setCompletedVideos(completed);

                    // Resume from last watched video, or default to first video
                    let resumeVideoId = data.lastWatchedVideoId || defaultVideoId;

                    // If the last watched video is completed, try to skip to the next one
                    if (data.lastWatchedVideoId && completed.includes(data.lastWatchedVideoId)) {
                        const idx = allVideos.findIndex(v => v._id === data.lastWatchedVideoId);
                        if (idx !== -1 && idx < allVideos.length - 1) {
                            resumeVideoId = allVideos[idx + 1]._id;
                        }
                    }

                    setActiveVideoId(resumeVideoId);
                } else {
                    // User might not be logged in or no progress yet
                    setActiveVideoId(defaultVideoId);
                }
            } catch (error) {
                console.error("Error fetching progress:", error);
                setActiveVideoId(defaultVideoId);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProgress();
        fetchProgress();
    }, [course._id, defaultVideoId, allVideos]);

    // Mark video as complete and optionally play next
    const markCompleteAndPlayNext = useCallback(async (videoId: string) => {
        // Mark as complete
        try {
            const response = await fetch("/api/progress", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ courseId: course._id, videoId }),
            });

            if (response.ok) {
                const data = await response.json();
                setCompletedVideos(data.completedVideos || []);
            }
        } catch (error) {
            console.error("Error marking video complete:", error);
        }

        // Find next video and autoplay
        const currentIndex = allVideos.findIndex(v => v._id === videoId);
        if (currentIndex >= 0 && currentIndex < allVideos.length - 1) {
            const nextVideo = allVideos[currentIndex + 1];
            setActiveVideoId(nextVideo._id);
        }
    }, [course._id, allVideos]);

    // Handle video end - mark complete and play next
    const handleVideoEnd = useCallback(() => {
        markCompleteAndPlayNext(activeVideoId);
        toast.success("Lesson Completed!");
    }, [activeVideoId, markCompleteAndPlayNext]);

    // Handle video selection - also updates last watched
    const handleVideoSelect = useCallback(async (videoId: string) => {
        setActiveVideoId(videoId);

        // Update last watched position (silently)
        try {
            await fetch("/api/progress", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ courseId: course._id, videoId }),
            });
        } catch (error) {
            // Silently fail - not critical
        }
    }, [course._id]);

    // Derive active video details
    const activeVideo = allVideos.find((video) => video._id === activeVideoId);
    const activeInstructor = activeVideo?.instructor || course.instructor;
    const notesUrl = activeVideo?.notesUrl;

    // Calculate progress percentage
    const totalVideos = allVideos.length;
    const completedCount = completedVideos.length;
    const progressPercentage = totalVideos > 0 ? Math.round((completedCount / totalVideos) * 100) : 0;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-white">
                <div className="text-gray-500">Loading course...</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-white text-gray-600 font-sans">
            <LearnHeader courseTitle={course.title} courseId={course._id} />

            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto bg-gray-50 pb-20">

                    {/* Video Section */}
                    <div className="w-full bg-black">
                        <VideoPlayer
                            key={activeVideo?._id}
                            title={activeVideo?.title || "Video Player"}
                            videoUrl={activeVideo?.link}
                            onVideoEnd={handleVideoEnd}
                        />
                    </div>

                    <div className="max-w-[1000px] mx-auto p-6 md:p-8 space-y-8">

                        {/* Resources Section with PDF Viewer Link */}
                        <div className="bg-white border border-gray-200 rounded-lg p-8">
                            <h2 className="text-[1.2rem] font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                                Course Resources
                            </h2>
                            <div className="space-y-4">
                                <Link
                                    href={notesUrl ? `/pdf-viewer?url=${encodeURIComponent(notesUrl)}` : "#"}
                                    target={notesUrl ? "_blank" : undefined}
                                    rel={notesUrl ? "noopener noreferrer" : undefined}
                                    onClick={(e) => {
                                        if (!notesUrl) {
                                            e.preventDefault();
                                        }
                                    }}
                                    className={`flex items-center gap-4 p-4 border border-gray-200 rounded-md bg-gray-50 transition-all group w-full text-left ${notesUrl
                                        ? "hover:bg-white hover:border-blue-600 hover:shadow-sm cursor-pointer"
                                        : "opacity-60 cursor-not-allowed"
                                        }`}
                                >
                                    <FileText className="w-6 h-6 text-red-500" />
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-900 text-sm">
                                            {activeVideo?.title ? `Notes: ${activeVideo.title}` : "Course Notes"}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {notesUrl ? "Click to open in new tab (Secure Viewer)" : "No notes available"}
                                        </span>
                                    </div>
                                    {notesUrl && (
                                        <Download className="w-5 h-5 text-gray-400 ml-auto group-hover:text-gray-600" />
                                    )}
                                </Link>
                            </div>
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
                    onVideoSelect={handleVideoSelect}
                    completedVideos={completedVideos}
                    progressPercentage={progressPercentage}
                />

            </div>
        </div>
    );
}
