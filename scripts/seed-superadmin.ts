/**
 * Seed Superadmin Script
 * Run with: npx tsx scripts/seed-superadmin.ts
 */

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Replicate __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in .env');
    process.exit(1);
}

// Minimal User Schema for seeding
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'superadmin'], default: 'user' },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seedSuperadmin() {
    try {
        await mongoose.connect(MONGODB_URI as string);
        console.log('Connected to MongoDB');

        const email = 'lms-admin@mastical.com';
        const password = 'DeepBlue4F@sh';

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log('Superadmin user already exists.');
            // Optional: Update role if it exists but isn't superadmin
            if (existingUser.role !== 'superadmin') {
                existingUser.role = 'superadmin';
                await existingUser.save();
                console.log('Updated existing user to superadmin role.');
            }
        } else {
            console.log('Creating superadmin user...');
            const hashedPassword = await bcrypt.hash(password, 10);

            await User.create({
                email,
                hashedPassword,
                role: 'superadmin',
                createdAt: new Date()
            });
            console.log('Superadmin user created successfully.');
        }

    } catch (error) {
        console.error('Error seeding superadmin:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

seedSuperadmin();
