import type { Metadata } from "next";
import { siteConfig } from "@/constants/site";

const path = "/";
const title = "Home";
const description =
  "Welcome to Hasanali Asadov’s portfolio — explore featured projects, skills, and ways to collaborate on Next.js and full-stack work.";

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

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
