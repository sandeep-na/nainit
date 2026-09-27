import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SiteChrome } from "@/components/common/site-chrome";
import { Toaster } from "@/components/ui/toaster";


export const metadata: Metadata = {
  metadataBase: new URL("https://nainitsolutions.com"),
  title: { default: "NainIT Solutions — Web, Mobile, Cloud & AI Engineering", template: "%s | NainIT Solutions" },
  description:
    "NainIT Solutions builds high-performance websites, mobile apps, cloud infrastructure and AI products for healthcare, fintech, e-commerce and beyond.",
  keywords: ["IT services", "web development", "app development", "cloud", "AI", "UI/UX", "DevOps", "cybersecurity"],
  openGraph: {
    type: "website",
    siteName: "NainIT Solutions",
    title: "NainIT Solutions — Web, Mobile, Cloud & AI Engineering",
    description: "Premium engineering for ambitious teams. 120+ projects shipped, 98% retention.",
    images: [{ url: "/images/og-cover.svg", width: 1200, height: 630, alt: "NainIT Solutions" }],
  },
  twitter: { card: "summary_large_image", title: "NainIT Solutions", description: "Web, mobile, cloud & AI — engineered for revenue." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
          <AuthProvider>
            <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-sky-500 focus:px-4 focus:py-2 focus:text-white">
              Skip to content
            </a>
            <SiteChrome>{children}</SiteChrome>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
