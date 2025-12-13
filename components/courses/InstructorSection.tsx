"use client";

interface InstructorSectionProps {
    instructor: {
        name: string;
        avatar?: string;
        bio?: string;
        expertise?: string;
    };
}

export default function InstructorSection({ instructor }: InstructorSectionProps) {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructor</h2>

            <div className="flex flex-col md:flex-row gap-6 items-start mt-6">
                <img
                    src={instructor.avatar || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"}
                    alt={instructor.name}
                    className="w-[120px] h-[120px] rounded-full object-cover"
                />

                <div>
                    <h3 className="text-[1.2rem] font-bold text-blue-600 mb-1">
                        {instructor.name}
                    </h3>
                    {instructor.expertise && (
                        <span className="block text-[0.95rem] font-medium text-gray-900 mb-4">
                            {instructor.expertise}
                        </span>
                    )}

                    <p className="text-[0.9rem] text-gray-600 leading-relaxed">
                        {instructor.bio || "No bio available."}
                    </p>
                </div>
            </div>
        </section>
    );
}
