"use client";

import { useEffect, useState } from "react";
import { IslandMap, ThemeToggle } from "./components";
import { useWebshop } from "./state";
import { initialObjects, PAYMENT_OPTIONS, type IslandObject } from "./domain";

const formatHuNumber = (value: number, fractionDigits = 0) =>
  new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);

export default function Home() {
  const { theme, cart, checkout, dispatch } = useWebshop();
  const [hoverObject, setHoverObject] = useState<IslandObject | null>(null);
  const [pinnedObject, setPinnedObject] = useState<IslandObject | null>(null);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [isCartOpen, setIsCartOpen] = useState(false);

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
  const totalEco = cart.reduce(
    (sum, item) => sum + item.object.cost * item.quantity,
    0,
  );
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const closeCartModal = () => {
    setIsCartOpen(false);
    dispatch({ type: "SET_CHECKOUT_STEP", step: "cart" });
  };

  const getSelectedPaymentLabel = () => {
    if (!checkout.selectedPayment) return "nincs kiválasztva";
    return (
      PAYMENT_OPTIONS.find((opt) => opt.id === checkout.selectedPayment)?.label ??
      checkout.selectedPayment
    );
  };

  const renderCheckoutPage = () => {
    switch (checkout.step) {
      case "cart":
        return (
          <div className="space-y-3 text-sm">
            <h3 className="uppercase tracking-[0.16em] text-xs">Kosár tartalma</h3>
            {cart.length === 0 ? (
              <p className="text-xs">
                A kosarad üres. A térképen jelölt pontokra kattintva adhatsz hozzá tárgyakat.
              </p>
            ) : (
              <ul className="space-y-2">
                {cart.map((item) => (
                  <li
                    key={item.object.id}
                    className="flex items-start justify-between gap-2 border-b border-dotted border-[color:var(--border)] pb-1 last:border-b-0"
                  >
                    <div>
                      <p className="display-font text-sm">{item.object.name}</p>
                      <p className="text-xs">{item.object.description}</p>
                      <p className="text-xs">Mennyiség: {item.quantity}</p>
                      <p className="text-xs">
                        Egységár: {formatHuNumber(item.object.cost)} {item.object.costUnit}
                      </p>
                      <p className="text-xs font-semibold">
                        Összesen: {formatHuNumber(item.object.cost * item.quantity)} Ft
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-[10px] underline"
                      onClick={() =>
                        dispatch({ type: "REMOVE_FROM_CART", objectId: item.object.id })
                      }
                    >
                      törlés
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex items-center justify-between text-xs border-t border-[color:var(--border)] pt-2">
              <span>Ár összesen</span>
              <span>{formatHuNumber(totalEco)} Ft</span>
            </div>
            <button
              type="button"
              className="pill-filled w-full rounded-full py-2 text-xs uppercase tracking-[0.2em]"
              disabled={cart.length === 0}
              onClick={() => dispatch({ type: "SET_CHECKOUT_STEP", step: "adatok" })}
            >
              Tovább a vásárláshoz
            </button>
          </div>
        );
      case "adatok":
        return (
          <div className="space-y-3 text-xs">
            <h3 className="uppercase tracking-[0.16em] text-xs">Adatok</h3>
            <p>
              Kérjük töltsd ki az alábbi mezőket.
            </p>
            <label className="block space-y-1">
              <span>Név</span>
              <input
                className="w-full border border-[color:var(--border)] bg-transparent px-2 py-1"
                value={checkout.form.fullName}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_CHECKOUT_FORM", form: { fullName: e.target.value } })
                }
              />
            </label>
            <label className="block space-y-1">
              <span>E-mail</span>
              <input
                className="w-full border border-[color:var(--border)] bg-transparent px-2 py-1"
                value={checkout.form.email}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_CHECKOUT_FORM", form: { email: e.target.value } })
                }
              />
            </label>
            <label className="block space-y-1">
              <span>Megjegyzés</span>
              <textarea
                className="w-full border border-[color:var(--border)] bg-transparent px-2 py-1"
                rows={3}
                value={checkout.form.notes}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_CHECKOUT_FORM", form: { notes: e.target.value } })
                }
              />
            </label>
            <div className="flex justify-between pt-2">
              <button
                type="button"
                className="btn-ghost px-3 py-1 text-[10px]"
                onClick={() => dispatch({ type: "SET_CHECKOUT_STEP", step: "cart" })}
              >
                Vissza
              </button>
              <button
                type="button"
                className="pill-filled rounded-full px-4 py-1 text-[10px]"
                onClick={() => dispatch({ type: "SET_CHECKOUT_STEP", step: "fizetes" })}
              >
                Fizetési mód
              </button>
            </div>
          </div>
        );
      case "fizetes":
        return (
          <div className="space-y-3 text-xs">
            <h3 className="uppercase tracking-[0.16em] text-xs">Válassz fizetési módot</h3>
            <div className="space-y-2">
              {PAYMENT_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`w-full text-left border px-3 py-2 rounded ${
                    checkout.selectedPayment === option.id
                      ? "pill-filled"
                      : "btn-ghost"
                  }`}
                  onClick={() =>
                    dispatch({ type: "SET_PAYMENT", payment: option.id })
                  }
                >
                  <p className="display-font text-sm">{option.label}</p>
                  <p className="text-[10px]">{option.description}</p>
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-2">
              <button
                type="button"
                className="btn-ghost px-3 py-1 text-[10px]"
                onClick={() => dispatch({ type: "SET_CHECKOUT_STEP", step: "adatok" })}
              >
                Vissza
              </button>
              <button
                type="button"
                className="pill-filled rounded-full px-4 py-1 text-[10px] disabled:opacity-50"
                disabled={!checkout.selectedPayment}
                onClick={() => dispatch({ type: "SET_CHECKOUT_STEP", step: "osszegzes" })}
              >
                Összegzés
              </button>
            </div>
          </div>
        );
      case "osszegzes":
        return (
          <div className="space-y-3 text-xs">
            <h3 className="uppercase tracking-[0.16em] text-xs">Összegzés</h3>
            <p>
              Ellenőrizd, a kosár tartalmát. Ha minden rendben, kattints a
              „Megrendelés” gombra.
            </p>
            <ul className="space-y-1 text-[11px]">
              <li>Név: {checkout.form.fullName || "nincs megadva"}</li>
              <li>E-mail: {checkout.form.email || "nincs megadva"}</li>
              <li>Megjegyzés: {checkout.form.notes || "nincs megadva"}</li>
              <li>Fizetés módja: {getSelectedPaymentLabel()}</li>
              <li>Tárgyak: {totalItems || 0} db</li>
            </ul>
            <div className="flex justify-between pt-2">
              <button
                type="button"
                className="btn-ghost px-3 py-1 text-[10px]"
                onClick={() => dispatch({ type: "SET_CHECKOUT_STEP", step: "fizetes" })}
              >
                Vissza
              </button>
              <button
                type="button"
                className="pill-filled rounded-full px-4 py-1 text-[10px]"
                onClick={() => dispatch({ type: "SET_CHECKOUT_STEP", step: "art_notice" })}
              >
                Megrendelés
              </button>
            </div>
          </div>
        );
      case "art_notice":
        return (
          <div className="space-y-3 text-xs">
            <h3 className="uppercase tracking-[0.16em] text-xs">Köszönjük a vásárlásod!</h3>
            <p>
              Fontos megjegyzés:Ez az oldal művészeti fikció. Az itt található tárgyak a valóságban nem feltétlenül eladóak és nincsenek az oldal készítője birtokában. Az oldalon valójában nem történik fizetés, nem történik adásvétel, és semmilyen kötelezettség nem keletkezik a vállalások teljesítésére.
            </p>
            <button
              type="button"
              className="pill-filled w-full rounded-full px-4 py-2 text-[10px]"
              onClick={() => {
                dispatch({ type: "CLEAR_CART" });
                closeCartModal();
              }}
            >
              Vissza a kezdőlapra
            </button>
          </div>
        );
      default:
        return null;
    }
  };

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
                        <p className="text-sm">{formatHuNumber(obj.cost)} {obj.costUnit}</p>
                      )}
                    </div>
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
              className={`btn-ghost rounded-full px-3 py-1 text-xs flex items-center gap-1 ${
                isCartOpen ? "bg-[color:var(--accent-soft)]" : ""
              }`}
              onClick={() => {
                if (isCartOpen) {
                  closeCartModal();
                } else {
                  setIsCartOpen(true);
                  dispatch({ type: "SET_CHECKOUT_STEP", step: "cart" });
                }
              }}
            >
              <i className="ri-shopping-cart-line text-xs" aria-hidden />
              <span>
                Kosár
                {totalItems > 0 ? ` (${totalItems})` : ""}
              </span>
            </button>
            <ThemeToggle />
          </nav>
        </header>

        <div className="relative flex-1 flex flex-col gap-3 overflow-hidden">
          {activeObject ? (
            <section className="bg-[color:var(--background-elevated)]">
              <h2 className="mb-3 text-lg font-semibold uppercase tracking-[0.12em]">
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
                <p className="text-lg mb-4">{activeObject.description}</p>
                <p className="text-sm uppercase tracking-[0.16em] mb-4">{activeObject.category}</p>
                {activeObject.color && <p className="text-sm">Szín: {activeObject.color}</p>}
                {activeObject.material && <p className="text-sm">Anyag: {activeObject.material}</p>}
                {activeObject.dimensions &&
                  (activeObject.dimensions.widthCm ||
                    activeObject.dimensions.heightCm ||
                    activeObject.dimensions.depthCm) && (
                    <p className="text-sm">
                      Méret: {activeObject.dimensions.widthCm || 0} cm x
                      {" "}
                      {activeObject.dimensions.heightCm || 0} cm x
                      {" "}
                      {activeObject.dimensions.depthCm || 0} cm
                    </p>
                  )}
                {activeObject.weightKg > 0 && (
                  <p className="text-sm">Súly: {activeObject.weightKg} kg</p>
                )}
                {activeObject.cost > 0 && (
                  <p className="text-sm">
                    Ár: {formatHuNumber(activeObject.cost)} {activeObject.costUnit}
                  </p>
                )}
              </div>
              <button
                type="button"
                className="pill-filled rounded-full px-6 py-2 text-sm mt-6"
                onClick={() => dispatch({ type: "ADD_TO_CART", object: activeObject })}
              >
                Hozzáadás a kosaradhoz
              </button>
            </section>
          ) : (
            <section className="space-y-2 flex flex-col h-full">
              <h1 className="display-font text-lg font-semibold uppercase tracking-[0.12em]">
                Végső kiárusítás - Papsziget
              </h1>
              <p className="display-font max-w-xs text-md mb-3">
                Képzeletbeli online áruház, ahol a szentendrei Papsziget ember
                által létrehozott tárgyait „vásárolhatod meg”. Miután mindent
                megvettek és elvittek, a sziget visszakerül a természet birtokába.
              </p>
              <p className="display-font text-sm mb-3">
                A térképen jelölt pontokra kattintva böngészhetsz a
                tárgyak között, és hozzáadhatod őket a kosaradhoz.
              </p>
              <p className="display-font text-sm">
                A tárgyak száma folyamatosan bővül. Ha van egy jó fotód egy
                tárgyról a szigeten, amit szívesen látnál az oldalon, küldd el {" "}
                <a className="underline" href="mailto:csertant@edu.bme.hu">erre</a> a címre.
              </p>
            </section>
          )}

          <div
            className={`absolute inset-0 bg-[color:var(--background)] border border-[color:var(--border)] p-4 transition-all duration-500 ease-out ${
              isCartOpen
                ? "translate-x-0 opacity-100 pointer-events-auto"
                : "translate-x-full opacity-0 pointer-events-none"
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <p className="display-font text-base uppercase tracking-[0.2em]">
                Vásárlás
              </p>
              <button
                type="button"
                className="btn-ghost rounded-full px-3 py-1 text-[10px]"
                onClick={closeCartModal}
              >
                Bezár
              </button>
            </div>
            <div className="h-full overflow-y-auto no-scrollbar pr-2">
              {renderCheckoutPage()}
            </div>
          </div>
        </div>

        <footer className="pt-3 text-[8px] space-y-2">
          <p>
            Ez az oldal egy művészeti projekt része. Az itt található tárgyak a valóságban nem feltétlenül eladóak és nincsenek az oldal készítője birtokában. Az oldalon valójában nem történik fizetés, nem történik adásvétel, és semmilyen kötelezettség nem keletkezik a vállalások teljesítésére. Az oldalon találhatóak mezők, melyek másolják a szokásos személyes adatokat gyűjtő mezők viselkedését, viszont az itt megadott adatok csak lokálisan kerülnek tárolásra és nincsenek továbbítva feldolgozásra.
          </p>
          <p className="flex justify-between">
            <span className="underline">
              ©2025 <a href="https://csertant.hu" target="_blank" rel="noreferrer">tamás csertán</a>
            </span>
            <span>1.0.0</span>
          </p>
        </footer>
      </section>
    </main>
  );
}
