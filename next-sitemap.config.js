/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://asadov.site",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/dashboard", "/dashboard/*", "/api/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/dashboard/*", "/api/*"],
      },
    ],
  },
  // transform: async (config, url) => {
  //   // URL-ləri fərdiləşdirmək üçün istifadə olunur
  //   return {
  //     loc: url, // URL
  //     changefreq: 'weekly',
  //     priority: 0.8,
  //     lastmod: new Date().toISOString(),
  //   }
  // },
};
