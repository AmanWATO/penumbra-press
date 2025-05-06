/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_WEB_URL,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.9,
  exclude: ["/login-to-penumbra", "/register-to-penumbra", "/reset-password"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};

module.exports = config;
