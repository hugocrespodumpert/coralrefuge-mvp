import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Wild Reefs - Keep Reefs Wild",
  description: "Protect climate-resilient coral reefs. Sponsor verified refugia and receive certificates.",
  keywords: ["coral reefs", "ocean conservation", "marine protected areas", "climate change", "coral refugia", "reef protection", "wild reefs"],
  authors: [{ name: "Wild Reefs" }],
  openGraph: {
    title: "Wild Reefs - Keep Reefs Wild",
    description: "Protect climate-resilient coral reefs.",
    url: "https://wildreefs.com",
    siteName: "Wild Reefs",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Pristine coral reef - Climate refugia sanctuary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wild Reefs - Keep Reefs Wild",
    description: "Protect climate-resilient coral reefs. Sponsor verified refugia.",
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
