import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Limitless Taps",
  description:
    "Explore our portfolio of successful digital projects and solutions.",
  openGraph: {
    title: "Projects | Limitless Taps",
    description:
      "Explore our portfolio of successful digital projects and solutions.",
    images: ["/Logo/black.png"],
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
