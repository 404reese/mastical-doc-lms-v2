
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Module from '@/lib/models/Module';
import Course from '@/lib/models/Course';
import Video from '@/lib/models/Video';


export async function PUT(
    req: Request,
    props: { params: Promise<{ moduleId: string }> }
) {
    try {
        await connectToDatabase();
        const params = await props.params;
        const { moduleId } = params;
        const body = await req.json();
        const { videos } = body;

        const moduleToUpdate = await Module.findById(moduleId);

        if (!moduleToUpdate) {
            return NextResponse.json({ error: 'Module not found' }, { status: 404 });
        }

        if (videos && Array.isArray(videos)) {
            // Update module videos array
            await Module.findByIdAndUpdate(moduleId, { videos });

            // Update position for each video to match the new order
            const updatePromises = videos.map((videoId: string, index: number) => {
                return Video.findByIdAndUpdate(videoId, { position: index });
            });
            await Promise.all(updatePromises);
        }

        const updatedModule = await Module.findById(moduleId).populate('videos');
        return NextResponse.json(updatedModule);
    } catch (error) {
        console.error('Error updating module:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    props: { params: Promise<{ moduleId: string }> }
) {
    try {
        await connectToDatabase();
        const params = await props.params;
        const { moduleId } = params;

        const moduleToDelete = await Module.findById(moduleId);

        if (!moduleToDelete) {
            return NextResponse.json({ error: 'Module not found' }, { status: 404 });
        }

        // Delete all videos in the module
        await Video.deleteMany({ moduleId });

        // Remove module reference from Course
        await Course.findByIdAndUpdate(moduleToDelete.courseId, {
            $pull: { modules: moduleId },
        });

        // Delete the module itself
        await Module.findByIdAndDelete(moduleId);

        return NextResponse.json({ message: 'Module deleted successfully' });
    } catch (error) {
        console.error('Error deleting module:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
