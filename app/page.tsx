"use client";

import { useEffect } from "react";
import { CartPanel, CheckoutFlow, IslandMap, ThemeToggle } from "./components";
import { useWebshop } from "./state";

export default function Home() {
  const { theme } = useWebshop();

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("theme-dark", theme.mode === "dark");
    }
  }, [theme.mode]);

  return (
    <main className="app-shell flex flex-col px-4 py-4 md:px-8 md:py-8">
      <header className="flex items-center justify-between border-b border-[color:var(--border)] pb-3 text-xs">
        <div className="space-y-1">
          <h1 className="text-sm font-semibold tracking-[0.12em] uppercase">
            Papsziget felszámolási webshop
          </h1>
          <p className="max-w-xl text-[11px] text-[color:var(--muted)]">
            Képzeletbeli online áruház, ahol a Duna-parti Papsziget ember
            által létrehozott tárgyait „vásárolhatod meg” különféle ökológiai
            vállalások fejében.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.16em]">
            Béta – művészeti projekt
          </span>
          <ThemeToggle />
        </div>
      </header>

      <section className="mt-4 grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <IslandMap />
          <p className="text-[11px] text-[color:var(--muted)] max-w-md">
            A térkép nem pontos topográfiai ábra, hanem emlékezetből és
            történetekből felrajzolt, stilizált sziget. A pontokra kattintva
            tárgyakat adhatsz a kosaradhoz.
          </p>
        </div>
        <aside className="flex flex-col justify-between border border-[color:var(--border)] bg-[color:var(--background-elevated)] p-3 text-xs gap-3">
          <CartPanel />
          <CheckoutFlow />
        </aside>
      </section>
    </main>
  );
}

