import type { Metadata } from "next";
import { Toaster } from "sonner";
import CustomLayout from "@/layouts/CustomLayout";
import Navbar from "@/components/shared/Navbar";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "@/constants/site";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Hasanali Asadov",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: `${siteConfig.url}${siteConfig.ogImage}`,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}${siteConfig.ogImage}`],
  },
  verification: {
    google: "google7469c81fff0046f0",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#0f172a" },
      { rel: "manifest", url: "/site.webmanifest" },
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="p-4 pt-1  min-h-screen flex flex-col justify-between !bg-[#f0f0f0] !text-black dark:!bg-black dark:!text-white overflow-x-hidden">
        <CustomLayout>
          <Navbar />
          <Toaster richColors />
          {children}
        </CustomLayout>
        <Analytics />
      </body>
    </html>
  );
}
