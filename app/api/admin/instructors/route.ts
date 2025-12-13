
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Instructor from '@/lib/models/Instructor';

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const body = await req.json();
        const { name, bio, avatar, expertise } = body;

        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const instructor = await Instructor.create({ name, bio, avatar, expertise });

        return NextResponse.json(instructor, { status: 201 });
    } catch (error) {
        console.error('Error creating instructor:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectToDatabase();
        // Sort by newest first
        const instructors = await Instructor.find({}).sort({ createdAt: -1 });
        return NextResponse.json(instructors);
    } catch (error) {
        console.error('Error fetching instructors:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
