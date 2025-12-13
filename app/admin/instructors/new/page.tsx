
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function NewInstructorPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        expertise: '',
        bio: '',
        avatar: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const uploadData = new FormData();
        uploadData.append('file', file);

        try {
            const res = await fetch('/api/upload?type=instructor', {
                method: 'POST',
                body: uploadData,
            });

            if (!res.ok) throw new Error('Upload failed');

            const data = await res.json();
            setFormData(prev => ({ ...prev, avatar: data.url }));
        } catch (error) {
            console.error('Upload Error:', error);
            alert('Failed to upload image');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/admin/instructors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Failed to create instructor');

            router.push('/admin/instructors');
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Error creating instructor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Add New Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Ex: John Doe"
                                required
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="expertise">Expertise</Label>
                            <Input
                                id="expertise"
                                name="expertise"
                                placeholder="Ex: Senior Full Stack Developer"
                                value={formData.expertise}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Avatar Image</Label>
                            <div className="flex items-center gap-4">
                                {formData.avatar && (
                                    <Avatar className="w-16 h-16">
                                        <AvatarImage src={formData.avatar} />
                                        <AvatarFallback>{formData.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                )}
                                <div className="flex-1">
                                    <div className="border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                                        <Input
                                            type="file"
                                            onChange={handleImageUpload}
                                            accept="image/*"
                                            className="hidden"
                                            id="avatar-upload"
                                        />
                                        <Label htmlFor="avatar-upload" className="cursor-pointer flex flex-col items-center">
                                            {isUploading ? (
                                                <span className="text-blue-600 font-medium">Uploading...</span>
                                            ) : (
                                                <>
                                                    <span className="text-gray-600 font-medium">Click to upload instructor image</span>
                                                    <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                                                </>
                                            )}
                                        </Label>
                                    </div>
                                    {formData.avatar && (
                                        <div className="text-xs text-green-600 mt-1 truncate">
                                            ✓ Image uploaded successfully
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <textarea
                                id="bio"
                                name="bio"
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Short biography..."
                                value={formData.bio}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Creating...' : 'Create Instructor'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
