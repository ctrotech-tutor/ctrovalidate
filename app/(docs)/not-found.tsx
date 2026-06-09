import Link from "next/link"

export default function DocsNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <span className="text-6xl font-bold text-muted-foreground/20 mb-4 font-mono">404</span>
      <h1 className="text-2xl font-semibold mb-2">Page not found</h1>
      <p className="text-muted-foreground text-sm mb-8 text-center max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/guide/introduction"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
      >
        Go to docs
      </Link>
    </div>
  )
}
