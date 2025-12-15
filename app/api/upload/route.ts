
import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";
import connectToDatabase from "@/lib/db";
import Course from "@/lib/models/Course";

// Initialize storage client
// Expects credentials in environment variables:
// GCP_PROJECT_ID, GCP_CLIENT_EMAIL, GCP_PRIVATE_KEY, GCP_BUCKET_NAME
const storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    credentials: {
        client_email: process.env.GCP_CLIENT_EMAIL,
        private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n"), // Handle newlines in private key
    },
});

const bucketName = process.env.GCP_BUCKET_NAME;

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        if (!bucketName) {
            console.error("GCP_BUCKET_NAME is not defined");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        // Get parameters from query params
        const { searchParams } = new URL(req.url);
        const uploadType = searchParams.get("type") || "notes"; // Default to notes
        const courseId = searchParams.get("courseId");

        let folderPath = "";

        if (uploadType === "instructor") {
            // Upload to instructor/ folder
            folderPath = "instructor";
        } else {
            // Upload to notes/{course_name}/ folder
            let courseName = "temp";

            if (courseId) {
                try {
                    await connectToDatabase();
                    const course = await Course.findById(courseId);
                    if (course) {
                        // Sanitize course title for use as folder name
                        courseName = course.title
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/^-+|-+$/g, "");
                    }
                } catch (dbError) {
                    console.error("Error fetching course:", dbError);
                    // Continue with "temp" folder on DB error
                }
            }

            folderPath = `notes/${courseName}`;
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const timestamp = Date.now();
        const sanitizedFileName = file.name.replace(/\s+/g, "_");

        // Upload to appropriate folder structure
        const fileName = `${folderPath}/${timestamp}-${sanitizedFileName}`;

        const bucket = storage.bucket(bucketName);
        const blob = bucket.file(fileName);
        const blobStream = blob.createWriteStream({
            resumable: false,
            metadata: {
                contentType: file.type,
            },
        });

        return new Promise<Response>((resolve) => {
            blobStream.on("error", (err) => {
                console.error("Upload error:", err);
                resolve(NextResponse.json({ error: "Upload failed" }, { status: 500 }));
            });

            blobStream.on("finish", () => {
                // Public URL with folder structure
                const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
                resolve(NextResponse.json({ url: publicUrl }));
            });

            blobStream.end(buffer);
        });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
