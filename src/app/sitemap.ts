import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.fashaiuniversal.com";
  const now = new Date();

  const routes = [
    { url: baseUrl, priority: 1.0, changeFrequency: "daily" as const },
    { url: `${baseUrl}/upcoming`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/services`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/events`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/projects`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/fashion-magazine`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/community`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/apply`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/fashprism-india`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/fashprism-international`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/contact`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/gallery`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/2026`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/2025`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/privacy`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${baseUrl}/terms`, priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return routes.map((route) => ({
    url: route.url,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
