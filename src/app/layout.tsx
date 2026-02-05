import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.limitlesstaps.com"),
  title: "Limitless Taps",
  description: "Your ultimate beverage solution",
  icons: {
    icon: "/Logo/black.png",
    shortcut: "/Logo/black.png",
    apple: "/Logo/black.png",
  },
  openGraph: {
    images: ["/Logo/Graph.png"],
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
