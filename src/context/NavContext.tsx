import { createContext, useContext, useState, type ReactNode } from "react";
import type { TabKey } from "../components/shell";

export interface Frame {
  screen: string;
  params?: Record<string, unknown>;
}

interface NavCtx {
  tab: TabKey;
  setTab: (t: TabKey) => void;
  stack: Frame[];
  push: (screen: string, params?: Record<string, unknown>) => void;
  pop: () => void;
  reset: () => void;
  top?: Frame;
}

const Ctx = createContext<NavCtx | null>(null);

export function NavProvider({ children }: { children: ReactNode }) {
  const [tab, setTab] = useState<TabKey>("today");
  const [stack, setStack] = useState<Frame[]>([]);

  const value: NavCtx = {
    tab,
    setTab: (t) => {
      setStack([]);
      setTab(t);
    },
    stack,
    push: (screen, params) => setStack((s) => [...s, { screen, params }]),
    pop: () => setStack((s) => s.slice(0, -1)),
    reset: () => setStack([]),
    top: stack[stack.length - 1],
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useNav() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useNav must be used within NavProvider");
  return c;
}
