"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users } from "lucide-react";

interface Instructor {
    _id: string;
    name: string;
    avatar?: string;
    bio?: string;
    expertise?: string;
}

interface InstructorsPopupProps {
    instructors: Instructor[];
}

export default function InstructorsPopup({ instructors }: InstructorsPopupProps) {
    const [open, setOpen] = useState(false);

    // Remove duplicates based on _id
    const uniqueInstructors = instructors.reduce((acc: Instructor[], instructor) => {
        if (!acc.find(i => i._id === instructor._id)) {
            acc.push(instructor);
        }
        return acc;
    }, []);

    if (uniqueInstructors.length === 0) {
        return null;
    }

    return (
        <section className="mb-12">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                        <Users className="w-4 h-4" />
                        View Instructors ({uniqueInstructors.length})
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-gray-900">
                            Course Instructors
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6 mt-4">
                        {uniqueInstructors.map((instructor) => (
                            <div
                                key={instructor._id}
                                className="flex flex-col md:flex-row gap-4 items-start p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                            >
                                <img
                                    src={instructor.avatar || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"}
                                    alt={instructor.name}
                                    className="w-20 h-20 rounded-full object-cover flex-shrink-0 border-2 border-white shadow-md"
                                />
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-blue-600 mb-1">
                                        {instructor.name}
                                    </h3>
                                    {instructor.expertise && (
                                        <span className="inline-block text-sm font-medium text-gray-700 bg-blue-100 px-2 py-0.5 rounded mb-2">
                                            {instructor.expertise}
                                        </span>
                                    )}
                                    {instructor.bio && (
                                        <p className="text-sm text-gray-600 leading-relaxed mt-2">
                                            {instructor.bio}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
}
