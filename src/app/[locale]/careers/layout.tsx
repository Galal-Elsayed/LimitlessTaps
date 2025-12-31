import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Careers | Limitless Taps",
    description: "Join our team and build the future of digital solutions with Limitless Taps.",
    openGraph: {
        title: "Careers | Limitless Taps",
        description: "Join our team and build the future of digital solutions with Limitless Taps.",
        images: ["/Logo/black.png"],
    },
};

export default function CareersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
