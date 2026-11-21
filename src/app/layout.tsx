import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MotionProvider } from "@/components/motion/motion-provider";
import { brand } from "@/config/brand";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

const defaultTitle = `${brand.name} — Websites, Software, SEO & AI Automation`;

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: defaultTitle,
    template: `%s · ${brand.name}`,
  },
  description: brand.description,
  applicationName: brand.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: brand.name,
    title: defaultTitle,
    description: brand.description,
    locale: brand.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: brand.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: brand.themeColor,
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={fontVariables}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-signal-400 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink-950"
        >
          Skip to content
        </a>
        {/* Without JavaScript, scroll-reveal content must still be visible. */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <MotionProvider>
          <SiteHeader />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
