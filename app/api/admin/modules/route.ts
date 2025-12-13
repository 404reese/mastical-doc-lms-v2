
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Module from '@/lib/models/Module';
import Course from '@/lib/models/Course';

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const body = await req.json();
        const { title, courseId, position } = body;

        if (!title || !courseId) {
            return NextResponse.json(
                { error: 'Title and Course ID are required' },
                { status: 400 }
            );
        }

        // Verify course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        // Create module
        const module = await Module.create({ title, courseId, position });

        // Update course modules array
        await Course.findByIdAndUpdate(courseId, {
            $push: { modules: module._id },
        });

        return NextResponse.json(module, { status: 201 });
    } catch (error) {
        console.error('Error creating module:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
