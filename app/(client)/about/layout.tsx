import type { Metadata } from "next";
import { siteConfig } from "@/constants/site";

const path = "/about";
const title = "About";
const description =
  "Learn about Hasanali Asadov’s background, education, internships, and approach to building modern web products.";

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

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
