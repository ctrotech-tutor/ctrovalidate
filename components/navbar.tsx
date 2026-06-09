"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useScrollDirection } from "@/lib/hooks"
import { Menu, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle } from "@/components/ui/drawer"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchDialog } from "@/components/search-dialog"
import { githubRepos } from "@/lib/navigation"

const navLinks = [
  { title: "Guide", href: "/guide/introduction" },
  { title: "API", href: "/api/core" },
]

export function Navbar() {
  const pathname = usePathname()
  const { visible } = useScrollDirection()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const isDocsPage = pathname.startsWith("/guide") || pathname.startsWith("/api") || pathname.startsWith("/platform") || pathname.startsWith("/advanced")

  return (
    <header
      key={pathname}
      className={`sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-sm transition-transform duration-200 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center gap-4 px-4 lg:px-6">
        {!isDocsPage && (
          <Drawer open={mobileNavOpen} onOpenChange={setMobileNavOpen} direction="left">
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8 md:hidden">
                <Menu className="size-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DrawerTrigger>
            
            <DrawerContent className="p-0">
              <DrawerTitle className="sr-only">Navigation</DrawerTitle>
              <div className="flex flex-col h-full">
                <div className="px-4 py-4 border-b border-border/50">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setMobileNavOpen(false)}>
                    <Image src="/logo.svg" alt="Ctrovalidate" width={28} height={28} className="size-7" />
                    <span className="font-semibold tracking-tight">Ctrovalidate</span>
                  </Link>
                </div>
                <nav className="flex-1 px-3 py-4 space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileNavOpen(false)}
                      className="block px-3 py-2 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                    >
                      {link.title}
                    </Link>
                  ))}
                </nav>
              </div>
            </DrawerContent>
          </Drawer>
        )}

        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
        >
          <Image
            src="/logo.svg"
            alt="Ctrovalidate"
            width={28}
            height={28}
            className="size-7"
          />
          <span className="font-semibold tracking-tight">Ctrovalidate</span>
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
          <SearchDialog />
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
