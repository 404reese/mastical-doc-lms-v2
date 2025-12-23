import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVideoProgress extends Document {
    userId: mongoose.Types.ObjectId;
    courseId: mongoose.Types.ObjectId;
    completedVideos: mongoose.Types.ObjectId[];
    lastWatchedVideoId?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const VideoProgressSchema: Schema<IVideoProgress> = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        completedVideos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video",
            },
        ],
        lastWatchedVideoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
        },
    },
    { timestamps: true }
);

// Compound index for efficient lookups
VideoProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const VideoProgress: Model<IVideoProgress> =
    mongoose.models.VideoProgress ||
    mongoose.model<IVideoProgress>("VideoProgress", VideoProgressSchema);

export default VideoProgress;
