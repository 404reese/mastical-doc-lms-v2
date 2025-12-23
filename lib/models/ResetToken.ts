import mongoose, { Schema, Document, Model } from "mongoose";

export interface IResetToken extends Document {
    userId: mongoose.Types.ObjectId;
    tokenHash: string;
    expiresAt: Date;
}

const ResetTokenSchema: Schema<IResetToken> = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tokenHash: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
});

// Create a TTL index to automatically delete documents 0 seconds after `expiresAt`
ResetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const ResetToken: Model<IResetToken> =
    mongoose.models.ResetToken ||
    mongoose.model<IResetToken>("ResetToken", ResetTokenSchema);

export default ResetToken;
