import fs from "fs"
import path from "path"
import yaml from "js-yaml"

export interface Frontmatter {
  title?: string
  description?: string
  lastUpdated?: string
}

export interface ContentPage {
  source: string
  frontmatter: Frontmatter
  slug: string
  section: string
  toc: TocItem[]
}

export interface TocItem {
  id: string
  text: string
  level: number
}

const contentDir = path.join(process.cwd(), "content")

export function getContentPaths(section: string): string[] {
  const dir = path.join(contentDir, section)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
}

export function getContentPath(section: string, slug: string): string {
  return path.join(contentDir, section, `${slug}.mdx`)
}

export function contentExists(section: string, slug: string): boolean {
  return fs.existsSync(getContentPath(section, slug))
}

export function parseFrontmatter(raw: string): { frontmatter: Frontmatter; body: string; toc: TocItem[] } {
  const frontmatter: Frontmatter = {}
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n*/)
  if (!match) return { frontmatter, body: raw, toc: [] }

  const rawFm = match[1]
  const body = raw.slice(match[0].length)

  try {
    const parsed = yaml.load(rawFm) as Record<string, unknown>
    if (parsed?.title && typeof parsed.title === "string") frontmatter.title = parsed.title
    if (parsed?.description && typeof parsed.description === "string") frontmatter.description = parsed.description
    if (parsed?.lastUpdated && typeof parsed.lastUpdated === "string") frontmatter.lastUpdated = parsed.lastUpdated
  } catch {
    // fallback to line-based if yaml fails
    for (const line of rawFm.split(/\r?\n/)) {
      const colonIdx = line.indexOf(":")
      if (colonIdx === -1) continue
      const key = line.slice(0, colonIdx).trim()
      const value = line.slice(colonIdx + 1).trim().replace(/^['"]|['"]$/g, "")
      if (key === "title") frontmatter.title = value
      if (key === "description") frontmatter.description = value
    }
  }

  const toc = extractToc(body)

  return { frontmatter, body, toc }
}

export function extractToc(body: string): TocItem[] {
  const items: TocItem[] = []
  const headingRe = /^#{2,3}\s+(.+)$/gm
  let match: RegExpExecArray | null
  while ((match = headingRe.exec(body)) !== null) {
    const text = match[1].replace(/`([^`]+)`/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
    const level = match[0].startsWith("###") ? 3 : 2
    items.push({ id, text, level })
  }
  return items
}

export function loadContent(section: string, slug: string): ContentPage | null {
  const filePath = getContentPath(section, slug)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, "utf-8")
  const { frontmatter, body, toc } = parseFrontmatter(raw)

  return { source: body, frontmatter, slug, section, toc }
}
