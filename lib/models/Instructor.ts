
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInstructor extends Document {
    name: string;
    bio?: string;
    avatar?: string;
    expertise?: string;
    createdAt: Date;
    updatedAt: Date;
}

const InstructorSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        bio: { type: String },
        avatar: { type: String },
        expertise: { type: String },
    },
    { timestamps: true }
);

const Instructor: Model<IInstructor> =
    mongoose.models.Instructor || mongoose.model<IInstructor>('Instructor', InstructorSchema);

export default Instructor;
