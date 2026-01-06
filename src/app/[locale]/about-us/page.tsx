import Navbar from "@/components/Navbar/Navbar";
import AboutHero from '@/components/About/AboutHero';
import AboutCards from "@/components/About/AboutCards";
import AboutSlider from "@/components/About/AboutSlider";
import AboutTap from "@/components/About/AboutTap";

export default function AboutPage() {
    return (
        <main className="w-full bg-black min-h-screen">
            <Navbar />
            <AboutHero />
            <AboutCards />
            <AboutSlider />
            <AboutTap />
        </main>
    );
}
