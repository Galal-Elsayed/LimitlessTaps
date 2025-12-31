import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services | Limitless Taps",
    description: "Discover our comprehensive range of digital services including web development, mobile apps, and more.",
    openGraph: {
        title: "Services | Limitless Taps",
        description: "Discover our comprehensive range of digital services including web development, mobile apps, and more.",
        images: ["/Logo/black.png"],
    },
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
