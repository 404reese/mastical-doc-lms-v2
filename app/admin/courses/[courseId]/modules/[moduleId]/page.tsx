
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
import { Plus, PlayCircle, Loader2 } from 'lucide-react';
import { formatDuration } from '@/lib/utils';
interface Video {
    _id: string;
    title: string;
    description?: string;
    link?: string;
    duration: number;
    instructor?: string;
    notes?: string;
    notesUrl?: string;
    position?: number;
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
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [updating, setUpdating] = useState(false);

    const [editingVideo, setEditingVideo] = useState<Video | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        link: '',
        duration: '',
        instructor: '',
        notes: '',
        notesUrl: '',
    });
    const [editFormData, setEditFormData] = useState({
        title: '',
        description: '',
        link: '',
        duration: '',
        instructor: '',
        notes: '',
        notesUrl: '',
    });
    const [isUploading, setIsUploading] = useState(false);
    const [fetchingDuration, setFetchingDuration] = useState(false);

    // Helpers
    const fetchVimeoDuration = async (url: string): Promise<number | null> => {
        try {
            const oembedUrl = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`;
            const res = await fetch(oembedUrl);
            if (!res.ok) return null;
            const data = await res.json();
            return data.duration; // Vimeo returns duration in seconds
        } catch {
            return null;
        }
    };

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


    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        if (e.target.name === 'link' && e.target.value.includes('vimeo.com')) {
            setFetchingDuration(true);
            const duration = await fetchVimeoDuration(e.target.value);
            if (duration) {
                setFormData(prev => ({ ...prev, duration: String(duration) }));
            }
            setFetchingDuration(false);
        }
    };

    const handleSelectChange = (val: string) => {
        setFormData({ ...formData, instructor: val });
    };

    const handleEditSelectChange = (val: string) => {
        setEditFormData({ ...editFormData, instructor: val });
    };

    const handleEditChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });

        if (e.target.name === 'link' && e.target.value.includes('vimeo.com')) {
            setFetchingDuration(true);
            const duration = await fetchVimeoDuration(e.target.value);
            if (duration) {
                setEditFormData(prev => ({ ...prev, duration: String(duration) }));
            }
            setFetchingDuration(false);
        }
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

    const openEditVideo = (video: Video) => {
        setEditingVideo(video);
        setEditFormData({
            title: video.title ?? '',
            description: video.description ?? '',
            link: video.link ?? '',
            duration: video.duration != null ? String(video.duration) : '',
            instructor: video.instructor ?? '',
            notes: video.notes ?? '',
            notesUrl: video.notesUrl ?? '',
        });
        setIsEditDialogOpen(true);
    };

    const handleUpdateVideo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingVideo) return;
        setUpdating(true);
        try {
            const res = await fetch(`/api/admin/videos/${editingVideo._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: editFormData.title,
                    description: editFormData.description || undefined,
                    link: editFormData.link,
                    duration:
                        editFormData.duration === ''
                            ? undefined
                            : Number(editFormData.duration),
                    instructor: editFormData.instructor || undefined,
                    notes: editFormData.notes || undefined,
                    notesUrl: editFormData.notesUrl || undefined,
                }),
            });

            if (!res.ok) throw new Error('Failed to update video');

            const courseRes = await fetch(`/api/admin/courses/${params.courseId}`);
            const course = await courseRes.json();
            const mod = course.modules.find((m: any) => m._id === params.moduleId);
            setModuleData(mod);

            setIsEditDialogOpen(false);
            setEditingVideo(null);
            router.refresh();
        } catch (err) {
            console.error(err);
            alert('Error updating video');
        } finally {
            setUpdating(false);
        }
    };


    const handleDeleteVideo = async (videoId: string) => {
        if (!confirm('Are you sure you want to delete this video?')) return;
        try {
            const res = await fetch(`/api/admin/videos/${videoId}`, { method: 'DELETE' });
            if (res.ok) {
                setModuleData((prev) =>
                    prev ? { ...prev, videos: prev.videos.filter((v) => v._id !== videoId) } : null
                );
            } else {
                alert('Failed to delete video');
            }
        } catch (error) {
            console.error('Failed to delete video:', error);
            alert('Failed to delete video');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!moduleData) return <div>Module not found</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Module: {moduleData.title}</h1>
                    <p className="text-muted-foreground">Manage videos and content for this module.</p>
                </div>
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Edit Video</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleUpdateVideo} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input name="title" value={editFormData.title} onChange={handleEditChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Video Link (URL)</Label>
                                <Input name="link" value={editFormData.link} onChange={handleEditChange} required placeholder="https://..." />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Duration (minutes)</Label>
                                    <div className="relative">
                                        <Input name="duration" type="number" value={editFormData.duration} onChange={handleEditChange} />
                                        {fetchingDuration && <Loader2 className="h-4 w-4 absolute right-3 top-2.5 animate-spin text-muted-foreground" />}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Instructor</Label>
                                    <Select value={editFormData.instructor} onValueChange={handleEditSelectChange}>
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
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Input name="description" value={editFormData.description} onChange={handleEditChange} />
                            </div>
                            <div className="space-y-2">
                                <Label>Notes URL</Label>
                                <Input name="notesUrl" value={editFormData.notesUrl} onChange={handleEditChange} placeholder="https://..." />
                            </div>
                            <div className="space-y-2">
                                <Label>Additional Notes (Text)</Label>
                                <Input name="notes" value={editFormData.notes} onChange={handleEditChange} />
                            </div>
                            <Button type="submit" className="w-full" disabled={updating}>
                                {updating ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
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
                                    <Label>Duration (seconds)</Label>
                                    <div className="relative">
                                        <Input name="duration" type="number" value={formData.duration} onChange={handleChange} />
                                        {fetchingDuration && <Loader2 className="h-4 w-4 absolute right-3 top-2.5 animate-spin text-muted-foreground" />}
                                    </div>
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

            <div className="bg-white rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {moduleData.videos && moduleData.videos.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center py-10">
                                    No videos in this module yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            moduleData.videos?.map((video) => (
                                <TableRow key={video._id}>
                                    <TableCell className="font-medium group flex items-center gap-3">
                                        <div className="bg-slate-100 p-2 rounded-full">
                                            <PlayCircle className="w-5 h-5 text-slate-600" />
                                        </div>
                                        <span>{video.title}</span>
                                    </TableCell>
                                    <TableCell>{formatDuration(video.duration)}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800"
                                            onClick={() => openEditVideo(video)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800"
                                            onClick={() => handleDeleteVideo(video._id)}
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
        </div >
    );
}
