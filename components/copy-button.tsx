"use client"

import { useCallback, useEffect, useState } from "react"

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [code])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "c" && document.activeElement?.closest("[data-code-block]")) {
        const block = document.activeElement.closest("[data-code-block]") as HTMLElement
        const code = block?.dataset.code
        if (code) navigator.clipboard.writeText(code)
      }
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [])

  return (
    <button
      onClick={copy}
      className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground/60 hover:text-foreground hover:bg-muted/50 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {copied ? (
        <>
          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
          Copied
        </>
      ) : (
        <>
          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Copy
        </>
      )}
    </button>
  )
}
