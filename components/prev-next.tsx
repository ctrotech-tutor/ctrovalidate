"use client"

import { usePathname } from "next/navigation"
import { sidebarSections } from "@/lib/navigation"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

function findAdjacent(pathname: string) {
  const allItems = sidebarSections.flatMap((s) => s.items)
  const idx = allItems.findIndex((item) => item.href === pathname)
  if (idx === -1) return { prev: null, next: null }
  return {
    prev: idx > 0 ? allItems[idx - 1] : null,
    next: idx < allItems.length - 1 ? allItems[idx + 1] : null,
  }
}

export function PrevNext() {
  const pathname = usePathname()
  const { prev, next } = findAdjacent(pathname)

  return (
    <nav
      aria-label="Page navigation"
      className="mt-12 pt-6 border-t border-border/50 flex items-center justify-between gap-4"
    >
      {prev ? (
        <Link
          href={prev.href}
          className={cn(
            "group flex items-center gap-2 text-sm transition-colors",
            "text-muted-foreground hover:text-foreground"
          )}
        >
          <ChevronLeft className="size-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
          <div className="text-left">
            <div className="text-xs text-muted-foreground/60 mb-0.5">Previous</div>
            <div className="font-medium">{prev.title}</div>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className={cn(
            "group flex items-center gap-2 text-sm transition-colors text-right",
            "text-muted-foreground hover:text-foreground"
          )}
        >
          <div className="text-right">
            <div className="text-xs text-muted-foreground/60 mb-0.5">Next</div>
            <div className="font-medium">{next.title}</div>
          </div>
          <ChevronRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}
