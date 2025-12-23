
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Instructor from '@/lib/models/Instructor';

export async function DELETE(
    req: Request,
    props: { params: Promise<{ instructorId: string }> }
) {
    try {
        await connectToDatabase();
        const params = await props.params;
        const { instructorId } = params;

        const deletedInstructor = await Instructor.findByIdAndDelete(instructorId);

        if (!deletedInstructor) {
            return NextResponse.json(
                { error: 'Instructor not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Instructor deleted successfully' });
    } catch (error) {
        console.error('Error deleting instructor:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
