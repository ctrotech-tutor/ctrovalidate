import fs from "fs"
import path from "path"
import { parseFrontmatter } from "@/lib/mdx"
import { sidebarSections } from "@/lib/navigation"

export interface SearchDocument {
  id: string
  title: string
  description: string
  section: string
  content: string
}

const sections = ["guide", "api", "platform", "advanced"]

function stripMdx(mdx: string): string {
  return mdx
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]+`/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]+)\]\(.*?\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[#*_~>|]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\s+/g, " ")
    .trim()
}

function getSectionForSlug(slug: string): string {
  for (const s of sidebarSections) {
    for (const item of s.items) {
      if (item.href === `/${slug}`) return s.title
    }
  }
  const folder = slug.split("/")[0]
  return folder.charAt(0).toUpperCase() + folder.slice(1)
}

export function getSearchData(): SearchDocument[] {
  const docs: SearchDocument[] = []

  for (const section of sections) {
    const dir = path.join(process.cwd(), "content", section)
    if (!fs.existsSync(dir)) continue

    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"))

    for (const file of files) {
      const slug = file.replace(/\.mdx$/, "")
      const filePath = path.join(dir, file)
      const raw = fs.readFileSync(filePath, "utf-8")
      const { frontmatter, body } = parseFrontmatter(raw)
      const id = `${section}/${slug}`
      const title = frontmatter.title ?? slug
      const description = frontmatter.description ?? ""

      docs.push({
        id,
        title,
        description,
        section: getSectionForSlug(id),
        content: stripMdx(body),
      })
    }
  }

  return docs
}
