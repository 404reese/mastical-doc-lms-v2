import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/lib/models/User";
import { getSession } from "@/lib/session";

export async function GET(request: Request) {
    try {
        const session = await getSession();

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const currentUserRole = (session as any).role;
        if (currentUserRole !== "superadmin") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        await connectToDatabase();

        const { searchParams } = new URL(request.url);
        const query = searchParams.get("query");

        let filter = {};
        if (query) {
            filter = { email: { $regex: query, $options: "i" } };
        }

        // Fetch users, omitting passwords
        const users = await User.find(filter)
            .select("-hashedPassword")
            .sort({ createdAt: -1 });

        return NextResponse.json(users);

    } catch (error: any) {
        console.error("Get users error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
