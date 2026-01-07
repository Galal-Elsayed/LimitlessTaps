"use client";

import React from "react";

export default function CTAArc() {
  return (
    <div className="absolute inset-x-0 top-0 h-[300px] md:h-[400px] overflow-hidden pointer-events-none select-none">
      {/* The Hill Shape */}
      <span
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[300%] md:w-[200%] aspect-[1/1] rounded-[100%] bg-black shadow-[inset_0_1px_40px_rgba(255,255,255,0.3)]"
        style={{
          background: 'radial-gradient(50% 50% at 50% 50%, #000 60%, #030303 85%, #050505 100%)'
        }}
      />
      {/* Top rim highlight derived from box-shadow, plus a faint border */}
      <span
        className="absolute top-[1px] left-1/2 -translate-x-1/2 w-[300%] md:w-[200%] aspect-[1/1] rounded-[100%] border-t border-white/20 opacity-50"
      />
    </div>
  );
}
