
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IModule extends Document {
    title: string;
    courseId: mongoose.Types.ObjectId;
    videos: mongoose.Types.ObjectId[];
    position: number;
    createdAt: Date;
    updatedAt: Date;
}

const ModuleSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
        videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
        position: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Module: Model<IModule> =
    mongoose.models.Module || mongoose.model<IModule>('Module', ModuleSchema);

export default Module;
