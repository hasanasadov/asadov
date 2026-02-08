import { metaKeywords } from "@/constants/metadata";

const fallbackSiteUrl = "https://asadov.site";

export const siteConfig = {
  name: "Hasanali Asadov",
  title: "Hasanali Asadov | Portfolio & Full-Stack Developer",
  description:
    "Portfolio site of Hasanali Asadov, a Next.js-focused full-stack developer showcasing projects, experience, and ways to get in touch.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl,
  keywords: metaKeywords,
  author: "Hasanali Asadov",
  ogImage: "/1.png",
  locale: "en_US",
};
