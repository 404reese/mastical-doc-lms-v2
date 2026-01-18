
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Instructor {
    _id: string;
    name: string;
}

export default function NewCoursePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [instructors, setInstructors] = useState<Instructor[]>([]);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        instructor: '',
        priceINR: '',
        priceUSD: '',
        level: 'Beginner',
        category: '',
        language: 'English',
        shortDescription: '',
        duration: '', // will parse to number
        previewVideoLink: '',
        previewImageLink: '',
    });

    useEffect(() => {
        async function fetchInstructors() {
            try {
                const res = await fetch('/api/admin/instructors');
                const data = await res.json();
                setInstructors(data);
            } catch (error) {
                console.error('Failed to fetch instructors:', error);
            }
        }
        fetchInstructors();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);

        try {
            const res = await fetch('/api/upload?type=thumbnail', {
                method: 'POST',
                body: formDataUpload,
            });

            if (!res.ok) throw new Error('Upload failed');

            const data = await res.json();
            setFormData(prev => ({ ...prev, previewImageLink: data.url }));
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/admin/courses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    priceINR: Number(formData.priceINR),
                    priceUSD: Number(formData.priceUSD),
                    duration: Number(formData.duration)
                }),
            });

            if (!res.ok) throw new Error('Failed to create course');

            const course = await res.json();
            router.push(`/admin/courses/${course._id}`);
        } catch (error) {
            console.error(error);
            alert('Error creating course');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Course</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title">Course Title</Label>
                            <Input
                                id="title"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Short Description */}
                        <div className="space-y-2">
                            <Label htmlFor="shortDescription">Short Description</Label>
                            <Input
                                id="shortDescription"
                                name="shortDescription"
                                value={formData.shortDescription}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Full Description</Label>
                            <textarea
                                id="description"
                                name="description"
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Instructor */}
                            <div className="space-y-2">
                                <Label>Instructor</Label>
                                <Select
                                    onValueChange={(value) => handleSelectChange('instructor', value)}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Instructor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {instructors.map((instructor) => (
                                            <SelectItem key={instructor._id} value={instructor._id}>
                                                {instructor.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Category */}
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Input
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Price INR */}
                            <div className="space-y-2">
                                <Label htmlFor="priceINR">Price (₹ INR)</Label>
                                <Input
                                    id="priceINR"
                                    name="priceINR"
                                    type="number"
                                    min="0"
                                    value={formData.priceINR}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Price USD */}
                            <div className="space-y-2">
                                <Label htmlFor="priceUSD">Price ($ USD)</Label>
                                <Input
                                    id="priceUSD"
                                    name="priceUSD"
                                    type="number"
                                    min="0"
                                    value={formData.priceUSD}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">

                            {/* Duration */}
                            <div className="space-y-2">
                                <Label htmlFor="duration">Duration (min)</Label>
                                <Input
                                    id="duration"
                                    name="duration"
                                    type="number"
                                    min="0"
                                    value={formData.duration}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Level */}
                            <div className="space-y-2">
                                <Label>Level</Label>
                                <Select
                                    onValueChange={(value) => handleSelectChange('level', value)}
                                    defaultValue="Beginner"
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
                            {/* Preview Video */}
                            <div className="space-y-2">
                                <Label htmlFor="previewVideoLink">Preview Video Link</Label>
                                <Input
                                    id="previewVideoLink"
                                    name="previewVideoLink"
                                    placeholder="https://vimeo.com/..."
                                    value={formData.previewVideoLink}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Preview Image */}
                            <div className="space-y-2">
                                <Label htmlFor="previewImage">Preview Image</Label>
                                <div className="flex flex-col gap-2">
                                    <Input
                                        id="previewImage"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={uploadingImage}
                                    />
                                    {uploadingImage && <p className="text-sm text-muted-foreground">Uploading...</p>}
                                    {formData.previewImageLink && (
                                        <div className="relative aspect-video w-full mt-2 overflow-hidden rounded-md border">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={formData.previewImageLink}
                                                alt="Preview"
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" disabled={loading || uploadingImage}>
                                {loading ? 'Creating...' : 'Create Course'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
