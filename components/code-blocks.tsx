"use client"

import { useEffect, useRef } from "react"

export function CodeBlocks({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const figures = root.querySelectorAll<HTMLElement>("figure[data-rehype-pretty-code-figure]")
    for (const figure of figures) {
      if (figure.querySelector("[data-copy-btn]")) continue

      const pre = figure.querySelector("pre")
      const code = figure.querySelector("code")
      if (!pre || !code) continue

      const text = code.textContent ?? ""
      const lang = pre.getAttribute("data-language") ?? ""

      pre.classList.add("group")
      pre.style.position = "relative"
      pre.style.paddingTop = "2.5rem"

      const header = document.createElement("div")
      header.className =
        "absolute top-0 inset-x-0 flex items-center justify-between px-4 py-1.5 text-xs text-muted-foreground/60 border-b border-border/30 rounded-t-lg bg-muted/10"
      header.dataset.copyBtn = ""
      header.innerHTML = lang
        ? `<span class="font-mono uppercase tracking-wider text-[10px]">${lang}</span>`
        : `<span></span>`

      const btn = document.createElement("button")
      btn.className =
        "flex items-center gap-1.5 rounded px-1.5 py-0.5 text-xs font-medium text-muted-foreground/50 hover:text-foreground hover:bg-muted/40 transition-all"
      btn.setAttribute("aria-label", "Copy code")
      btn.innerHTML = `
        <svg class="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        <span>Copy</span>
      `

      btn.addEventListener("click", async () => {
        await navigator.clipboard.writeText(text)
        btn.innerHTML = `
          <svg class="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>Copied!</span>
        `
        setTimeout(() => {
          btn.innerHTML = `
            <svg class="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            <span>Copy</span>
          `
        }, 1500)
      })

      header.appendChild(btn)
      pre.prepend(header)
    }
  }, [])

  return <div ref={ref}>{children}</div>
}
