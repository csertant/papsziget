"use client";

import { PAYMENT_OPTIONS, initialObjects, type IslandObject } from "./domain";
import { useWebshop } from "./state";

export function ThemeToggle() {
  const { theme, dispatch } = useWebshop();
  return (
    <button
      type="button"
      className="btn-ghost rounded-full px-3 py-1 text-xs flex items-center gap-1"
      onClick={() => dispatch({ type: "TOGGLE_THEME" })}
    >
      <i className="ri-contrast-line text-xs" aria-hidden />
      <span>{theme.mode === "light" ? "Sötét mód" : "Világos mód"}</span>
    </button>
  );
}

export function IslandMap({
  onHoverObject,
  onPinObject,
}: {
  onHoverObject?: (obj: IslandObject | null) => void;
  onPinObject?: (obj: IslandObject) => void;
}) {
  useWebshop();

  return (
    <div className="relative w-full aspect-square overflow-hidden">
      <img
        src="/terkep.png"
        alt="Papsziget stilizált térképe"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {initialObjects.map((obj) => (
        <button
          key={obj.id}
          type="button"
          className="absolute -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[color:var(--accent)] hover:scale-125 transition-transform"
          style={{ left: `${obj.location.x}%`, top: `${obj.location.y}%` }}
          onMouseEnter={() => onHoverObject?.(obj)}
          onMouseLeave={() => onHoverObject?.(null)}
          onClick={(e) => {
            e.stopPropagation();
            onPinObject?.(obj);
          }}
        >
          <span className="sr-only">{obj.name}</span>
        </button>
      ))}
    </div>
  );
}

export function CartPanel() {
  const { cart, checkout, dispatch } = useWebshop();
  const totalEco = cart.reduce(
    (sum, item) => sum + item.object.cost * item.quantity,
    0,
  );

  if (checkout.step !== "cart") return null;

  return (
    <div className="border-t border-[color:var(--border)] pt-3 text-xs space-y-2">
      <div className="flex items-center justify-between">
        <p className="uppercase tracking-[0.16em] text-[10px]">
          Kosár
        </p>
        {cart.length > 0 && (
          <button
            type="button"
            className="text-[10px] underline"
            onClick={() => dispatch({ type: "CLEAR_CART" })}
          >
            ürítés
          </button>
        )}
      </div>
      {cart.length === 0 ? (
        <p className="text-[11px] text-[color:var(--muted)]">
          Még nem választottál tárgyakat. Kattints a térképen a pontokra.
        </p>
      ) : (
        <>
          <ul className="space-y-1">
            {cart.map((item) => (
              <li
                key={item.object.id}
                className="flex items-start justify-between gap-2 border-b border-dotted border-[color:var(--border)] pb-1"
              >
                <div>
                  <p className="text-[11px] font-medium">{item.object.name}</p>
                  <p className="text-[10px]">
                    {item.object.description}
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
          <div className="flex items-center justify-between text-[11px] pt-1">
            <span>Ökológiai költség összesen</span>
            <span>{totalEco} egység</span>
          </div>
          <button
            type="button"
            className="mt-2 w-full pill-filled py-2 text-[11px] uppercase tracking-[0.18em]"
            onClick={() => dispatch({ type: "SET_CHECKOUT_STEP", step: "adatok" })}
          >
            Tovább a „vásárláshoz”
          </button>
        </>
      )}
    </div>
  );
}

export function CheckoutFlow() {
  const { checkout, dispatch } = useWebshop();

  if (checkout.step === "cart") return null;

  if (checkout.step === "adatok") {
    const { form } = checkout;
    return (
      <section className="border-t border-[color:var(--border)] pt-4 space-y-3 text-xs">
        <h2 className="uppercase tracking-[0.16em] text-[10px]">Adatok</h2>
        <p className="text-[11px]">
          Nem kérünk valódi adatokat. Írj kitalált nevet, vagy hagyd üresen –
          ez egy művészeti projekt, nem történik valódi tranzakció.
        </p>
        <div className="space-y-2">
          <label className="block text-[10px]">
            Név (kitalált is lehet)
            <input
              className="mt-1 w-full border border-[color:var(--border)] bg-[color:var(--background)] px-2 py-1 text-[11px]"
              value={form.fullName}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_CHECKOUT_FORM",
                  form: { fullName: e.target.value },
                })
              }
            />
          </label>
          <label className="block text-[10px]">
            E-mail (nem kötelező)
            <input
              className="mt-1 w-full border border-[color:var(--border)] bg-[color:var(--background)] px-2 py-1 text-[11px]"
              value={form.email}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_CHECKOUT_FORM",
                  form: { email: e.target.value },
                })
              }
            />
          </label>
          <label className="block text-[10px]">
            Megjegyzés
            <textarea
              className="mt-1 w-full border border-[color:var(--border)] bg-[color:var(--background)] px-2 py-1 text-[11px]"
              rows={3}
              value={form.notes}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_CHECKOUT_FORM",
                  form: { notes: e.target.value },
                })
              }
            />
          </label>
        </div>
        <div className="flex justify-between pt-2">
          <button
            type="button"
            className="btn-ghost px-3 py-1 text-[11px]"
            onClick={() => dispatch({ type: "SET_CHECKOUT_STEP", step: "cart" })}
          >
            Vissza a kosárhoz
          </button>
          <button
            type="button"
            className="pill-filled px-4 py-1 text-[11px]"
            onClick={() => dispatch({ type: "SET_CHECKOUT_STEP", step: "fizetes" })}
          >
            Válassz „fizetési módot”
          </button>
        </div>
      </section>
    );
  }

  if (checkout.step === "fizetes") {
    return (
      <section className="border-t border-[color:var(--border)] pt-4 space-y-3 text-xs">
        <h2 className="uppercase tracking-[0.16em] text-[10px]">Fizetési mód</h2>
        <p className="text-[11px]">
          Itt nem pénzzel fizetsz, hanem vállalásokkal: szemét
          eltávolításával vagy fák ültetésével.
        </p>
        <div className="grid gap-2">
          {PAYMENT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`text-left p-2 text-[11px] rounded border ${checkout.selectedPayment === opt.id ? "pill-filled" : "btn-ghost"}`}
              onClick={() =>
                dispatch({ type: "SET_PAYMENT", payment: opt.id })
              }
            >
              <div className="flex items-center gap-2">
                <i className="ri-leaf-line text-xs" aria-hidden />
                <span className="font-medium">{opt.label}</span>
              </div>
              <p className="mt-1 text-[10px]">
                {opt.description}
              </p>
            </button>
          ))}
        </div>
        <div className="flex justify-between pt-2">
          <button
            type="button"
            className="btn-ghost px-3 py-1 text-[11px]"
            onClick={() => dispatch({ type: "SET_CHECKOUT_STEP", step: "adatok" })}
          >
            Vissza az adatokhoz
          </button>
          <button
            type="button"
            disabled={!checkout.selectedPayment}
            className="pill-filled px-4 py-1 text-[11px] disabled:opacity-50"
            onClick={() => dispatch({ type: "SET_CHECKOUT_STEP", step: "osszegzes" })}
          >
            Tovább az összegzéshez
          </button>
        </div>
      </section>
    );
  }

  if (checkout.step === "osszegzes") {
    return (
      <section className="border-t border-[color:var(--border)] pt-4 space-y-3 text-xs">
        <h2 className="uppercase tracking-[0.16em] text-[10px]">Összegzés</h2>
        <p className="text-[11px]">
          Most jönne a valódi fizetés gombja. Itt azonban egy másik
          irányba tereljük a figyelmed.
        </p>
        <button
          type="button"
          className="pill-filled px-4 py-2 text-[11px] uppercase tracking-[0.18em] w-full"
          onClick={() => dispatch({ type: "SET_CHECKOUT_STEP", step: "art_notice" })}
        >
          Zárás
        </button>
      </section>
    );
  }

  if (checkout.step === "art_notice") {
    return (
      <section className="border-t border-[color:var(--border)] pt-4 space-y-3 text-xs">
        <h2 className="uppercase tracking-[0.16em] text-[10px]">Fontos megjegyzés</h2>
        <p className="text-[11px]">
          Ez az oldal egy művészeti projekt része. Nincsen valódi
          fizetés, nem történik adásvétel, a térképen szereplő tárgyak
          nem kerülnek ténylegesen „tulajdonodba”.
        </p>
        <p className="text-[11px]">
          A webshop logikája csak keret: azt vizsgálja, hogyan próbáljuk
          meg birtokba venni azt, amihez valójában közös, felelősségteljes
          viszonyunk lehetne. A valódi „fizetés” az, ahogyan a szigettel
          és környezetével bánsz.
        </p>
        <button
          type="button"
          className="btn-ghost px-3 py-1 text-[11px]"
          onClick={() => dispatch({ type: "SET_CHECKOUT_STEP", step: "cart" })}
        >
          Vissza a térképhez
        </button>
      </section>
    );
  }

  return null;
}
