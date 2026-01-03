import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About-Us | Limitless Taps",
    description: "Learn about Limitless Taps - Your ultimate digital solutions partner.",
    openGraph: {
        title: "About-us | Limitless Taps",
        description: "Learn about Limitless Taps - Your ultimate digital solutions partner.",
        images: ["/Logo/black.png"],
    },
};

export default function CompanyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
