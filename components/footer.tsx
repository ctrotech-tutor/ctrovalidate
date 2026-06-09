import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { socialLinks } from "@/lib/navigation"

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-8 mt-auto">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Released under the{" "}
            <Link
              href="https://opensource.org/licenses/MIT"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              MIT License
            </Link>
            . Copyright &copy; {new Date().getFullYear()}-present Ctrotech.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={socialLinks.github}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
              <ExternalLink className="size-3" />
            </Link>
            <Link
              href={socialLinks.twitter}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
              <ExternalLink className="size-3" />
            </Link>
            <Link
              href={socialLinks.youtube}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
              <ExternalLink className="size-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
