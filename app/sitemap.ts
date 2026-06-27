import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dikporabintuni.telukbintunikab.go.id";

  return ["id", "en"].map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: locale === "id" ? 1 : 0.9,
  }));
}
