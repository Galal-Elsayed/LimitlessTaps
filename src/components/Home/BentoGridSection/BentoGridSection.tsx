export default function BentoGridSection() {
    return (
        <section className="w-full bg-[#0a0a0a] py-24 md:py-32 pb-32 md:pb-40">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <BentoGrid className="!bg-transparent" />
            </div>
        </section>
    );
}

import BentoGrid from "@/components/kokonutui/bento-grid";
