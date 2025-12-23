import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectToDatabase from "@/lib/db";
import User from "@/lib/models/User";
import { createSession } from "@/lib/session";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: "Missing email or password" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        await createSession(user._id.toString(), user.role);

        return NextResponse.json({ success: true, user: { role: user.role } }, { status: 200 });
    } catch (error: any) {
        console.error("Signin error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
