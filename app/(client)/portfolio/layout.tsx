import type { Metadata } from "next";
import { siteConfig } from "@/constants/site";

const path = "/portfolio";
const title = "Portfolio";
const description =
  "Browse Hasanali Asadov’s portfolio of web applications, UI work, and full-stack projects built with Next.js and modern tooling.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: `${siteConfig.url}${path}`,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.ogImage}`,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
