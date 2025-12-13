
import { Sidebar } from '@/components/admin/Sidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 overflow-y-auto max-h-screen">
                <div className="container mx-auto p-8">{children}</div>
            </main>
        </div>
    );
}
