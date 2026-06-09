"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { sidebarSections } from "@/lib/navigation"

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav className={cn("py-6 px-3 space-y-5", className)}>
      {sidebarSections.map((section) => (
        <div key={section.title}>
          <h4 className="px-3 mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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
  )
}