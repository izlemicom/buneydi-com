const siteUrl = "https://www.buneydi.com";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: "/hesabim" },
      { userAgent: "*", disallow: "/onizle" },
      { userAgent: "*", disallow: "/admin" },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/server-sitemap.xml`,
    ],
  },
  exclude: ["/hesabim", "/onizle", "/server-sitemap.xml", "/admin"],
};
