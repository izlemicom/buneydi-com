const siteUrl = "https://www.buneydi.com";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: "/onizle" },
      { userAgent: "*", disallow: "/app" },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/server-sitemap.xml`,
    ],
  },
  exclude: ["/hesabim", "/onizle", "/server-sitemap.xml", "/app"],
  additionalPaths: async (config) => [
    await config.transform(config, "/"),
    await config.transform(config, "/giris"),
    await config.transform(config, "/kayitol"),
    await config.transform(config, "/yazarlar"),
    await config.transform(config, "/icerikler"),
    await config.transform(config, "/etiketler"),
  ],
};
