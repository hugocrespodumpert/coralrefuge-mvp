import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Coral Refuge - Protect Climate-Resilient Coral Reefs",
  description: "Become a guardian of coral refugia. Sponsor marine protected areas in Egypt's Red Sea and help secure the ocean's future by protecting the reefs that can survive climate change.",
  keywords: ["coral reefs", "ocean conservation", "marine protected areas", "climate change", "coral refugia", "Red Sea", "Egypt", "reef protection"],
  authors: [{ name: "Coral Refuge" }],
  openGraph: {
    title: "Coral Refuge - Protect the Reefs That Can Survive",
    description: "Join the movement to protect climate-resilient coral reefs in Egypt's Red Sea. One hectare at a time.",
    url: "https://coralrefuge.org",
    siteName: "Coral Refuge",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Pristine coral reef in the Red Sea - Climate refugia sanctuary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coral Refuge - Protect Climate-Resilient Coral Reefs",
    description: "Become a guardian of coral refugia. Protect the reefs that can survive.",
    images: ["https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=1200&q=80"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#1E4A6F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
