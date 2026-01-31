"use client";

import { initialObjects, type IslandObject } from "../data/domain";
import { useWebshop } from "../lib/state";

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
