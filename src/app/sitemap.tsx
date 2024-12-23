import { DOMAIN } from "@/utils/urls";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = ["", "themes", "export"].map(
    (route) => ({
      url: `${DOMAIN}/${route}`,
      lastModified: new Date().toISOString(),
      priority: 1,
      changeFrequency: "weekly",
    }),
  );

  return [...staticRoutes];
}
