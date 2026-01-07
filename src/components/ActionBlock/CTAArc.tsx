"use client";

export default function CTAArc() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[600px] overflow-hidden select-none">
      {/* Main globe gradient */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "radial-gradient(circle at 50% 0%, #565656 0%, #2a2a2a 20%, #0a0a0a 60%, #0a0a0a 100%)",
          opacity: 0.8,
        }}
      />
      
      {/* Soft vignetting / smooth blend */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
            background: "radial-gradient(ellipse 90% 80% at 50% 0%, transparent 20%, #0a0a0a 100%)"
        }}
      />

      {/* Bottom fade for perfect integration */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent" />
    </div>
  );
}
