import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mobile Application | Limitless Taps",
    description: "Native and cross-platform mobile app development services.",
    openGraph: {
        title: "Mobile Application | Limitless Taps",
        description: "Native and cross-platform mobile app development services.",
        images: ["/Logo/black.png"],
    },
};

export default function MobileApplicationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
