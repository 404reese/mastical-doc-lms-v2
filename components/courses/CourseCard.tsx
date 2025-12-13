"use client";

import Link from "next/link";
import { Clock, Users, BookOpen, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface CourseCardProps {
    course: {
        _id: string;
        title: string;
        description: string;
        price: number;
        level?: string;
        category?: string;
        language?: string;
        duration?: number; // minutes
        enrollments?: number;
        instructor?: {
            name: string;
            avatar?: string;
        } | null;
        previewImageLink?: string;
        rating?: number; // Mock data for now if not in schema
    };
}

export default function CourseCard({ course }: CourseCardProps) {
    const {
        _id,
        title,
        description,
        price,
        level = "Beginner",
        category = "General",
        language = "English",
        duration = 0,
        enrollments = 0,
        instructor,
        previewImageLink,
        rating = 4.5,
    } = course;

    const durationWeeks = Math.ceil(duration / 60 / 4); // rough estimate if duration is minutes

    return (
        <Card className="flex flex-col h-full overflow-hidden border-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            {/* Course Image Header */}
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={previewImageLink || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"}
                    alt={title}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                    <Badge
                        variant="secondary"
                        className={`
              ${level === 'Advanced' ? 'bg-purple-100 text-purple-700' :
                                level === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                                    'bg-emerald-100 text-emerald-700'} 
              font-semibold px-3 py-1 rounded-full border-none
            `}
                    >
                        {level}
                    </Badge>
                </div>
                <div className="absolute top-3 right-3">
                    <Badge className="bg-white/90 text-slate-700 hover:bg-white font-bold px-2 py-1 backdrop-blur-sm border-none shadow-sm flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        {rating}
                    </Badge>
                </div>
            </div>

            <CardContent className="flex-1 p-5 pt-6">
                {/* Tags */}
                <div className="flex gap-2 mb-3">
                    <Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-100 font-medium px-2.5 py-0.5 rounded-md text-xs">
                        {category}
                    </Badge>
                    <Badge variant="outline" className="text-slate-600 bg-slate-50 border-slate-100 font-medium px-2.5 py-0.5 rounded-md text-xs">
                        {language}
                    </Badge>
                </div>

                {/* Title */}
                <Link href={`/courses/${_id}`} className="block group">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                        {title}
                    </h3>
                </Link>

                {/* Description */}
                <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {description}
                </p>

                {/* Instructor */}
                <div className="flex items-center gap-3 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                        {instructor?.avatar ? (
                            <img src={instructor.avatar} alt={instructor.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                <Users className="w-5 h-5" />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-800">{instructor?.name || "Unknown Instructor"}</span>
                        <span className="text-xs text-slate-500">Instructor</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-5 pt-0 flex flex-col gap-4 border-t border-slate-50 bg-slate-50/30">
                <div className="flex items-center justify-between w-full text-slate-500 text-sm mt-4">
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{durationWeeks > 0 ? `${durationWeeks} weeks` : "Self-paced"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        <span>{enrollments.toLocaleString()}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between w-full mt-1">
                    <span className="text-2xl font-bold text-slate-900">
                        ${price}
                    </span>
                    <Link href={`/courses/${_id}`} className="w-auto">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 shadow-md shadow-blue-600/20">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Enroll Now
                        </Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
