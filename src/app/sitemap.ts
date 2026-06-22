import type {MetadataRoute} from "next";
import {categories} from "@/types/categories";
import {getAllProducts, getProductHref} from "@/utils/stripeHelpers";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.ambersjewelryboutique.com";

// Regenerate the sitemap at most every hour to keep product URLs fresh.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static, indexable pages. Transactional routes (cart, success, cancel) are
  // intentionally excluded.
  const staticPaths = ["", "/all-products", "/our-story", "/contact", "/return-policy"];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/${category}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  // getAllProducts swallows errors and returns [] if Stripe is unavailable,
  // so a missing key degrades gracefully to a static-only sitemap.
  const products = await getAllProducts();
  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}${getProductHref(product)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticEntries, ...categoryEntries, ...productEntries];
}
