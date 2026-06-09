export interface NavItem {
  title: string
  href: string
  external?: boolean
}

export interface SidebarSection {
  title: string
  items: NavItem[]
}

export const sidebarSections: SidebarSection[] = [
  {
    title: "Essentials",
    items: [
      { title: "Introduction", href: "/guide/introduction" },
      { title: "Getting Started", href: "/guide/getting-started" },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { title: "ctrovalidate-core", href: "/guide/core" },
      { title: "ctrovalidate-browser", href: "/guide/browser" },
      { title: "Schema System", href: "/guide/schemas" },
      { title: "Rules Catalog", href: "/guide/rules" },
      { title: "State Management", href: "/guide/state" },
    ],
  },
  {
    title: "Technical Reference",
    items: [
      { title: "ctrovalidate-core", href: "/api/core" },
      { title: "ctrovalidate-browser", href: "/api/browser" },
      { title: "ctrovalidate-react", href: "/api/react" },
      { title: "ctrovalidate-vue", href: "/api/vue" },
      { title: "ctrovalidate-svelte", href: "/api/svelte" },
      { title: "TypeScript Types", href: "/api/types" },
    ],
  },
  {
    title: "Platform Adapters",
    items: [
      { title: "Next.js", href: "/platform/nextjs" },
      { title: "Tailwind CSS", href: "/platform/tailwind" },
      { title: "HTMX", href: "/platform/htmx" },
      { title: "Alpine.js", href: "/platform/alpine" },
    ],
  },
  {
    title: "Advanced Guides",
    items: [
      { title: "Async Validation", href: "/advanced/async" },
      { title: "i18n & Localization", href: "/advanced/i18n" },
      { title: "Custom Rules", href: "/advanced/custom-rules" },
      { title: "Testing", href: "/advanced/testing" },
    ],
  },
]

export const githubRepos = [
  {title: "ctrovalidate", href: "https://github.com/ctrotech-tutor/ctrovalidate" },
  { title: "ctrovalidate-core", href: "https://github.com/ctrotech-tutor/ctrovalidate-core" },
  { title: "ctrovalidate-browser", href: "https://github.com/ctrotech-tutor/ctrovalidate-browser" },
  { title: "ctrovalidate-react", href: "https://github.com/ctrotech-tutor/ctrovalidate-react" },
  { title: "ctrovalidate-vue", href: "https://github.com/ctrotech-tutor/ctrovalidate-vue" },
  { title: "ctrovalidate-svelte", href: "https://github.com/ctrotech-tutor/ctrovalidate-svelte" },
  { title: "ctrovalidate-next", href: "https://github.com/ctrotech-tutor/ctrovalidate-next" },
]

export const socialLinks = {
  github: "https://github.com/ctrotech-tutor",
  twitter: "https://twitter.com/ctrotechDev",
  youtube: "https://youtube.com/@ctrotech",
  email: "mailto:ctrotech.devs@gmail.com",
}
