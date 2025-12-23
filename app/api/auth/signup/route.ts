import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectToDatabase from "@/lib/db";
import User from "@/lib/models/User";

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

        if (password.length < 8) {
            return NextResponse.json(
                { error: "Password must be at least 8 characters long" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            hashedPassword,
            role: "user",
        });

        // Remove password from response
        const { hashedPassword: _, ...userWithoutPassword } = newUser.toObject();

        return NextResponse.json(userWithoutPassword, { status: 201 });
    } catch (error: any) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
