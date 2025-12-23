'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Home, LogOut, Users, Shield } from 'lucide-react';

import { cn } from '@/lib/utils';

const sidebarItems = [
    { icon: Home, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: Users, label: 'Instructors', href: '/admin/instructors' },
    { icon: BookOpen, label: 'Courses', href: '/admin/courses' },
];

export function Sidebar({ role }: { role?: string }) {
    const pathname = usePathname();

    const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

    // Filter items based on role if needed, or just append "Manage Admins" for superadmin
    const items = [...sidebarItems];
    if (role === 'superadmin') {
        items.push({ icon: Shield, label: 'Manage Admins', href: '/admin/manage' });
    }

    return (
        <aside className="w-64 bg-slate-50 text-slate-900 min-h-screen p-4 flex flex-col border-r border-slate-200">
            <div className="mb-8 px-2">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                        DG
                    </div>
                    <div className="leading-tight">
                        <div className="text-sm font-semibold text-slate-900">LMS Admin</div>
                        <div className="text-xs text-slate-500">Manage content</div>
                    </div>
                </div>
            </div>

            <nav className="flex-1 space-y-1">
                {items.map((item) => (
                    <SidebarLink
                        key={item.href}
                        href={item.href}
                        label={item.label}
                        icon={item.icon}
                        active={isActive(item.href)}
                    />
                ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-slate-200">
                <button className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-slate-100 transition-colors text-slate-600 hover:text-slate-900">
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}

function SidebarLink({
    href,
    label,
    icon: Icon,
    active,
}: {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    active: boolean;
}) {
    return (
        <Link
            href={href}
            className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                active
                    ? 'bg-white border border-slate-200 shadow-sm text-slate-900'
                    : 'hover:bg-slate-100 text-slate-700'
            )}
            aria-current={active ? 'page' : undefined}
        >
            <div
                className={cn(
                    'h-9 w-9 rounded-lg flex items-center justify-center',
                    active ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'
                )}
            >
                <Icon className="w-5 h-5" />
            </div>
            <span className={cn('text-sm font-medium', active ? 'text-slate-900' : 'text-slate-700')}>
                {label}
            </span>
            {active && <span className="ml-auto h-2 w-2 rounded-full bg-blue-600" />}
        </Link>
    );
}
