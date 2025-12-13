"use client";

interface RequirementsProps {
    requirements: string[];
}

export default function Requirements({ requirements }: RequirementsProps) {
    if (!requirements || requirements.length === 0) return null;

    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                {requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                ))}
            </ul>
        </section>
    );
}
