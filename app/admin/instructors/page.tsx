
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Instructor {
    _id: string;
    name: string;
    expertise: string;
    avatar: string;
}

export default function InstructorsPage() {
    const [instructors, setInstructors] = useState<Instructor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchInstructors() {
            try {
                const res = await fetch('/api/admin/instructors');
                const data = await res.json();
                setInstructors(data);
            } catch (error) {
                console.error('Failed to fetch instructors:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchInstructors();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this instructor?')) return;
        try {
            const res = await fetch(`/api/admin/instructors/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setInstructors((prev) => prev.filter((inst) => inst._id !== id));
            } else {
                alert('Failed to delete instructor');
            }
        } catch (error) {
            console.error('Failed to delete instructor:', error);
            alert('Failed to delete instructor');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Instructors</h1>
                <Link href="/admin/instructors/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Instructor
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Avatar</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Expertise</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-10">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : instructors.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-10">
                                    No instructors found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            instructors.map((instructor) => (
                                <TableRow key={instructor._id}>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={instructor.avatar} alt={instructor.name} />
                                            <AvatarFallback>{instructor.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="font-medium">{instructor.name}</TableCell>
                                    <TableCell>{instructor.expertise}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="ghost" size="sm" className="bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800">
                                            Edit
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800"
                                            onClick={() => handleDelete(instructor._id)}
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
