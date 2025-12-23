"use client";

import { useState, useEffect } from "react";
import { Loader2, Shield, ShieldAlert, CheckCircle, XCircle } from "lucide-react";

interface User {
    _id: string;
    email: string;
    role: "user" | "admin" | "superadmin";
    createdAt: string;
}

export default function AdminManagePage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [processingId, setProcessingId] = useState<string | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers(query = "") {
        try {
            const res = await fetch(`/api/admin/users?query=${encodeURIComponent(query)}`);
            if (!res.ok) throw new Error("Failed to fetch users");
            const data = await res.json();
            setUsers(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get("search") as string;
        fetchUsers(query);
    };

    async function updateRole(userId: string, newRole: "user" | "admin") {
        setProcessingId(userId);
        try {
            const res = await fetch("/api/admin/set-role", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, role: newRole }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to update role");
            }

            // Update local state
            setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
        } catch (err: any) {
            alert(err.message);
        } finally {
            setProcessingId(null);
        }
    }

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin w-8 h-8" /></div>;
    if (error) return <div className="text-red-500 p-8">Error: {error}</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <ShieldAlert className="w-8 h-8 text-blue-900" />
                    <h1 className="text-3xl font-bold text-gray-900">Superadmin: Role Management</h1>
                </div>

                <div className="mb-6">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input
                            type="text"
                            name="search"
                            placeholder="Search by email..."
                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Search
                        </button>
                    </form>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${user.role === 'superadmin' ? 'bg-purple-100 text-purple-800' :
                                                user.role === 'admin' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-green-100 text-green-800'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {user.role === "superadmin" ? (
                                            <span className="text-gray-400 cursor-not-allowed">Cannot Modify</span>
                                        ) : (
                                            <div className="flex gap-3">
                                                {user.role !== "admin" && (
                                                    <button
                                                        onClick={() => updateRole(user._id, "admin")}
                                                        disabled={processingId === user._id}
                                                        className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs flex items-center gap-1 disabled:opacity-50"
                                                    >
                                                        {processingId === user._id && <Loader2 className="animate-spin w-3 h-3" />}
                                                        Make Admin
                                                    </button>
                                                )}
                                                {user.role !== "user" && (
                                                    <button
                                                        onClick={() => updateRole(user._id, "user")}
                                                        disabled={processingId === user._id}
                                                        className="text-gray-700 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-xs flex items-center gap-1 disabled:opacity-50"
                                                    >
                                                        {processingId === user._id && <Loader2 className="animate-spin w-3 h-3" />}
                                                        Make User
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
