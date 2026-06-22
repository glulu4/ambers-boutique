import type {MetadataRoute} from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.ambersjewelryboutique.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/success", "/cancel"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
