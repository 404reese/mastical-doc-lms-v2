
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVideo extends Document {
    title: string;
    description: string;
    link: string;
    duration?: number;
    moduleId: mongoose.Types.ObjectId;
    instructor: mongoose.Types.ObjectId;
    notes?: string;
    notesUrl?: string;
    position: number;
    createdAt: Date;
    updatedAt: Date;
}

const VideoSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        link: { type: String, required: true },
        duration: { type: Number },
        moduleId: { type: Schema.Types.ObjectId, ref: 'Module', required: true },
        instructor: { type: Schema.Types.ObjectId, ref: 'Instructor', required: true },
        notes: { type: String }, // Plain text notes
        notesUrl: { type: String }, // URL to uploaded notes in GCP
        position: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Video: Model<IVideo> =
    mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema);

export default Video;
