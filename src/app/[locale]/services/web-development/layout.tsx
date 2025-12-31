import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Web Development | Limitless Taps",
    description: "Professional web development services - Custom web solutions for your business.",
    openGraph: {
        title: "Web Development | Limitless Taps",
        description: "Professional web development services - Custom web solutions for your business.",
        images: ["/Logo/black.png"],
    },
};

export default function WebDevelopmentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
