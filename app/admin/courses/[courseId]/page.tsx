
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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
    instructor: string | { _id: string; name: string };
    priceINR: number;
    priceUSD: number;
    level: string;
    category?: string;
    language?: string;
    shortDescription?: string;
    duration?: number;
    previewVideoLink?: string;
    previewImageLink?: string;
    requirements?: string[];
    modules: Module[];
}

interface Instructor {
    _id: string;
    name: string;
}

export default function CourseDetailPage(props: { params: Promise<{ courseId: string }> }) {
    const params = use(props.params); // Unwrap params
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);

    const [instructors, setInstructors] = useState<Instructor[]>([]);
    const [isEditCourseOpen, setIsEditCourseOpen] = useState(false);
    const [savingCourse, setSavingCourse] = useState(false);
    const [courseForm, setCourseForm] = useState({
        title: '',
        shortDescription: '',
        description: '',
        instructor: '',
        category: '',
        language: '',
        level: '',
        priceINR: '',
        priceUSD: '',
        duration: '',
        previewVideoLink: '',
        previewImageLink: '',
        requirementsText: '',
    });

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

    useEffect(() => {
        async function fetchInstructors() {
            try {
                const res = await fetch('/api/admin/instructors');
                if (!res.ok) return;
                const data = await res.json();
                setInstructors(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchInstructors();
    }, []);

    useEffect(() => {
        if (!course) return;
        const instructorId =
            typeof course.instructor === 'string'
                ? course.instructor
                : course.instructor?._id;

        setCourseForm({
            title: course.title ?? '',
            shortDescription: course.shortDescription ?? '',
            description: course.description ?? '',
            instructor: instructorId ?? '',
            category: course.category ?? '',
            language: course.language ?? '',
            level: course.level ?? '',
            priceINR: String(course.priceINR ?? ''),
            priceUSD: String(course.priceUSD ?? ''),
            duration: course.duration != null ? String(course.duration) : '',
            previewVideoLink: course.previewVideoLink ?? '',
            previewImageLink: course.previewImageLink ?? '',
            requirementsText: (course.requirements ?? []).join(', '),
        });
    }, [course]);

    const handleCourseFieldChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setCourseForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCourseSelectChange = (name: string, value: string) => {
        setCourseForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateCourse = async (e: React.FormEvent) => {
        e.preventDefault();
        setSavingCourse(true);
        try {
            const requirements = courseForm.requirementsText
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean);

            const res = await fetch(`/api/admin/courses/${params.courseId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: courseForm.title,
                    shortDescription: courseForm.shortDescription || undefined,
                    description: courseForm.description,
                    instructor: courseForm.instructor,
                    category: courseForm.category || undefined,
                    language: courseForm.language || undefined,
                    level: courseForm.level || undefined,
                    priceINR:
                        courseForm.priceINR === '' ? undefined : Number(courseForm.priceINR),
                    priceUSD:
                        courseForm.priceUSD === '' ? undefined : Number(courseForm.priceUSD),
                    duration:
                        courseForm.duration === ''
                            ? undefined
                            : Number(courseForm.duration),
                    previewVideoLink: courseForm.previewVideoLink || undefined,
                    previewImageLink: courseForm.previewImageLink || undefined,
                    requirements: requirements.length ? requirements : undefined,
                }),
            });

            if (!res.ok) throw new Error('Failed to update course');

            // Re-fetch full course so modules/videos stay populated
            const refreshed = await fetch(`/api/admin/courses/${params.courseId}`);
            if (refreshed.ok) {
                const data = await refreshed.json();
                setCourse(data);
            }

            setIsEditCourseOpen(false);
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Failed to update course');
        } finally {
            setSavingCourse(false);
        }
    };

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

    const handleDeleteModule = async (moduleId: string) => {
        if (!confirm('Are you sure you want to delete this module? All videos in it will be lost.')) return;
        try {
            const res = await fetch(`/api/admin/modules/${moduleId}`, { method: 'DELETE' });
            if (res.ok) {
                setCourse((prev) =>
                    prev ? { ...prev, modules: prev.modules.filter((m) => m._id !== moduleId) } : null
                );
            } else {
                alert('Failed to delete module');
            }
        } catch (error) {
            console.error('Failed to delete module:', error);
            alert('Failed to delete module');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold">{course.title}</h1>
                    <p className="text-muted-foreground mt-2">{course.description}</p>
                    <div className="flex gap-2 mt-4">
                        <Badge>{course.level}</Badge>
                        <Badge variant="outline">₹{course.priceINR} / ${course.priceUSD}</Badge>
                    </div>
                </div>
                <Dialog open={isEditCourseOpen} onOpenChange={setIsEditCourseOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">Edit Course</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Edit Course</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleUpdateCourse} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Course Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={courseForm.title}
                                    onChange={handleCourseFieldChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="shortDescription">Short Description</Label>
                                <Input
                                    id="shortDescription"
                                    name="shortDescription"
                                    value={courseForm.shortDescription}
                                    onChange={handleCourseFieldChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Full Description</Label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={courseForm.description}
                                    onChange={handleCourseFieldChange}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Instructor</Label>
                                    <Select
                                        value={courseForm.instructor}
                                        onValueChange={(value) =>
                                            handleCourseSelectChange('instructor', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Instructor" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {instructors.map((inst) => (
                                                <SelectItem key={inst._id} value={inst._id}>
                                                    {inst.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Input
                                        id="category"
                                        name="category"
                                        value={courseForm.category}
                                        onChange={handleCourseFieldChange}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="priceINR">Price (₹ INR)</Label>
                                    <Input
                                        id="priceINR"
                                        name="priceINR"
                                        type="number"
                                        min="0"
                                        value={courseForm.priceINR}
                                        onChange={handleCourseFieldChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="priceUSD">Price ($ USD)</Label>
                                    <Input
                                        id="priceUSD"
                                        name="priceUSD"
                                        type="number"
                                        min="0"
                                        value={courseForm.priceUSD}
                                        onChange={handleCourseFieldChange}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="duration">Duration (min)</Label>
                                    <Input
                                        id="duration"
                                        name="duration"
                                        type="number"
                                        min="0"
                                        value={courseForm.duration}
                                        onChange={handleCourseFieldChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Level</Label>
                                    <Select
                                        value={courseForm.level}
                                        onValueChange={(value) =>
                                            handleCourseSelectChange('level', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Beginner">Beginner</SelectItem>
                                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                                            <SelectItem value="Advanced">Advanced</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="language">Language</Label>
                                    <Input
                                        id="language"
                                        name="language"
                                        value={courseForm.language}
                                        onChange={handleCourseFieldChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="requirementsText">Requirements (comma-separated)</Label>
                                    <Input
                                        id="requirementsText"
                                        name="requirementsText"
                                        value={courseForm.requirementsText}
                                        onChange={handleCourseFieldChange}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="previewVideoLink">Preview Video Link</Label>
                                    <Input
                                        id="previewVideoLink"
                                        name="previewVideoLink"
                                        value={courseForm.previewVideoLink}
                                        onChange={handleCourseFieldChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="previewImageLink">Preview Image Link</Label>
                                    <Input
                                        id="previewImageLink"
                                        name="previewImageLink"
                                        value={courseForm.previewImageLink}
                                        onChange={handleCourseFieldChange}
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full" disabled={savingCourse}>
                                {savingCourse ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
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

            <div className="bg-white rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {course.modules.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={2} className="text-center py-10">
                                    No modules yet. Create one to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            course.modules.map((module) => (
                                <TableRow key={module._id}>
                                    <TableCell className="font-medium text-lg">
                                        {module.title}
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Link href={`/admin/courses/${params.courseId}/modules/${module._id}`}>
                                            <Button variant="ghost" size="sm" className="bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800">
                                                <VideoIcon className="w-4 h-4 mr-2" />
                                                Manage Content
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800"
                                            onClick={() => handleDeleteModule(module._id)}
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
