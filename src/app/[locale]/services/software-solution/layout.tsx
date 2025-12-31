import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Software Solution | Limitless Taps",
    description: "Enterprise software and integrations for your business needs.",
    openGraph: {
        title: "Software Solution | Limitless Taps",
        description: "Enterprise software and integrations for your business needs.",
        images: ["/Logo/black.png"],
    },
};

export default function SoftwareSolutionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
