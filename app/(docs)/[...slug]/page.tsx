import { notFound, redirect } from "next/navigation"
import { execSync } from "child_process"
import { loadContent, getContentPaths } from "@/lib/mdx"
import { MdxContent } from "@/components/mdx-content"
import { CodeBlocks } from "@/components/code-blocks"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { PrevNext } from "@/components/prev-next"
import { OnThisPage } from "@/components/on-this-page"
import { StickyMobileBar } from "@/components/sticky-mobile-bar"

interface Props {
  params: Promise<{ slug: string[] }>
}

const sections = ["guide", "api", "platform", "advanced"] as const

const sectionDefaults: Record<string, string> = {
  guide: "introduction",
  api: "core",
  platform: "nextjs",
  advanced: "async",
}

function findLastUpdated(section: string, docSlug: string): string | null {
  if (typeof process === "undefined") return null
  try {
    const result = execSync(
      `git log -1 --format="%aI" -- "content/${section}/${docSlug}.mdx"`,
      { cwd: process.cwd(), encoding: "utf-8", timeout: 5000 }
    ).trim()
    return result || null
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  const params: { slug: string[] }[] = []
  for (const section of sections) {
    for (const slug of getContentPaths(section)) {
      params.push({ slug: [section, slug] })
    }
  }
  return params
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const [section, docSlug] = slug
  const content = loadContent(section, docSlug)
  if (!content) return {}

  return {
    title: content.frontmatter.title ?? docSlug,
    description: content.frontmatter.description,
    openGraph: {
      title: content.frontmatter.title ?? docSlug,
      description: content.frontmatter.description,
      type: "article",
      siteName: "Ctrovalidate",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: content.frontmatter.title ?? docSlug,
      description: content.frontmatter.description,
    },
    alternates: {
      canonical: `https://ctrovalidate.vercel.app/${section}/${docSlug}`,
    },
  }
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params
  const [section, docSlug] = slug

  // Redirect single-segment slug (e.g. /api) to the default page
  if (!docSlug) {
    const defaultSlug = sectionDefaults[section]
    if (defaultSlug) redirect(`/${section}/${defaultSlug}`)
    notFound()
  }

  const content = loadContent(section, docSlug)
  if (!content) notFound()

  const lastUpdated = findLastUpdated(section, docSlug)

  return (
    <CodeBlocks>
      <StickyMobileBar toc={content.toc} />
      <div className="flex gap-8 px-4 lg:px-6 py-8">
        <div className="flex-1 min-w-0 max-w-3xl mx-auto lg:mx-0">
          <Breadcrumbs />
          {content.frontmatter.title && (
            <h1 className="text-3xl font-bold tracking-tight mb-2">{content.frontmatter.title}</h1>
          )}
          {lastUpdated && (
            <p className="text-xs text-muted-foreground mb-8">
              Last updated{" "}
              {new Date(lastUpdated).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
          <MdxContent source={content.source} />
          <PrevNext />
        </div>
        <aside className="hidden xl:block w-56 shrink-0">
          <div className="sticky top-20 space-y-6">
            <OnThisPage items={content.toc} />
          </div>
        </aside>
      </div>
    </CodeBlocks>
  )
}
