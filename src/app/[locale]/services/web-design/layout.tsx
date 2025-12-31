import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Web Design | Limitless Taps",
    description: "Beautiful, user-centered web design services.",
    openGraph: {
        title: "Web Design | Limitless Taps",
        description: "Beautiful, user-centered web design services.",
        images: ["/Logo/black.png"],
    },
};

export default function WebDesignLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
