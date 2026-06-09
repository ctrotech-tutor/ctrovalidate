import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    template: "%s | Ctrovalidate",
    default: "Ctrovalidate — Lightweight Form Validation",
  },
  description:
    "A zero-dependency form validation ecosystem for the web. Validate forms with vanilla JS, React, Vue, Svelte, and Next.js.",
  metadataBase: new URL("https://ctrovalidate.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Ctrovalidate",
    title: "Ctrovalidate — Lightweight Form Validation",
    description:
      "A zero-dependency form validation ecosystem for the web.",
    url: "https://ctrovalidate.vercel.app",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ctrovalidate",
    description:
      "A zero-dependency form validation ecosystem for the web.",
    images: ["/og-image.jpg"],
  },
  robots: "index, follow",
  keywords: [
    "ctrovalidate",
    "validation",
    "form-validation",
    "react",
    "vue",
    "svelte",
    "nextjs",
    "typescript",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          defer
          data-domain="ctrovalidate.vercel.app"
          src="https://plausible.io/js/script.js"
        />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="7c85954b-0d62-4e5b-90c9-2f67e9d40f96"
        />
      </head>
      <body className="min-h-dvh flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
