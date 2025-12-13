
'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Plus, PlayCircle } from 'lucide-react';

interface Video {
    _id: string;
    title: string;
    duration: number;
}

interface Module {
    _id: string;
    title: string;
    videos: Video[];
}

interface Instructor {
    _id: string;
    name: string;
}

export default function ModulePage(props: { params: Promise<{ courseId: string; moduleId: string }> }) {
    const params = use(props.params);
    const router = useRouter();

    const [moduleData, setModuleData] = useState<Module | null>(null);
    const [instructors, setInstructors] = useState<Instructor[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        link: '',
        duration: '',
        instructor: '',
        notes: '',
        notesUrl: '',
    });
    const [isUploading, setIsUploading] = useState(false);

    // Fetch data function needs to be improved because we don't have a direct API to get ONE module. 
    // We only implemented Create Module.
    // The Course API: GET /api/admin/courses/[id] populates modules and videos.
    // So we can fetch the course and find the module.
    // OR create a specific GET /api/admin/modules/[id] endpoint. 
    // Given I didn't create that endpoint in the plan, I'll fetch the COURSE and then filter.
    // This is slightly inefficient but works for now as per plan constraints.

    useEffect(() => {
        async function fetchData() {
            try {
                const [courseRes, instructorsRes] = await Promise.all([
                    fetch(`/api/admin/courses/${params.courseId}`),
                    fetch('/api/admin/instructors')
                ]);

                if (courseRes.ok) {
                    const course = await courseRes.json();
                    const mod = course.modules.find((m: any) => m._id === params.moduleId);
                    setModuleData(mod || null);
                }

                if (instructorsRes.ok) {
                    const instData = await instructorsRes.json();
                    setInstructors(instData);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [params.courseId, params.moduleId]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (val: string) => {
        setFormData({ ...formData, instructor: val });
    };


    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const uploadData = new FormData();
        uploadData.append('file', file);

        try {
            const res = await fetch(`/api/upload?courseId=${params.courseId}`, {
                method: 'POST',
                body: uploadData,
            });

            if (!res.ok) throw new Error('Upload failed');

            const data = await res.json();
            setFormData(prev => ({ ...prev, notesUrl: data.url }));
        } catch (error) {
            console.error('Upload Error:', error);
            alert('Failed to upload file');
        } finally {
            setIsUploading(false);
        }
    };

    const handleCreateVideo = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch('/api/admin/videos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    moduleId: params.moduleId,
                    duration: Number(formData.duration),
                    position: moduleData?.videos.length || 0
                })
            });

            if (!res.ok) throw new Error('Failed');

            // Refresh page data
            const courseRes = await fetch(`/api/admin/courses/${params.courseId}`);
            const course = await courseRes.json();
            const mod = course.modules.find((m: any) => m._id === params.moduleId);
            setModuleData(mod);

            setIsDialogOpen(false);
            // Reset form
            setFormData({
                title: '',
                description: '',
                link: '',
                duration: '',
                instructor: '',
                notes: '',
                notesUrl: '',
            });
            router.refresh();

        } catch (err) {
            console.error(err);
            alert('Error creating video');
        } finally {
            setSubmitting(false);
        }
    }


    if (loading) return <div>Loading...</div>;
    if (!moduleData) return <div>Module not found</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Module: {moduleData.title}</h1>
                    <p className="text-muted-foreground">Manage videos and content for this module.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Video
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Add New Video</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCreateVideo} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input name="title" value={formData.title} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Video Link (URL)</Label>
                                <Input name="link" value={formData.link} onChange={handleChange} required placeholder="https://..." />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Duration (min)</Label>
                                    <Input name="duration" type="number" value={formData.duration} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Instructor</Label>
                                    <Select onValueChange={handleSelectChange} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Instructor" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {instructors.map(inst => (
                                                <SelectItem key={inst._id} value={inst._id}>{inst.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Input name="description" value={formData.description} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label>Upload Notes (PDF/Doc) - Drag & Drop supported</Label>
                                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                                    <Input
                                        type="file"
                                        onChange={handleFileUpload}
                                        accept=".pdf,.doc,.docx"
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <Label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                                        {isUploading ? (
                                            <span className="text-blue-600 font-medium">Uploading...</span>
                                        ) : (
                                            <>
                                                <span className="text-gray-600 font-medium">Click to upload or drag file here</span>
                                                <span className="text-xs text-gray-400 mt-1">PDF, DOC up to 10MB</span>
                                            </>
                                        )}
                                    </Label>
                                </div>
                                {formData.notesUrl && (
                                    <div className="text-xs text-green-600 mt-1 truncate">
                                        Uploaded: {formData.notesUrl}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label>Additional Notes (Text)</Label>
                                <Input name="notes" value={formData.notes} onChange={handleChange} />
                            </div>
                            <Button type="submit" className="w-full" disabled={submitting}>
                                {submitting ? 'Adding...' : 'Add Video'}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4">
                {moduleData.videos && moduleData.videos.length === 0 ? (
                    <p className="text-muted-foreground py-10">No videos in this module yet.</p>
                ) : (
                    moduleData.videos?.map((video) => (
                        <Card key={video._id}>
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="bg-slate-100 p-3 rounded-full">
                                    <PlayCircle className="w-6 h-6 text-slate-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold">{video.title}</h3>
                                    <p className="text-sm text-muted-foreground">{video.duration} mins</p>
                                </div>
                                <Button variant="ghost" size="sm">Edit</Button>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div >
    );
}
