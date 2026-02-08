import type { Metadata } from "next";
import { siteConfig } from "@/constants/site";

const path = "/resume";
const title = "Resume";
const description =
  "Download or view Hasanali Asadov’s resume highlighting technical skills, experience, and education in web development.";

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

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
