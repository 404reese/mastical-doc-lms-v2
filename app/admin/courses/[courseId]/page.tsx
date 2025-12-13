
'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Video as VideoIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Module {
    _id: string;
    title: string;
    position: number;
}

interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    level: string;
    modules: Module[];
}

export default function CourseDetailPage(props: { params: Promise<{ courseId: string }> }) {
    const params = use(props.params); // Unwrap params
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [moduleTitle, setModuleTitle] = useState('');
    const [creatingModule, setCreatingModule] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function fetchCourse() {
            try {
                const res = await fetch(`/api/admin/courses/${params.courseId}`);
                if (!res.ok) throw new Error('Failed to fetch course');
                const data = await res.json();
                setCourse(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchCourse();
    }, [params.courseId]);

    const handleCreateModule = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreatingModule(true);
        try {
            const res = await fetch('/api/admin/modules', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: moduleTitle,
                    courseId: params.courseId,
                    position: course?.modules.length || 0,
                }),
            });

            if (!res.ok) throw new Error('Failed to create module');

            const newModule = await res.json();

            // Update local state or refresh
            setCourse((prev) =>
                prev ? { ...prev, modules: [...prev.modules, newModule] } : null
            );
            setModuleTitle('');
            setIsDialogOpen(false);
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Failed to create module');
        } finally {
            setCreatingModule(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!course) return <div>Course not found</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold">{course.title}</h1>
                    <p className="text-muted-foreground mt-2">{course.description}</p>
                    <div className="flex gap-2 mt-4">
                        <Badge>{course.level}</Badge>
                        <Badge variant="outline">${course.price}</Badge>
                    </div>
                </div>
                <Button variant="outline">Edit Course</Button>
            </div>

            <div className="flex justify-between items-center mt-8">
                <h2 className="text-2xl font-semibold">Modules</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Module
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Module</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCreateModule} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="moduleTitle">Module Title</Label>
                                <Input
                                    id="moduleTitle"
                                    value={moduleTitle}
                                    onChange={(e) => setModuleTitle(e.target.value)}
                                    placeholder="Ex: Introduction to Next.js"
                                    required
                                />
                            </div>
                            <Button type="submit" disabled={creatingModule} className="w-full">
                                {creatingModule ? 'Creating...' : 'Create Module'}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4">
                {course.modules.length === 0 ? (
                    <p className="text-muted-foreground text-center py-10">No modules yet. Create one to get started.</p>
                ) : (
                    course.modules.map((module) => (
                        <Link key={module._id} href={`/admin/courses/${params.courseId}/modules/${module._id}`}>
                            <Card className="hover:bg-slate-50 transition-colors cursor-pointer">
                                <CardContent className="p-6 flex items-center justify-between">
                                    <span className="font-medium text-lg">{module.title}</span>
                                    <div className="flex items-center text-muted-foreground">
                                        <VideoIcon className="w-4 h-4 mr-2" />
                                        <span>Manage Content</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
