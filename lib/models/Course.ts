
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICourse extends Document {
    title: string;
    description: string;
    instructor: mongoose.Types.ObjectId;
    price: number;
    requirements?: string[];
    language?: string;
    shortDescription?: string;
    duration?: number;
    level?: string;
    category?: string;
    previewVideoLink?: string;
    previewImageLink?: string;
    modules: mongoose.Types.ObjectId[];
    enrollments: number;
    createdAt: Date;
    updatedAt: Date;
}

const CourseSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        instructor: { type: Schema.Types.ObjectId, ref: 'Instructor', required: true },
        price: { type: Number, default: 0 },
        requirements: { type: [String] },
        language: { type: String },
        shortDescription: { type: String },
        duration: { type: Number }, // in minutes or hours? Let's assume minutes for now or string/float. User schema says just "duration".
        level: { type: String },
        category: { type: String },
        previewVideoLink: { type: String },
        previewImageLink: { type: String },
        modules: [{ type: Schema.Types.ObjectId, ref: 'Module' }],
        enrollments: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Course: Model<ICourse> =
    mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);

export default Course;
