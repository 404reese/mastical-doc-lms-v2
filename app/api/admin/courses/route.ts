
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Course from '@/lib/models/Course';
import Instructor from '@/lib/models/Instructor'; // Ensure Instructor model is registered

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const body = await req.json();

        // Basic validation
        if (!body.title || !body.description || !body.instructor) {
            return NextResponse.json(
                { error: 'Title, description, and instructor are required' },
                { status: 400 }
            );
        }

        // Verify instructor exists
        const instructorExists = await Instructor.findById(body.instructor);
        if (!instructorExists) {
            return NextResponse.json({ error: 'Instructor not found' }, { status: 404 });
        }

        const course = await Course.create(body);

        return NextResponse.json(course, { status: 201 });
    } catch (error) {
        console.error('Error creating course:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectToDatabase();
        // Populate instructor to get name
        const courses = await Course.find({})
            .populate('instructor', 'name avatar')
            .sort({ createdAt: -1 });
        return NextResponse.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
