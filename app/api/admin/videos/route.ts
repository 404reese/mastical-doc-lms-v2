
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

        // Verify instructor exists
        const instructorExists = await Instructor.findById(instructor);
        if (!instructorExists) {
            return NextResponse.json({ error: 'Instructor not found' }, { status: 404 });
        }

        // Get the module to check current videos
        const currentModule = await Module.findById(moduleId);
        if (!currentModule) {
            return NextResponse.json({ error: 'Module not found' }, { status: 404 });
        }

        let newPosition = position;
        const currentVideos = currentModule.videos || [];

        // If position is not provided or invalid, default to end
        if (newPosition === undefined || newPosition === null || newPosition < 0 || newPosition > currentVideos.length) {
            newPosition = currentVideos.length;
        }

        // Shift positions of existing videos if inserting in the middle
        if (newPosition < currentVideos.length) {
            // Find videos that need shifting (those in this module with position >= newPosition)
            await Video.updateMany(
                { _id: { $in: currentVideos }, position: { $gte: newPosition } },
                { $inc: { position: 1 } }
            );
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
            position: newPosition,
        });

        // Update module videos array
        // Insert the new video ID at the specific index
        const updatedVideosList = [...currentVideos];
        updatedVideosList.splice(newPosition, 0, video._id);

        await Module.findByIdAndUpdate(moduleId, {
            videos: updatedVideosList,
        });

        return NextResponse.json(video, { status: 201 });
    } catch (error) {
        console.error('Error creating video:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
