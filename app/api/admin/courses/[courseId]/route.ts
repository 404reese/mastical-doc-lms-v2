
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Course from '@/lib/models/Course';
import Module from '@/lib/models/Module';
import Video from '@/lib/models/Video';
import Instructor from '@/lib/models/Instructor';

type Params = Promise<{ courseId: string }>;

const COURSE_UPDATABLE_FIELDS = [
    'title',
    'description',
    'instructor',
    'priceINR',
    'priceUSD',
    'requirements',
    'language',
    'shortDescription',
    'duration',
    'level',
    'category',
    'previewVideoLink',
    'previewImageLink',
] as const;

type CourseUpdatableField = (typeof COURSE_UPDATABLE_FIELDS)[number];

function pickCourseUpdates(body: Record<string, unknown>) {
    const updates: Record<CourseUpdatableField, unknown> = {} as any;
    for (const key of COURSE_UPDATABLE_FIELDS) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
            (updates as any)[key] = (body as any)[key];
        }
    }
    return updates;
}

export async function GET(req: Request, { params }: { params: Params }) {
    try {
        await connectToDatabase();
        const { courseId } = await params;

        const course = await Course.findById(courseId)
            .populate('instructor', 'name bio avatar')
            .populate({
                path: 'modules',
                populate: {
                    path: 'videos',
                    model: 'Video',
                },
            });

        if (!course) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        return NextResponse.json(course);
    } catch (error) {
        console.error('Error fetching course:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Params }) {
    try {
        await connectToDatabase();
        const { courseId } = await params;
        const body = await req.json();

        const updates = pickCourseUpdates(body ?? {});

        if (updates.instructor) {
            const instructorExists = await Instructor.findById(updates.instructor);
            if (!instructorExists) {
                return NextResponse.json({ error: 'Instructor not found' }, { status: 404 });
            }
        }

        const updatedCourse = await Course.findByIdAndUpdate(courseId, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedCourse) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        return NextResponse.json(updatedCourse);
    } catch (error) {
        console.error('Error updating course:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Params }) {
    try {
        await connectToDatabase();
        const { courseId } = await params;

        const course = await Course.findById(courseId);
        if (!course) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        // Cascade delete modules and videos?
        // For now, let's just delete the course.
        // Ideally, we should find all modules and delete them, and their videos.
        // Implementation:
        const modules = await Module.find({ courseId: course._id });
        for (const mod of modules) {
            await Video.deleteMany({ moduleId: mod._id });
            await Module.findByIdAndDelete(mod._id);
        }

        await Course.findByIdAndDelete(courseId);

        return NextResponse.json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error deleting course:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
