"use client";

import CTAArc from "./CTAArc";
import CTATitle from "./CTATitle";
import CTAButtons from "./CTAButtons";

export default function LiveblocksCTA() {
  return (
    <section className="relative overflow-hidden bg-black">
      <CTAArc />
      <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
        <CTATitle />
        <CTAButtons />
      </div>
    </section>
  );
}
