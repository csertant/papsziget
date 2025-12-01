"use client";

import { useEffect, useState } from "react";
import { IslandMap, ThemeToggle } from "./components";
import { useWebshop } from "./state";
import { initialObjects, type IslandObject } from "./domain";

export default function Home() {
  const { theme, cart, dispatch } = useWebshop();
  const [hoverObject, setHoverObject] = useState<IslandObject | null>(null);
  const [pinnedObject, setPinnedObject] = useState<IslandObject | null>(null);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("theme-dark", theme.mode === "dark");
    }
  }, [theme.mode]);

  const handleHover = (obj: IslandObject | null) => setHoverObject(obj);

  const handlePin = (obj: IslandObject) => {
    setPinnedObject(obj);
    setHoverObject(null);
  };

  const activeObject = pinnedObject || hoverObject;

  return (
    <main className="app-shell flex h-screen max-h-screen flex-row px-2 py-2 md:px-4 md:py-4 gap-2 overflow-hidden">
      <section className="relative flex-1 flex items-center justify-center min-h-0">
        <div className="absolute top-0 right-0 z-20 flex rounded-full border border-[color:var(--border)] overflow-hidden bg-[color:var(--background-elevated)]">
          <button
            type="button"
            className={`flex items-center gap-1 px-3 py-1 text-xs ${viewMode === "map" ? "bg-[color:var(--accent-soft)]" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setViewMode("map");
            }}
          >
            <i className="ri-map-2-line text-xs" aria-hidden />
            Térkép
          </button>
          <button
            type="button"
            className={`flex items-center gap-1 px-3 py-1 text-xs ${viewMode === "list" ? "bg-[color:var(--accent-soft)]" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setViewMode("list");
              setHoverObject(null);
            }}
          >
            <i className="ri-list-unordered text-xs" aria-hidden />
            Lista
          </button>
        </div>
        <div
          className="relative mx-auto w-full max-w-[min(100vh,900px)] aspect-square"
          onClick={() => {
            if (viewMode === "map") {
              setPinnedObject(null);
            }
          }}
        >
          {viewMode === "map" ? (
            <IslandMap onHoverObject={handleHover} onPinObject={handlePin} />
          ) : (
            <div
              className="absolute inset-0 p-10 bg-[color:var(--background)] overflow-y-auto no-scrollbar"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setPinnedObject(null);
                }
              }}
              onMouseLeave={() => setHoverObject(null)}
            >
              <ul className="divide-y divide-[color:var(--border)]">
                {initialObjects.map((obj) => (
                  <li
                    key={obj.id}
                    className="flex items-center justify-between gap-4 px-4 py-3 cursor-pointer transition-colors hover:bg-[color:var(--background-elevated)]"
                    onMouseEnter={() => handleHover(obj)}
                    onMouseLeave={() => handleHover(null)}
                    onClick={() => handlePin(obj)}
                  >
                    <div className="space-y-1">
                      <p className="display-font text-base">{obj.name}</p>
                      {obj.cost > 0 && (
                        <p className="text-sm">{obj.cost} {obj.costUnit}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      className="pill-filled rounded-full px-3 py-1 text-xs"
                      onMouseEnter={() => handleHover(obj)}
                      onMouseLeave={() => handleHover(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePin(obj);
                      }}
                    >
                      Részletek
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="w-80 md:w-96 flex flex-col justify-between text-sm pl-4 min-h-0">
        <header className="flex items-center justify-between pb-3">
          <nav className="flex items-center gap-2">
            <button
              type="button"
              className="btn-ghost rounded-full px-3 py-1 text-xs flex items-center gap-1"
            >
              <i className="ri-shopping-cart-line text-xs" aria-hidden />
              <span>
                Kosár
                {cart.length > 0 ? ` (${cart.length})` : ""}
              </span>
            </button>
            <ThemeToggle />
          </nav>
        </header>

        <div className="flex-1 flex flex-col gap-3 overflow-hidden">
          {activeObject ? (
            <section className="bg-[color:var(--background-elevated)]">
              <h2 className="display-font mb-3 text-lg font-semibold uppercase tracking-[0.12em]">
                {activeObject.name}
              </h2>
              {activeObject.imagePath && (
                <div className="mb-3 w-full max-h-72 flex items-center justify-center overflow-hidden bg-[color:var(--background-elevated)]">
                  <img
                    src={activeObject.imagePath}
                    alt={activeObject.name}
                    className="max-h-72 w-auto max-w-full"
                  />
                </div>
              )}
              <div className="space-y-2">
                <p className="text-lg">{activeObject.description}</p>
                <p className="text-sm uppercase tracking-[0.16em]">{activeObject.category}</p>
                {activeObject.color && <p className="text-sm">Szín: {activeObject.color}</p>}
                {activeObject.material && <p className="text-sm">Anyag: {activeObject.material}</p>}
                {activeObject.dimensions &&
                  (activeObject.dimensions.widthCm ||
                    activeObject.dimensions.heightCm ||
                    activeObject.dimensions.depthCm) && (
                    <p className="text-sm">
                      Méret: {activeObject.dimensions.widthCm || 0} cm ×
                      {" "}
                      {activeObject.dimensions.heightCm || 0} cm ×
                      {" "}
                      {activeObject.dimensions.depthCm || 0} cm
                    </p>
                  )}
                {activeObject.weightKg > 0 && (
                  <p className="text-sm">Súly: {activeObject.weightKg} kg</p>
                )}
                {activeObject.cost > 0 && (
                  <p className="text-sm">
                    Ár: {activeObject.cost} {activeObject.costUnit}
                  </p>
                )}
              </div>
              <button
                type="button"
                className="pill-filled rounded-full px-6 py-2 text-sm mt-6"
                onClick={() => dispatch({ type: "ADD_TO_CART", object: activeObject })}
              >
                Hozzáadás a kosárhoz
              </button>
            </section>
          ) : (
            <section className="space-y-2">
              <h1 className="display-font text-lg font-semibold uppercase tracking-[0.12em]">
                Végső kiárusítás – Papsziget
              </h1>
              <p className="display-font max-w-xs text-md">
                Képzeletbeli online áruház, ahol a szentendrei Papsziget ember
                által létrehozott tárgyait „vásárolhatod meg”. Miután mindent
                megvettek és elvittek, a sziget visszakerül a természet birtokába.
              </p>
            </section>
          )}
        </div>

        <footer className="pt-3 text-[8px] space-y-2">
          <p>
            Ez az oldal egy művészeti projekt része. Az itt található tárgyak a valóságban nem feltétlenül eladóak és nincsenek az oldal készítője birtokában. Az oldalon valójában nem történik fizetés, nem történik adásvétel, és semmilyen kötelezettség nem keletkezik a vállalások teljesítésére. Az oldalon találhatóak mezők, melyek másolják a szokásos személyes adatokat gyűjtő mezők viselkedését, viszont az itt megadott adatok csak lokálisan kerülnek tárolásra és nincsenek továbbítva feldolgozásra.
          </p>
          <p className="flex justify-between">
            <span>
              ©2025 <a href="https://csertant.hu" target="_blank" rel="noreferrer">tamás csertán</a>
            </span>
            <span>1.0.0</span>
          </p>
        </footer>
      </section>
    </main>
  );
}
