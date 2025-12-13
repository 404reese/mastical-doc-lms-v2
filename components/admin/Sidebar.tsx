
import Link from 'next/link';
import { Home, Users, BookOpen, Video, Settings, LogOut } from 'lucide-react';

const sidebarItems = [
    { icon: Home, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: Users, label: 'Instructors', href: '/admin/instructors' },
    { icon: BookOpen, label: 'Courses', href: '/admin/courses' },
];

export function Sidebar() {
    return (
        <aside className="w-64 bg-slate-900 text-white min-h-screen p-4 flex flex-col">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">LMS Admin</h1>
            </div>
            <nav className="flex-1 space-y-2">
                {sidebarItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
            <div className="mt-auto pt-8 border-t border-slate-800">
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-slate-800 transition-colors text-red-400 hover:text-red-300">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
