"use client";

import ContentCarousel from "./ContentCarousel";

const carousel2Items = [
    {
        type: "video" as const,
        src: "/Home/Carousel/video-carousel.mp4",
        alt: "Display 5",
        autoPlay: true,
        loop: true,
        muted: true,
        text: "Action button gives you instant access to your favorite features"
    },
    {
        type: "image" as const,
        src: "/Home/Carousel/imageCarousel1.jpg",
        alt: "Display 1",
        text: "iPhone 16 Pro Max has our largest iPhone display ever"
    },
    {
        type: "image" as const,
        src: "/Home/Carousel/imageCarousel2.jpg",
        alt: "Display 2",
        text: "The thinnest borders on any Apple product"
    },
    {
        type: "image" as const,
        src: "/Home/Carousel/imageCarousel3.jpg",
        alt: "Display 3",
        text: "Premium Grade 5 titanium is exceptionally durable"
    },
    {
        type: "image" as const,
        src: "/Home/Carousel/imageCarousel4.jpg",
        alt: "Display 4",
        text: "Four stunning colors including new Desert Titanium"
    }
];

export default function Carousel2() {
    return (
        <section className="w-full bg-[#0a0a0a] pt-20 pb-20 overflow-hidden relative">
            {/* Image Carousel */}
            <div className="mb-20 md:mb-32">
                <ContentCarousel items={carousel2Items} textVariant="linear" />
            </div>

            {/* Bottom Text Block - Two Columns */}
            <div className="px-6 md:px-12 md:mt-20 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                    <div>
                        <p className="text-[#86868b] md:text-2xl leading-relaxed tracking-wide font-semibold font-(family-name:--font-sf-text)">
                            New display technology allows us to<br/>route display data under active pixels<br/>with no distortion, resulting in thinner<br/>borders for larger 6.3-inch and 6.9-inch <br/><span className="text-white font-semibold">Super Retina XDR displays</span> that feel<br/>great in the hand.
                        </p>
                    </div>
                    <div>
                        <p className="text-[#86868b] md:text-2xl leading-relaxed tracking-tight font-semibold font-(family-name:--font-sf-text)">
                            iPhone 16 Pro is splash, water, and<br/>dust resistant. It&apos;s also remarkbly<br/>durable, <span className="text-white font-semibold">with our latest-generation<br/>Ceramic Shield front.</span>
                        </p>
                    </div>
                </div>
            </div>
        </section >
    );
}

