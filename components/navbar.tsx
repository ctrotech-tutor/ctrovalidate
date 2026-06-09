"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sidebar } from "@/components/sidebar"
import { githubRepos } from "@/lib/navigation"

const navLinks = [
  { title: "Guide", href: "/guide/introduction" },
  { title: "API", href: "/api/core" },
]

export function Navbar() {
  const pathname = usePathname()

  const isDocsPage = pathname.startsWith("/guide") || pathname.startsWith("/api") || pathname.startsWith("/platform") || pathname.startsWith("/advanced")

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center gap-4 px-4 lg:px-6">
        {isDocsPage && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8 md:hidden">
                <Menu className="size-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>
        )}

        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight shrink-0"
        >
          <span className="text-primary">&gt;</span>
          <span>Ctrovalidate</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 ml-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                pathname.startsWith(link.href.split("/").slice(0, 2).join("/"))
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden sm:flex gap-1.5 text-sm">
                <ExternalLink className="size-3" />
                <span>GitHub</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-48">
              {githubRepos.map((repo) => (
                <DropdownMenuItem key={repo.href} asChild>
                  <a href={repo.href} target="_blank" rel="noopener noreferrer">
                    {repo.title}
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
