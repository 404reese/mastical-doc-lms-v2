import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import connectToDatabase from "@/lib/db";
import User from "@/lib/models/User";
import Course from "@/lib/models/Course";

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { courseId } = await request.json();

        if (!courseId) {
            return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
        }

        await connectToDatabase();

        // Verify course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return NextResponse.json({ error: "Course not found" }, { status: 404 });
        }

        // Add to user's purchased courses if not already there
        await User.findByIdAndUpdate(
            session.userId,
            { $addToSet: { purchasedCourses: courseId } },
            { new: true }
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Purchase error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
