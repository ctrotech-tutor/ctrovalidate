"use client"

import { useEffect, useState, useRef } from "react"
import { usePathname } from "next/navigation"

export function useScrollDirection() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  const isDocsPage =
    pathname.startsWith("/guide") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/platform") ||
    pathname.startsWith("/advanced")

  useEffect(() => {
    setVisible(true)
    lastScrollY.current = 0
  }, [pathname])

  useEffect(() => {
    if (!isDocsPage) return

    let isMobile = window.innerWidth < 768
    const handleResize = () => { isMobile = window.innerWidth < 768 }
    window.addEventListener("resize", handleResize)

    const handleScroll = () => {
      if (!isMobile) { setVisible(true); return }
      const current = window.scrollY
      setVisible(current < lastScrollY.current || current < 50)
      lastScrollY.current = current
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [isDocsPage])

  return { visible }
}
