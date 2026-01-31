"use client";

import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import {
  CartItem,
  CheckoutFormData,
  CheckoutStep,
  ShippingMethod,
  TrashPaymentOption,
  WebshopState,
  initialWebshopState,
  IslandObject,
} from "../data/domain";

type Action =
  | { type: "ADD_TO_CART"; object: IslandObject }
  | { type: "REMOVE_FROM_CART"; objectId: string }
  | { type: "CLEAR_CART" }
  | { type: "SET_CHECKOUT_STEP"; step: CheckoutStep }
  | { type: "UPDATE_CHECKOUT_FORM"; form: Partial<CheckoutFormData> }
  | { type: "SET_PAYMENT"; payment: TrashPaymentOption | undefined }
  | { type: "SET_SHIPPING_METHOD"; method: ShippingMethod | undefined }
  | { type: "TOGGLE_THEME" };

interface WebshopContextValue extends WebshopState {
  dispatch: (action: Action) => void;
}

const WebshopContext = createContext<WebshopContextValue | undefined>(
  undefined,
);

function reducer(state: WebshopState, action: Action): WebshopState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.cart.find(
        (item) => item.object.id === action.object.id,
      );
      let updatedCart: CartItem[];
      if (existing) {
        updatedCart = state.cart.map((item) =>
          item.object.id === action.object.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        const newItem: CartItem = { object: action.object, quantity: 1 };
        updatedCart = [...state.cart, newItem];
      }
      return {
        ...state,
        cart: updatedCart,
        checkout: {
          ...state.checkout,
          step: "cart",
        },
      };
    }
    case "REMOVE_FROM_CART": {
      const updatedCart = state.cart.filter(
        (item) => item.object.id !== action.objectId,
      );
      return {
        ...state,
        cart: updatedCart,
      };
    }
    case "CLEAR_CART": {
      return {
        ...state,
        cart: [],
        checkout: {
          ...state.checkout,
          selectedPayment: undefined,
          selectedShipping: undefined,
        },
      };
    }
    case "SET_CHECKOUT_STEP": {
      return {
        ...state,
        checkout: {
          ...state.checkout,
          step: action.step,
        },
      };
    }
    case "UPDATE_CHECKOUT_FORM": {
      return {
        ...state,
        checkout: {
          ...state.checkout,
          form: {
            ...state.checkout.form,
            ...action.form,
          },
        },
      };
    }
    case "SET_PAYMENT": {
      return {
        ...state,
        checkout: {
          ...state.checkout,
          selectedPayment: action.payment,
        },
      };
    }
    case "SET_SHIPPING_METHOD": {
      return {
        ...state,
        checkout: {
          ...state.checkout,
          selectedShipping: action.method,
        },
      };
    }
    case "TOGGLE_THEME": {
      return {
        ...state,
        theme: {
          mode: state.theme.mode === "light" ? "dark" : "light",
        },
      };
    }
    default:
      return state;
  }
}

export function WebshopProvider({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState: WebshopState;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // On first mount, try to hydrate from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem("papsziget-webshop-state");
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<WebshopState>;
      if (!parsed) return;
      // Only merge cart and theme; keep current checkout step by default
      if (parsed.cart || parsed.theme) {
        dispatch({
          // custom internal action via type assertion
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          type: "__HYDRATE__",
        } as any);
      }
    } catch {
      // ignore invalid data
    }
  }, []);

  // Persist cart and theme on change
  useEffect(() => {
    if (typeof window === "undefined") return;
    const toStore: Pick<WebshopState, "cart" | "theme"> = {
      cart: state.cart,
      theme: state.theme,
    };
    try {
      window.localStorage.setItem(
        "papsziget-webshop-state",
        JSON.stringify(toStore),
      );
    } catch {
      // ignore write errors (e.g. private mode)
    }
  }, [state.cart, state.theme]);

  const value = useMemo<WebshopContextValue>(
    () => ({ ...state, dispatch }),
    [state],
  );

  return (
    <WebshopContext.Provider value={value}>{children}</WebshopContext.Provider>
  );
}

export function useWebshop() {
  const ctx = useContext(WebshopContext);
  if (!ctx) {
    throw new Error("useWebshop must be used within WebshopProvider");
  }
  return ctx;
}
