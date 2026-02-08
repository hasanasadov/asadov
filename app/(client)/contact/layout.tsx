import type { Metadata } from "next";
import { siteConfig } from "@/constants/site";

const path = "/contact";
const title = "Contact";
const description =
  "Contact Hasanali Asadov for freelance work, collaborations, or questions about Next.js, React, and full-stack projects.";

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

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
