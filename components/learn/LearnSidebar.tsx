"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, PlayCircle, Lock, Circle, CircleCheck, Video } from "lucide-react";

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

interface LearnSidebarProps {
    modules: Module[];
    activeVideoId: string;
    onVideoSelect: (videoId: string) => void;
    progressPercentage?: number;
}

export default function LearnSidebar({
    modules,
    activeVideoId,
    onVideoSelect,
    progressPercentage = 15
}: LearnSidebarProps) {

    // Allow toggling of modules
    const [expandedModules, setExpandedModules] = useState<string[]>(modules.map(m => m._id));

    const toggleModule = (id: string) => {
        setExpandedModules(prev =>
            prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
        );
    };

    return (
        <div className="w-full lg:w-[400px] bg-white border-l border-gray-200 flex flex-col flex-shrink-0 h-full overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex-shrink-0">
                <h2 className="font-bold text-gray-900 mb-2">Course Content</h2>
                <div className="text-xs text-gray-500 mb-2">{progressPercentage}% Completed</div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600" style={{ width: `${progressPercentage}%` }}></div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {modules.map((module) => {
                    const isExpanded = expandedModules.includes(module._id);
                    return (
                        <div key={module._id}>
                            <div
                                onClick={() => toggleModule(module._id)}
                                className="bg-gray-50 p-4 px-6 border-b border-gray-200 font-semibold text-[0.95rem] text-gray-900 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                            >
                                <span className="line-clamp-1">Section: {module.title}</span>
                                {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
                            </div>

                            {isExpanded && (
                                <div className="block">
                                    {module.videos.map((video) => {
                                        const isActive = video._id === activeVideoId;
                                        return (
                                            <div
                                                key={video._id}
                                                onClick={() => onVideoSelect(video._id)}
                                                className={`
                                            flex gap-3 p-4 px-6 border-b border-gray-100 cursor-pointer transition-colors
                                            ${isActive ? 'bg-blue-50 border-l-4 border-l-blue-600 pl-[calc(1.5rem-4px)]' : 'hover:bg-gray-50'}
                                        `}
                                            >
                                                <div className={`mt-1 ${isActive ? 'text-blue-600' : 'text-gray-300'}`}>
                                                    {isActive ? <PlayCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className={`text-[0.9rem] font-medium leading-normal ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                                                        {video.title}
                                                    </span>
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                        <Video className="w-3 h-3" />
                                                        <span>{video.duration ? `${Math.floor(video.duration / 60)} min` : "5 min"}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
