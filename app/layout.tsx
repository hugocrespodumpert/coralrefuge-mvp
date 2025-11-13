import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Coral Refuge - Protect Climate-Resilient Coral Reefs",
  description: "Become a guardian of coral refuges. Sponsor marine protected areas and help secure the ocean's future by protecting climate-resilient coral reefs.",
  keywords: ["coral reefs", "ocean conservation", "marine protected areas", "climate change", "coral refugia"],
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
