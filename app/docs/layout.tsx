import { Sidebar } from "@/components/sidebar"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-1">
      <aside className="hidden md:block w-64 shrink-0 border-r border-border/50">
        <div className="sticky top-14 h-[calc(100dvh-3.5rem)] overflow-y-auto">
          <Sidebar />
        </div>
      </aside>
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  )
}
