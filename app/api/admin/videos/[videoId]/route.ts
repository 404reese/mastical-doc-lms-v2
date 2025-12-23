import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Video from '@/lib/models/Video';
import Module from '@/lib/models/Module';
import Instructor from '@/lib/models/Instructor';

type Params = Promise<{ videoId: string }>;

const VIDEO_UPDATABLE_FIELDS = [
    'title',
    'description',
    'link',
    'duration',
    'moduleId',
    'instructor',
    'notes',
    'notesUrl',
    'position',
] as const;

type VideoUpdatableField = (typeof VIDEO_UPDATABLE_FIELDS)[number];

function pickVideoUpdates(body: Record<string, unknown>) {
    const updates: Record<VideoUpdatableField, unknown> = {} as any;
    for (const key of VIDEO_UPDATABLE_FIELDS) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
            (updates as any)[key] = (body as any)[key];
        }
    }
    return updates;
}

export async function PUT(req: Request, { params }: { params: Params }) {
    try {
        await connectToDatabase();
        const { videoId } = await params;
        const body = await req.json();

        const existing = await Video.findById(videoId);
        if (!existing) {
            return NextResponse.json({ error: 'Video not found' }, { status: 404 });
        }

        const updates = pickVideoUpdates(body ?? {});

        if (updates.moduleId) {
            const moduleExists = await Module.findById(updates.moduleId);
            if (!moduleExists) {
                return NextResponse.json({ error: 'Module not found' }, { status: 404 });
            }
        }

        if (updates.instructor) {
            const instructorExists = await Instructor.findById(updates.instructor);
            if (!instructorExists) {
                return NextResponse.json({ error: 'Instructor not found' }, { status: 404 });
            }
        }

        // If moduleId changes, keep Module.videos arrays consistent.
        if (
            updates.moduleId &&
            String(updates.moduleId) !== String(existing.moduleId)
        ) {
            await Module.findByIdAndUpdate(existing.moduleId, {
                $pull: { videos: existing._id },
            });
            await Module.findByIdAndUpdate(updates.moduleId, {
                $addToSet: { videos: existing._id },
            });
        }

        const updatedVideo = await Video.findByIdAndUpdate(videoId, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedVideo) {
            return NextResponse.json({ error: 'Video not found' }, { status: 404 });
        }


        return NextResponse.json(updatedVideo);
    } catch (error) {
        console.error('Error updating video:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    props: { params: Params }
) {
    try {
        await connectToDatabase();
        const params = await props.params;
        const { videoId } = params;

        const videoToDelete = await Video.findById(videoId);

        if (!videoToDelete) {
            return NextResponse.json({ error: 'Video not found' }, { status: 404 });
        }

        // Remove video reference from Module
        await Module.findByIdAndUpdate(videoToDelete.moduleId, {
            $pull: { videos: videoId },
        });

        // Delete the video itself
        await Video.findByIdAndDelete(videoId);

        return NextResponse.json({ message: 'Video deleted successfully' });
    } catch (error) {
        console.error('Error deleting video:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
