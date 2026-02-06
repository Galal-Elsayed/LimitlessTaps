import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.limitlesstaps.com"),
  title: "Limitless Taps",
  description: "Your ultimate beverage solution",
  icons: {
    icon: "/Logo/OG.png",
    shortcut: "/Logo/OG.png",
    apple: "/Logo/OG.png",
  },
  openGraph: {
    images: [
      {
        url: "https://www.limitlesstaps.com/Logo/OG.png",
        width: 1196,
        height: 665,
        alt: "Limitless Taps - Digital Solutions",
      },
    ],
  },
};

// Root layout is a pass-through - the [locale]/layout.tsx handles HTML/body rendering
// with proper lang and dir attributes for internationalization

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
