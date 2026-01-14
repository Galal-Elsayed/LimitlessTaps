

import Navbar from "@/components/Navbar/Navbar";
import Features from './_components/features';

export default function OurWorkPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <Navbar />
            <main className="flex flex-col items-center justify-center p-8">
                
                <Features/>
            </main>
        </div>
    );
}
