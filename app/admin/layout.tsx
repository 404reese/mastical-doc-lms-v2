import { Sidebar } from '@/components/admin/Sidebar';
import { getSession } from "@/lib/session";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();
    const role = (session?.role as string) || "user";

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar role={role} />
            <main className="flex-1 overflow-y-auto max-h-screen">
                <div className="container mx-auto p-8">{children}</div>
            </main>
        </div>
    );
}
