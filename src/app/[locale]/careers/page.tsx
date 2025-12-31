
import React from 'react';
import Navbar from "@/components/Navbar/Navbar";

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <Navbar />
            <main className="flex flex-col items-center justify-center p-8">
                <h1 className="text-4xl font-bold mb-4">Careers</h1>
                <p className="text-gray-400">Opportunities coming soon.</p>
            </main>
        </div>
    );
}
