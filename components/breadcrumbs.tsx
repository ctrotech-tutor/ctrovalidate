"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { sidebarSections } from "@/lib/navigation"

interface BreadcrumbItem {
  label: string
  href: string
}

function findBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }]
  const path = pathname.replace(/^\/?(docs\/)?/, "").replace(/\/$/, "")
  const segments = path.split("/")
  if (segments.length < 2 || !segments[0]) return items

  const section = segments[0]
  const slug = segments.slice(1).join("/")
  const fullHref = `/${section}/${slug}`

  const sectionTitles: Record<string, string> = {
    guide: "Guide",
    api: "API Reference",
    platform: "Platform Adapters",
    advanced: "Advanced Guides",
  }

  const sectionTitle = sectionTitles[section]
  if (!sectionTitle) return items

  let pageLabel: string | null = null
  for (const sec of sidebarSections) {
    const found = sec.items.find((item) => item.href === fullHref)
    if (found) {
      pageLabel = found.title
      break
    }
  }

  if (pageLabel) {
    items.push({ label: sectionTitle, href: "#" })
    items.push({ label: pageLabel, href: fullHref })
  } else {
    items.push({ label: sectionTitle, href: fullHref })
  }

  return items
}

export function Breadcrumbs() {
  const pathname = usePathname()
  const items = findBreadcrumbs(pathname)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `https://ctrovalidate.vercel.app${item.href === "#" ? items[i + 1]?.href ?? "/" : item.href}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
          {items.map((item, i) => (
            <li key={`${item.href}-${i}`} className="flex items-center gap-1.5">
              {i > 0 && (
                <span className="text-muted-foreground/40 select-none">/</span>
              )}
              {i === items.length - 1 ? (
                <span className="text-foreground font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href === "#" ? items[i + 1]?.href ?? "/" : item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
