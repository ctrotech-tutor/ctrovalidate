"use client"

import { useState, useMemo } from "react"
import { Menu, ListTree } from "lucide-react"
import { usePathname } from "next/navigation"
import { useScrollDirection } from "@/lib/hooks"
import { cn } from "@/lib/utils"
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle } from "@/components/ui/drawer"
import { Sidebar } from "@/components/sidebar"
import { OnThisPage } from "@/components/on-this-page"
import type { TocItem } from "@/lib/mdx"

interface StickyMobileBarProps {
  toc: TocItem[]
}

export function StickyMobileBar({ toc }: StickyMobileBarProps) {
  const pathname = usePathname()
  const { visible: navbarVisible } = useScrollDirection()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tocOpen, setTocOpen] = useState(false)

  const pageTitle = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean)
    return segments[segments.length - 1]?.replace(/-/g, " ") ?? ""
  }, [pathname])

  return (
    <div
      key={pathname}
      className={cn(
        "sticky z-40 flex items-center gap-2 border-b border-border/50 bg-background/80 backdrop-blur-sm px-4 py-2 md:hidden transition-all duration-200",
        navbarVisible ? "top-14" : "top-0"
      )}
    >
      <Drawer open={sidebarOpen} onOpenChange={setSidebarOpen} direction="left">
        <DrawerTrigger asChild>
          <button
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="size-4" />
            <span>Menu</span>
          </button>
        </DrawerTrigger>
        <DrawerContent className="overflow-y-auto p-0">
          <Sidebar className="w-full border-r-0" />
        </DrawerContent>
      </Drawer>

      <span className="flex-1 text-center text-xs font-medium text-muted-foreground truncate px-2">
        {pageTitle}
      </span>

      <Drawer open={tocOpen} onOpenChange={setTocOpen} direction="right">
        <DrawerTrigger asChild>
          <button
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Open table of contents"
          >
            <span>On this page</span>
            <ListTree className="size-4" />
          </button>
        </DrawerTrigger>
        <DrawerContent className="overflow-y-auto p-4">
          <DrawerTitle className="sr-only">Table of Contents</DrawerTitle>
          <h4 className="sr-only">Table of Contents</h4>
          <OnThisPage items={toc} />
        </DrawerContent>
      </Drawer>
    </div>
  )
}
