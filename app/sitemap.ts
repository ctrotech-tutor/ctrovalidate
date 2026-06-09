import type { MetadataRoute } from "next"
import fs from "fs"
import path from "path"

const sections = ["guide", "api", "platform", "advanced"]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    {
      url: "https://ctrovalidate.vercel.app",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ]

  for (const section of sections) {
    const dir = path.join(process.cwd(), "content", section)
    if (!fs.existsSync(dir)) continue
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"))
    for (const file of files) {
      const slug = file.replace(/\.mdx$/, "")
      entries.push({
        url: `https://ctrovalidate.vercel.app/${section}/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })
    }
  }

  return entries
}
