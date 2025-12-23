import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
    email: string;
    hashedPassword: string;
    role: "user" | "admin" | "superadmin";
    purchasedCourses: mongoose.Types.ObjectId[];
    createdAt: Date;
}

const UserSchema: Schema<IUser> = new Schema({
    email: {
        type: String,
        required: [true, "Please provide an email for this user."],
        unique: true,
    },
    hashedPassword: {
        type: String,
        required: [true, "Please provide a password for this user."],
    },
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        default: "user",
    },
    purchasedCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
