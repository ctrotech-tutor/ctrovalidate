import Link from "next/link"
import { ArrowRight, Check, FileJson, Gauge, Globe, Package, Server, Shield } from "lucide-react"

const features = [
  {
    icon: Package,
    title: "Framework Agnostic",
    description: "Works with vanilla JS, React, Vue, Svelte, and Next.js out of the box.",
  },
  {
    icon: FileJson,
    title: "Schema-Based",
    description: "Define validation rules as plain JSON objects — no complex DSLs.",
  },
  {
    icon: Shield,
    title: "Type-Safe",
    description: "Full TypeScript support with inferred types from your schemas.",
  },
  {
    icon: Globe,
    title: "Browser + Server",
    description: "Run the same validation logic on the client and server seamlessly.",
  },
  {
    icon: Gauge,
    title: "Lightweight",
    description: "Core is under 5KB gzipped. No dependencies, zero bloat.",
  },
  {
    icon: Server,
    title: "22 Atomic Rules",
    description: "Comprehensive built-in rules covering strings, numbers, dates, and more.",
  },
]

const stats = [
  { value: "22", label: "Atomic Rules" },
  { value: "JSON", label: "Schema Definition" },
  { value: "<5KB", label: "Core Gzipped" },
  { value: "100%", label: "Test Coverage" },
]

const packages = [
  { name: "ctrovalidate-core", desc: "Universal validation engine", href: "/api/core" },
  { name: "ctrovalidate-browser", desc: "DOM adapter with HTML-first API", href: "/api/browser" },
  { name: "ctrovalidate-react", desc: "Headless hook for React 18+", href: "/api/react" },
  { name: "ctrovalidate-vue", desc: "Composition API for Vue 3", href: "/api/vue" },
  { name: "ctrovalidate-svelte", desc: "Reactive stores for Svelte", href: "/api/svelte" },
  { name: "ctrovalidate-next", desc: "Server Action & FormData utilities", href: "/platform/nextjs" },
]

export default function Home() {
  return (
    <div className="flex-1">
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-6 py-20 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-sm text-primary mb-6">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              v1.0.0 — Now available on npm
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Form validation{" "}
              <span className="text-primary">for the modern web</span>
            </h1>

            <p className="mt-4 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
              A zero-dependency form validation ecosystem.
              Framework agnostic, type-safe, and built for performance.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/guide/getting-started"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Get Started
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/api/core"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-accent/50 transition-colors"
              >
                API Reference
              </Link>
            </div>

            <div className="mt-6">
              <div className="inline-flex items-center gap-2 rounded-lg bg-muted/50 px-4 py-2 text-sm font-mono text-muted-foreground">
                <span className="text-primary">$</span>
                <span>npm install ctrovalidate-browser</span>
                <span className="ml-2 text-muted-foreground/50 select-none">▌</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/50 py-16 lg:py-20">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-6">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Everything you need, nothing you don&apos;t
            </h2>
            <p className="mt-2 text-muted-foreground">
              A complete validation toolkit designed for real-world applications.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-lg border border-border/50 bg-card p-5 hover:border-primary/30 hover:bg-accent/30 transition-all"
              >
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg border border-border/50 bg-background">
                  <feature.icon className="size-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/50 py-16 lg:py-20">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-lg border border-border/50 overflow-hidden bg-border/50">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-card p-6 text-center">
                  <div className="text-2xl font-bold text-primary sm:text-3xl">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/50 py-16 lg:py-20">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-6">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              One ecosystem, every platform
            </h2>
            <p className="mt-2 text-muted-foreground">
              Pick the packages you need — use them together or standalone.
            </p>
          </div>
          <div className="mx-auto max-w-3xl divide-y divide-border/50 rounded-lg border border-border/50 overflow-hidden">
            {packages.map((pkg) => (
              <Link
                key={pkg.name}
                href={pkg.href}
                className="flex items-center justify-between gap-4 bg-card px-5 py-3.5 transition-colors hover:bg-accent/30"
              >
                <div>
                  <div className="font-mono text-sm font-medium">{pkg.name}</div>
                  <div className="text-sm text-muted-foreground">{pkg.desc}</div>
                </div>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Ready to simplify your forms?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Install in seconds and start validating with a clean, declarative API.
            </p>
            <div className="mt-6">
              <Link
                href="/guide/getting-started"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Get Started Now
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


