
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Video from '@/lib/models/Video';
import Module from '@/lib/models/Module';
import Instructor from '@/lib/models/Instructor';

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const body = await req.json();
        const {
            title,
            description,
            link,
            duration,
            moduleId,
            instructor,
            notes,
            notesUrl,
            position,
        } = body;

        if (!title || !link || !moduleId || !instructor) {
            return NextResponse.json(
                { error: 'Title, Link, Module ID, and Instructor ID are required' },
                { status: 400 }
            );
        }

        // Verify module exists
        const moduleExists = await Module.findById(moduleId);
        if (!moduleExists) {
            return NextResponse.json({ error: 'Module not found' }, { status: 404 });
        }

        // Verify instructor exists
        const instructorExists = await Instructor.findById(instructor);
        if (!instructorExists) {
            return NextResponse.json({ error: 'Instructor not found' }, { status: 404 });
        }

        // Create video
        const video = await Video.create({
            title,
            description,
            link,
            duration,
            moduleId,
            instructor,
            notes,
            notesUrl,
            position,
        });

        // Update module videos array
        await Module.findByIdAndUpdate(moduleId, {
            $push: { videos: video._id },
        });

        return NextResponse.json(video, { status: 201 });
    } catch (error) {
        console.error('Error creating video:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
