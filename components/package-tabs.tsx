"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type PkgManager = "npm" | "pnpm" | "yarn" | "bun"

const PkgManagerContext = createContext<{
  manager: PkgManager
  setManager: (m: PkgManager) => void
}>({ manager: "npm", setManager: () => {} })

export function PackageTabs({ children }: { children: ReactNode }) {
  const [manager, setManager] = useState<PkgManager>("npm")

  return (
    <PkgManagerContext.Provider value={{ manager, setManager }}>
      <div className="not-prose my-4">
        <div className="flex items-center gap-1 border-b border-border/50 pb-1 mb-3">
          {(["npm", "pnpm", "yarn", "bun"] as PkgManager[]).map((pm) => (
            <button
              key={pm}
              onClick={() => setManager(pm)}
              className={`px-3 py-1 text-xs font-medium rounded-t transition-colors ${
                manager === pm
                  ? "text-primary bg-primary/5 border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {pm}
            </button>
          ))}
        </div>
        {children}
      </div>
    </PkgManagerContext.Provider>
  )
}

export function PMCommands({ ...cmds }: Record<string, string>) {
  const { manager } = useContext(PkgManagerContext)
  const cmd = cmds[manager] ?? Object.values(cmds)[0] ?? ""

  return (
    <pre className="relative overflow-x-auto rounded-lg border border-border/50 bg-muted/20 p-4 text-sm font-mono">
      <code>{cmd}</code>
    </pre>
  )
}
