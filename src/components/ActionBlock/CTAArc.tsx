"use client";

import React from "react";
import Image from "next/image";

export default function CTAArc() {
  return (
    <div className="absolute inset-x-0 top-0 w-full pointer-events-none select-none">
      {/* The Hill Shape */}
      <Image
        src="/ActionBlock/Arc.png"
        alt=""
        width={1920}
        height={1080}
        className="w-full h-auto"
        priority
      />
    </div>
  );
}
