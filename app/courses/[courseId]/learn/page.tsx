import { notFound } from "next/navigation";
import connectToDatabase from "@/lib/db";
import Course from "@/lib/models/Course";
import Module from "@/lib/models/Module";
import Video from "@/lib/models/Video";
import Instructor from "@/lib/models/Instructor";
import LearnClientPage from "./LearnClientPage";

// Ensure models are registered
const _models = { Course, Module, Video, Instructor };

async function getCourse(id: string) {
    try {
        await connectToDatabase();
        const course = await Course.findById(id)
            .populate("instructor")
            .populate({
                path: "modules",
                options: { sort: { position: 1 } },
                populate: {
                    path: "videos",
                    model: "Video",
                    options: { sort: { position: 1 } },
                    populate: { path: "instructor", model: "Instructor" },
                },
            })
            .lean();
        if (!course) return null;
        return JSON.parse(JSON.stringify(course));
    } catch (error) {
        return null;
    }
}

export default async function LearnPage({ params }: { params: Promise<{ courseId: string }> }) {
    const { courseId } = await params;
    const course = await getCourse(courseId);

    if (!course) {
        notFound();
    }

    return <LearnClientPage course={course} />;
}
