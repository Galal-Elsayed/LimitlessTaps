import Arc from "@/components/Home/ArcHalfGlobe/Arc";

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      

        {/* Header */}
        <header className="mb-8 text-white">
          <video src="/Logo/Main-Logo-Interactive-LowQuality.webm" autoPlay loop muted className="mb-4 w-400 h-auto"></video>

        </header>
        <Arc />
      
    </div>
  );
}
