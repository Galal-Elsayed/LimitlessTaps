import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | Limitless Taps",
    description: "Get in touch with Limitless Taps for your digital transformation needs.",
    openGraph: {
        title: "Contact | Limitless Taps",
        description: "Get in touch with Limitless Taps for your digital transformation needs.",
        images: ["/Logo/black.png"],
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
