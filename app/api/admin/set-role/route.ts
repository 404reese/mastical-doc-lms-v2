import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/lib/models/User";
import { getSession } from "@/lib/session";

export async function POST(request: Request) {
    try {
        // 1. Verify Authentication & Authorization
        const session = await getSession();

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const currentUserRole = (session as any).role;
        if (currentUserRole !== "superadmin") {
            return NextResponse.json({ error: "Forbidden: Superadmin only" }, { status: 403 });
        }

        // 2. Parse Request
        const body = await request.json();
        const { userId, role } = body;

        if (!userId || !role) {
            return NextResponse.json({ error: "Missing userId or role" }, { status: 400 });
        }

        // 3. Validate Role Update
        const allowedRoles = ["user", "admin"];
        if (!allowedRoles.includes(role)) {
            return NextResponse.json({ error: "Invalid role specified. can only set 'user' or 'admin'" }, { status: 400 });
        }

        await connectToDatabase();

        // 4. Update User
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { role },
            { new: true }
        ).select("-hashedPassword");

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "User role updated successfully", user: updatedUser },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("Set role error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
