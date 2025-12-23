
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Course {
    _id: string;
    title: string;
    category: string;
    level: string;
    priceINR: number;
    priceUSD: number;
    enrollments: number;
    courseId: string; // Assuming we use _id as the link mostly
}

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const res = await fetch('/api/admin/courses');
                const data = await res.json();
                setCourses(data);
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchCourses();
    }, []);

    const handleDelete = async (courseId: string) => {
        if (!confirm('Are you sure you want to delete this course?')) return;
        try {
            const res = await fetch(`/api/admin/courses/${courseId}`, { method: 'DELETE' });
            if (res.ok) {
                setCourses((prev) => prev.filter((c) => c._id !== courseId));
            } else {
                alert('Failed to delete course');
            }
        } catch (error) {
            console.error('Failed to delete course:', error);
            alert('Failed to delete course');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Courses</h1>
                <Link href="/admin/courses/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Course
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Level</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Enrollments</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : courses.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10">
                                    No courses found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            courses.map((course) => (
                                <TableRow key={course._id}>
                                    <TableCell className="font-medium">
                                        <Link href={`/admin/courses/${course._id}`} className="hover:underline">
                                            {course.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{course.category}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{course.level}</Badge>
                                    </TableCell>
                                    <TableCell>₹{course.priceINR} / ${course.priceUSD}</TableCell>
                                    <TableCell>{course.enrollments}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Link href={`/admin/courses/${course._id}`}>
                                            <Button variant="ghost" size="sm" className="bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800">
                                                Manage
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800"
                                            onClick={() => handleDelete(course._id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
