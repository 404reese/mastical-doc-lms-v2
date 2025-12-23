import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import connectToDatabase from "@/lib/db";
import VideoProgress from "@/lib/models/VideoProgress";

// POST /api/progress - Mark video as completed
export async function POST(request: NextRequest) {
    try {
        const session = await getSession();

        if (!session?.userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { courseId, videoId } = await request.json();

        if (!courseId || !videoId) {
            return NextResponse.json(
                { error: "courseId and videoId are required" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        // Update or create progress record
        const progress = await VideoProgress.findOneAndUpdate(
            { userId: session.userId, courseId },
            {
                $addToSet: { completedVideos: videoId },
                $set: { lastWatchedVideoId: videoId },
            },
            { upsert: true, new: true }
        );

        return NextResponse.json({
            success: true,
            completedVideos: progress.completedVideos.map((id: { toString: () => string }) => id.toString()),
            lastWatchedVideoId: progress.lastWatchedVideoId?.toString() || null,
        });
    } catch (error) {
        console.error("Error updating progress:", error);
        return NextResponse.json(
            { error: "Failed to update progress" },
            { status: 500 }
        );
    }
}
