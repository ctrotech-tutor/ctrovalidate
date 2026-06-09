"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { sidebarSections } from "@/lib/navigation"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-full overflow-y-auto border-r border-border/50 bg-background py-6">
      <div className="px-4 pb-4 mb-2 border-b border-border/50">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="text-primary">&gt;</span>
          <span>Ctrovalidate</span>
        </Link>
      </div>
      <nav className="px-3 space-y-5">
        {sidebarSections.map((section) => (
          <div key={section.title}>
            <h4 className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              {section.title}
            </h4>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block px-3 py-1.5 text-sm rounded-md transition-colors",
                    pathname === item.href
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}
