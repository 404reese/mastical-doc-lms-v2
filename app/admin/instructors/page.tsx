
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
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">
                                            Edit
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
