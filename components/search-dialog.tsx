"use client"

import { useEffect, useState, useRef } from "react"
import Fuse from "fuse.js"
import type { FuseResult, FuseResultMatch } from "fuse.js"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useRouter } from "next/navigation"
import {
  SearchIcon,
  BookOpen,
  Layers,
  Code,
  Puzzle,
  GraduationCap,
  Loader2,
  FileText,
} from "lucide-react"
import type { SearchDocument } from "@/lib/search-data"

const sectionIcons: Record<string, typeof BookOpen> = {
  Essentials: BookOpen,
  "Core Concepts": Layers,
  "Technical Reference": Code,
  "Platform Adapters": Puzzle,
  "Advanced Guides": GraduationCap,
}

const sections = ["guide", "api", "platform", "advanced"]

const sectionLabels: Record<string, string> = {
  guide: "Guide",
  api: "API",
  platform: "Platform",
  advanced: "Advanced",
}

function highlightSnippet(
  content: string,
  matches: readonly FuseResultMatch[] | undefined
): React.ReactNode {
  const contentMatch = matches?.find((m) => m.key === "content")
  if (!contentMatch?.indices.length) {
    const preview = content.slice(0, 150).trim()
    if (!preview) return null
    return <>{preview}{content.length > 150 ? "…" : ""}</>
  }

  const [start, end] = contentMatch.indices[0]
  const ctx = 50
  const snippetStart = Math.max(0, start - ctx)
  const snippetEnd = Math.min(content.length, end + 1 + ctx)

  let before = content.slice(snippetStart, start)
  const match = content.slice(start, end + 1)
  let after = content.slice(end + 1, snippetEnd)

  if (snippetStart > 0) before = "…" + before.slice(-ctx + 10)
  if (snippetEnd < content.length) after = after.slice(0, ctx - 10) + "…"

  return (
    <>
      {before}<span className="text-primary font-medium">{match}</span>{after}
    </>
  )
}

export function SearchDialog() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<FuseResult<SearchDocument>[]>([])
  const fuseRef = useRef<Fuse<SearchDocument> | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    fetch("/search-data.json")
      .then((r) => r.json())
      .then((data: SearchDocument[]) => {
        fuseRef.current = new Fuse(data, {
          keys: [
            { name: "title", weight: 2 },
            { name: "description", weight: 1.5 },
            { name: "content", weight: 1 },
          ],
          threshold: 0.35,
          includeMatches: true,
          minMatchCharLength: 2,
          ignoreLocation: true,
        })
        setReady(true)
      })
  }, [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    if (!fuseRef.current || !query) {
      setResults([])
      return
    }
    const r = fuseRef.current.search(query, { limit: 12 })
    setResults(r)
  }, [query])

  const grouped = results.reduce<Record<string, FuseResult<SearchDocument>[]>>(
    (acc, r) => {
      const section = r.item.section
      if (!acc[section]) acc[section] = []
      acc[section].push(r)
      return acc
    },
    {}
  )

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Search docs"
      >
        <SearchIcon className="size-4" />
        <span className="hidden md:inline">Search</span>
        <kbd className="hidden md:inline-flex items-center gap-0.5 rounded-md border border-border/50 bg-muted/50 px-1.5 py-0.5 text-xs text-muted-foreground/60">
          <span className="text-[10px]">⌘</span>K
        </kbd>
      </button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="sm:max-w-xl"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search docs..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList className="max-h-96">
            {!ready && (
              <div className="flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground/50">
                <Loader2 className="size-4 animate-spin" />
                Loading search index…
              </div>
            )}

            {ready && !query && (
              <div className="py-10 text-center">
                <SearchIcon className="mx-auto size-8 text-muted-foreground/20 mb-3" />
                <p className="text-sm text-muted-foreground/50">
                  Search across all documentation
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                  {sections.map((s) => {
                    const Icon = sectionIcons[s] || FileText
                    return (
                      <kbd
                        key={s}
                        className="inline-flex items-center gap-1 rounded-md border border-border/40 bg-muted/30 px-2 py-1 text-xs text-muted-foreground/60"
                      >
                        <Icon className="size-3" />
                        {sectionLabels[s]}
                      </kbd>
                    )
                  })}
                </div>
              </div>
            )}

            {ready && query && results.length === 0 && (
              <CommandEmpty>
                <div className="py-10 text-center">
                  <SearchIcon className="mx-auto size-8 text-muted-foreground/30 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No results for{" "}
                    <span className="font-medium text-foreground/80">
                      &quot;{query}&quot;
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground/50 mt-1">
                    Try different keywords or browse the sidebar
                  </p>
                </div>
              </CommandEmpty>
            )}

            {Object.entries(grouped).map(([section, items]) => {
              const SectionIcon = sectionIcons[section] || FileText
              return (
                <CommandGroup key={section} heading={section}>
                  {items.map((result) => {
                    const sectionSlug = result.item.id.split("/")[0]
                    const sectionTag =
                      sectionLabels[sectionSlug] || sectionSlug
                    return (
                      <CommandItem
                        key={result.item.id}
                        value={`${result.item.section} ${result.item.title}`}
                        onSelect={() => {
                          setOpen(false)
                          router.push(`/${result.item.id}`)
                        }}
                        className="flex flex-col items-start gap-0.5 py-2.5 px-3"
                      >
                        <div className="flex items-center gap-2 w-full">
                          <SectionIcon className="size-3.5 shrink-0 text-muted-foreground/50" />
                          <span className="text-sm font-medium">
                            {result.item.title}
                          </span>
                          <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground/40 bg-muted/50 px-1.5 py-0.5 rounded">
                            {sectionTag}
                          </span>
                        </div>
                        {result.item.description && (
                          <span className="text-xs text-muted-foreground/60 line-clamp-1 pl-5.5">
                            {result.item.description}
                          </span>
                        )}
                        {query && (
                          <span className="text-xs text-muted-foreground/45 line-clamp-2 pl-5.5 mt-0.5 leading-relaxed">
                            {highlightSnippet(
                              result.item.content,
                              result.matches
                            )}
                          </span>
                        )}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              )
            })}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
