import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import connectToDatabase from "@/lib/db";
import VideoProgress from "@/lib/models/VideoProgress";

// GET /api/progress/[courseId] - Get progress for a course
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ courseId: string }> }
) {
    try {
        const session = await getSession();

        if (!session?.userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { courseId } = await params;

        if (!courseId) {
            return NextResponse.json(
                { error: "courseId is required" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const progress = await VideoProgress.findOne({
            userId: session.userId,
            courseId,
        });

        return NextResponse.json({
            completedVideos: progress?.completedVideos?.map((id: { toString: () => string }) => id.toString()) || [],
            lastWatchedVideoId: progress?.lastWatchedVideoId?.toString() || null,
        });
    } catch (error) {
        console.error("Error fetching progress:", error);
        return NextResponse.json(
            { error: "Failed to fetch progress" },
            { status: 500 }
        );
    }
}
